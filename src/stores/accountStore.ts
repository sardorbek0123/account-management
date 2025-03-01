import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '../types/account';

export const useAccountStore = defineStore('account', () => {
    const accounts = ref<Account[]>([]);

    function addAccount(account: Account) {
        accounts.value.push(account);
    }

    return {
        accounts,
        addAccount,
    };
    },);