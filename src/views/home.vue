<template>
  <div class="bg-[url('background.png')] bg-contain h-screen">
    <div class="flex flex-col justify-center items-center pt-[4rem]">
      <QuestionCard v-if="hasQuestions" />
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'HomePage',
  components: { QuestionCard },
  computed: {
    hasQuestions() {
      return this.$store.state.questions.length !== 0
    }
  }
}
</script>
