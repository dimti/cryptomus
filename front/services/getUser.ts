import { useApi } from '~/composables/useApi';

import { User } from '~/types/user';

export const getUser = async (id: number | string | string[]) => {
    try {
        return await useApi<User>(`users/${id}`);
    } catch (error: any) {
        return undefined;
    }
};
