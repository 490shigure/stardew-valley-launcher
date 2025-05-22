<script setup lang="ts">
import Index from "@/index.vue";
import GlobalMenu from "@/components/GlobalMenu.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <GlobalMenu />
    <Index class="flex-1" />
    <GlobalFooter />
  </div>
</template>