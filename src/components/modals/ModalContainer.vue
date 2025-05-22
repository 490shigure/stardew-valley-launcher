<script setup lang="ts">
import { modalUtil } from '@/utils/modal';

// 获取弹窗实例列表
const { modals } = modalUtil();
</script>

<template>
  <component v-for="modal in modals" :key="modal.id" :is="modal.component" v-bind="modal.props" />
</template>