<template>
  <div class="bg-[url('background.png')] bg-contain h-screen">
    <p>COUNTRY QUIZ </p>
    <div class="flex flex-col ">
      <QuestionCard/>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";

export default {
  name:"Home",
  components: {QuestionCard}
}
</script>

<style lang="scss" scoped>

</style>