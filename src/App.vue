<script setup lang="ts">
import GlobalMenu from "@/components/GlobalMenu.vue";
import Index from "@/index.vue";

</script>

<template>
  <div class="global-container ">
    <!-- 全局菜单 -->
    <GlobalMenu />
    <!-- 主内容 -->
    <main>
      <Index />
    </main>
  </div>
</template>

<style scoped>
.global-container {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>