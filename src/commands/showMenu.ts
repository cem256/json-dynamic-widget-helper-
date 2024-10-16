import * as vscode from 'vscode';
import { wrapWithWidget } from './wrapWithWidget';
import { removeChild } from './removeChild';

export async function showMenu() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const selectedText = editor.document.getText(selection).trim();

  if (selectedText !== 'type') {
    vscode.window.showErrorMessage('Error: You must select the "type" key (without quotation marks).');
    return;
  }

  const options = ['Wrap with widget...', 'Wrap with Column', 'Wrap with Row', 'Remove this widget'];
  const selectedAction = await vscode.window.showQuickPick(options, {
    placeHolder: 'Select an action to perform on the selected widget'
  });

  if (!selectedAction) {
    return;
  }

  switch (selectedAction) {
    case 'Wrap with Column':
      wrapWithWidget(editor, 'column');
      break;
    case 'Wrap with Row':
      wrapWithWidget(editor, 'row');
      break;
    case 'Wrap with widget...':
      const widgetType = await vscode.window.showInputBox({
        placeHolder: 'Enter the name of the widget to wrap with (e.g., Container, Padding)',
      });
      if (widgetType) {
        wrapWithWidget(editor, widgetType);
      } else {
        vscode.window.showErrorMessage('Error: You must enter a widget name.');
      }
      break;
    case 'Remove this widget':
      removeChild(editor);
      break;
  }
}
