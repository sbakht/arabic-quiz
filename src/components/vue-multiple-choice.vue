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
      :showScore="showScore"
      :selected="chosenAnswer.id"
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
    correctAnswerRequired: {
      type: Boolean,
      default: true,
    },
    isSkippable: {
      type: Boolean,
      default: true,
    },
    showScore: {
      type: Boolean,
      default: true,
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
      numRight: 0,
      numWrong: 0,
      isIncorrectState: false,
    };
  },
  computed: {
    total() {
      return this.questions.length;
    },
    chosenAnswer() {
      const activeQuestion = this.history[this.index];
      console.log(this.history);
      if (!activeQuestion || !activeQuestion.userTempAnswer) {
        return {};
      }
      return activeQuestion.userTempAnswer;
    },
  },
  methods: {
    goToNextQuestion() {
      if (!this.isSkippable) {
        return;
      }

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
    onAnswer(choice) {
      this.history[this.index] = {
        questionInfo: this.question,
        userTempAnswer: choice,
      };
    },
    onWrong(choice) {
      if (!this.showScore) {
        this.goToNextQuestion();
        return;
      }

      console.log("wrong");
      this.numWrong += this.isIncorrectState ? 0 : 1;
      this.isIncorrectState = true;
      if (this.correctAnswerRequired === false) {
        this.isIncorrectState = false;
        this.goToNextQuestion();
      }
    },
    onRight({ choice, timeout }) {
      setTimeout(() => {
        if (!this.showScore) {
          this.goToNextQuestion();
          return;
        }

        this.numRight += this.isIncorrectState ? 0 : 1;
        this.isIncorrectState = false;
        this.goToNextQuestion();
      }, timeout);
    },
  },
};
</script>

</style>
