/**
 * @Author: zzc
 * @Date: 2023/11/06 14:08
 * @Description: 使用代理去克隆仓库
 */

import * as vscode from "vscode";
import { showMessage } from "./utils";

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
          // vscode.commands.executeCommand("git.clone", res, "--config http.proxy=http://127.0.0.1:7890  --config https.proxy=http://127.0.0.1:7890", { proxy: "http://127.0.0.1:7890" });
          // vscode.commands.executeCommand(
          //   "git.clone",
          //   " --config http.proxy=http://127.0.0.1:7890 --config https.proxy=http://127.0.0.1:7890 " + res
          // );

          // 使用代理克隆
          const proxy = "http://127.0.0.1:7890";
          const config = `--config http.proxy=${proxy} --config https.proxy=${proxy}`;
          const cmd = `git clone ${config} ${res}`;
          // vscode.commands.executeCommand("workbench.action.terminal.sendSequence", {
          //   text: cmd + "\u000D"
          // });

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
