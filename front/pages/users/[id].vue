<template>
    <div class="page-user">
        <p>ID: {{ $route.params.id }}</p>
        <el-form v-if="form" :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="Username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateUser(form)">Save</el-button>
                <el-button @click="navigateTo('/users')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { getUser } from '~/services/getUser';
import { updateUser } from '~/services/updateUser';
import { User } from '~/types/user';

const form = ref<User>();

const route: RouteLocationNormalizedLoaded = useRoute();

onMounted(async () => {
    form.value = await getUser(route.params.id);
});
</script>
