<script setup lang="ts">
import { ref } from 'vue';
import { useModalStore } from '@/stores/useModalStore';

// modal store
const { open } = useModalStore();

// 菜单状态管理
const activeMenu = ref<string | null>(null);

// 打开/关闭菜单
const toggleMenu = (menuName: string) => {
  if (activeMenu.value === menuName) {
    activeMenu.value = null;
  } else {
    activeMenu.value = menuName;
  }
};

// 关闭所有菜单
const closeAllMenus = () => {
  activeMenu.value = null;
};

// 菜单项点击事件处理
const handleMenuItemClick = (action: string) => {
  switch (action) {
    case 'settings':
      open('settings');
      break;
    case 'version':
      open('version');
      break;
    default:
      console.log(`菜单项 ${action} 被点击`);
  }
  closeAllMenus();
};
</script>

<template>
  <div class="global-menu select-none">
    <!-- 菜单栏 -->
    <div class="flex bg-gray-100 border-b border-gray-300 text-sm">
      <!-- 文件菜单 -->
      <div class="relative">
        <button @click="toggleMenu('file')" class="px-4 py-2 hover:bg-gray-200"
          :class="{ 'bg-gray-200': activeMenu === 'file' }">
          {{ $t('menu.file') }}
        </button>
        <div v-if="activeMenu === 'file'"
          class="absolute top-full left-0 bg-white shadow-lg border border-gray-300 w-48 z-10">
          <button @click="handleMenuItemClick('open')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.file_open') }}
          </button>
          <button @click="handleMenuItemClick('save')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.file_save') }}
          </button>
          <div class="border-t border-gray-300 my-1"></div>
          <button @click="handleMenuItemClick('exit')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.file_exit') }}
          </button>
        </div>
      </div>

      <!-- 工具菜单 -->
      <div class="relative">
        <button @click="toggleMenu('tools')" class="px-4 py-2 hover:bg-gray-200"
          :class="{ 'bg-gray-200': activeMenu === 'tools' }">
          {{ $t('menu.tools') }}
        </button>
        <div v-if="activeMenu === 'tools'"
          class="absolute top-full left-0 bg-white shadow-lg border border-gray-300 w-48 z-10">
          <button @click="handleMenuItemClick('settings')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.tools_settings') }}
          </button>
          <button @click="handleMenuItemClick('mods')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.tools_mods') }}
          </button>
        </div>
      </div>

      <!-- 关于菜单 -->
      <div class="relative">
        <button @click="toggleMenu('about')" class="px-4 py-2 hover:bg-gray-200"
          :class="{ 'bg-gray-200': activeMenu === 'about' }">
          {{ $t('menu.about') }}
        </button>
        <div v-if="activeMenu === 'about'"
          class="absolute top-full left-0 bg-white shadow-lg border border-gray-300 w-48 z-10">
          <button @click="handleMenuItemClick('help')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.about_help') }}
          </button>
          <button @click="handleMenuItemClick('version')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('menu.about_version') }}
          </button>
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