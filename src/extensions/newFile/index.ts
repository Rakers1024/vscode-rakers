/**
 * @Author: zzc
 * @Date: 2023-11-29 09:44
 * @Description: 新建常用文件
 */

import * as vscode from "vscode";

export interface IPluginSettings {}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.newFile") as IPluginSettings;

/**
 *  新建文件
 * @param url  当前选中的文件夹
 * @param filename  新建文件的名称
 */
function createFile(url: vscode.Uri, filename: string, content?: string) {
  //判断select文件是否存在
  const file = vscode.Uri.joinPath(url, filename);
  vscode.workspace.fs.stat(file).then(
    () => {
      //文件存在
      vscode.window.showInformationMessage("文件已存在 已为您打开");
      //打开这个文件
      vscode.window.showTextDocument(file);
    },
    () => {
      //文件不存在
      vscode.workspace.fs.writeFile(file, new Uint8Array(Buffer.from(content || '')));
      //打开这个新建的文件
      vscode.window.showTextDocument(file);
    }
  );
}

export default function newFile(context: vscode.ExtensionContext) {

  const files = [
    "index.vue",
    "index.js",
    "index.ts",
    "index.jsx",
    "index.tsx",
    "page.tsx",
    "route.tsx",
    "trpc.ts",
    "index.css",
    "index.scss",
    "index.less",
  ];

  files.forEach(file => {
    const command = `vscode-rakers.newFile.${file}`;
    const registerCommand = vscode.commands.registerCommand(command, async (url: vscode.Uri) => {
      
      let content = '';
      try {
        // 获取模板文件路径
        const templatePath = vscode.Uri.joinPath(context.extensionUri, 'src', 'extensions', 'newFile', 'templates', `${file}.hbs`);
        
        // 读取模板文件内容
        const templateBuffer = await vscode.workspace.fs.readFile(templatePath);
        content = Buffer.from(templateBuffer).toString('utf-8');
      } catch (error) {
        console.error(`Failed to load template for ${file}:`, error);
        // 如果模板加载失败，使用空内容
      } finally {
        // 写入文件
        createFile(url, file, content);
      }
    });
    context.subscriptions.push(registerCommand);
  });
}
