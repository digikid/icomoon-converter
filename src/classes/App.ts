import config, { type ConfigMethod } from '../methods/config.js';
import convert, { type ConvertMethod } from '../methods/convert.js';
import help, { type HelpMethod } from '../methods/help.js';
import init, { type InitMethod } from '../methods/init.js';
import render, { type RenderMethod } from '../methods/render.js';
import restore, { type RestoreMethod } from '../methods/restore.js';
import text, { type TextMethod } from '../methods/text.js';
import version, { type VersionMethod } from '../methods/version.js';

import { type Locale } from '../utils/locale.js';

import Store, { type IStore } from './Store.js';
import Logger, { type ILogger } from './Logger.js';

export interface IApp extends IStore {
  readonly locale: Locale;
  readonly log: ILogger;

  readonly rootPath: string;

  readonly config: ConfigMethod;
  readonly convert: ConvertMethod;
  readonly help: HelpMethod;
  readonly init: InitMethod;
  readonly render: RenderMethod;
  readonly restore: RestoreMethod;
  readonly text: TextMethod;
  readonly version: VersionMethod;
}

export default class App extends Store implements IApp {
  constructor(public locale: Locale) {
    super();

    this.log = new Logger(locale);
  }

  public log: ILogger;

  public rootPath = process.cwd();

  public config = config;

  public convert = convert;

  public help = help;

  public init = init;

  public render = render;

  public restore = restore;

  public text = text;

  public version = version;
}
