<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import { saveTodo } from '~/services/saveTodo';
import { Todo } from '~/types/todo';

const props = defineProps<{
    modelValue: Todo | undefined;
    showButtons?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const form = useVModel(props, 'modelValue', emit);
</script>

<template>
    <el-form v-if="form" :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Title">
            <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item v-if="props.showButtons">
            <el-button type="primary" @click="saveTodo(form)">Save</el-button>
            <el-button>Close</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
