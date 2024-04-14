<template>
    <div class="page-users">
        <el-table :data="users" style="width: 100%" @row-click="navigateTo(`/users/${($event as User).id}`)">
            <el-table-column prop="id" label="ID" width="40" />
            <el-table-column prop="created_at" label="Created" width="220" />
            <el-table-column prop="username" label="Username" width="180" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { getUsers } from '~/services/getUsers';
import { User } from "~/types/user";

const users = await getUsers();
</script>

<style></style>
