<template>
  <div>
    <p>Navigate</p>
    <VueMultipleChoice
      :questions="questions"
      :heading="heading"
      mode="Navigate"
    ></VueMultipleChoice>
    <p>Single Try</p>
    <VueMultipleChoice
      :generateNextQuestion="buildQuestion"
      :heading="heading"
      mode="SingleTry"
    ></VueMultipleChoice>
    <p>Force Right</p>
    <VueMultipleChoice
      :generateNextQuestion="buildQuestion"
      :heading="heading"
      mode="ForceRight"
    ></VueMultipleChoice>
  </div>
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
  computed: {},
  methods: {
    generate() {
      return generateArToEn({ count: 10 });
    },
    buildQuestion({ index }) {
      const nextQuestion = generateArToEn({ count: 1 });
      return nextQuestion[0];
    },
  },
};
</script>

</style>
