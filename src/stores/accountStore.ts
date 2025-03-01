import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '../types/account';

export const useAccountStore = defineStore('account', () => {
    const accounts = ref<Account[]>([]);

    function addAccount(account: Account) {
        accounts.value.push(account);
    }

    function updateAccount(updatedAccount: Account) {
        const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id);
        if (index !== -1) {
            accounts.value[index] = updatedAccount;
        }
    }

    function deleteAccount(id: string) {
        accounts.value = accounts.value.filter((account) => account.id !== id);
    }

    return {
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
    };
    },);