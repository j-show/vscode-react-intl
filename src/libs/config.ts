import { extensions, workspace } from 'vscode';
import { resolve } from 'path';

import { normalizeLanguage } from '../utils';

export const extensionAuthor = 'jShow';
export const extensionName = 'react-local';

const INTL_PATHS_KEY = 'intlPaths';
const MAIN_LOCALE_KEY = 'mainLocale';

const extensionId = `${extensionAuthor}.${extensionName}`;

export const getConfig = (key: string): any => {
  return workspace.getConfiguration(extensionName).get(key);
};

export const setConfig = (
  key: string,
  value: any,
  isGlobal: boolean = false
) => {
  workspace.getConfiguration(extensionName).update(key, value, isGlobal);
};

export default class Config {
  static get rootPath() {
    const workspaceFolders = workspace.workspaceFolders;
    if (!workspaceFolders || !workspaceFolders.length) return '';

    return workspaceFolders[0].uri.fsPath;
  }

  static get extension() {
    return extensions.getExtension(extensionId);
  }

  static get version() {
    return this.extension.packageJSON.version;
  }

  static get intlPaths() {
    const root = this.rootPath;
    const paths = getConfig(INTL_PATHS_KEY);
    const relativePaths: string[] = paths ? paths.split(',') : [];

    return relativePaths.map((item) => resolve(root, item));
  }

  static get mainLocale() {
    const locale = getConfig(MAIN_LOCALE_KEY) || 'zh-CN';

    return normalizeLanguage(locale);
  }
}
