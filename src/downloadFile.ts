/**
 * @Author: zzc
 * @Date: 2023/11/03 21:34
 * @Description: 右键下载网络图片到本地
 */

import * as vscode from "vscode";
import { showMessage } from "@/utils";
import fs from "fs";
import axios from "axios";

export default function downloadFile(context: vscode.ExtensionContext) {
  //Register command
  const downloadFile = vscode.commands.registerCommand("vscode-rakers.downloadFile", (uri, files) => {
    //限制请在文件夹上右键
    if (typeof files === "undefined") {
      showMessage("请在文件夹上右键");
      return;
    }

    // 要求输入网络文件地址
    vscode.window
      .showInputBox({
        placeHolder: "请输入网络文件地址",
        prompt: "请输入网络文件地址",
        value: "",
        ignoreFocusOut: true,
        validateInput: text => {
          return text ? "" : "请输入网络文件地址";
        },
      })
      .then(url => {
        if (url) {
          showMessage("开始下载文件：" + url);

          //判断是否是网络地址
          if (!url.startsWith("http")) {
            showMessage("请输入网络文件地址");
            return;
          }

          // 使用axios下载图片
          axios({
            method: "get",
            url,
            responseType: "stream",
          }).then((res: any) => {
            // 获取文件名
            const filename = url.split("/").pop() || "download";
            // 获取文件后缀
            const ext = filename.split(".").pop();
            // 获取文件存储路径
            const filePath = uri.fsPath + "/" + filename;

            // 创建写入流
            const writer = fs.createWriteStream(filePath);

            // 管道读入写入流
            res.data.pipe(writer);

            // 下载完成
            writer.on("finish", () => {
              showMessage("下载完成");
            });

            // 下载失败
            writer.on("error", () => {
              showMessage("下载失败");
            });
          });
        }
      });
  });

  context.subscriptions.push(downloadFile);
}
