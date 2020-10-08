import { Disposable, ExtensionContext } from 'vscode';

export type ModuleType = (ctx?: ExtensionContext) => Disposable | Disposable[];
