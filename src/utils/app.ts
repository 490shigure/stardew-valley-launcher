import { invoke } from '@tauri-apps/api/core';

/**
 * 调用后端命令退出应用
 */
export async function exitApp(): Promise<void> {
  try {
    await invoke('exit_app');
  } catch (error) {
    console.error('退出应用失败:', error);
  }
} 