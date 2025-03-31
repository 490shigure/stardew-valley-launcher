<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCliArgs, type CliArgs } from "@/utils/cli";
import IndexHeader from "@/components/IndexHeader.vue";
import IndexBody from "@/components/IndexBody.vue";

const cliArgs = ref<CliArgs>({ args: [] });
const isLoadingArgs = ref(true);

// 在组件挂载时获取命令行参数
onMounted(async () => {
    isLoadingArgs.value = true;
    try {
        cliArgs.value = await getCliArgs();
    } catch (error) {
        console.error("获取命令行参数失败:", error);
    } finally {
        isLoadingArgs.value = false;
    }
});
</script>

<template>
    <div class="flex flex-col h-full">
        <IndexHeader />
        <IndexBody />
    </div>
</template>
