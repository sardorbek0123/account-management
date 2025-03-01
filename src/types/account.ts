export interface Tag {
    text: string;
}

export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
    id: string;
    tags: Tag[];
    type: AccountType;
    login: string;
    password: string | null;
}

export interface AccountFormErrors {
    login?: string;
    password?: string;
}