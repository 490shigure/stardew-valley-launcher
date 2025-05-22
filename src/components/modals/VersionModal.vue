<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { modalUtil } from '@/utils/modal';
import packageJson from '../../../package.json';
import { getCliArgs } from '@/utils/app';

// 获取应用版本号

const { state, close: closeModal } = modalUtil();

const show = computed(() => state.version);

const version: string = (packageJson as any).version ?? '0.0.0';

// 命令行参数
const cliArgs = ref<string[]>([]);

onMounted(async () => {
  try {
    const { args } = await getCliArgs();
    cliArgs.value = args;
  } catch (error) {
    console.error('获取 CLI 参数失败:', error);
  }
});

const close = () => closeModal('version');

// 检测更新（暂未实现逻辑）
const checkUpdate = () => {
  console.log('Check update clicked');
};
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>
      <!-- 内容框 -->
      <div class="relative bg-white rounded shadow-lg p-6 w-4/5 max-w-2xl">
        <h2 class="text-lg font-semibold mb-4">{{ $t('version.title') }}</h2>
        <p class="mb-4">{{ $t('version.current') }} {{ version }}</p>
        <p class="mb-6 break-all">
          {{ $t('version.cli_args') ?? 'CLI Args' }}:
          <code>{{ cliArgs.join(' ') || '-' }}</code>
        </p>
        <div class="flex justify-end space-x-2">
          <button @click="checkUpdate" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
            {{ $t('version.check_update') }}
          </button>
          <button @click="close" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            {{ $t('version.close') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>