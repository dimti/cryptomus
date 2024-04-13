import type { Config } from 'tailwindcss';

export default {
    content: [],
    plugins: [],
    theme: {
        fontFamily: {
            sans: ['var(--el-font-family)'],
            serif: ['var(--el-font-family)'],
            mono: ['var(--el-font-family)'],
            display: ['var(--el-font-family)'],
            body: ['var(--el-font-family)'],
        },
    },
} satisfies Config;
