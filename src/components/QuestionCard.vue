<template>
  <div class="flex justify-center items-center">
    <div class="bg-white w-[30rem]  rounded-[0.5rem]">
      <div>
        <p class="text-[#2F527B] text-[1.5rem]">Kuala Lumpur is the capital of</p>
      </div>
      <div class="m-10">
        <button
          class="flex gap-10 font-bold text-[#6066D0] "
          v-for="question in questions"
          :key="question.letra"
        >
          <p>{{question.letra}}</p>
          <p>{{question.question}}</p>
        </button>
      </div>
    </div>
  </div>

</template>

<script>


export default {
  name:"QuestionCard",
  data(){
    return{
      questions:[
      {
        letra:"A",
        question:"Elton"
      },
      {
        letra:"B",
        question:"Elton"
      },
      {
        letra:"C",
        question:"Elton"
      },
      {
        letra:"D",
        question:"Elton"
      }
    ]
    }
  }
}
</script>