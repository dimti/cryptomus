import { Handler } from 'mitt';
import { Events } from '~/types/events';

declare module '#app' {
    interface NuxtApp {
        $activeModalsBus: {
            $on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
            $emit<Key extends keyof Events>(type: Key, event?: Events[Key]): void;
        };
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $hello(msg: string): string;
    }
}

export {};
