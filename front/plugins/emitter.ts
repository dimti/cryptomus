import mitt from 'mitt';

import { Events } from '~/types/events';

export default defineNuxtPlugin(() => {
    const emitter = mitt<Events>();

    return {
        provide: {
            activeModalsBus: {
                $on: emitter.on,
                $emit: emitter.emit,
            },
        },
    };
});
