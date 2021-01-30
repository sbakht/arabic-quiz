<template>
  <quiz-card
    :heading="heading"
    :question="question"
    :choices="choices"
    :answerId="answer"
    :index="index"
    :total="total"
    @answer="onAnswer"
    @wrong="onWrong"
    @right="onRight"
  ></quiz-card>
</template>

<script>
import QuizCard from "./quiz.card.vue";

export default {
  components: {
    QuizCard,
  },
  data() {
    return {
      heading: "Determine the answer",
      question: "What is your favorite color?",
      choices: [
        { id: 1, text: "Green" },
        { id: 2, text: "Yellow" },
        { id: 3, text: "Orange" },
        { id: 4, text: "Blue" },
      ],
      answer: 1,
      index: 1,
      total: 10,
      history: [],
    };
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
        if (this.index < this.total) {
          this.index++;
          this.answer = (this.answer % 4) + 1;
        }
      }, 500);
    },
  },
};
</script>

</style>
