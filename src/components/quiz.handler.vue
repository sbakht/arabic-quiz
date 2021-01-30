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
      questions: generateArToEn({ count: 1 }),
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
    onRight(choice) {
      setTimeout(() => {
        // if (this.index < this.total) {
        //   this.index++;
        // }else{
        this.index++;
        this.questions = this.questions.concat(generateArToEn({ count: 1 }));

        // }
      }, 500);
    },
  },
};
</script>

</style>
