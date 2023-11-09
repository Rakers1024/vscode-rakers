/**
 * @Author: zzc
 * @Date: 2023/11/06 12:56
 * @Description: 打开新的实例
 */

import * as vscode from "vscode";

export default function openNewInstance(context: vscode.ExtensionContext) {
  let cmd1 = vscode.commands.registerCommand("vscode-rakers.openNewInstance", (e: vscode.Uri) => {
    vscode.commands.executeCommand("vscode.openFolder", e, true);
  });

  let cmd2 = vscode.commands.registerCommand("vscode-rakers.scopeToHere", (e: vscode.Uri) => {
    vscode.commands.executeCommand("vscode.openFolder", e, false);
  });

  context.subscriptions.push(cmd1);
  context.subscriptions.push(cmd2);
}
