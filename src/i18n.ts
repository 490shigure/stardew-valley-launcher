import { createI18n } from 'vue-i18n'
import messages from "@intlify/unplugin-vue-i18n/messages";

export const supportedLocales = ["en", "zh"] as const;
export const localeMap = {
    en: "English",
    zh: "中文",
}

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    availableLocales: supportedLocales,
    messages: messages,
});

export const setLocale = (locale: typeof supportedLocales[number]) => {
    i18n.global.locale.value = locale;
}

export const getLocale = (): string => {
    return i18n.global.locale.value;
}


