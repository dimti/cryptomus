<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

import TodoForm from '~/components/forms/TodoForm.vue';

import { saveTodo } from '~/services/saveTodo';
import { Todo } from '~/types/todo';
import { User } from '~/types/user';

const dialogVisible = ref(false);

const { $activeModalsBus } = useNuxtApp();

const todo = ref<Todo>();
const user = ref<User>();

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done();
        })
        .catch(() => {
            // catch error
        });
};
$activeModalsBus.$on('TodoModal', ({ $user, $todo }: { $user: User; $todo?: Todo }) => {
    dialogVisible.value = true;
    todo.value = $todo ?? ({} as Todo);
    user.value = $user;
});
</script>

<template>
    <el-dialog v-model="dialogVisible" title="TodoModal" width="500" :before-close="handleClose">
        <TodoForm v-model="todo" />
        <template #footer>
            <div v-if="user && todo" class="dialog-footer">
                <el-button @click="dialogVisible = false">Close</el-button>
                <el-button type="primary" @click="saveTodo(user, todo).then(() => (dialogVisible = false))"
                    >Save
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>
