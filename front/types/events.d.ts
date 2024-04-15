import { User } from '~/types/user';
import { Todo } from '~/types/todo';

export type Events = {
    TodoModal: {
        $user: User;
        $todo?: Todo;
    };
    TodoModalSaved: undefined;
    TodosRemoved: undefined;
    CryptomusModal: undefined;
};
