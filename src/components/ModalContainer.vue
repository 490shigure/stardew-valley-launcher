<script setup lang="ts">
import SettingsModal from '@/components/modals/SettingsModal.vue';
import VersionModal from '@/components/modals/VersionModal.vue';
</script>

<template>
  <!-- 直接渲染所有需要的弹窗组件，内部含 teleport -->
  <SettingsModal />
  <VersionModal />
</template> 