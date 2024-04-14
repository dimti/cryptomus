import { Todo } from '~/types/todo';
import { DataWrapper } from '~/types/dataWrapper';

export interface User {
    id: number;
    created_at: string;
    username: string;
    todos: DataWrapper<Todo[]>;
}
