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
      <div class="grid grid-cols-[1fr_1fr_1fr_1fr_100px] items-center gap-4 p-4 border-t border-gray-200"
           v-for="account in accountStore.accounts"
           v-if="accountStore.accounts.length > 0">
          <div class="flex flex-col">
            <InputText
                v-model="account.tagsString"
                @blur="handleTagsChange(account, $event)"
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
                @change="handleTypeChange(account, account.type)"
                class="w-full"
            />
          </div>

          <div class="flex flex-col">
            <InputText
                v-model="account.login"
                @blur="handleLoginChange(account, $event)"
                placeholder="Введите логин"
                :class="{ 'p-invalid': errors[account.id]?.login }"
                class="w-full"
                :error="errors[account.id]?.login"
            />
          </div>

          <div class="flex flex-col">
            <InputText
                v-if="account.type === 'Локальная'"
                v-model="account.password"
                type="password"
                @blur="handlePasswordChange(account, $event)"
                placeholder="Введите пароль"
                :class="{ 'p-invalid': errors[account.id]?.password }"
                class="w-full"
                :error="errors[account.id]?.password"
            />
          </div>

          <div class="flex justify-center items-center">
            <button  @click="deleteAccount(account.id)">
              <Trash class="w-6 h-6 text-red-500" />
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

const processTags = (tagsString: string): Tag[] => {
  if (!tagsString) return [];

  return tagsString.split(';')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
      .map(tag => ({ text: tag }));
};

const validateAccount = (account: Account): boolean => {
  const accountErrors: AccountFormErrors = {};
  let isValid = true;

  if (!account.login.trim()) {
    accountErrors.login = 'Логин обязателен';
    isValid = false;
  } else if (account.login.length > 100) {
    accountErrors.login = 'Максимум 100 символов';
    isValid = false;
  }

  if (account.type === 'Локальная') {
    if (!account.password) {
      accountErrors.password = 'Пароль обязателен';
      isValid = false;
    } else if (account.password.length > 100) {
      accountErrors.password = 'Максимум 100 символов';
      isValid = false;
    }
  }

  errors.value[account.id] = accountErrors;
  return isValid;
};


const handleTagsChange = (account: Account, event: Event) => {
  const input = event.target as HTMLInputElement;
  const tagsString = input.value;

  if (tagsString.length > 50) {
    input.value = tagsString.substring(0, 50);
    return;
  }

  const updatedAccount = { ...account, tags: processTags(tagsString) };
  accountStore.updateAccount(updatedAccount);
  validateAccount(updatedAccount);
};

const handleTypeChange = (account: Account, type: AccountType) => {
  const updatedAccount = {
    ...account,
    type,
    password: type === 'LDAP' ? null : (account.password || '')
  };

  accountStore.updateAccount(updatedAccount);
  validateAccount(updatedAccount);
};

const handleLoginChange = (account: Account, event: Event) => {
  const input = event.target as HTMLInputElement;
  const login = input.value;

  if (login.length > 100) {
    input.value = login.substring(0, 100);
    return;
  }

  const updatedAccount = { ...account, login };
  accountStore.updateAccount(updatedAccount);
  validateAccount(updatedAccount);
};

const handlePasswordChange = (account: Account, event: Event) => {
  const input = event.target as HTMLInputElement;
  const password = input.value;

  if (password.length > 100) {
    input.value = password.substring(0, 100);
    return;
  }

  const updatedAccount = { ...account, password };
  accountStore.updateAccount(updatedAccount);
  validateAccount(updatedAccount);
};
</script>
