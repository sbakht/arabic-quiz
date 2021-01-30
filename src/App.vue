<template>
  <div class="antialiased">
    <div class="p-16">
      <quiz-card
        :heading="heading"
        :question="quesiton"
        :choices="choices"
        :index="3"
        :total="10"
      ></quiz-card>
    </div>
  </div>
</template>

<script>
import QuizCard from "./components/quiz.card.vue";

export default {
  name: "app",
  components: {
    QuizCard,
  },
  data() {
    return {
      heading: "Determine the answer",
      question: "What is your favorite color?",
      choices: ["Green", "Orange", "Yellow", "Blue"],
    };
  },
};
</script>

</style>
