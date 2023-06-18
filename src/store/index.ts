import { createStore } from 'vuex'
export const store = createStore({
  state() {
    return {
      questions: []
    }
  },
  mutations: {
    setQuestions(state: any, questions: any) {
      state.questions.push(questions)
    }
  }
})
