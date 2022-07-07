import { type IcomoonData } from './convert.js';
import { renderSVGSymbols, renderSASSIcons } from '../utils/render.js';

import { type IApp } from '../classes/App';

export type RenderMethod = (icons: IcomoonData[]) => string;

export default (function (this: IApp, icons) {
  const indent = this.fileIndent === 'tab' ? '\t' : (' ').repeat(parseFloat(this.fileIndent));

  if (this.fileFormat === 'svg') {
    return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">${renderSVGSymbols(icons, indent)}\r\n</svg>`;
  }

  if (['scss', 'sass'].includes(this.fileFormat)) {
    const quotesMap = {
      single: "'",
      double: '"',
    };

    const start = this.sassType === 'map' ? indent : '$';
    const end = this.fileFormat === 'sass' ? '' : ';';
    const quotes = quotesMap[this.sassQuotes in quotesMap ? this.sassQuotes : 'single'];

    let divider = '\r\n';

    if (this.sassType === 'map') {
      divider = `,${divider}`;
    }

    if (this.fileFormat === 'scss' && this.sassType === 'var') {
      divider = `;${divider}`;
    }

    if (icons.length) {
      const sassIcons = renderSASSIcons(icons, quotes, divider, start);

      if (this.sassType === 'map') {
        return `$${this.sassMapName}: (\r\n${sassIcons}\r\n)${end}`;
      }

      if (this.sassType === 'var') {
        return `${sassIcons}${end}`;
      }
    }

    return '// Icons list is empty.';
  }

  return '';
}) as RenderMethod;
