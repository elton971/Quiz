<template>
  <div class="bg-[url('background.png')] bg-contain h-screen">
    <div class="flex flex-col justify-center items-center pt-[4rem]">
      <QuestionCard v-if="hasQuestions && start" :fetchCountries="fetchCountries" />
      <div v-if="!start" class="flex flex-col justify-center items-center">
        <p class="text-white text-[2.25rem] font-bold py-5">COUNTRY QUIZ</p>
        <button @click="initialPlay" class="bg-blue-500 text-white p-5 rounded-md">
          Iniciar Jogo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'HomePage',
  components: { QuestionCard },

  data() {
    return {
      start: false
    }
  },
  computed: {
    hasQuestions() {
      return this.$store.state.questions.length !== 0
    }
  },
  created() {
    this.fetchCountries()
  },
  methods: {
    initialPlay() {
      this.start = true
    },
    async fetchCountries() {
      await fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          const countriesWithCapital = this.shuffleOptions(data).filter(
            (country) => country.capital !== '' && country.capital !== undefined
          )
          const shuffleArray = this.shuffleOptions(countriesWithCapital)
          const questions = this.generateQuestions(shuffleArray.slice(0, 9))
          this.$store.commit('setQuestions', questions)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    generateQuestions(countries) {
      return countries.map((country) => {
        if (country.capital && country.capital.length > 0) {
          const question = {
            question: `Qual é a capital de ${country.name.official}?`,
            options: [],
            correctAnswer: ''
          }
          question.options = this.shuffleOptions([
            country.capital[0],
            ...this.getRandomCapitals(3, countries, country.capital[0])
          ])
          question.correctAnswer = country.capital[0]
          return question
        }
      })
    },
    generateAnswersArray() {
      return this.questions.map((question) => question.correctAnswer)
    },
    shuffleOptions(options) {
      return options.sort(() => Math.random() - 0.5)
    },
    getRandomCapitals(numberOfCapitals, countries, correctAnswer) {
      const uniqueCapitals = new Set()
      const capitals = []

      while (uniqueCapitals.size < numberOfCapitals) {
        let randomIndex = Math.floor(Math.random() * countries.length)
        let randomCapital = countries[randomIndex].capital[0]

        if (randomCapital === correctAnswer) {
          randomIndex = Math.floor(Math.random() * countries.length)
          randomCapital = countries[randomIndex].capital[0]
        }

        uniqueCapitals.add(randomCapital)
      }

      capitals.push(...uniqueCapitals)
      return capitals
    }
  }
}
</script>
