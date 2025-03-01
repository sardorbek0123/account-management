import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Account } from "../types/account";

const STORAGE_KEY = "accounts";

export const useAccountStore = defineStore("account", () => {
    const storedAccounts = localStorage.getItem(STORAGE_KEY);
    const accounts = ref<Account[]>(storedAccounts ? JSON.parse(storedAccounts) : []);

    function saveToLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value));
    }

    function addAccount(account: Account) {
        accounts.value.push(account);
        saveToLocalStorage();
    }

    function updateAccount(updatedAccount: Account) {
        const index = accounts.value.findIndex((acc) => acc.id === updatedAccount.id);
        if (index !== -1) {
            accounts.value[index] = updatedAccount;
            saveToLocalStorage();
        }
    }

    function deleteAccount(id: string) {
        accounts.value = accounts.value.filter((account) => account.id !== id);
        saveToLocalStorage();
    }

    // Автоматическое сохранение при изменении массива accounts
    watch(accounts, saveToLocalStorage, { deep: true });

    return {
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
    };
});
