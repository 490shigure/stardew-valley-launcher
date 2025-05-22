import { defineStore } from 'pinia';

export interface ModInfo {
  uniqueId: string;
  enabled: boolean;
  // 允许附带其他字段
  [key: string]: any;
}

interface State {
  mods: ModInfo[];
  originalEnabledMap: Record<string, boolean>;
}

export const useModsStore = defineStore('mods', {
  state: (): State => ({
    mods: [],
    originalEnabledMap: {},
  }),

  getters: {
    /** 当前所有已启用模组的 id 列表 */
    enabledIds: (state): string[] => state.mods.filter((m) => m.enabled).map((m) => m.uniqueId),

    /** 是否存在未保存的启用状态变更 */
    hasUnsavedChanges: (state): boolean => {
      return state.mods.some((m) => m.enabled !== state.originalEnabledMap[m.uniqueId]);
    },
  },

  actions: {
    /** 初始化 / 更新模组列表，并记录当前启用状态快照 */
    setMods(mods: ModInfo[]) {
      this.mods = mods;
      this.markSaved();
    },

    /** 切换指定模组的启用状态 */
    toggleMod(id: string) {
      const mod = this.mods.find((m) => m.uniqueId === id);
      if (mod) {
        mod.enabled = !mod.enabled;
      }
    },

    /** 将当前状态标记为已保存 */
    markSaved() {
      this.originalEnabledMap = Object.fromEntries(this.mods.map((m) => [m.uniqueId, m.enabled]));
    },
  },
}); 