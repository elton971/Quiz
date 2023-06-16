<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from '@/views/home.vue'
export default {
  components: { Home },
  created() {
    this.fetchCountries()
  },
  methods: {
    async fetchCountries() {
      await fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          const countriesWithCapital = data.filter(
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
    },
    nextQuestion() {
      this.currentQuestionIndex++
      this.showNextButton = false
      this.selectedOption = ''
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
