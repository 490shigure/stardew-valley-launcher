<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

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

// 搜索文本
const filterText = ref('');

// 计算需要展示的存档
const displaySaves = computed(() => {
  if (!filterText.value) return saves.value;
  const lower = filterText.value.toLowerCase();
  return saves.value.filter((save) =>
    Object.values(save).some((v) => String(v).toLowerCase().includes(lower)),
  );
});

// 模拟 mounted 时可能的初始化逻辑
onMounted(() => {
  // TODO: 读取磁盘存档列表并填充 saves
});
</script>

<template>
  <div class="flex-1 overflow-y-auto flex flex-col">
    <!-- 存档列表 -->
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle sm:px-3 lg:px-5">
        <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-5 py-3.5 text-left text-sm font-semibold text-gray-900">存档名</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">农场主</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">农场</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">最后游玩</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">季节 / 天</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">年份</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="save in displaySaves" :key="save.name" class="hover:bg-gray-100">
                <td class="px-5 py-4 whitespace-nowrap text-sm">{{ save.name }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">{{ save.farmer }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">{{ save.farmName }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">{{ save.lastPlayed }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">{{ save.seasonDay }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">{{ save.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 底部工具栏 -->
    <div class="flex items-center justify-start gap-3 sm:px-3 lg:px-5">
      <!-- 搜索框 -->
      <input
        v-model="filterText"
        type="text"
        placeholder="搜索存档..."
        class="w-fit border-1 border-gray-400 rounded-md p-2"
      />
      <!-- 右侧工具 -->
      <div class="flex items-center ml-auto gap-3">
        <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
          刷新
        </button>
        <button class="px-4 py-2 h-fit text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700">
          打开文件夹
        </button>
      </div>
    </div>
  </div>
</template> 