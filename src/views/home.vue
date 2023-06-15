<template>
  <div class="bg-[url('background.png')] bg-contain h-screen">
    <div class="flex flex-col justify-center items-center pt-[4rem]">
      <p class="flex text-white">COUNTRY QUIZ</p>
      <QuestionCard />
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { QuestionCard },
  mounted() {
    this.fetchCountries()
  },
  methods: {
    fetchCountries() {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          const countriesWithCapital = data.filter(
            (country) => country.capital !== '' && country.capital !== undefined
          )
          const questions = this.generateQuestions(countriesWithCapital.slice(0, 9))
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
            ...this.getRandomCapitals(3, countries)
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
    getRandomCapitals(numberOfCapitals, countries) {
      const uniqueCapitals = new Set() // Usando um Set para garantir que as capitais sejam únicas
      const capitals = []
      // Obtendo as capitais aleatórias
      while (uniqueCapitals.size < numberOfCapitals) {
        const randomIndex = Math.floor(Math.random() * countries.length)
        const randomCapital = countries[randomIndex].capital[0]
        uniqueCapitals.add(randomCapital)
      }

      // Convertendo o Set em um array
      uniqueCapitals.forEach((capital) => {
        capitals.push(capital)
      })

      return capitals
    },
    checkAnswer() {
      if (this.selectedOption === this.getCorrectAnswer()) {
        this.score++
      }
      this.showNextButton = true
    },
    getCorrectAnswer() {
      const currentQuestion = this.questions[this.currentQuestionIndex]
      return currentQuestion.correctAnswer
    }
  }
}
</script>
