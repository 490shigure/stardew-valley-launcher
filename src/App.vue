<script setup lang="ts">
import { ref, onMounted } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { getCliArgs, type CliArgs } from "@/utils/cli";
import { localeMap } from "@/i18n";

const greetMsg = ref("");
const name = ref("");
const cliArgs = ref<CliArgs>({ args: [] });
const isLoadingArgs = ref(true);

async function greet() {
  greetMsg.value = await invoke("greet", { name: name.value });
}

// 在组件挂载时获取命令行参数
onMounted(async () => {
  isLoadingArgs.value = true;
  try {
    cliArgs.value = await getCliArgs();
  } catch (error) {
    console.error("获取命令行参数失败:", error);
  } finally {
    isLoadingArgs.value = false;
  }
});
</script>

<template>
  <!-- USE TailwindCSS classes for styling -->
  <main class="container">
    <h1 class="text-3xl font-bold">{{ $t('title') }}</h1>

    <select id="locale" v-model="$i18n.locale" class="w-fit border-1 border-gray-300 rounded-md p-2 m-2">
      <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
        {{ localeMap[locale as keyof typeof localeMap] }}</option>
    </select>

    <form class="row" @submit.prevent="greet">
      <input v-model="name" placeholder="Enter a name..." class="border-1 border-gray-300 rounded-md p-2 m-2" />
      <button type="submit" class="bg-yellow-500 text-white px-3 py-1 rounded-full">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>

    <!-- 命令行参数显示部分 -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-2">命令行参数</h2>
      <div v-if="isLoadingArgs" class="loading">加载中...</div>
      <div v-else-if="cliArgs.args.length === 0" class="no-args">
        没有命令行参数
      </div>
      <div v-else class="args-list">
        <div class="text-left">
          <div class="font-medium">参数列表:</div>
          <ul class="list-disc pl-6">
            <li v-for="(arg, index) in cliArgs.args" :key="index" class="text-sm">
              {{ arg }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.container {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>