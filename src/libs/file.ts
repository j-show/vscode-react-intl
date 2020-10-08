import {} from 'vscode';
import { resolve, relative } from 'path';

import config from './config';

interface ILocale {
  intlPath: string;
  filePath: string;
  isDirectory: boolean;
  originLocale: string;
  lang: string;
}

const intlItems: { [key: string]: any } = {};

const getRelativePathByFilePath = (filePath: string) => {
  const rootPath = config.rootPath;
  const intlPaths = config.intlPaths
    .map((ph) => resolve(rootPath, ph))
    .sort((a, b) =>
      relative(filePath, a).length > relative(filePath, b).length ? 1 : -1
    );

  return intlPaths.shift() || '';
};

export const getIntlByFilePath = (filePath: string) => {
  const intlPath = getRelativePathByFilePath(filePath);
  let intl = intlItems[intlPath];

  if (!intl) setIntlByFilePath(intlPath);

  return intlItems[intlPath];
};

export const setIntlByFilePath = (intlPath: string) => {
  if (intlItems[intlPath]) return;

  intlItems[intlPath] = new IntlItems(intlPath);
};
