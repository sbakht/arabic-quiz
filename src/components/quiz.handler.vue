<template>
  <quiz-card
    :heading="heading"
    :question="question.question.text"
    :choices="question.choices"
    :answerId="question.answer"
    :index="index + 1"
    @answer="onAnswer"
    @wrong="onWrong"
    @right="onRight"
  ></quiz-card>
</template>

<script>
import QuizCard from "./quiz.card.vue";
import { generateArToEn } from "../pronouns";

export default {
  components: {
    QuizCard,
  },
  data() {
    return {
      heading: "Determine the answer",
      questions: this.generate(),
      index: 0,
      history: [],
    };
  },
  computed: {
    question() {
      return this.questions[this.index];
    },
    total() {
      return this.questions.length;
    },
  },
  methods: {
    generate() {
      return generateArToEn({ count: 10 });
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
      }, timeout);
    },
  },
};
</script>

</style>
