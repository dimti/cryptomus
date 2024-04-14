import { DataWrapper } from '~/types/dataWrapper';
import { User } from '~/types/user';

export interface Todo {
    id: number;
    created_at: string;
    title: string;
    completed: boolean;
    user_id: number;
    user: DataWrapper<User>;
}
