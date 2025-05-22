<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useModsStore } from '@/stores/useModsStore';
import WorkspaceManageIcon from '@/components/icons/WorkspaceManageIcon.vue';
import GridIcon from '@/components/icons/GridIcon.vue';
import FolderOpenIcon from '@/components/icons/FolderOpenIcon.vue';
import SaveIcon from '@/components/icons/SaveIcon.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';

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
            <WorkspaceManageIcon class="size-6" />
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
            <GridIcon v-if="props.activeManage === 'mods'" class="size-6" />
            <!-- Folder-open 图标，表示切到存档管理 -->
            <FolderOpenIcon v-else class="size-6" />
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
            <SaveIcon class="size-6" />
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
            <PlayIcon class="size-6 stroke-green-600" />
            <span class="opacity-0 transition-opacity duration-200 
                    group-hover:opacity-100 absolute -bottom-8 whitespace-nowrap
                 bg-gray-700 text-white text-sm rounded p-1 pointer-events-none z-50">
                {{ $t('index.header.start_btn_text') }}
            </span>
        </button>
    </div>
</template>
