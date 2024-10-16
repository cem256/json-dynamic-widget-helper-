import * as vscode from 'vscode';
import { createWrappedObject, showErrorMessage, findJsonObjectAtSelection } from '../utils/utils';

export function wrapWithWidget(editor: vscode.TextEditor, wrapperType: string) {
  const { document, selection } = editor;
  const jsonObject = findJsonObjectAtSelection(document, selection);

  if (!jsonObject) {
    showErrorMessage("Error: Unable to find a valid JSON object.");
    return;
  }

  const wrappedObject = createWrappedObject(wrapperType, jsonObject.object);
  const wrappedJson = JSON.stringify(wrappedObject, null, 2);

  editor.edit(editBuilder => {
    const range = new vscode.Range(jsonObject.start, jsonObject.end);
    editBuilder.replace(range, wrappedJson);
  });
}
