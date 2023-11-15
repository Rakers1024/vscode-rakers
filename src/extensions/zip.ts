/**
 * @Author: zzc
 * @Date: 2023-11-15 14:13
 * @Description: 压缩
 */

import * as vscode from "vscode";
import fs from "fs";
import archiver from "archiver";

export interface IPluginSettings {}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.zip") as IPluginSettings;

export default function zip(context: vscode.ExtensionContext) {
  let zip = vscode.commands.registerCommand("vscode-rakers.zip", (url: vscode.Uri) => {
    // 获取选中的文件或文件夹的路径
    const selectedPath = url.fsPath;

    // 判断选中的是文件还是文件夹
    const isDirectory = fs.lstatSync(selectedPath).isDirectory();

    // 获取压缩后的文件名
    let zipFileName = "";
    if (isDirectory) {
      zipFileName = `${selectedPath}.zip`;
    } else {
      zipFileName = `${selectedPath.substring(0, selectedPath.lastIndexOf("."))}.zip`;
    }

    // 创建压缩文件
    const output = fs.createWriteStream(zipFileName);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // 设置压缩级别
    });

    // 监听压缩过程中的错误
    archive.on("error", err => {
      throw err;
    });

    // 将压缩文件输出到指定路径
    archive.pipe(output);

    // 添加要压缩的文件或文件夹
    if (isDirectory) {
      archive.directory(selectedPath, false);
    } else {
      //@ts-ignore
      archive.file(selectedPath);
    }

    // 完成压缩
    archive.finalize();
  });
  context.subscriptions.push(zip);
}
