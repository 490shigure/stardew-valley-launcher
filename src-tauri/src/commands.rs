use tauri::{AppHandle, State};

use super::{CliArgs, CliArgsState};

// 问候命令
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 获取启动时命令行参数
#[tauri::command]
pub fn get_cli_args(state: State<'_, CliArgsState>) -> Result<CliArgs, String> {
    let args = state.0.lock().map_err(|e| e.to_string())?;
    Ok(args.clone())
}

// 退出应用
#[tauri::command]
pub fn exit_app(app: AppHandle) {
    app.exit(0);
}
