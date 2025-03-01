<template>
  <main class="max-w-7xl mx-auto p-8">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Управление учетными записями</h1>
      <button @click="addNewAccount" class="p-2 border border-gray-400 rounded-md">
        <Plus class="w-4 h-4" />
      </button>
    </div>
    <div class="mb-4 bg-blue-50 rounded-md flex items-center">
      <Question class="w-6 h-6 ml-2"/>
      <p class="p-2">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </p>
    </div>
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <div class="grid grid-cols-[1fr_1fr_1fr_1fr_100px] gap-4 bg-gray-50 p-3 font-bold">
        <div>Метка</div>
        <div>Тип записи</div>
        <div>Логин</div>
        <div>Пароль</div>
        <div class="text-center">Действия</div>
      </div>
      <div class="grid grid-cols-[1fr_1fr_1fr_1fr_100px] gap-4 p-4 border-t border-gray-200"
        v-for="account in accountStore.accounts">
        <div>{{ account }}</div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import Plus from "@/components/Icons/Plus.vue";
import Question from "@/components/Icons/Question.vue";
import type {Account} from "@/types/account.ts";

import {useAccountStore} from "@/stores/accountStore.ts";

const accountStore = useAccountStore();

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const createEmptyAccount = (): Account => {
  return {
    id: generateId(),
    tags: [],
    type: 'Локальная',
    login: '',
    password: ''
  };
};

const addNewAccount = () => {
  const newAccount = createEmptyAccount();
  accountStore.addAccount(newAccount);
};
</script>
