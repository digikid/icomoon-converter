import path from 'path';

import { scanFiles, readFile, writeFileAsync } from '../utils/fs.js';
import { type IApp } from '../classes/App.js';

export interface IcomoonIconParams {
  paths: string[];
  attrs: string[];
  isMulticolor: boolean;
  isMulticolor2: boolean;
  tags: string[];
  grid: number;
  defaultCode?: number;
  colorPermutations?: Record<string, any>;
}

export interface IcomoonProperties {
  id: number;
  order: number;
  name: string;
  prevSize: number;
  code: number;
  ligatures?: string;
}

export interface IcomoonIcon {
  icon: IcomoonIconParams;
  attrs: Record<string, any>[];
  properties: IcomoonProperties,
  setIdx: number;
  setId: number;
  iconIdx: number;
}

export interface IcomoonFontMetadata {
  fontFamily: string;
  majorVersion: number;
  minorVersion: number;
}

export interface IcomoonFontMetrics {
  emSize: number;
  baseline: number;
  whitespace: number;
}

export interface IcomoonFontPref {
  prefix: string;
  metadata: IcomoonFontMetadata;
  metrics: IcomoonFontMetrics;
  embed: boolean;
  resetPoint?: number;
  autoHost?: boolean;
  showMetrics: boolean;
  showMetadata: boolean;
  showSelector?: boolean;
  showVersion?: boolean;
  noie8?: boolean;
  ie7?: boolean;
}

export interface IcomoonImagePref {
  prefix: string;
  png: boolean;
  useClassSelector: boolean;
  color: number;
  bgColor: number;
  classSelector: string;
  name?: string;
  height?: number;
  columns?: number;
  margin?: number;
  autoHost?: boolean;
}

export interface IcomoonPreferences {
  showGlyphs: boolean;
  showQuickUse: boolean;
  showQuickUse2: boolean;
  showSVGs: boolean;
  fontPref: IcomoonFontPref;
  imagePref: IcomoonImagePref;
  historySize: number;
  showCodes: boolean;
  gridSize: number;
  showLiga?: boolean;
  quickUsageToken?: Record<string, string>
}

export interface IcomoonFile {
  IcoMoonType: string;
  icons: IcomoonIcon[];
  height: number;
  metadata: Record<'name', string>;
  preferences: IcomoonPreferences
}

export interface IcomoonData {
  name: string;
  prefix: string;
  code: string;
  paths: string[];
  grid: number;
}

export type ConvertMethod = () => Promise<void>;

export default (async function (this: IApp) {
  try {
    const files = scanFiles(this.rootPath, {
      extensions: ['json'],
    }).map((file) => ({
      ...file,
      data: JSON.parse(readFile(file.path)),
    }));

    if (files.length) {
      const file = files.find(({ data }) => 'icons' in data);

      if (file) {
        const data = file.data as IcomoonFile;

        const icons = data.icons.reduce((acc, icon) => {
          const { name, code } = icon.properties;
          const { paths, grid } = icon.icon;
          const { prefix } = data.preferences.fontPref || data.preferences.imagePref;

          acc.push({
            name,
            prefix,
            code: code.toString(16),
            paths,
            grid,
          });

          return acc;
        }, [] as IcomoonData[]);

        if (!icons.length) {
          this.log.warning('CONVERT_FILE_EMPTY_ICONS');
        }

        const filePath = path.join(this.rootPath, `${this.fileName}.${this.fileFormat}`);
        const output = this.render(icons);

        try {
          await writeFileAsync(filePath, output);

          this.log.success('CONVERT_FILE_WRITE_SUCCESS');
          this.log.print(filePath, 'italic');
        } catch (e) {
          this.log.error('CONVERT_FILE_WRITE_ERROR', e);
        }
      } else {
        this.log.error('CONVERT_FILE_WRONG_FORMAT');
      }
    } else {
      this.log.error('CONVERT_FILE_NOT_FOUND');
    }
  } catch (e) {
    this.log.error('CONVERT_FILE_ERROR', e);
  }
}) as ConvertMethod;
