import { useApi } from '~/composables/useApi';

import { Todo } from '~/types/todo';
import { User } from '~/types/user';

export const saveTodo = async (user: User, todo: Todo, successCallback?: () => void) => {
    try {
        return await useApi<User>(`users/${user.id}/todos${todo.id ? `/${todo.id}` : ''}`, {
            method: todo.id ? 'PUT' : 'POST',
            body: todo,
        }).then(() => {
            ElNotification({
                title: `Save ${todo.id ? `todo: ${todo.id}` : 'new todo'}`,
                message: h(
                    'i',
                    { style: 'color: teal' },
                    `Todo ${todo.id ? `${todo.id} updated` : 'created'} for user ${user.username}`
                ),
            });

            if (successCallback) {
                successCallback();
            }
        });
    } catch (error: any) {
        return undefined;
    }
};
