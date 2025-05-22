<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ModInfo } from '@/types/mod';

interface TableProps {
  mods: ModInfo[];
  sortKey: string;
  sortOrder: 'asc' | 'desc';
}

const props = defineProps<TableProps>();
const emit = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'sort', key: string): void;
}>();

const { t } = useI18n();

const handleSort = (key: string) => {
  emit('sort', key);
};

// 列配置，便于后续扩展排序/隐藏等功能
const columns = computed(() => [
  { key: 'enabled', header: '', width: 'w-10' },
  { key: 'name', header: t('index.body.mod_table_header.name') },
  { key: 'last_update', header: t('index.body.mod_table_header.last_update') },
  { key: 'version', header: t('index.body.mod_table_header.version') },
  { key: 'updatable', header: t('index.body.mod_table_header.updatable') },
]);
</script>

<template>
  <div class="overflow-x-auto">
    <div class="inline-block min-w-full py-2 align-middle sm:px-3 lg:px-5">
      <div class="ring-1 shadow-sm ring-black/5 sm:rounded-lg">
        <div class="max-h-96 overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <!-- 表头 -->
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th v-for="col in columns" :key="col.key"
                  class="group px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 select-none"
                  :class="[
                    col.key === 'enabled' ? 'pl-5 pr-0' : '',
                    col.key !== 'enabled' ? 'cursor-pointer hover:bg-gray-200' : ''
                  ]" @click="col.key !== 'enabled' && handleSort(col.key)">
                  <div class="flex items-center">
                    <span>{{ col.header }}</span>
                    <span v-if="props.sortKey === col.key" class="ml-1 text-xs">
                      {{ props.sortOrder === 'asc' ? '▲' : '▼' }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- 内容 -->
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="mod in props.mods" :key="mod.uniqueId" class="hover:bg-gray-100">
                <td class="pl-5 pr-0 py-4">
                  <input type="checkbox" :checked="mod.enabled" @change="emit('toggle', mod.uniqueId)"
                    class="w-4 h-4 accent-green-600 transition-all duration-200 ease-in-out" />
                </td>
                <td class="px-0 py-4 text-sm whitespace-nowrap">{{ mod.name }}</td>
                <td class="px-3 py-4 text-sm whitespace-nowrap">{{ mod.last_update }}</td>
                <td class="px-3 py-4 text-sm whitespace-nowrap">{{ mod.version }}</td>
                <td class="px-3 py-4 text-sm whitespace-nowrap">
                  <span v-if="mod.updatable">✓</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>