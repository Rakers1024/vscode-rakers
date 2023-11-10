/**
 * @Author: zzc
 * @Date: 2023/11/09 14:29
 * @Description: vscode扩展程序入口
 */

// 导入vscode扩展API模块并使用别名vscode引用它
import * as vscode from "vscode";
import copyFileName from "@/extensions/copyFileName";
import downloadFile from "@/extensions/downloadFile";
import openNewInstance from "@/extensions/openNewInstance";
import proxyClone from "@/extensions/proxyClone";
import makeFile from "@/extensions/makeFile";
import gitProxy from "@/extensions/gitProxy";

// 当您的扩展程序被激活时，将调用此方法
// 您的扩展程序在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
  // 使用控制台输出诊断信息（console.log）和错误（console.error）
  // 这行代码只会在您的扩展程序被激活时执行一次
  // console.log("恭喜，您的扩展程序“vscode-rakers”现在已激活！");
  // 命令已在package.json文件中定义
  // 现在使用registerCommand提供命令的实现
  // commandId参数必须与package.json中的command字段匹配
  // let disposable = vscode.commands.registerCommand("vscode-rakers.helloWorld", () => {
  // 您在此处放置的代码将在每次执行命令时执行
  // 显示一个消息框给用户
  // vscode.window.showInformationMessage("来自vscode-rakers的问候！");
  // });
  // context.subscriptions.push(disposable);

  // 右键复制文件名
  copyFileName(context);

  // 右键下载网络图片到本地
  downloadFile(context);

  // 打开新的实例
  openNewInstance(context);

  //代理克隆
  proxyClone(context);

  //创建副本
  makeFile(context);

  //Git仓库代理
  gitProxy(context);
}

// 当您的扩展程序被停用时，将调用此方法
export function deactivate() {}
