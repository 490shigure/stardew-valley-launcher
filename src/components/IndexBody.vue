<script setup lang="ts">
import { localeMap } from '@/i18n';
</script>

<template>
    <div class="flex flex-col h-full">
        <select id="locale" v-model="$i18n.locale" class="w-fit border-1 border-gray-300 rounded-md p-2 m-2">
            <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
                {{ localeMap[locale as keyof typeof localeMap] }}</option>
        </select>
    </div>
</template>
