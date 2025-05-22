<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useModsStore } from '@/stores/useModsStore';
import DataTable from '@/components/common/DataTable.vue';
import type { Column } from '@/components/common/DataTable.vue';
import ModToolbar from './ModToolbar.vue';
import type { ModInfo } from '@/types/mod';
import { useI18n } from 'vue-i18n';

const modsStore = useModsStore();

const installedMods = ref<ModInfo[]>([
    {
        name: "Chat Commands",
        author: "Cat",
        version: "1.15.2",
        description: "Lets you run SMAPI commands from the chat window!",
        uniqueId: "cat.chatcommands",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:2092"],
        last_update: "2025-03-31",
        enabled: false,
        updatable: false,
    },
    {
        name: "AutomaticGates",
        author: "Rakiin aKa ScheKaa",
        version: "2.5.4",
        description: "Opens and closes gates automatically",
        uniqueId: "Rakiin.AutomaticGates",
        MinimumApiVersion: "4.0",
        UpdateKeys: ["Nexus:3109"],
        last_update: "2025-03-31",
        enabled: false,
        updatable: true,
    },
    {
        name: "Better Ranching",
        author: "Urbanyeti",
        version: "1.9.0",
        description: "Improves the ranching experience with better animal interactions",
        uniqueId: "Urbanyeti.BetterRanching",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:859"],
        last_update: "2025-03-30",
        enabled: true,
        updatable: false,
    },
    {
        name: "Chests Anywhere",
        author: "Pathoschild",
        version: "1.21.0",
        description: "Access your chests from anywhere",
        uniqueId: "Pathoschild.ChestsAnywhere",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:518"],
        last_update: "2025-03-29",
        enabled: true,
        updatable: true,
    },
    {
        name: "Automate",
        author: "Pathoschild",
        version: "1.29.0",
        description: "Lets you automate crafting, smelting, and more",
        uniqueId: "Pathoschild.Automate",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:1063"],
        last_update: "2025-03-28",
        enabled: false,
        updatable: true,
    },
    {
        name: "Better Artisan Goods",
        author: "Esca-MMC",
        version: "1.5.0",
        description: "Improves the quality and value of artisan goods",
        uniqueId: "Esca-MMC.BetterArtisanGoods",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:2080"],
        last_update: "2025-03-27",
        enabled: true,
        updatable: false,
    },
    {
        name: "Better Sprinklers",
        author: "Speeder",
        version: "3.7.0",
        description: "Adds more sprinkler types and improves existing ones",
        uniqueId: "Speeder.BetterSprinklers",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:2773"],
        last_update: "2025-03-26",
        enabled: true,
        updatable: true,
    },
    {
        name: "Content Patcher",
        author: "Pathoschild",
        version: "1.28.0",
        description: "Loads content packs which modify the game's data and images without replacing XNB files",
        uniqueId: "Pathoschild.ContentPatcher",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:1915"],
        last_update: "2025-03-25",
        enabled: true,
        updatable: false,
    },
    {
        name: "Expanded Storage",
        author: "FlashShifter",
        version: "1.4.0",
        description: "Adds new storage options and functionality",
        uniqueId: "FlashShifter.ExpandedStorage",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:7431"],
        last_update: "2025-03-24",
        enabled: false,
        updatable: true,
    },
    {
        name: "Friendship Decay",
        author: "Draylon",
        version: "1.1.0",
        description: "Adds friendship decay over time if you don't interact with villagers",
        uniqueId: "Draylon.FriendshipDecay",
        MinimumApiVersion: "3.0.0",
        UpdateKeys: ["Nexus:10261"],
        last_update: "2025-03-23",
        enabled: false,
        updatable: false,
    },
]);

// 搜索文本
const filterText = ref("");

// 排序相关
const sortKey = ref<string>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

const handleSort = (key: string) => {
    if (sortKey.value === key) {
        // 同一列时切换升/降序
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        // 新列时默认升序
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

// 模组状态
enum ModStatus {
    All = "all",
    Enabled = "enabled",
    Disabled = "disabled",
    Updatable = "updatable",
}
const modStatusFilter = ref(ModStatus.All);

// 计算显示的模组
const displayMods = computed(() => {
    // 筛选
    const filteredMods = installedMods.value.filter((mod) => {
        let flag = true;
        // 根据模组状态过滤
        switch (modStatusFilter.value) {
            case ModStatus.All:
                break;
            case ModStatus.Enabled:
                flag = mod.enabled;
                break;
            case ModStatus.Disabled:
                flag = !mod.enabled;
                break;
            case ModStatus.Updatable:
                flag = mod.updatable;
                break;
            default:
                break;
        }
        // 根据搜索文本过滤
        if (filterText.value) {
            flag = flag && (mod.name.toLowerCase().includes(filterText.value.toLowerCase()) ||
                mod.author.toLowerCase().includes(filterText.value.toLowerCase()) ||
                mod.version.toLowerCase().includes(filterText.value.toLowerCase())
            );
        }
        return flag;
    });
    // 根据enabledMods修改enabled
    filteredMods.forEach((mod) => {
        mod.enabled = modsStore.enabledIds.includes(mod.uniqueId);
    });
    // 排序
    filteredMods.sort((a: any, b: any) => {
        const aVal = a[sortKey.value];
        const bVal = b[sortKey.value];
        // 统一转为字符串比较，布尔转数字
        const normalize = (v: any) =>
            typeof v === 'boolean' ? (v ? 1 : 0) : v ?? '';
        const valA = normalize(aVal);
        const valB = normalize(bVal);
        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
    return filteredMods;
});

// 初始化启用模组列表（仅示例，真实场景应从文件或 API 获取）
// 初始启用列表与 installedMods 中 enabled 字段保持一致
onMounted(() => {
    modsStore.setMods(installedMods.value);
});

// 在 setup 结尾处添加事件处理函数
const handleToggle = (id: string | number) => {
    modsStore.toggleMod(String(id));
};

// 全选 / 取消全选
const handleToggleAll = (checked: boolean) => {
    modsStore.setAllEnabled(checked);
};

const handleCheckUpdate = () => {
    // 这里后续可接入真实的检查更新逻辑
    console.log('check update clicked');
};

const handleRefresh = () => {
    // 这里后续可接入真实的刷新逻辑，例如重新扫描 Mods 目录
    console.log('refresh clicked');
};

// DataTable 列配置
const { t } = useI18n();
const modColumns = computed<Column[]>(() => [
    { key: 'name', header: t('index.body.mod_table_header.name') },
    { key: 'last_update', header: t('index.body.mod_table_header.last_update') },
    { key: 'version', header: t('index.body.mod_table_header.version') },
    { key: 'updatable', header: t('index.body.mod_table_header.updatable') },
]);
</script>

<template>
    <div class="flex-1 flex flex-col min-h-0">
        <!-- 表格模块（可伸缩） -->
        <div class="flex-1 min-h-0">
            <DataTable :items="displayMods" :columns="modColumns" selectable row-key="uniqueId"
                :selected-keys="modsStore.enabledIds" :sort-key="sortKey" :sort-order="sortOrder" @toggle="handleToggle"
                @sort="handleSort" @toggle-all="handleToggleAll" />
        </div>

        <!-- 底部工具栏（固定高度） -->
        <div class="shrink-0">
            <ModToolbar v-model:filterText="filterText" v-model:modStatus="modStatusFilter"
                @checkUpdate="handleCheckUpdate" @refresh="handleRefresh" />
        </div>
    </div>
</template>
