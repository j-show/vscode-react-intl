import { window } from 'vscode';

import { extensionName } from './config';

const channel = window.createOutputChannel(extensionName);

export const logInfo = (message: string, count: number = 0) => {
  channel.appendLine(`${'\t'.repeat(count)}${message}`);
};

export const logError = (
  err: Error | string,
  params?: { wnd?: boolean; count?: number }
) => {
  const { wnd = true, count = 0 } = params || {};

  if (wnd) {
    window.showErrorMessage(`${extensionName} Error: ${err.toString()}`);
  }

  if (typeof err === 'string') {
    logInfo(`Error: ${err}`, count);
  } else {
    logInfo(`Error: [${err.name}] ${err.message}\n${err.stack}`, count);
  }
};

export const logRaw = (...values: any[]) => {
  channel.appendLine(values.map((v) => v.toString()).join(' '));
};

export const logDivider = () => {
  channel.appendLine('\n===================\n');
};
