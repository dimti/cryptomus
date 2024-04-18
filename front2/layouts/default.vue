<script setup lang="ts">
import Placeholder from '~/components/common/Placeholder.vue';
</script>

<template>
    <div class="container mx-auto">
        <UContainer>
            <Placeholder class="h-32" />
        </UContainer>

        <slot />
    </div>
</template>
