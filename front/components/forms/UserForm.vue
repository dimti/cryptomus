<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import { updateUser } from '~/services/updateUser';
import { User } from '~/types/user';

const props = defineProps<{
    modelValue: User | undefined;
}>();
const emit = defineEmits(['update:modelValue']);

const form = useVModel(props, 'modelValue', emit);
</script>

<template>
    <el-form v-if="form" :model="form" label-width="auto" style="max-width: 600px" @submit.prevent="updateUser(form)">
        <el-form-item label="Username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item>
            <el-button class="flex-none" type="primary" @click="updateUser(form)">Save</el-button>
            <el-button class="flex-none" @click="navigateTo('/users')">Cancel</el-button>
            <div class="flex-grow"></div>
            <el-button class="flex-none" type="warning" @click="$activeModalsBus.$emit('CryptomusModal')"
                >Cryptomus</el-button
            >
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
