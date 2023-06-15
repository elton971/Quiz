<template>
  <div>
    <div class="bg-white p-10 rounded-[1rem]">
      <h2 class="text-[1rem] text-[#2F527B] font-bold">{{ question }}</h2>
      <div v-for="(option, index) in options" :key="index" class="flex flex-col py-2 mt-5">
        <button
          :style="{
            backgroundColor: selectedOption.value === option ? '#F9A826' : 'white',
            color: selectedOption.value === option ? 'white' : '#6066D0',
            borderColor: selectedOption.value === option ? '#F9A826' : '#6066D0'
          }"
          @click="HandleAnswer(option)"
          class="border-[0.2rem] border-[#6066D0] rounded-[1rem] items-start p-4 text-left"
        >
          {{ option }}
        </button>
      </div>
      <button @click="checkAnswer">Verificar Resposta</button>
      <button v-if="showNextButton" @click="nextQuestion">Próxima Pergunta</button>
      <div v-if="showScore">
        <h3>Pontuação Final: {{ score }}/{{ totalQuestions }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { toRaw, reactive } from 'vue'
export default {
  setup() {
    const store = useStore()
    let currentQuestionIndex = 0
    const selectedOption = reactive({
      value: '',
      points: 0
    })

    function HandleAnswer(value) {
      selectedOption.value = value
      console.log(selectedOption.value)
    }

    const questions = toRaw(store.state.questions)[0]

    const question = questions[currentQuestionIndex]?.question
    const options = questions[currentQuestionIndex]?.options
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer

    console.log(questions)
    return {
      question,
      options,
      correctAnswer,
      HandleAnswer,
      selectedOption
    }
  }
}
</script>
