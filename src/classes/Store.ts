import path from 'path';
import ConfigStore from 'configstore';

import { __dirname } from '../utils/path.js';
import { readFile } from '../utils/fs.js';
import { parse as parseArgs } from '../utils/args.js';

const fileFormats = ['scss', 'sass', 'svg'] as const;
const sassTypes = ['map', 'var'] as const;
const sassQuotes = ['single', 'double'] as const;
const paramArgs = ['format', 'quotes', 'indent', 'map', 'name', 'type'] as const;

export type ParamArgsKeys = typeof paramArgs[number];
export type FileFormat = typeof fileFormats[number];
export type SassType = typeof sassTypes[number];
export type SassQuotes = typeof sassQuotes[number];

export interface IPackageJson {
  name: string;
  version: string;
  homepage: string;
  repository: {
    url: string;
  }
}

export interface IStoreParams {
  fileName: string;
  fileFormat: FileFormat;
  fileIndent: string;
  sassType: SassType;
  sassQuotes: SassQuotes;
  sassMapName: string;
}

export const defaults: IStoreParams = {
  fileName: 'icomoon',
  fileFormat: 'scss',
  fileIndent: '2',
  sassType: 'map',
  sassQuotes: 'single',
  sassMapName: 'icons',
};

export interface IStore {
  readonly store: ConfigStore;
  readonly packageJson: IPackageJson;
  readonly args: Record<ParamArgsKeys, boolean | string>;

  get fileName(): string;
  get fileFormat(): FileFormat;
  get fileIndent(): string;
  get sassType(): SassType;
  get sassQuotes(): SassQuotes;
  get sassMapName(): string;
}

export default class Store implements IStore {
  constructor() {
    this.packageJson = JSON.parse(
      readFile(path.join(__dirname, 'package.json')),
    );

    this.store = new ConfigStore(this.packageJson.name, defaults);
  }

  public store: ConfigStore;

  public packageJson: IPackageJson;

  public args = parseArgs<ParamArgsKeys>(paramArgs);

  get fileName(): string {
    return this.args.name || this.store.get('fileName');
  }

  get fileFormat(): FileFormat {
    const { format } = this.args;

    return fileFormats.includes(format as FileFormat) ? format : this.store.get('fileFormat');
  }

  get fileIndent(): string {
    const { indent } = this.args;

    if (typeof indent === 'string') {
      if (indent === 'tab' || !Number.isNaN(parseFloat(indent))) {
        return indent;
      }
    }

    return this.store.get('fileIndent');
  }

  get sassType(): SassType {
    const { type } = this.args;

    return sassTypes.includes(type as SassType) ? type : this.store.get('sassType');
  }

  get sassQuotes(): SassQuotes {
    const { quotes } = this.args;

    return sassQuotes.includes(quotes as SassQuotes) ? quotes : this.store.get('sassQuotes');
  }

  get sassMapName(): string {
    return this.args.map || this.store.get('sassMapName');
  }
}
