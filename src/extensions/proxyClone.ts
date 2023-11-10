/**
 * @Author: zzc
 * @Date: 2023/11/06 14:08
 * @Description: 使用代理去克隆仓库
 */

import * as vscode from "vscode";
import { showMessage } from "../utils";

export interface IPluginSettings {
  proxy: string;
  autoOpen: boolean;
}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.proxyClone") as IPluginSettings;

export default function proxyClone(context: vscode.ExtensionContext) {
  let cmd = vscode.commands.registerCommand("vscode-rakers.proxyClone", (e: vscode.Uri) => {
    // 让输入仓库地址
    vscode.window
      .showInputBox({
        prompt: "请输入仓库地址",
      })
      .then(res => {
        if (res) {
          // 使用代理克隆
          const proxy = settings.proxy;
          const config = `--config http.proxy=${proxy} --config https.proxy=${proxy}`;
          const cmd = `git clone ${config} ${res}`;

          //选择路径
          vscode.window
            .showOpenDialog({
              canSelectFiles: false,
              canSelectFolders: true,
              canSelectMany: false,
              openLabel: "选择路径",
            })
            .then(res => {
              if (res) {
                showMessage("开始克隆");
                //打开新终端
                vscode.commands.executeCommand("workbench.action.terminal.new");
                vscode.commands.executeCommand("workbench.action.terminal.sendSequence", {
                  text: `cd ${res[0].path} \u000D`,
                });
                vscode.commands.executeCommand("workbench.action.terminal.sendSequence", {
                  text: cmd + "\u000D",
                });
              }
            });
        }
      });
  });

  context.subscriptions.push(cmd);
}
