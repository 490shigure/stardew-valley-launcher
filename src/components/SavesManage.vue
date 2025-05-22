<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DataTable from '@/components/common/DataTable.vue';
import type { Column } from '@/components/common/DataTable.vue';
import { useI18n } from 'vue-i18n';

// 存档信息类型
interface SaveInfo {
  name: string;          // 存档名称
  farmer: string;        // 农场主
  farmName: string;      // 农场名
  lastPlayed: string;    // 最后游玩日期
  seasonDay: string;     // 当前季节与天数，例如：Spring 12
  year: number;          // 年份
}

// 示例静态数据，后续可替换为磁盘扫描结果
const saves = ref<SaveInfo[]>([
  {
    name: '存档 1',
    farmer: 'PlayerA',
    farmName: 'Sunshine Farm',
    lastPlayed: '2025-04-01',
    seasonDay: 'Spring 12',
    year: 3,
  },
  {
    name: '存档 2',
    farmer: 'PlayerB',
    farmName: 'Moonlight Farm',
    lastPlayed: '2025-03-28',
    seasonDay: 'Winter 28',
    year: 2,
  },
]);

// 排序相关
const sortKey = ref<string>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

// 搜索文本
const filterText = ref('');

// 计算需要展示的存档
const displaySaves = computed(() => {
  // 过滤
  let list = filterText.value
    ? saves.value.filter((save) =>
      Object.values(save).some((v) => String(v).toLowerCase().includes(filterText.value.toLowerCase())),
    )
    : [...saves.value];

  // 排序
  list.sort((a: any, b: any) => {
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];
    const normalize = (v: any) => (typeof v === 'boolean' ? (v ? 1 : 0) : v ?? '');
    const aVal = normalize(valA);
    const bVal = normalize(valB);
    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });

  return list;
});

const { t } = useI18n();

// DataTable 列配置（根据当前语言动态生成）
const saveColumns = computed<Column[]>(() => [
  { key: 'name', header: t('index.body.save_table_header.name') },
  { key: 'farmer', header: t('index.body.save_table_header.farmer') },
  { key: 'farmName', header: t('index.body.save_table_header.farmName') },
  { key: 'lastPlayed', header: t('index.body.save_table_header.lastPlayed') },
  { key: 'seasonDay', header: t('index.body.save_table_header.seasonDay') },
  { key: 'year', header: t('index.body.save_table_header.year') },
]);

// 模拟 mounted 时可能的初始化逻辑
onMounted(() => {
  // TODO: 读取磁盘存档列表并填充 saves
});
</script>

<template>
  <div class="flex-1 overflow-y-auto flex flex-col">
    <!-- 存档列表 -->
    <div class="flex-1 min-h-0">
      <DataTable :items="displaySaves" :columns="saveColumns" row-key="name" :sort-key="sortKey" :sort-order="sortOrder"
        @sort="handleSort" />
    </div>

    <!-- 底部工具栏 -->
    <div class="flex items-center justify-start gap-3 sm:px-3 lg:px-5 py-2 shrink-0">
      <!-- 搜索框 -->
      <input v-model="filterText" type="text" :placeholder="t('index.body.save_search_placeholder')"
        class="w-fit border-1 border-gray-400 rounded-md p-2" />
      <!-- 右侧工具 -->
      <div class="flex items-center ml-auto gap-3">
        <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
          {{ t('index.body.save_table_tools_btn.open_folder') }}
        </button>
        <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
          {{ t('index.body.save_table_tools_btn.refresh') }}
        </button>
      </div>
    </div>
  </div>
</template>