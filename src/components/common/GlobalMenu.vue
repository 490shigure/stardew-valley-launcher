<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { modalUtil } from '@/utils/modal';
import { exitApp } from '@/utils/app';

// modal store
const { open } = modalUtil();

// ----------------------------- 菜单配置 -----------------------------
interface MenuItemConfig {
  action?: string;
  label?: string;
  divider?: boolean;
}

interface MenuConfig {
  name: string;
  label: string;
  items: MenuItemConfig[];
}

const menus: MenuConfig[] = [
  {
    name: 'file',
    label: 'menu.file',
    items: [
      { action: 'open', label: 'menu.file_open' },
      { action: 'save', label: 'menu.file_save' },
      { divider: true },
      { action: 'exit', label: 'menu.file_exit' },
    ],
  },
  {
    name: 'tools',
    label: 'menu.tools',
    items: [
      { action: 'settings', label: 'menu.tools_settings' },
      { action: 'mods', label: 'menu.tools_mods' },
    ],
  },
  {
    name: 'about',
    label: 'menu.about',
    items: [
      { action: 'help', label: 'menu.about_help' },
      { action: 'version', label: 'menu.about_version' },
    ],
  },
];

// --------------------------- 状态与交互 ---------------------------
const activeMenu = ref<string | null>(null);

const toggleMenu = (menuName: string) => {
  activeMenu.value = activeMenu.value === menuName ? null : menuName;
};

const closeAllMenus = () => {
  activeMenu.value = null;
};

// 点击空白处关闭菜单
const rootRef = ref<HTMLElement | null>(null);
const handleClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    closeAllMenus();
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

// 处理菜单项点击
const handleMenuItemClick = (action?: string) => {
  if (!action) return;
  switch (action) {
    case 'settings':
      open('settings');
      break;
    case 'version':
      open('version');
      break;
    case 'exit':
      exitApp();
      break;
    default:
      console.log(`菜单项 ${action} 被点击`);
  }
  closeAllMenus();
};
</script>

<template>
  <div ref="rootRef" class="select-none w-full">
    <!-- 顶部菜单栏 -->
    <div class="flex items-center bg-neutral-50 border-b border-neutral-300 text-sm font-medium">
      <div v-for="menu in menus" :key="menu.name" class="relative">
        <!-- 顶级菜单按钮 -->
        <button @click="toggleMenu(menu.name)" class="px-4 py-2 hover:bg-neutral-100 transition-colors"
          :class="{ 'bg-neutral-200 text-blue-600': activeMenu === menu.name }">
          {{ $t(menu.label) }}
        </button>

        <!-- 下拉菜单 -->
        <div v-if="activeMenu === menu.name"
          class="absolute left-0 top-full w-48 bg-white border border-neutral-300 shadow-lg rounded-md py-1 z-20">
          <template v-for="(item, idx) in menu.items" :key="idx">
            <div v-if="item.divider" class="h-px my-1 bg-neutral-200"></div>

            <button v-else @click="handleMenuItemClick(item.action)"
              class="w-full text-left px-4 py-2 hover:bg-neutral-100 transition-colors">
              {{ $t(item.label as string) }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.global-menu {
  user-select: none;
  width: 100%;
}
</style>