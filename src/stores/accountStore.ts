import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '../types/account';

export const useAccountStore = defineStore('account', () => {
    const accounts = ref<Account[]>([]);

    function addAccount(account: Account) {
        accounts.value.push(account);
    }

    function deleteAccount(id: string) {
        accounts.value = accounts.value.filter((account) => account.id !== id);
    }

    return {
        accounts,
        addAccount,
        deleteAccount,
    };
    },);