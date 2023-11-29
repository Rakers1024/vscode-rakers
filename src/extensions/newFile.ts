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
function createFile(url: vscode.Uri, filename: string) {
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
      vscode.workspace.fs.writeFile(file, new Uint8Array());
      //打开这个新建的文件
      vscode.window.showTextDocument(file);
    }
  );
}

export default function newFile(context: vscode.ExtensionContext) {
  // index.vue
  let indexVue = vscode.commands.registerCommand("vscode-rakers.newFile.index.vue", (url: vscode.Uri) => {
    createFile(url, "index.vue");
  });
  context.subscriptions.push(indexVue);

  // index.js
  let indexJs = vscode.commands.registerCommand("vscode-rakers.newFile.index.js", (url: vscode.Uri) => {
    createFile(url, "index.js");
  });
  context.subscriptions.push(indexJs);

  // index.ts
  let indexTs = vscode.commands.registerCommand("vscode-rakers.newFile.index.ts", (url: vscode.Uri) => {
    createFile(url, "index.ts");
  });
  context.subscriptions.push(indexTs);

  // index.jsx
  let indexJsx = vscode.commands.registerCommand("vscode-rakers.newFile.index.jsx", (url: vscode.Uri) => {
    createFile(url, "index.jsx");
  });
  context.subscriptions.push(indexJsx);

  // index.tsx
  let indexTsx = vscode.commands.registerCommand("vscode-rakers.newFile.index.tsx", (url: vscode.Uri) => {
    createFile(url, "index.tsx");
  });
  context.subscriptions.push(indexTsx);

  // index.css
  let indexCss = vscode.commands.registerCommand("vscode-rakers.newFile.index.css", (url: vscode.Uri) => {
    createFile(url, "index.css");
  });
  context.subscriptions.push(indexCss);

  // index.scss
  let indexScss = vscode.commands.registerCommand("vscode-rakers.newFile.index.scss", (url: vscode.Uri) => {
    createFile(url, "index.scss");
  });
  context.subscriptions.push(indexScss);

  // index.less
  let indexLess = vscode.commands.registerCommand("vscode-rakers.newFile.index.less", (url: vscode.Uri) => {
    createFile(url, "index.less");
  });
}
