<template>
  <div class="p-6">
    <div class="flex justify-between">
      <p class="text-gray-600">{{ heading }}</p>
      <p class="text-gray-600">{{ index }}/{{ total }}</p>
    </div>
    <h3 class="text-3xl leading-6 font-medium text-gray-900 text-center mt-8">
      {{ question }}
    </h3>
    <div class="grid grid-cols-1 gap-4 mt-12">
      <div
        class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        v-for="(choice, i) in choices"
        :key="choice.id"
      >
        <div class="flex-shrink-0 text-gray-400">{{ getHotkey(i) }}.</div>
        <div class="flex-1 min-w-0">
          <button class="focus:outline-none" @click="onAnswer(choice)">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-xl font-medium text-gray-900">{{ choice.text }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["heading", "question", "choices", "index", "total", "answerId"],
  methods: {
    onAnswer(choice) {
      this.$emit("answer", choice);
      if (this.isRight(choice)) {
        this.$emit("right", choice);
      } else {
        this.$emit("wrong", choice);
      }
    },
    isRight(choice) {
      return choice.id === this.answerId;
    },
    getHotkey(i) {
      if (this.choices.length < 10) {
        return i + 1;
      } else {
        const alphabet = "abcdefghijklmnoprqstuvwxyz";
        return alphabet[i];
      }
    },
  },
};
</script>