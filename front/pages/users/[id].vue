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
            <el-button
                v-show="selectedTodos.length"
                type="primary"
                :icon="ElIconDelete"
                class="float-right"
                @click="removeSelectedTodos"
            />
            <TodoModal />
            <el-table
                :data="todos"
                style="width: 100%"
                @row-click="$activeModalsBus.$emit('TodoModal', { $user: user, $todo: $event })"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
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
import { removeTodos } from '~/services/removeTodos';
import { Todo } from '~/types/todo';
import { User } from '~/types/user';

const user = ref<User>();
const todos = ref<Todo[]>();

const route: RouteLocationNormalizedLoaded = useRoute();

const { $activeModalsBus } = useNuxtApp();

const selectedTodos = ref<Todo[]>([]);

const handleSelectionChange = (val: Todo[]) => {
    selectedTodos.value = val;
};

function removeSelectedTodos() {
    ElMessageBox.confirm('Delete selected todos. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
    })
        .then(() => {
            removeTodos(
                user.value!,
                selectedTodos.value.map((todo) => todo.id)
            );
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            });
        });
}

onMounted(async () => {
    user.value = await getUser(route.params.id);
    todos.value = await getTodos(route.params.id);
});

async function reloadTodos() {
    todos.value = await getTodos(route.params.id);
}

$activeModalsBus.$on('TodoModalSaved', () => reloadTodos());
$activeModalsBus.$on('TodosRemoved', () => reloadTodos());
</script>
