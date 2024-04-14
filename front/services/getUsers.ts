import { useApi } from '~/composables/useApi';

import { User } from '~/types/user';

export const getUsers = async () => {
    try {
        return await useApi<User[]>(`users`);
    } catch (error: any) {
        return undefined;
    }
};
