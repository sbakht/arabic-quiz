<template>
  <VueMultipleChoice :generateNextQuestion="null"></VueMultipleChoice>
</template>

<script>
import QuizCard from "./quiz.card.vue";
import { generateArToEn } from "../pronouns";
import VueMultipleChoice from "./vue-multiple-choice.vue";

export default {
  components: {
    QuizCard,
    VueMultipleChoice,
  },
  data() {
    return {
      heading: "Determine the answer",
      questions: this.generate(),
      question: this.buildQuestion({}),
      index: 0,
      history: [],
    };
  },
  computed: {
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
        this.question = this.buildQuestion({});
      }, timeout);
    },
    buildQuestion({ index }) {
      const nextQuestion = generateArToEn({ count: 1 });
      return nextQuestion[0];
    },
  },
};
</script>

</style>
