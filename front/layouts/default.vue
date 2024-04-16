<template>
    <div class="common-layout min-w-96">
        <el-container>
            <el-aside :width="isCollapse ? '70px' : '200px'" class="duration-700">
                <el-menu class="el-menu-vertical-demo" :default-active="route.fullPath" :collapse="isCollapse" router>
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
                <el-footer>
                    <p>Footer</p>
                    <p><a href="javascript:void(0);" @click="signOut">Logout</a></p>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useMounted } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

const isMounted = useMounted();

const isCollapse = computed(() => isMounted.value && breakpoints.smallerOrEqual('md').value);

const route = useRoute();

const { signOut } = useAuth();

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
