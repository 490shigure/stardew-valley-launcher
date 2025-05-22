<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useModsStore } from '@/stores/useModsStore';

const workspaces = reactive<string[]>(["W1", "W2", "W3"]);
const selectedWorkspace = ref<string>('');

// 使用 Pinia 管理模组数据
const modsStore = useModsStore();

// 统计信息（此处仍使用示例数据，可根据业务逻辑调整）
const totalMods = computed(() => modsStore.mods.length);
const enabledMods = computed(() => modsStore.enabledIds.length);
// 这里暂以 0 代替，可根据实际 updatable 字段计算
const updatableMods = computed(() => modsStore.mods.filter(m => m.updatable).length ?? 0);

// 未保存变更状态
const unsavedChanges = computed(() => modsStore.hasUnsavedChanges);

const saveChanges = () => {
  modsStore.markSaved();
  // TODO: 实际保存到磁盘 / API
};

// 接收当前激活的管理视图，并提供切换事件
const props = defineProps<{ activeManage: 'mods' | 'saves' }>();
const emit = defineEmits(['toggleManageView']);

</script>

<template>
    <div class="flex items-center gap-3 h-fit px-5 py-2">
        <div class="flex items-center">
            <!-- 工作区选择 -->
            <a class="text-1xl">{{ $t('index.header.workspace') }}</a>
            <select v-model="selectedWorkspace"
                class="ml-2 w-fit h-10 min-w-30 max-w-60 border-1 border-gray-500 rounded-md">
                <option v-for="workspace in workspaces" :key="workspace" :value="workspace">
                    {{ workspace }}
                </option>
            </select>
        </div>
        <!-- 管理工作区 -->
        <button class="h-10 w-10 flex items-center justify-center border-1
             border-gray-500 rounded-md hover:bg-gray-200 active:bg-gray-400 group relative">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M13.07 22H7C5.93913 22 4.92178 21.5785 4.17163 20.8284C3.42149 20.0782 3 19.0609 3 18V6C3 4.93913 3.42149 3.92165 4.17163 3.17151C4.92178 2.42136 5.93913 2 7 2H17C18.0609 2 19.0783 2.42136 19.8284 3.17151C20.5786 3.92165 21 4.93913 21 6V12.53"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M12.17 17H9.85004C9.29329 16.9992 8.74772 16.8436 8.27441 16.5504C7.8011 16.2572 7.41873 15.8381 7.17004 15.34L6.83002 14.6599C6.58134 14.1618 6.19896 13.7428 5.72565 13.4496C5.25234 13.1564 4.70677 13.0008 4.15002 13H3"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M18.44 21.88C20.3399 21.88 21.88 20.3399 21.88 18.44C21.88 16.5401 20.3399 15 18.44 15C16.5401 15 15 16.5401 15 18.44C15 20.3399 16.5401 21.88 18.44 21.88Z"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M23.0009 23L20.8809 20.88" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
            </svg>
            <span class="opacity-0 transition-opacity duration-200 
                    group-hover:opacity-100 absolute -bottom-8 whitespace-nowrap
                 bg-gray-700 text-white text-sm rounded p-1 pointer-events-none z-50">
                {{ $t('index.header.manage_btn_text') }}
            </span>
        </button>
        <!-- 切换 模组 / 存档 管理按钮 -->
        <button
            class="h-10 w-10 flex items-center justify-center border-1 border-gray-500 rounded-md hover:bg-gray-200 active:bg-gray-400 group relative"
            @click="emit('toggleManageView')"
        >
            <!-- 根据当前视图展示不同图标 -->
            <svg v-if="props.activeManage === 'mods'" class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H21V21H3V3Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 9H21" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 21V9" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- Folder-open 图标，表示切到存档管理 -->
            <svg v-else class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4H10L12 6H21C21.5523 6 22 6.44772 22 7V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V5C2 4.44772 2.44772 4 3 4Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 9H22" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="opacity-0 transition-opacity duration-200 group-hover:opacity-100 absolute -bottom-8 whitespace-nowrap bg-gray-700 text-white text-sm rounded p-1 pointer-events-none z-50">
                {{ props.activeManage === 'mods' ? $t('index.header.saves_manage_btn_text') : $t('index.header.mods_manage_btn_text') }}
            </span>
        </button>
        <!-- 保存 -->
        <button
            :class="[
                'h-10 w-10 flex items-center justify-center border-1 rounded-md group relative transition-colors',
                unsavedChanges ?
                    'border-red-500 bg-orange-200 hover:bg-orange-300 active:bg-orange-200' :
                    'border-gray-500 hover:bg-gray-200 active:bg-gray-400'
            ]"
            @click="saveChanges"
        >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M17 2C18.0609 2 19.0783 2.42136 19.8284 3.17151C20.5786 3.92165 21 4.93913 21 6V18C21 19.0609 20.5786 20.0782 19.8284 20.8284C19.0783 21.5785 18.0609 22 17 22H7C5.93913 22 4.92178 21.5785 4.17163 20.8284C3.42149 20.0782 3 19.0609 3 18V6C3 4.93913 3.42149 3.92165 4.17163 3.17151C4.92178 2.42136 5.93913 2 7 2"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M21 13H19.85C19.2933 13.0008 18.7477 13.1564 18.2744 13.4496C17.8011 13.7428 17.4187 14.1618 17.17 14.6599L16.83 15.34C16.5813 15.8381 16.199 16.2572 15.7256 16.5504C15.2523 16.8436 14.7068 16.9992 14.15 17H9.85004C9.29329 16.9992 8.74772 16.8436 8.27441 16.5504C7.8011 16.2572 7.41873 15.8381 7.17004 15.34L6.83002 14.6599C6.58134 14.1618 6.19896 13.7428 5.72565 13.4496C5.25234 13.1564 4.70677 13.0008 4.15002 13H3"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M11.9707 2V11" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path
                        d="M15.5004 8L12.9905 10.58C12.8616 10.7155 12.7065 10.8235 12.5345 10.8972C12.3626 10.971 12.1775 11.0089 11.9905 11.0089C11.8034 11.0089 11.6183 10.971 11.4464 10.8972C11.2745 10.8235 11.1194 10.7155 10.9905 10.58L8.48047 8"
                        stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg>
            <span class="opacity-0 transition-opacity duration-200 
                    group-hover:opacity-100 absolute -bottom-8 whitespace-nowrap
                 bg-gray-700 text-white text-sm rounded p-1 pointer-events-none z-50">
                {{ $t('index.header.save_btn_text') }}
            </span>
        </button>
        <!-- 模组信息 -->
        <div class="flex gap-2 text-1xl">
            <span>{{ $t('index.header.total_mods') }}: </span>
            <span class="font-bold">{{ totalMods }}</span>
            <span>|</span>
            <span>{{ $t('index.header.enabled_mods') }}: </span>
            <span class="font-bold">{{ enabledMods }}</span>
            <span>|</span>
            <span>{{ $t('index.header.updatable_mods') }}: </span>
            <span class="font-bold">{{ updatableMods }}</span>
        </div>
        <!-- 启动 -->
        <button class="h-10 w-15 flex items-center justify-center border-1 ml-auto
             border-green-500 rounded-md bg-green-50 hover:bg-green-100 active:bg-green-200 group relative">
            <svg class="size-6 stroke-green-600" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M7.98047 3.51001C5.43047 4.39001 4.98047 9.09992 4.98047 12.4099C4.98047 15.7199 5.41047 20.4099 7.98047 21.3199C10.6905 22.2499 18.9805 16.1599 18.9805 12.4099C18.9805 8.65991 10.6905 2.58001 7.98047 3.51001Z"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg>
            <span class="opacity-0 transition-opacity duration-200 
                    group-hover:opacity-100 absolute -bottom-8 whitespace-nowrap
                 bg-gray-700 text-white text-sm rounded p-1 pointer-events-none z-50">
                {{ $t('index.header.start_btn_text') }}
            </span>
        </button>
    </div>
</template>
