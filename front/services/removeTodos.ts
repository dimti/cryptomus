import { useApi } from '~/composables/useApi';

import { User } from '~/types/user';

export const removeTodos = async (user: User, id: number[]) => {
    try {
        return await useApi<User>(`users/${user.id}/todos/delete`, {
            method: 'POST',
            body: { id },
        }).then(() => {
            useNuxtApp().$activeModalsBus.$emit('TodosRemoved');

            ElNotification({
                title: `Remove todos for user: ${user.id}`,
                message: h('i', { style: 'color: teal' }, `Selected todos has been deleted`),
            });
        });
    } catch (error: any) {
        return undefined;
    }
};
