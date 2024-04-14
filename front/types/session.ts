import { AdapterUser } from 'next-auth/adapters';

export interface Session extends AdapterUser {
    access_token: string;
    expires: string;
    user: {
        id: number;
        name: string;
    };
}
