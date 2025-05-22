<script setup lang="ts">
import { watch, onUnmounted } from 'vue';

export interface ContextMenuOption {
  label: string;
  action?: () => void;
  children?: ContextMenuOption[];
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

const handleClick = (opt: ContextMenuOption) => {
  if (opt.action) {
    opt.action();
    emit('close');
  }
};
</script>

<template>
  <ul v-if="visible" :style="{ position: 'fixed', top: y + 'px', left: x + 'px' }"
    class="z-50 bg-white shadow-lg border border-gray-300 rounded-md py-1 min-w-[160px] select-none">
    <li v-for="opt in options" :key="opt.label"
      class="relative group px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
      @click="handleClick(opt)">
      <div class="flex justify-between items-center">
        <span>{{ opt.label }}</span>
        <span v-if="opt.children" class="ml-2 text-gray-500">▶</span>
      </div>

      <!-- 二级菜单 -->
      <ul v-if="opt.children" :style="{ position: 'absolute', top: '0', left: '100%' }"
        class="z-50 bg-white shadow-lg border border-gray-300 rounded-md py-1 min-w-[160px] select-none hidden group-hover:block">
        <li v-for="sub in opt.children" :key="sub.label"
          class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
          @click.stop="handleClick(sub)">
          {{ sub.label }}
        </li>
      </ul>
    </li>
  </ul>
</template> 