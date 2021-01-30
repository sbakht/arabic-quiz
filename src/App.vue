<template>
  <div class="antialiased">
    <div class="p-16">
      <quiz-handler></quiz-handler>
    </div>
  </div>
</template>

<script>
import QuizHandler from "./components/quiz.handler.vue";

export default {
  name: "app",
  components: {
    QuizHandler,
  },
};
</script>

</style>
