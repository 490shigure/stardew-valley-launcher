<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useModalStore } from '@/stores/useModalStore';

// 异步加载弹窗组件，首次打开时才下载并挂载
const SettingsModal = defineAsyncComponent(() =>
  import('@/components/modals/SettingsModal.vue')
);

const VersionModal = defineAsyncComponent(() =>
  import('@/components/modals/VersionModal.vue')
);

// 获取全局弹窗状态
const { state } = useModalStore();
</script>

<template>
  <!-- 仅当对应弹窗需要显示时才挂载组件 -->
  <SettingsModal v-if="state.settings" />
  <VersionModal v-if="state.version" />
</template> 