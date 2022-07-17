import inquirer from 'inquirer';
import isValidFilename from 'valid-filename';

import { type IApp } from '../classes/App.js';

export type ConfigMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('CONFIG_TITLE', 'bold');
  this.log.print('CONFIG_TEXT');

  const errorMessages = {
    file: 'CONFIG_ERROR_FILE',
    map: 'CONFIG_ERROR_MAP',
  } as const;

  const getValidator = (type: keyof typeof errorMessages) => {
    const message = this.text(errorMessages[type], 'bold', 'red');

    return ((name: string) => (isValidFilename(name) ? true : message));
  };

  const whenSass = (answers: any): boolean => ['scss', 'sass'].some((format) => answers.fileFormat === format);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'fileName',
      message: this.text('CONFIG_FILE_NAME'),
      default: this.store.get('fileName'),
      validate: getValidator('file'),
    },
    {
      type: 'list',
      name: 'fileFormat',
      message: this.text('CONFIG_FILE_FORMAT'),
      default: this.store.get('fileFormat'),
      choices: [{
        name: this.text('CONFIG_FILE_FORMAT_SCSS'),
        value: 'scss',
      }, {
        name: this.text('CONFIG_FILE_FORMAT_SASS'),
        value: 'sass',
      }, {
        name: this.text('CONFIG_FILE_FORMAT_SVG'),
        value: 'svg',
      }],
    },
    {
      type: 'input',
      name: 'fileIndent',
      message: this.text('CONFIG_FILE_INDENT'),
      default: this.store.get('fileIndent'),
    },
    {
      type: 'list',
      name: 'sassType',
      message: this.text('CONFIG_SASS_TYPE'),
      default: this.store.get('sassType'),
      choices: [{
        name: this.text('CONFIG_SASS_TYPE_MAP'),
        value: 'map',
      }, {
        name: this.text('CONFIG_SASS_TYPE_VAR'),
        value: 'var',
      }],
      when: whenSass,
    },
    {
      type: 'list',
      name: 'sassQuotes',
      message: this.text('CONFIG_SASS_QUOTES'),
      default: this.store.get('sassQuotes'),
      choices: [{
        name: this.text('CONFIG_SASS_QUOTES_SINGLE'),
        value: 'single',
      }, {
        name: this.text('CONFIG_SASS_QUOTES_DOUBLE'),
        value: 'double',
      }],
      when: whenSass,
    },
    {
      type: 'input',
      name: 'sassMapName',
      message: this.text('CONFIG_SASS_MAP_NAME'),
      default: this.store.get('sassMapName'),
      validate: getValidator('map'),
      when: ((answers) => whenSass(answers) && answers.sassType === 'map'),
    },
  ]);

  Object.entries(answers).forEach(([key, value]) => this.store.set(key, value));

  this.log.success('CONFIG_SUCCESS');
}) as ConfigMethod;
