/**
 * @Author: zzc
 * @Date: 2023/11/03 21:24
 * @Description: 右键复制名称
 */

import * as vscode from "vscode";
import clipboardy from "clipboardy";
import { showWarning } from "@/utils";

export default function copyFileName(context: vscode.ExtensionContext) {
  //Register command
  const copyFilename = vscode.commands.registerCommand("vscode-rakers.copyFileName", (uri, files) => {
    let accumulator = "";

    if (typeof files !== "undefined" && files.length > 0) {
      files.forEach((el: any, index: never) => {
        //get the relative url, parse it and take the last part
        let url = vscode.workspace.asRelativePath(el.path);
        let urlFormatted = url.replace(/\\/g, "/");
        accumulator += urlFormatted.split("/").pop();
        accumulator += index == files.length - 1 ? "" : "\n";
      });
    } else if (uri) {
      let url = vscode.workspace.asRelativePath(uri);
      let urlFormatted = url.replace(/\\/g, "/");
      accumulator += urlFormatted.split("/").pop();
    }

    //Copy the last part to clipboard
    clipboardy.write(accumulator).then(() => showWarning("文件名已复制到剪贴板"));
  });

  context.subscriptions.push(copyFilename);
}
