<script setup lang="ts">
import { computed } from 'vue';
import { modalUtil } from '@/utils/modal';
import packageJson from '../../../package.json';

// 获取应用版本号

const { state, close: closeModal } = modalUtil();

const show = computed(() => state.version);

const version: string = (packageJson as any).version ?? '0.0.0';

const close = () => closeModal('version');
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>
      <!-- 内容框 -->
      <div class="relative bg-white rounded shadow-lg w-80 p-6">
        <h2 class="text-lg font-semibold mb-4">{{ $t('version.title') }}</h2>
        <p class="mb-6">{{ $t('version.current') }} {{ version }}</p>
        <div class="text-right">
          <button @click="close" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            {{ $t('version.close') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template> 