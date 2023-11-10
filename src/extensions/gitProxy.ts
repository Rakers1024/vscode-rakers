/**
 * @Author: zzc
 * @Date: 2023-11-10 23:23
 * @Description: Git仓库代理
 */

import * as vscode from "vscode";

export interface IPluginSettings {
  proxy: string;
}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.gitProxy") as IPluginSettings;

export default function gitProxy(context: vscode.ExtensionContext) {
  let gitProxy = vscode.commands.registerCommand("vscode-rakers.gitProxy", (url: vscode.Uri) => {
    const proxy = settings.proxy;
    const terminal = vscode.window.createTerminal();
    terminal.show();
    terminal.sendText(`git config --local http.proxy ${proxy}`);
    terminal.sendText(`git config --local https.proxy ${proxy}`);
  });
  context.subscriptions.push(gitProxy);
  let gitProxyCancel = vscode.commands.registerCommand("vscode-rakers.gitProxyCancel", (url: vscode.Uri) => {
    const terminal = vscode.window.createTerminal();
    terminal.show();
    terminal.sendText(`git config --local --unset http.proxy`);
    terminal.sendText(`git config --local --unset https.proxy`);
  });
  context.subscriptions.push(gitProxyCancel);
}
