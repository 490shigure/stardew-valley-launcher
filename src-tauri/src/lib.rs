// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
mod commands;

// 定义用于存储命令行参数的结构体
#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct CliArgs {
    pub args: Vec<String>,
}

// 包装在Mutex中以便安全地访问和修改
struct CliArgsState(Mutex<CliArgs>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // 获取环境参数
    let cli_args = CliArgs {
        args: std::env::args().collect(),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_opener::init())
        // 将命令行参数保存到应用状态中
        .manage(CliArgsState(Mutex::new(cli_args)))
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::get_cli_args,
            commands::exit_app
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
