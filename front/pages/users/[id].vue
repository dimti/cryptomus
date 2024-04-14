<template>
    <div class="page-user">
        <p>ID: {{ $route.params.id }}</p>
        <UserForm v-model="user" />
        <el-divider />
        <template v-if="user && todos">
            <el-button
                type="primary"
                :icon="ElIconPlus"
                @click="$activeModalsBus.$emit('TodoModal', { $user: user })"
            />
            Todos: {{ todos.length }}
            <TodoModal />
            <el-table
                :data="todos"
                style="width: 100%"
                @row-click="$activeModalsBus.$emit('TodoModal', { $user: user, $todo: $event })"
            >
                <el-table-column prop="id" label="ID" width="40" />
                <el-table-column prop="created_at" label="Created" width="220" />
                <el-table-column prop="title" label="Username" width="180" />
                <el-table-column prop="complete" label="Complete" width="180" />
            </el-table>
        </template>
    </div>
</template>

<script setup lang="ts">
import { RouteLocationNormalizedLoaded } from 'vue-router';

import UserForm from '~/components/forms/UserForm.vue';
import TodoModal from '~/components/modals/TodoModal.vue';

import { getTodos } from '~/services/getTodos';
import { getUser } from '~/services/getUser';
import { Todo } from '~/types/todo';
import { User } from '~/types/user';

const user = ref<User>();
const todos = ref<Todo[]>();

const route: RouteLocationNormalizedLoaded = useRoute();

const { $activeModalsBus } = useNuxtApp();

onMounted(async () => {
    user.value = await getUser(route.params.id);
    todos.value = await getTodos(route.params.id);
});
$activeModalsBus.$on('TodoModalSaved', async () => {
    todos.value = await getTodos(route.params.id);
});
</script>
