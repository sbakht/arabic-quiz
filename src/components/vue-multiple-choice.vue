<template>
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
    @answer="onAnswer"
    @wrong="onWrong"
    @right="onRight"
  ></quiz-card>
  <div v-else-if="completed">You have completed the quiz</div>
</template>

<script>
import QuizCard from "./quiz.card.vue";

export default {
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
  },
  data() {
    const index = 0;
    return {
      question: this.generateNextQuestion
        ? this.generateNextQuestion({})
        : this.questions[index],
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
  },
  methods: {
    goToNextQuestion() {
      if (this.generateNextQuestion) {
        this.question = this.generateNextQuestion({});
      } else {
        this.index++;
        if (this.index >= this.questions.length) {
          this.completed = true;
          this.question = null;
        } else {
          this.question = this.questions[this.index];
        }
      }
      this.questionNumber++;
    },
    onAnswer(choice) {
      this.history.push({
        question: this.question,
        choices: this.choices,
        answered: choice,
        answer: this.answer,
      });
    },
    onWrong(choice) {
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
        this.numRight += this.isIncorrectState ? 0 : 1;
        this.isIncorrectState = false;
        this.goToNextQuestion();
      }, timeout);
    },
  },
};
</script>

</style>
