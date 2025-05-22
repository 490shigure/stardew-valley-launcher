import { reactive, defineAsyncComponent, type Component, markRaw } from 'vue';

export type ModalName = 'settings' | 'version';

interface ModalState {
  settings: boolean;
  version: boolean;
}

const state = reactive<ModalState>({
  settings: false,
  version: false,
});

// 定义弹窗实例结构
interface ModalInstance {
  id: number;
  name: ModalName;
  component: Component;
  props?: Record<string, any>;
}

// 弹窗组件映射，按需异步加载
const componentMap: Record<ModalName, Component> = {
  settings: markRaw(defineAsyncComponent(() => import('@/components/modals/SettingsModal.vue'))),
  version: markRaw(defineAsyncComponent(() => import('@/components/modals/VersionModal.vue'))),
};

// 全局弹窗实例列表
const modals = reactive<ModalInstance[]>([]);

// 唯一 id 生成器
let uid = 0;

// 动态打开弹窗
const open = (name: ModalName, props?: Record<string, any>) => {
  // 标记状态（与旧逻辑兼容）
  state[name] = true;

  // 创建新实例并挂载
  uid += 1;
  modals.push({ id: uid, name, component: componentMap[name], props });
};

// 通过实例 id 关闭弹窗
const closeById = (id: number) => {
  const idx = modals.findIndex((m) => m.id === id);
  if (idx !== -1) {
    const modal = modals[idx];
    state[modal.name] = false; // 同步旧状态
    modals.splice(idx, 1);
  }
};

// 按名称关闭（关闭同名全部实例）
const close = (name: ModalName) => {
  // 复制 id 列表，避免遍历修改同一个数组
  const ids = modals.filter((m) => m.name === name).map((m) => m.id);
  ids.forEach(closeById);
};

// 导出工具方法
export function modalUtil() {
  return {
    state,
    modals,
    open,
    close,
    closeById,
  } as const;
} 