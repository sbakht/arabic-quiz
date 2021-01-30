<template>
  <div class="antialiased">
    <div class="p-16">
      <quiz-handler></quiz-handler>
    </div>
    <todo-list class="p-16 pt-0"></todo-list>
  </div>
</template>

<script>
import QuizHandler from "./components/quiz.handler.vue";
import TodoList from "./components/todo.list.vue";

export default {
  name: "app",
  components: {
    QuizHandler,
    TodoList,
  },
};
</script>
