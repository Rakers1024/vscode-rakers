/**
 * @Author: zzc
 * @Date: 2023-11-11 00:51
 * @Description: 切换Vue标签
 */

import * as vscode from "vscode";

export interface IPluginSettings {}

const settings = vscode.workspace.getConfiguration().get("vscode-rakers.gitProxy") as IPluginSettings;

const getLinePosition = (doc: vscode.TextDocument, tag: string) => {
  const lineCount = doc.lineCount;
  let lineNumberTagMatch = -1;

  for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
    const lineText = doc.lineAt(lineNumber);
    const lineOfTag = lineText.text.startsWith(tag);

    if (lineOfTag) {
      lineNumberTagMatch = lineNumber;
    }
  }

  return lineNumberTagMatch;
};

const jumpToTag = (tag: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  if (editor.document.languageId === "vue") {
    const tagMatch = getLinePosition(editor.document, tag);

    if (tagMatch >= 0) {
      // Set cursor position
      const position = editor.selection.active;
      const newPosition = position.with(tagMatch, 0);
      const newSelection = new vscode.Selection(newPosition, newPosition);
      editor.selection = newSelection;

      // Set scroll position
      const startPosition = new vscode.Position(tagMatch, 0);
      const endPosition = new vscode.Position(editor.document.lineCount, 0);
      const range = new vscode.Range(startPosition, endPosition);
      editor.revealRange(range);
    }
  }
};

export default function switchVueTag(context: vscode.ExtensionContext) {
  let type = 0;
  let switchVueTag = vscode.commands.registerCommand("vscode-rakers.switchVueTag", (url: vscode.Uri) => {
    //依次执行
    if (type === 0) {
      jumpToTag("<template");
    } else if (type === 1) {
      jumpToTag("<script");
    } else if (type === 2) {
      jumpToTag("<style");
    }
    type++;
    if (type === 3) type = 0;
  });
  context.subscriptions.push(switchVueTag);
}
