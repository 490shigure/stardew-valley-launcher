<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCliArgs, type CliArgs } from "@/utils/cli";
import IndexHeader from "@/components/IndexHeader.vue";
import ModsManage from "@/components/ModsManage.vue";

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
    <div class="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <IndexHeader />
        <!-- 主内容区域 -->
        <ModsManage class="flex-1" />
        <!-- 额外区域 Section3 -->
        <div class="bg-purple-500 text-white p-4">
            Section3
        </div>
    </div>
</template>
