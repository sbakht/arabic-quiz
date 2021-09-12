<template>
  <div>
    <quiz-card
      v-if="question && !completed"
      v-bind="$attrs"
      :question="question.question.text"
      :choices="question.choices"
      :answerId="question.answer"
      :total="!generateNextQuestion && questions.length"
      :index="questionNumber"
      :numRight="numRight"
      :numWrong="numWrong"
      :showScore="!isModeNavigate"
      :selected="chosenAnswer.id"
      :canNavigate="isModeNavigate"
      @answer="onAnswer"
      @wrong="onWrong"
      @right="onRight"
      @goToNextQuestion="goToNextQuestion"
      @goToPreviousQuestion="goToPreviousQuestion"
    ></quiz-card>
    <div v-else-if="completed">You have completed the quiz</div>
  </div>
</template>

<script>
import QuizCard from "./quiz.card.vue";

const MODES = {
  Navigate: "Navigate",
  SingleTry: "SingleTry",
  ForceRight: "ForceRight",
};

export default {
  inheritAttrs: false,
  components: {
    QuizCard,
  },
  props: {
    generateNextQuestion: {
      type: Function,
      default: null,
    },
    questions: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: MODES.ForceRight,
    },
  },
  data() {
    const index = 0;
    const question = this.generateNextQuestion
      ? this.generateNextQuestion({})
      : this.questions[index];
    return {
      question,
      generatedHistory: this.generateNextQuestion ? [question] : [],
      index,
      history: [],
      completed: false,
      questionNumber: 1,
    };
  },
  computed: {
    total() {
      return this.questions.length;
    },
    isModeNavigate() {
      return this.mode === MODES.Navigate;
    },
    isModeSingleTry() {
      return this.mode === MODES.SingleTry;
    },
    isModeForceRight() {
      return this.mode === MODES.ForceRight;
    },
    chosenAnswer() {
      const activeQuestion = this.history[this.index];
      if (!activeQuestion || !activeQuestion.userTempAnswer) {
        return {};
      }
      return activeQuestion.userTempAnswer;
    },
    isClean() {
      const currQuestion = this.history[this.index];
      return currQuestion.right == undefined && currQuestion.wrong == undefined;
    },
    numRight() {
      return this.history.filter((q) => {
        if (this.isModeForceRight) {
          return (
            q.userAnswers.filter((userAnswer) => !userAnswer.correct).length ===
            0
          );
        }

        if (this.isModeSingleTry) {
          return q.userAnswers[0].correct;
        }

        if (this.isModeNavigate) {
          return q.userAnswers[q.userAnswers.length - 1].correct;
        }
      }).length;
    },
    numWrong() {
      return this.history.filter((q) => {
        if (this.isModeForceRight) {
          return (
            q.userAnswers.filter((userAnswer) => !userAnswer.correct).length > 0
          );
        }

        if (this.isModeSingleTry) {
          return !q.userAnswers[0].correct;
        }

        if (this.isModeNavigate) {
          return !q.userAnswers[q.userAnswers.length - 1].correct;
        }
      }).length;
    },
  },
  methods: {
    goToNextQuestion() {
      this.index++;
      this.questionNumber++;

      if (this.generateNextQuestion) {
        this.question = this.generateNextQuestion({});
        this.generatedHistory.push(this.question);
      } else {
        if (this.index >= this.questions.length) {
          this.completed = true;
          this.question = null;
        } else {
          this.question = this.questions[this.index];
        }
      }
    },
    goToPreviousQuestion() {
      if (this.index > 0) {
        this.index--;
        this.questionNumber--;

        if (this.generateNextQuestion) {
          this.question = this.generatedHistory[this.index];
        } else {
          this.question = this.questions[this.index];
        }
      }
    },
    onAnswer(choice, isRight) {
      const currQ = this.history[this.index] || { userAnswers: [] };
      this.history[this.index] = {
        ...currQ,
        questionInfo: this.question,
        userTempAnswer: choice,
        userAnswers: [...currQ.userAnswers, { ...choice, correct: isRight }],
      };
    },
    onWrong(choice) {
      // TODO improve with vue3
      const currQ = this.history[this.index];
      this.history[this.index] = { ...currQ, right: false, wrong: true };
      this.history = [...this.history];

      if (this.isModeNavigate || this.isModeSingleTry) {
        this.goToNextQuestion();
      }
    },
    onRight({ choice, timeout }) {
      // TODO improve with vue3
      const currQ = this.history[this.index];
      this.history[this.index] = { ...currQ, right: true, wrong: false };
      this.history = [...this.history];

      setTimeout(() => {
        this.goToNextQuestion();
      }, timeout);
    },
  },
};
</script>

</style>
