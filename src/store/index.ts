import { createStore } from 'vuex'
export const store = createStore({
  state() {
    return {
      country: [],
      questions: []
    }
  },
  mutations: {
    setCountry(state: any, country: any) {
      state.country = country
    },
    setQuestions(state: any, questions: any) {
      state.question = questions
      console.log(state.questions)
    }
  }
})
