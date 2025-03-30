import { invoke } from '@tauri-apps/api/core';

/**
 * 命令行参数接口
 */
export interface CliArgs {
  args: string[];
}

/**
 * 获取应用启动时的命令行参数
 * @returns Promise<CliArgs> 包含命令行参数的Promise
 */
export async function getCliArgs(): Promise<CliArgs> {
  try {
    return await invoke('get_cli_args');
  } catch (error) {
    console.error('获取命令行参数失败:', error);
    return { args: [] };
  }
} 