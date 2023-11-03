/**
 * @Author: zzc
 * @Date: 2023/11/03 21:26
 * @Description: 工具类
 */
import * as vscode from "vscode";

// const showError = (message: string) => vscode.window.showErrorMessage(`Copy filename: ${message}`);
// const showWarning = (message: string) => vscode.window.setStatusBarMessage(`${message}`, 3000);

// export { showError, showWarning };

export function showError(message: string) {
  vscode.window.showErrorMessage(`${message}`);
}

export function showWarning(message: string) {
  vscode.window.setStatusBarMessage(`${message}`, 3000);
}

//Message
export function showMessage(message: string) {
  vscode.window.showInformationMessage(`${message}`);
}
