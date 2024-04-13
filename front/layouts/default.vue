<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu class="el-menu-vertical-demo" :default-active="route.fullPath" router>
                    <el-menu-item v-for="link in links" :key="link.label" :index="link.to">
                        <el-icon>
                            <component :is="link.icon" />
                        </el-icon>
                        <span>{{ link.label }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <slot />
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();

const links = computed(() => {
    const linksMayBeRefreshed = [];

    linksMayBeRefreshed.push({
        label: 'Home',
        icon: ElIconMenu,
        to: '/',
    });

    linksMayBeRefreshed.push({
        label: 'Users',
        icon: ElIconUser,
        to: '/users',
    });

    return linksMayBeRefreshed;
});
</script>
