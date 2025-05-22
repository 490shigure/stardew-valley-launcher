// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

// 定义用于存储命令行参数的结构体
#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct CliArgs {
    pub args: Vec<String>,
}

// 包装在Mutex中以便安全地访问和修改
struct CliArgsState(Mutex<CliArgs>);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 添加新命令来获取命令行参数
#[tauri::command]
fn get_cli_args(state: tauri::State<'_, CliArgsState>) -> Result<CliArgs, String> {
    let args = state.0.lock().map_err(|e| e.to_string())?;
    Ok(args.clone())
}

#[tauri::command]
fn exit_app(app: tauri::AppHandle) {
    // 优雅退出应用
    app.exit(0);
}

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
        .invoke_handler(tauri::generate_handler![greet, get_cli_args, exit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
