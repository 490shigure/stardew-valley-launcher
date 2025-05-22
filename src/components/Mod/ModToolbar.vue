<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// 与父组件保持一致的枚举
enum ModStatus {
  All = 'all',
  Enabled = 'enabled',
  Disabled = 'disabled',
  Updatable = 'updatable',
}

const props = defineProps<{
  filterText: string;
  modStatus: ModStatus;
}>();

const emit = defineEmits<{
  (e: 'update:filterText', value: string): void;
  (e: 'update:modStatus', value: ModStatus): void;
  (e: 'checkUpdate'): void;
  (e: 'refresh'): void;
}>();

// 处理 v-model
const localFilterText = computed({
  get: () => props.filterText,
  set: (val: string) => emit('update:filterText', val),
});

const localModStatus = computed({
  get: () => props.modStatus,
  set: (val: ModStatus) => emit('update:modStatus', val),
});

const { t } = useI18n();
</script>

<template>
  <div class="flex items-center justify-start gap-3 sm:px-3 lg:px-5">
    <!-- 模组状态筛选 -->
    <select
      id="mod_status"
      v-model="localModStatus"
      class="w-fit border-1 border-gray-300 rounded-md p-2"
    >
      <option v-for="status in Object.values(ModStatus)" :key="status" :value="status">
        {{ t(`index.body.mod_status.${status}`) }}
      </option>
    </select>

    <!-- 搜索框 -->
    <input
      type="text"
      v-model="localFilterText"
      :placeholder="t('index.body.search_placeholder')"
      class="w-fit border-1 border-gray-400 rounded-md p-2"
    />

    <!-- 右侧按钮区域 -->
    <div class="flex items-center ml-auto gap-3">
      <button
        class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700"
        @click="emit('checkUpdate')"
      >
        {{ t('index.body.mod_table_tools_btn.check_update') }}
      </button>
      <button
        class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700"
        @click="emit('refresh')"
      >
        {{ t('index.body.mod_table_tools_btn.refresh') }}
      </button>
    </div>
  </div>
</template> 