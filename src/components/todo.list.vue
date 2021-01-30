<template>
  <ul>
    <li v-for="todo in todos" :key="todo">{{ todo }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        "Red error state with shake",
        "correct answer green state",
        "score page",
        "use arabic script",
        "english to arabic quiz",
        "hotkeys",
        "convert to component",
        "option to only give right answer",
        "option to go to next question if wrong answer",
        "review wrong answers",
      ],
    };
  },
};
</script>