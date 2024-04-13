<template>
    <div class="page-index">
        <p>OK: {{ count }}</p>
        <p>
            <a href="javascript:void(0);" @click="signOut">Logout</a>
        </p>
    </div>
</template>

<style></style>

<script setup lang="ts">
// const { data: count } = await useFetch('/api/count');
const { data: count } = 1;

const {signOut} = useAuth();
</script>
