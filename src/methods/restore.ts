import inquirer from 'inquirer';

import { defaults, type IStoreParams } from '../classes/Store.js';
import { type IApp } from '../classes/App.js';

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export type RestoreMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('RESTORE_TITLE', 'bold');
  this.log.print('RESTORE_TEXT');

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'restore',
      message: this.text('RESTORE_QUESTION'),
      default: false,
    },
  ]);

  if (answers.restore) {
    this.store.clear();

    (Object.entries(defaults) as Entries<IStoreParams>).forEach(([key, value]) => this.store.set(key, value));
  }
}) as RestoreMethod;
