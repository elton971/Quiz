<template>
  <div>
    <p class="flex text-white text-[2.25rem] font-bold py-5">COUNTRY QUIZ</p>
    <div class="absolute left-[50rem] top-[5rem]">
      <img src="undraw_adventure_4hum 1.svg" alt="" />
    </div>
    <div class="bg-white p-10 rounded-[1rem] pt-16">
      <h2 class="text-[1rem] text-[#2F527B] font-bold">{{ question }}</h2>
      <div v-for="(option, index) in options" :key="index" class="flex flex-col py-2 mt-5">
        <button
          :style="{
            backgroundColor: !selectedOption.result
              ? selectedOption.value === option
                ? '#F9A826'
                : 'white'
              : selectedOption.value === option && selectedOption.value === correctAnswer
              ? '#60BF88'
              : selectedOption.value === option && selectedOption.value !== correctAnswer
              ? '#EB5757'
              : option === correctAnswer
              ? '#60BF88'
              : 'white',
            color: !selectedOption.result
              ? selectedOption.value === option
                ? 'white'
                : '#6066D0'
              : '#6066D0',
            borderColor: selectedOption.value === option ? '#F9A826' : '#6066D0'
          }"
          @click="handleAnswer(option)"
          class="border-[0.2rem] border-[#6066D0] rounded-[1rem] items-start p-4 text-left"
        >
          {{ option }}
        </button>
      </div>
      <div class="flex justify-end">
        <button
          v-if="!selectedOption.showNextButton"
          @click="checkAnswer"
          class="rounded-[1rem] p-4 bg-[#60BF88] text-white"
        >
          Verificar Resposta
        </button>
        <button
          v-if="selectedOption.showNextButton"
          @click="nextQuestion"
          class="rounded-[1rem] p-4 bg-[#60BF88] text-white"
        >
          Próxima Pergunta
        </button>
      </div>

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
    const questions = toRaw(store.state.questions)[0]
    const question = questions[currentQuestionIndex]?.question
    const options = questions[currentQuestionIndex]?.options
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer
    const selectedOption = reactive({
      value: '',
      points: 0,
      showNextButton: false,
      result: false
    })

    function handleAnswer(value) {
      selectedOption.value = value
    }
    function checkAnswer() {
      if (selectedOption.value === correctAnswer) {
        selectedOption.points++
        console.log('acertou')
      }
      selectedOption.showNextButton = true
      selectedOption.result = true
    }

    console.log(questions)
    return {
      question,
      options,
      correctAnswer,
      handleAnswer,
      selectedOption,
      checkAnswer
    }
  }
}
</script>
