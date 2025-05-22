<script setup lang="ts">
// 组件使用 $attrs 继承 class/style
</script>

<template>
  <svg v-bind="$attrs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H21V21H3V3Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 9H21" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 21V9" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template> 