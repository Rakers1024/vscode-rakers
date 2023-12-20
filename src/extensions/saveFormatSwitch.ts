/**
 * @Author: zzc
 * @Date: 2023-12-13 15:13
 * @Description: 保存格式化开关 在vscode底部状态栏加一个按钮，点击可以切换保存时是否保存格式化
 */

import * as vscode from "vscode";

export interface IPluginSettings {}

let saveFormatSwitchStatusBarItem: vscode.StatusBarItem;

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.saveFormatSwitch") as IPluginSettings;

export default function saveFormatSwitch(context: vscode.ExtensionContext) {
  let saveFormatSwitch = vscode.commands.registerCommand("vscode-rakers.saveFormatSwitch", (url: vscode.Uri) => {
    //判断当前是否开启了保存格式化
    const saveFormat = vscode.workspace.getConfiguration().get("editor.formatOnSave");
    if (saveFormat) {
      vscode.workspace
        .getConfiguration()
        .update("editor.formatOnSave", false)
        .then(() => {
          updateStatusBarItem();
        });
      // vscode.window.showInformationMessage("已关闭保存格式化");
      vscode.window.setStatusBarMessage("已关闭保存格式化", 3000);
    } else {
      vscode.workspace
        .getConfiguration()
        .update("editor.formatOnSave", true)
        .then(() => {
          updateStatusBarItem();
        });
      // vscode.window.showInformationMessage("已开启保存格式化");
      vscode.window.setStatusBarMessage("已开启保存格式化", 3000);
    }
  });
  context.subscriptions.push(saveFormatSwitch);

  // 在vscode底部状态栏加一个按钮 名称为格式化，点击可以切换保存时是否保存格式化
  saveFormatSwitchStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
  saveFormatSwitchStatusBarItem.command = "vscode-rakers.saveFormatSwitch";
  saveFormatSwitchStatusBarItem.show();
  context.subscriptions.push(saveFormatSwitchStatusBarItem);
  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
  updateStatusBarItem();
}
updateStatusBarItem();

function updateStatusBarItem(): void {
  if (!saveFormatSwitchStatusBarItem) return;
  saveFormatSwitchStatusBarItem.text = vscode.workspace.getConfiguration().get("editor.formatOnSave") ? "<>" : "</>";
}
