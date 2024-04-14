import { useApi } from '~/composables/useApi';

import { Todo } from '~/types/todo';

export const getTodos = async (userId: number | string | string[]) => {
    try {
        return await useApi<Todo[]>(`users/${userId}/todos`);
    } catch (error: any) {
        return undefined;
    }
};
