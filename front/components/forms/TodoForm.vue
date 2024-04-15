<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { InputInstance } from 'element-plus/es/components/input/src/input';

import { useInuts } from '~/composables/useInputs';

import { saveTodo } from '~/services/saveTodo';
import { Todo } from '~/types/todo';
import { User } from '~/types/user';

const props = defineProps<{
    modelValue: Todo | undefined;
    showButtons?: boolean;
    user: User | undefined;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);

const form = useVModel(props, 'modelValue', emit);

const inputTitleRef = ref<InputInstance>();

const { selectField } = useInuts();

onMounted(() => {
    selectField(inputTitleRef.value);
});

defineExpose({
    inputTitleRef,
});
</script>

<template>
    <el-form v-if="form" :model="form" label-width="auto" style="max-width: 600px" @submit.prevent="$emit('submit')">
        <el-form-item label="Title">
            <el-input ref="inputTitleRef" v-model="form.title" />
        </el-form-item>
        <el-form-item v-if="props.showButtons && props.user">
            <el-button type="primary" @click="saveTodo(props.user, form)">Save</el-button>
            <el-button>Close</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
