<script setup lang="ts">
import { ref, computed } from 'vue';
import { localeMap } from '@/i18n';

type ModInfo = {
    name: string;
    author: string;
    version: string;
    description: string;
    uniqueId: string;
    MinimumApiVersion: string;
    UpdateKeys: string[];
    last_update: string;
    enabled: boolean;
    updatable: boolean;
}

const enabledMods = ref<string[]>(["cat.chatcommands"]);
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
]);

// 搜索文本
const filterText = ref("");

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
        mod.enabled = enabledMods.value.includes(mod.uniqueId);
    });
    // 排序
    filteredMods.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    return filteredMods;
});

// 模组checkbox点击事件
const handleModCheckboxClick = (uniqueId: string, lastEnabled: boolean) => {
    if (lastEnabled) {
        enabledMods.value = enabledMods.value.filter((id) => id !== uniqueId);
    } else {
        enabledMods.value.push(uniqueId);
    }
}
</script>

<template>
    <div class="flex flex-col h-full flex-1">
        <!-- 模组列表 -->
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full py-2 align-middle sm:px-3 lg:px-5">
                <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <!-- 模组列表表头 -->
                        <thead class="bg-gray-50 cursor-pointer">
                            <tr>
                                <th scope="col" class="group py-3.5 pr-0 pl-5 text-left text-sm
                                     font-semibold text-gray-900 ">
                                </th>
                                <th scope="col" class="group px-0 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    {{ $t('index.body.mod_table_header.name') }}
                                    <span class="invisible ml-1 text-gray-400 group-hover:visible group-focus:visible">
                                        ↑
                                    </span>
                                </th>
                                <th scope="col" class="group px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    {{ $t('index.body.mod_table_header.last_update') }}
                                    <span class="invisible ml-1 text-gray-400 group-hover:visible group-focus:visible">
                                        ↑
                                    </span>
                                </th>
                                <th scope="col" class="group px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    {{ $t('index.body.mod_table_header.version') }}
                                    <span class="invisible ml-1 text-gray-400 group-hover:visible group-focus:visible">
                                        ↑
                                    </span>
                                </th>
                                <th scope="col" class="group px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    {{ $t('index.body.mod_table_header.updatable') }}
                                    <span class="invisible ml-1 text-gray-400 group-hover:visible group-focus:visible">
                                        ↑
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <!-- 模组列表内容 -->
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="mod in displayMods" :key="mod.uniqueId" class="hover:bg-gray-100">
                                <td class="py-4 pr-0 pl-5">
                                    <input type="checkbox" v-model="mod.enabled"
                                        @click="handleModCheckboxClick(mod.uniqueId, mod.enabled)"
                                        class="w-4 h-4 accent-green-600 transition-all duration-200 ease-in-out">
                                </td>
                                <td class="px-0 py-4 text-sm whitespace-nowrap">
                                    {{ mod.name }}</td>
                                <td class="px-3 py-4 text-sm whitespace-nowrap">{{ mod.last_update }}</td>
                                <td class="px-3 py-4 text-sm whitespace-nowrap">{{ mod.version }}</td>
                                <td class="px-3 py-4 text-sm whitespace-nowrap">{{ mod.updatable }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 模组列表底部工具栏 -->
        <div class="flex items-center justify-start gap-3 sm:px-3 lg:px-5">
            <!-- 筛选模组状态 -->
            <select id="mod_status" v-model="modStatusFilter" class="w-fit border-1 border-gray-300 rounded-md p-2">
                <option v-for="status in Object.values(ModStatus)" :key="status" :value="status">
                    {{ $t(`index.body.mod_status.${status}`) }}
                </option>
            </select>
            <!-- 搜索框 -->
            <input type="text" v-model="filterText" :placeholder="$t('index.body.search_placeholder')"
                class="w-fit border-1 border-gray-400 rounded-md p-2">
            <!-- 语言选择 -->
            <!-- <select id="locale" v-model="$i18n.locale" class="w-fit border-1 border-gray-300 rounded-md p-2">
                <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
                    {{ localeMap[locale as keyof typeof localeMap] }}</option>
            </select> -->
            <!-- 右侧区域 -->
            <div class="flex items-center ml-auto gap-3">
                <!-- 检查更新 -->
                <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
                    {{ $t('index.body.mod_table_tools_btn.check_update') }}
                </button>
                <!-- 列表刷新 -->
                <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
                    {{ $t('index.body.mod_table_tools_btn.refresh') }}
                </button>
            </div>
        </div>
    </div>
</template>
