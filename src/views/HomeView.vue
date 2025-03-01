<template>
  <main class="max-w-7xl mx-auto p-8">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Управление учетными записями</h1>
      <button class="p-2 border border-gray-400 rounded-md ">
        <Plus class="w-4 h-4" />
      </button>
    </div>
    <div class="mb-4 bg-blue-50 rounded-md flex items-center">
      <Question class="w-6 h-6 ml-2"/>
      <p class="p-2">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </p>
    </div>
  </main>
</template>
<script setup lang="ts">
import Plus from "@/components/Icons/Plus.vue";
import Question from "@/components/Icons/Question.vue";
</script>
