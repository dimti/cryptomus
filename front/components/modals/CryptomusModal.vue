<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const dialogVisible = ref(false);

const { $activeModalsBus } = useNuxtApp();

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?').then(() => {
        done();
    });
};

$activeModalsBus.$on('CryptomusModal', () => {
    dialogVisible.value = true;
});

const percentage2 = ref(0);

onMounted(() => {
    setInterval(() => {
        percentage2.value = (percentage2.value % 100) + 1;
    }, 100);
});
</script>

<template>
    <el-dialog v-model="dialogVisible" title="CryptomusModal" width="500" :before-close="handleClose" append-to-body>
        <div class="flex items-center">
            <div class="grow"></div>
            <el-progress type="dashboard" :percentage="percentage2" :color="colors" class="grow-0" />
            <div class="grow"></div>
        </div>
        <template #footer>
            <div class="dialog-footer flex flex-row">
                <el-button type="success" class="basis-1/2">Commit</el-button>
                <el-button type="danger" class="basis-1/2">Decline</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>
