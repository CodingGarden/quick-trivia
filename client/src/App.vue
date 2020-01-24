<template>
  <div id="app">
    <div v-if="currentQuestion" class="current-question">
      <img :src="currentQuestion.questionImage" />
      <p>{{currentQuestion.question}}</p>
      <div>
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="guess(option)"
        >
          {{option}}
        </button>
      </div>
    </div>
    <button @click="nextQuestion()">Next Question</button>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    currentQuestion: null,
  }),
  apollo: {
    questions: gql`query {
      questions {
        options
        question
        questionImage
        answer
        answerDescription
      }
    }`,
  },
  methods: {
    nextQuestion() {
      this.currentQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
    },
    guess(option) {
      if (this.currentQuestion.answer === option) {
        alert('Correct!');
        this.nextQuestion();
      } else {
        alert(`Wrong! Correct answer was ${this.currentQuestion.answer}`);
        this.nextQuestion();
      }
    },
  },
};
</script>

<style lang="scss">
.current-question {
  width: 90%;
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
}

.current-question img {
  width: 100%;
}

button {
  display: block;
  width: 100%;
  font-size: 2rem;
  text-align: center;
}
</style>
