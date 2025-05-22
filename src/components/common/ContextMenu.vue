<script setup lang="ts">
import { watch, onUnmounted } from 'vue';

export interface ContextMenuOption {
  label: string;
  action: () => void;
}

const props = defineProps<{
  visible: boolean;
  x: number;
  y: number;
  options: ContextMenuOption[];
}>();

const emit = defineEmits<{ (e: 'close'): void }>();

const handleGlobalClick = () => {
  emit('close');
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      // 延时注册，避免立刻触发
      requestAnimationFrame(() => {
        document.addEventListener('click', handleGlobalClick, { once: true });
      });
    }
  },
);

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<template>
  <ul v-if="visible" :style="{ position: 'fixed', top: y + 'px', left: x + 'px' }"
    class="z-50 bg-white shadow-lg border border-gray-300 rounded-md py-1 min-w-[160px] select-none">
    <li v-for="opt in options" :key="opt.label" class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
      @click="opt.action(); emit('close')">
      {{ opt.label }}
    </li>
  </ul>
</template> 