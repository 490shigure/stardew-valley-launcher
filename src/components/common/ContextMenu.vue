<script setup lang="ts">
import { watch, onUnmounted, ref, reactive, nextTick } from 'vue';

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

// 根元素引用
const rootRef = ref<HTMLElement | null>(null);

// 实际渲染位置（可调整以避免溢出）
const pos = reactive({ x: 0, y: 0 });

// 是否向左展开子菜单
const openToLeft = ref(false);

// 新增：提取位置及方向调整逻辑，便于复用
const updatePosition = async () => {
  // 初始位置
  pos.x = props.x;
  pos.y = props.y;

  // 下一帧测量尺寸并调整
  await nextTick();
  requestAnimationFrame(() => {
    const el = rootRef.value;
    if (el) {
      const rect = el.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      // 判断子菜单方向：若右侧剩余空间不足 180px，则向左展开
      openToLeft.value = pos.x + rect.width + 180 > window.innerWidth;
      if (pos.x > maxX) pos.x = Math.max(0, maxX);
      if (pos.y > maxY) pos.y = Math.max(0, maxY);
    }
  });
};

const handleGlobalClick = () => {
  emit('close');
};

// 处理可见性变化：设置全局点击监听 & 调整位置
watch(
  () => props.visible,
  async (visible) => {
    if (visible) {
      await updatePosition();

      // 注册一次性点击关闭
      requestAnimationFrame(() => {
        document.addEventListener('click', handleGlobalClick, { once: true });
      });
    }
  },
);

// 新增：当坐标变化且菜单已可见时，重新定位菜单
watch(
  () => [props.x, props.y],
  () => {
    if (props.visible) {
      updatePosition();
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

// 当鼠标进入含子菜单的 li 时，动态调整子菜单位置避免底部溢出
const handleSubMenuMouseEnter = (e: MouseEvent) => {
  const liEl = e.currentTarget as HTMLElement | null;
  if (!liEl) return;
  const subMenuEl = liEl.querySelector(':scope > ul') as HTMLElement | null;
  if (!subMenuEl) return;
  // 先重置 top，便于重新计算
  subMenuEl.style.top = '0px';
  // 下一帧获取 rect
  requestAnimationFrame(() => {
    const rect = subMenuEl.getBoundingClientRect();
    const overflow = rect.bottom - window.innerHeight;
    if (overflow > 0) {
      const newTop = Math.max(-overflow - 4, -rect.top + 4); // 尝试上移，最小不超出顶部
      subMenuEl.style.top = `${newTop}px`;
    }
  });
};
</script>

<template>
  <ul v-if="visible" ref="rootRef" :style="{ position: 'fixed', top: pos.y + 'px', left: pos.x + 'px' }"
    class="z-50 bg-white shadow-lg border border-gray-300 rounded-md py-1 min-w-[160px] select-none">
    <li v-for="opt in options" :key="opt.label"
      class="relative group px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
      @click="handleClick(opt)" @mouseenter="handleSubMenuMouseEnter">
      <div class="flex justify-between items-center">
        <span>{{ opt.label }}</span>
        <span v-if="opt.children" class="ml-2 text-gray-500">▶</span>
      </div>

      <!-- 二级菜单 -->
      <ul v-if="opt.children"
        :style="openToLeft ? { position: 'absolute', top: '0', right: '100%' } : { position: 'absolute', top: '0', left: '100%' }"
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