<script setup lang="ts">
import Index from "@/index.vue";
import GlobalMenu from "@/components/GlobalMenu.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
import ModalContainer from "@/components/ModalContainer.vue";

// 弹窗逻辑已移入全局 store，无需在此维护
</script>

<template>
  <div class="h-screen flex flex-col">
    <GlobalMenu />
    <Index class="flex-1" />
    <GlobalFooter />
    <ModalContainer />
  </div>
</template>