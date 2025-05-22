<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCliArgs, type CliArgs } from "@/utils/cli";
import IndexHeader from "@/components/IndexHeader.vue";
import ModManage from "@/components/ModManage.vue";
import SavesManage from "@/components/SavesManage.vue";

const cliArgs = ref<CliArgs>({ args: [] });
const isLoadingArgs = ref(true);

// 管理视图切换：mods 或 saves
const activeManage = ref<'mods' | 'saves'>('mods');
const toggleManageView = () => {
    activeManage.value = activeManage.value === 'mods' ? 'saves' : 'mods';
};

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
        <IndexHeader :active-manage="activeManage" @toggle-manage-view="toggleManageView" />
        <!-- 主内容区域 -->
        <keep-alive>
            <component :is="activeManage === 'mods' ? ModManage : SavesManage" class="flex-1 min-h-0" />
        </keep-alive>
        <!-- 额外区域 Section3 -->
        <!-- <div class="bg-purple-500 text-white p-4">
            Section3
        </div> -->
    </div>
</template>
