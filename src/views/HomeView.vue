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
           v-for="account in accountStore.accounts"
           v-if="accountStore.accounts.length > 0">
          <div class="flex flex-col">
            <InputText
                :value="tagsToString(account.tags)"
                placeholder="Введите метки через ;"
                class="w-full"
            />
          </div>

          <div class="flex flex-col">
            <Dropdown
                v-model="account.type"
                :options="accountTypes"
                optionLabel="label"
                optionValue="value"
                class="w-full"
            />
          </div>

          <div class="flex flex-col">
            <InputText
                v-model="account.login"
                placeholder="Введите логин"
                :class="{ 'p-invalid': errors[account.id]?.login }"
                class="w-full"
            />
            <small v-if="errors[account.id]?.login" class="text-red-500 text-xs mt-1">{{ errors[account.id]?.login }}</small>
          </div>

          <div class="flex flex-col">
            <InputText
                v-if="account.type === 'Локальная'"
                v-model="account.password"
                type="password"
                placeholder="Введите пароль"
                :class="{ 'p-invalid': errors[account.id]?.password }"
                class="w-full"
            />
            <small v-if="errors[account.id]?.password" class="text-red-500 text-xs mt-1">{{ errors[account.id]?.password }}</small>
          </div>

          <div class="flex justify-center items-center">
            <button  @click="deleteAccount(account.id)">
              <Trash class="w-4 h-4 text-red-500" />
            </button>
          </div>
      </div>
      <div v-else class="text-center p-8 bg-gray-50 rounded-lg">
        <p>Нет учетных записей. Нажмите "+" чтобы добавить новую запись.</p>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import {ref} from "vue";

import Plus from "@/components/Icons/Plus.vue";
import Question from "@/components/Icons/Question.vue";
import Trash from "@/components/Icons/Trash.vue";
import type {Account, Tag, AccountType, AccountFormErrors} from "@/types/account.ts";
import InputText from "@/components/Input/Text.vue";
import Dropdown from "@/components/Dropdown.vue";

import {useAccountStore} from "@/stores/accountStore.ts";

const accountStore = useAccountStore();

const accountTypes = ref<{ label: string; value: AccountType }[]>([
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'Локальная' }
]);

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

const tagsToString = (tags: Tag[]): string => {
  return tags.map(tag => tag.text).join('; ');
};

const errors = ref<Record<string, AccountFormErrors>>({});


const addNewAccount = () => {
  const newAccount = createEmptyAccount();
  accountStore.addAccount(newAccount);
};

const deleteAccount = (id: string) => {
  accountStore.deleteAccount(id);
};
</script>
