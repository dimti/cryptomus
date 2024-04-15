import { NitroFetchOptions } from 'nitropack';

import { ApiResponse } from '~/types/apiResponse';
import { Session } from '~/types/session';

export async function useApi<M>(uri: string, options?: NitroFetchOptions<string, 'get' | 'post' | 'put'>) {
    const config = useRuntimeConfig();

    const { data: sessionData, signOut } = useAuth();

    return (
        (await $fetch(`${config.public.API_URL}/api/${uri}`, {
            ...options,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${(sessionData as Ref<Session>).value?.access_token}`,
            },
        }).catch((err) => {
            // if (err.response.status === 401) {
            //     signOut();
            // }
        })) as ApiResponse<M>
    ).data;
}
