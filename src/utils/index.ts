import { workspace } from 'vscode';

import { logError } from '../libs/log';
import LANG from '../constants/lang';

export const isReactProject = (): boolean => {
  const project = workspace.workspaceFolders[0];

  if (!project) return false;

  try {
    const pkg = require(`${project.uri.fsPath}/package.json`);
    if (!pkg) throw new Error('project package.json is fail');

    const { dependencies, devDependencies } = pkg;
    const keys = Object.keys({ ...dependencies, ...devDependencies });
    const reg = /react\-intl/;

    return keys.some((key) => reg.test(key));
  } catch (e) {
    logError(e, { wnd: false });
    return false;
  }
};

export const normalizeLanguage = (locale: string) => {
  const ulocale = locale.toUpperCase();
  const lang = LANG.find((item) => {
    if (
      Array.isArray(item) &&
      item.length > 1 &&
      Array.isArray(item[1]) &&
      item[1].includes(locale)
    ) {
      return true;
    }

    if (typeof item === 'string' && ulocale === item.toUpperCase()) {
      return true;
    }
  });

  if (!lang) return undefined;
  if (Array.isArray(lang)) lang.shift();

  return lang;
};
