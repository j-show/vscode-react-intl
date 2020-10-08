import { commands, window, workspace } from 'vscode';
import { relative, parse, sep, ParsedPath } from 'path';

import COMMAND from '../constants/command';

import config from '../libs/config';
import { getIntlByFilePath } from '../libs/file';

type EventKey = (key: string) => string;

const toCamelCase = (value: string) =>
  value.replace(/(-\w)/g, (val) => val[1].toUpperCase());

const getDefaultKey = (ph: ParsedPath, transform: EventKey) => {
  let keys = ph.dir.split(sep).splice(1).concat(ph.name).map(toCamelCase);

  if (keys.length > 1) keys = keys.splice(1);

  return transform(`${keys.join('.')}.${Math.random().toString().substr(-6)}`);
};

interface IProps {
  filepath: string;
  text: string;
  keyReplace: EventKey;
  promptText?: string;
  keyTransform?: EventKey;
  defaultKeyTransform?: EventKey;
}

const onExtract = async ({
  filepath,
  text,
  keyReplace,
  promptText = '',
  keyTransform = (key) => key,
  defaultKeyTransform = (key) => key,
}: IProps) => {
  const relativePath = parse(relative(config.rootPath, filepath));
  const defaultKey = getDefaultKey(relativePath, defaultKeyTransform);

  let key = await window.showInputBox({
    prompt: promptText,
    valueSelection: [defaultKey.lastIndexOf('.') + 1, defaultKey.length],
    value: defaultKey,
  });

  if (!key) return;
  key = keyTransform(key);

  const intl = getIntlByFilePath(filepath);

  if (intl && !key.includes('.')) {
    key = `common.${key}`;
  }

  // const intl =
};

export const extract = () => {
  commands.registerCommand(COMMAND.extract, onExtract);
};
