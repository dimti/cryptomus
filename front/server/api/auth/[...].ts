import CredentialsProvider from 'next-auth/providers/credentials';

import { NuxtAuthHandler } from '#auth';

const validUsers = [
    {id: '1', name: 'admin', roles: ['admin']},
    {id: '2', name: 'user'},
];

export function findUserById(id: string | undefined) {
    return validUsers.find((user) => user.id === id)
}

const config = useRuntimeConfig();

export default defineEventHandler(
    NuxtAuthHandler({
        secret: config.AUTH_SECRET,
        providers: [
            CredentialsProvider.default({
                credentials: {
                    username: {
                        placeholder: 'Enter username',
                    },
                    password: {
                        placeholder: 'Enter password',
                    },
                },
                authorize: async (credentials: Record<string, void>) =>
                    $fetch('/api/login', {
                        baseURL: config.public.API_URL,
                        method: 'POST',
                        body: JSON.stringify(credentials),
                    }).catch((err) => {
                        throw createError({
                            statusCode: 403,
                            statusMessage: err.data.message,
                        });
                    }),
            }),
        ],
    })
);
