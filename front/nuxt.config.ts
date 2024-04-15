// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    app: {
        // head
        head: {
            title: 'Cryptomus: TODO app with Laravel, Nuxt And EP',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'ElementPlus + Nuxt3',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    // css
    css: ['~/assets/scss/index.scss'],

    typescript: {
        strict: true,
        shim: false,
    },

    // build modules
    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
    ],

    // vueuse
    vueuse: {
        ssrHandlers: true,
    },

    // colorMode
    colorMode: {
        classSuffix: '',
    },

    unocss: {
        uno: true,
        attributify: true,
        icons: {
            scale: 1.2,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @use "@/assets/scss/element/index.scss" as element;
                    @use "@/assets/scss/blocks/el-table.scss" as table;
                    `,
                },
            },
        },
    },
    elementPlus: {
        icon: 'ElIcon',
        importStyle: 'scss',
        themes: ['dark'],
    },
    auth: {
        provider: {
            type: 'authjs',
        },
        globalAppMiddleware: {
            isEnabled: true,
        },
    },
    runtimeConfig: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        public: {
            API_URL: process.env.API_URL,
        },
    },
    devServer: {
        host: process.env.DEV_SERVER_HOST,
        port: +(process.env.DEV_SERVER_PORT ?? 30412),
    },
});
