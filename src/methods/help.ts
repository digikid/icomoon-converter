import commandLineUsage from 'command-line-usage';

import { type IApp } from '../classes/App.js';

export type HelpMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const sections = [
    {
      header: `${this.text('HELP_NAME')} ${this.packageJson.version}`,
      content: this.text('HELP_DESCRIPTION'),
    },
    {
      header: this.text('HELP_SYNOPSIS_TITLE'),
      content: [
        `$ ${this.packageJson.name} <options> <command>`,
        `$ ${this.packageJson.name} {bold --name} {underline icons} ...`,
        `$ ${this.packageJson.name} {bold -n} {underline icons} {bold -t} {underline svg} ...`,
      ],
    },
    {
      header: this.text('HELP_OPTIONS_TITLE'),
      optionList: [
        {
          name: 'name',
          alias: 'n',
          type: String,
          description: this.text('HELP_OPTIONS_FILE_NAME_TEXT'),
        },
        {
          name: 'format',
          alias: 'f',
          type: String,
          description: this.text('HELP_OPTIONS_FILE_FORMAT_TEXT'),
        },
        {
          name: 'indent',
          alias: 'i',
          type: String,
          description: this.text('HELP_OPTIONS_FILE_INDENT_TEXT'),
        },
        {
          name: 'type',
          alias: 't',
          type: String,
          description: this.text('HELP_OPTIONS_SASS_TYPE_TEXT'),
        },
        {
          name: 'quotes',
          alias: 'q',
          type: String,
          description: this.text('HELP_OPTIONS_SASS_QUOTES_TEXT'),
        },
        {
          name: 'map',
          alias: 'm',
          type: String,
          description: this.text('HELP_OPTIONS_SASS_MAP_NAME_TEXT'),
        },
      ],
    },
    {
      header: this.text('HELP_COMMANDS_TITLE'),
      content: [
        { name: 'config', summary: this.text('HELP_COMMANDS_CONFIG_TEXT') },
        { name: 'help', summary: this.text('HELP_COMMANDS_HELP_TEXT') },
        { name: 'restore', summary: this.text('HELP_COMMANDS_RESTORE_TEXT') },
        { name: 'version', summary: this.text('HELP_COMMANDS_VERSION_TEXT') },
      ],
    },
    {
      header: this.text('HELP_MORE_TITLE'),
      content: `${this.text('HELP_MORE_TEXT')} {underline ${this.packageJson.homepage}}`,
    },
  ];

  const usage = await commandLineUsage(sections);

  this.log.print(usage);
}) as HelpMethod;
