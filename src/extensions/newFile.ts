/**
 * @Author: zzc
 * @Date: 2023-11-29 09:44
 * @Description: 新建常用文件
 */

import * as vscode from "vscode";

export interface IPluginSettings {}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.newFile") as IPluginSettings;

export default function newFile(context: vscode.ExtensionContext) {
  let newFile = vscode.commands.registerCommand("vscode-rakers.newFile", (url: vscode.Uri) => {
    // 新建的文件列表
    const fileList = ["index.vue", "index.js", "index.jsx", "index.ts", "index.tsx", "style.scss", "style.less"];

    // 让用户选择
    vscode.window.showQuickPick(fileList).then(select => {
      if (select) {
        // 创建文件
        //判断select文件是否存在
        const file = vscode.Uri.joinPath(url, select);
        vscode.workspace.fs.stat(file).then(
          () => {
            //文件存在
            vscode.window.showInformationMessage("文件已存在 已为您打开");
            //打开这个文件
            vscode.window.showTextDocument(file);
          },
          () => {
            //文件不存在
            vscode.workspace.fs.writeFile(file, new Uint8Array());
            //打开这个新建的文件
            vscode.window.showTextDocument(file);
          }
        );
      }
    });
  });
  context.subscriptions.push(newFile);
}
