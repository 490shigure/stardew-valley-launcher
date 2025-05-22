<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { supportedLocales, localeMap, setLocale, getLocale } from '@/i18n';
import { modalUtil } from '@/utils/modal';
import type { Settings } from '@/types/settings';

const { state, close: closeModal } = modalUtil();

// 是否显示弹窗
const show = computed(() => state.settings);

// 设置
const settings = ref<Settings>({
  language: 'en',
});

// 初始化设置
onMounted(() => {
  console.log("初始化设置");
  settings.value.language = getLocale() as any;
});

// 切换语言
const handleLanguageChange = () => {
  if (supportedLocales.includes(settings.value.language as any)) {
    setLocale(settings.value.language as any);
  }
};

// 关闭弹窗
const close = () => closeModal('settings');

// 保存设置
const save = () => closeModal('settings');
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>
      <!-- 内容框 -->
      <div class="relative bg-white rounded shadow-lg w-96 p-6">
        <h2 class="text-lg font-semibold mb-4">{{ $t('settings.title') }}</h2>

        <!-- 语言选择 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">{{ $t('settings.language') }}</label>
          <select v-model="settings.language" @change="handleLanguageChange"
            class="p-3 mt-1 block w-full border-black border rounded">
            <option v-for="locale in supportedLocales" :key="locale" :value="locale">
              {{ localeMap[locale] }}
            </option>
          </select>
        </div>

        <div class="flex justify-end space-x-2">
          <button @click="save" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
            {{ $t('settings.save') }}
          </button>
          <button @click="close" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            {{ $t('settings.close') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>