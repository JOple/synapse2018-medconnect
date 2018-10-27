export interface Account {
    username: string;
    password: string;
    resources: Set<string>;
}

export interface Accounts {
    [username: string]: Account
}

export const personalAccounts: Accounts = {}
export const medicalAccounts: Accounts = {}