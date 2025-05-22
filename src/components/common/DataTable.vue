<script setup lang="ts">
import { computed, ref } from 'vue';

type SortOrder = 'asc' | 'desc';

export interface Column {
  key: string;             // 对应数据字段
  header: string;          // 表头标题
  sortable?: boolean;      // 是否允许排序，默认 true
  width?: string;          // TailwindCSS 宽度类，如 w-10
}

const props = defineProps<{
  items: Record<string, any>[];        // 表格数据
  columns: Column[];                   // 列配置
  sortKey: string;                     // 当前排序字段，由父组件控制
  sortOrder: SortOrder;                // 当前排序方向，由父组件控制
  selectable?: boolean;                // 是否显示勾选列
  selectedKeys?: Array<string | number>; // 已选择项主键列表
  rowKey?: string;                     // 行主键字段，默认 'id'
}>();

const emit = defineEmits<{
  (e: 'sort', key: string): void;
  (e: 'toggle', key: string | number): void;
  (e: 'toggle-all', checked: boolean): void;
  (e: 'row-contextmenu', event: MouseEvent, row: Record<string, any>): void;
}>();

const rowKey = computed(() => props.rowKey ?? 'id');

// 当前是否已全部选中
const allSelected = computed(() => {
  if (!props.selectable) return false;
  if (!props.items.length) return false;
  return props.items.every((row) => props.selectedKeys?.includes(row[rowKey.value]));
});

const handleSort = (key: string) => {
  const col = props.columns.find((c) => c.key === key);
  if (col?.sortable === false) return;
  emit('sort', key);
};

const handleToggleAll = () => {
  emit('toggle-all', !allSelected.value);
};

const isSelected = (row: Record<string, any>) => {
  return props.selectedKeys?.includes(row[rowKey.value]);
};

// 单元格格式化：布尔值渲染对勾，其余直接输出
const formatCell = (val: unknown) => {
  if (typeof val === 'boolean') return val ? '✓' : '';
  return val as any;
};

// 处理行级右键菜单
const handleContextMenu = (event: MouseEvent, row: Record<string, any>) => {
  event.preventDefault();
  // 更新当前右键行并添加一次性点击监听以清除高亮
  contextRowKey.value = row[rowKey.value];

  const clearHighlight = () => {
    contextRowKey.value = null;
    document.removeEventListener('click', clearHighlight);
  };

  requestAnimationFrame(() => {
    document.addEventListener('click', clearHighlight, { once: true });
  });

  emit('row-contextmenu', event, row);
};

// 当前被右键的行主键
const contextRowKey = ref<string | number | null>(null);
</script>

<template>
  <div class="overflow-x-auto overflow-y-auto h-full px-3 pb-2 sm:px-3 lg:px-5 table-wrapper">
    <div class="inline-block min-w-full align-middle">
      <div class="relative ring-1 shadow-sm ring-black/5 rounded-md sm:rounded-lg h-full">
        <table class="min-w-full divide-y divide-gray-300">
          <!-- 表头 -->
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th v-if="props.selectable"
                class="pl-5 pr-0 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 z-10 first:rounded-tl-md">
                <input type="checkbox" :checked="allSelected" @change="handleToggleAll"
                  class="w-4 h-4 accent-green-600 transition-all duration-200 ease-in-out" />
              </th>
              <th v-for="col in props.columns" :key="col.key"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 z-10 select-none first:rounded-tl-md last:rounded-tr-md"
                :class="[
                  col.sortable !== false ? 'cursor-pointer' : '',
                  col.width ?? ''
                ]" @click="col.sortable !== false && handleSort(col.key)">
                <div class="flex items-center">
                  <span>{{ col.header }}</span>
                  <span v-if="props.sortKey === col.key" class="ml-1 text-xs inline-block w-2 text-gray-600">
                    {{ props.sortOrder === 'asc' ? '▲' : '▼' }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <!-- 内容 -->
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="row in props.items" :key="row[rowKey]" :class="[
              contextRowKey === row[rowKey]
                ? 'bg-green-50 hover:bg-green-50'
                : 'hover:bg-gray-100'
            ]" @contextmenu.prevent="handleContextMenu($event, row)">
              <td v-if="props.selectable" class="pl-5 pr-0 py-4">
                <input type="checkbox" :checked="isSelected(row)" @change="emit('toggle', row[rowKey])"
                  class="w-4 h-4 accent-green-600 transition-all duration-200 ease-in-out" />
              </td>
              <td v-for="col in props.columns" :key="col.key" class="px-3 py-4 text-sm whitespace-nowrap">
                {{ formatCell(row[col.key]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  /* 保留滚动条空间，并确保左右对称 */
  scrollbar-gutter: stable both-edges;
}
</style>