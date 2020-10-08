import { ExtensionContext } from 'vscode';

import { ModuleType } from './types';
import config, { extensionName } from './libs/config';
import { logError, logInfo } from './libs/log';
import { isReactProject } from './utils';

import * as commandModules from './command';
import * as editorModules from './editor';

process.on('uncaughtException', (err) => {
  logError(err, { wnd: false });
});

export const activate = async (ctx: ExtensionContext) => {
  logInfo(`${extensionName} Activated, v${config.version}`);

  if (!isReactProject()) {
    logInfo('Inactive');
    return;
  }

  const modules = Object.values({ ...commandModules, ...editorModules });
  modules.forEach((module: ModuleType) => {
    const disposables = module(ctx);

    ctx.subscriptions.push(
      ...(Array.isArray(disposables) ? disposables : [disposables])
    );
  });
};

export const deactivate = () => {
  logInfo('Deactivated');
};
