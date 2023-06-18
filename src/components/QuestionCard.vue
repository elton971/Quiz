<template>
  <div class="w-[30rem]">
    <p class="flex text-white text-[2.25rem] font-bold py-5">COUNTRY QUIZ</p>
    <div v-if="!selectedOption.showScore">
      <div class="absolute left-[50rem] top-[5rem]">
        <img src="undraw_adventure_4hum 1.svg" alt="" />
      </div>
      <div class="bg-white p-10 rounded-[1rem] pt-16">
        <h2 class="text-[1rem] text-[#2F527B] font-bold">{{ question }}</h2>
        <div v-for="(option, index) in options" :key="index" class="flex flex-col py-2 mt-5">
          <button
            :style="getOptionStyles(option)"
            @click="handleAnswer(option)"
            class="border-[0.2rem] border-[#6066D0] rounded-[1rem] items-start p-4 text-left flex justify-between"
          >
            {{ option }}

            <div v-if="selectedOption.showAnswer">
              <v-icon
                :name="
                  selectedOption.value === option && correctAnswer !== option
                    ? 'fa-regular-window-close'
                    : selectedOption.value === option && correctAnswer === option
                    ? 'fa-regular-check-circle'
                    : correctAnswer === option && 'fa-regular-check-circle'
                "
              />
            </div>
          </button>
        </div>
        <div class="flex justify-end">
          <button
            v-if="!selectedOption.showNextButton"
            @click="checkAnswer"
            class="rounded-[1rem] p-4 bg-[#60BF88] text-white"
          >
            Verificar Respostas
          </button>

          <button
            v-if="selectedOption.showNextButton"
            @click="nextQuestion"
            class="rounded-[1rem] p-4 bg-[#60BF88] text-white"
          >
            Próxima Pergunta
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedOption.showScore" class="bg-white p-10 rounded-[1rem] pt-16">
      <div class="flex flex-col justify-center items-center gap-[2rem]">
        <div><img src="undraw_winners_ao2o 2.svg" alt="" class="w-[15rem]" /></div>
        <div class="text-center gap-[2rem]">
          <h1 class="font-bold text-[#1D355D]">Resultados</h1>
          <p class="text-[#1D355D]">
            Você tem
            <span class="text-[2rem] text-[#6FCF97] font-bold">{{ selectedOption.points }}</span>
            respostas corretas
          </p>
        </div>
        <div>
          <button
            @click="newPlay(fetchCountries)"
            class="rounded-[1rem] p-4 border-[#1D355D] border-2 text-[#1D355D]"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { toRaw, reactive, ref, computed } from 'vue'
import { OhVueIcon } from 'oh-vue-icons'
export default {
  name: 'QuestionCard',
  props: {
    fetchCountries: {
      type: Function
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'v-icon': OhVueIcon
  },
  methods: {
    getOptionStyles(option) {
      const selectedOption = this.selectedOption.value
      const correctAnswer = this.correctAnswer

      if (!this.selectedOption.result) {
        if (selectedOption === option) {
          return {
            backgroundColor: '#F9A826',
            color: 'white',
            borderColor: '#F9A826'
          }
        } else {
          return {
            backgroundColor: 'white',
            color: '#6066D0',
            borderColor: '#6066D0'
          }
        }
      } else {
        if (selectedOption === option && selectedOption === correctAnswer) {
          return {
            backgroundColor: '#60BF88',
            color: 'white',
            borderColor: '#60BF88'
          }
        } else if (selectedOption === option && selectedOption !== correctAnswer) {
          return {
            backgroundColor: '#EA8282',
            color: 'white',
            borderColor: '#EA8282'
          }
        } else if (option === correctAnswer) {
          return {
            backgroundColor: '#60BF88',
            color: 'white',
            borderColor: '#60BF88'
          }
        } else {
          return {
            backgroundColor: 'white',
            color: '#6066D0',
            borderColor: '#6066D0'
          }
        }
      }
    }
  },
  setup() {
    const store = useStore()
    let currentQuestionIndex = ref(0)
    let questions = toRaw(store.state.questions)[0]
    let question = computed(() => questions[currentQuestionIndex.value]?.question)
    let options = computed(() => questions[currentQuestionIndex.value]?.options)
    let correctAnswer = computed(() => questions[currentQuestionIndex.value]?.correctAnswer)
    const selectedOption = reactive({
      value: '',
      points: 0,
      showNextButton: false,
      result: false,
      showAnswer: false,
      showScore: false
    })

    function nextQuestion() {
      currentQuestionIndex.value++
      if (currentQuestionIndex.value < questions.length) {
        selectedOption.value = ''
        selectedOption.showNextButton = false
        selectedOption.result = false
        selectedOption.showAnswer = false
      } else {
        selectedOption.showScore = true
      }
    }

    function handleAnswer(value) {
      selectedOption.value = value
    }

    function checkAnswer() {
      if (selectedOption.value === correctAnswer.value) {
        selectedOption.points++
      }
      selectedOption.showAnswer = true
      selectedOption.showNextButton = true
      selectedOption.result = true
    }

    function newPlay(fetchCountries) {
      fetchCountries()
      this.selectedOption.value = ''
      this.selectedOption.points = 0
      this.selectedOption.showNextButton = false
      this.selectedOption.result = false
      this.selectedOption.showAnswer = false
      this.selectedOption.showScore = false

      currentQuestionIndex = ref(0)
      questions = toRaw(store.state.questions)[0]
      question = computed(() => questions[currentQuestionIndex.value]?.question)
      options = computed(() => questions[currentQuestionIndex.value]?.options)
      correctAnswer = computed(() => questions[currentQuestionIndex.value]?.correctAnswer)
    }

    return {
      question,
      options,
      correctAnswer,
      handleAnswer,
      selectedOption,
      checkAnswer,
      nextQuestion,
      newPlay
    }
  }
}
</script>
