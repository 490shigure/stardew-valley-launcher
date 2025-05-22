<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { supportedLocales, localeMap, setLocale, getLocale } from '@/i18n';
import { useModalStore } from '@/stores/useModalStore';

const { state, close: closeModal } = useModalStore();

// 是否显示弹窗
const show = computed(() => state.settings);

// 当前选择的语言
const currentLocale = ref<string>(getLocale());

// 当弹窗打开时，同步当前语言
watch(
  () => show.value,
  (val) => {
    if (val) {
      currentLocale.value = getLocale();
    }
  }
);

// 切换语言
const handleLanguageChange = () => {
  if (supportedLocales.includes(currentLocale.value as any)) {
    setLocale(currentLocale.value as any);
  }
};

const close = () => closeModal('settings');
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
          <select v-model="currentLocale" @change="handleLanguageChange" class="mt-1 block w-full border-gray-300 rounded">
            <option v-for="locale in supportedLocales" :key="locale" :value="locale">
              {{ localeMap[locale] }}
            </option>
          </select>
        </div>

        <div class="text-right">
          <button @click="close" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            {{ $t('settings.close') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template> 