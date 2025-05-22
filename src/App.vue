<script setup lang="ts">
import Index from "@/index.vue";
import GlobalMenu from "@/components/common/GlobalMenu.vue";
import GlobalFooter from "@/components/common/GlobalFooter.vue";
import ModalContainer from "@/components/modals/ModalContainer.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <GlobalMenu />
    <Index class="flex-1" />
    <GlobalFooter />
    <ModalContainer />
  </div>
</template>