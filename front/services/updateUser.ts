import { useApi } from '~/composables/useApi';

import { User } from '~/types/user';

export const updateUser = async (user: User) => {
    try {
        return await useApi<User>(`users/${user.id}`, {
            method: 'PUT',
            body: user,
        }).then(() => {
            ElNotification({
                title: `Save user: ${user.id}`,
                message: h('i', { style: 'color: teal' }, `User ${user.username} has been saved successfully`),
            });
        });
    } catch (error: any) {
        return undefined;
    }
};
