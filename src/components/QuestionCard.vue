<template>
  <div>
    <h2>{{ question }}</h2>
    <p>Jlk</p>
    <div v-for="(option, index) in options" :key="index">
      <input type="radio" :id="index" :value="option" v-model="selectedOption" />
      <label :for="index">{{ option }}</label>
    </div>
    <button @click="checkAnswer">Verificar Resposta</button>
    <button v-if="showNextButton" @click="nextQuestion">Próxima Pergunta</button>
    <div v-if="showScore">
      <h3>Pontuação Final: {{ score }}/{{ totalQuestions }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      question: '',
      options: [],
      selectedOption: '',
      showNextButton: false,
      showScore: false,
      score: 0,
      totalQuestions: 0
    }
  }
}
</script>
