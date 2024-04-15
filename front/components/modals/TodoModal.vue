<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

import { useInuts } from '~/composables/useInputs';

import TodoForm from '~/components/forms/TodoForm.vue';

import { saveTodo } from '~/services/saveTodo';
import { Todo } from '~/types/todo';
import { User } from '~/types/user';

const dialogVisible = ref(false);

const { $activeModalsBus } = useNuxtApp();

const todo = ref<Todo>();
const user = ref<User>();

const formRef = ref<typeof TodoForm>();

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done();
        })
        .catch(() => {
            // catch error
        });
};
const { selectField } = useInuts();

$activeModalsBus.$on('TodoModal', ({ $user, $todo }: { $user: User; $todo?: Todo }) => {
    dialogVisible.value = true;

    todo.value = $todo ?? ({} as Todo);
    user.value = $user;

    nextTick(() => selectField(formRef.value?.inputTitleRef));
});
function onSubmit() {
    if (user.value && todo.value) {
        saveTodo(user.value, todo.value).then(() => (dialogVisible.value = false));
    }
}
</script>

<template>
    <el-dialog v-model="dialogVisible" title="TodoModal" width="500" :before-close="handleClose">
        <TodoForm ref="formRef" v-model="todo" :user="user" @submit="onSubmit" />
        <template #footer>
            <div v-if="user && todo" class="dialog-footer">
                <el-button @click="dialogVisible = false">Close</el-button>
                <el-button type="primary" @click="onSubmit">Save </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>
