<template>
  <quiz-card
    v-if="question && !completed"
    :heading="heading"
    :question="question.question.text"
    :choices="question.choices"
    :answerId="question.answer"
    :index="index + 1"
    @answer="onAnswer"
    @wrong="onWrong"
    @right="onRight"
  ></quiz-card>
  <div v-else-if="completed">You have completed the quiz</div>
</template>

<script>
import QuizCard from "./quiz.card.vue";
import { generateArToEn } from "../pronouns";

export default {
  components: {
    QuizCard,
  },
  props: {
    generateNextQuestion: {
      type: Function,
      default: null,
    },
  },
  data() {
    const questions = this.generate();
    const index = 0;
    return {
      heading: "Determine the answer",
      questions,
      question: this.generateNextQuestion
        ? this.generateNextQuestion({})
        : questions[index],
      index,
      history: [],
      completed: false,
    };
  },
  computed: {
    total() {
      return this.questions.length;
    },
  },
  methods: {
    generate() {
      return generateArToEn({ count: 3 });
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
    },
    onRight({ choice, timeout }) {
      setTimeout(() => {
        // if (this.index < this.total) {
        //   this.index++;
        // }else{
        this.index++;
        // this.questions = this.questions.concat(this.generate());

        // }

        if (this.generateNextQuestion) {
          this.question = this.generateNextQuestion({});
        } else {
          if (this.index >= this.questions.length) {
            this.completed = true;
            this.question = null;
          } else {
            this.question = this.questions[this.index];
          }
        }
      }, timeout);
    },
  },
};
</script>

</style>
