/**
 * @Author: zzc
 * @Date: 2023/11/06 14:08
 * @Description: 使用代理去克隆仓库
 */

import * as vscode from "vscode";

export default function proxyClone(context: vscode.ExtensionContext) {
  let cmd = vscode.commands.registerCommand("vscode-rakers.proxyClone", (e: vscode.Uri) => {
    // 让输入仓库地址
    vscode.window
      .showInputBox({
        prompt: "请输入仓库地址",
      })
      .then(res => {
        if (res) {
          // 执行克隆
          //   vscode.commands.executeCommand("git.clone", res);
          //使用代理克隆
          vscode.commands.executeCommand("git.clone", res, { proxy: "http://127.0.0.1:7890" });
        }
      });
  });

  context.subscriptions.push(cmd);
}
