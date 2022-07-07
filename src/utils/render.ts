import { type IcomoonData } from '../methods/convert.js';

export const renderSVGPaths = (icon: IcomoonData, indent: string): string => {
  const output: string[] = [];

  icon.paths.forEach((path) => output.push(`<path d="${path}" fill="none"></path>`));

  return output.map((path) => `\r\n${indent}${path}`).join('');
};

export const renderSVGSymbol = (icon: IcomoonData, indent: string): string => {
  const { name, prefix, grid } = icon;

  return `\r\n${indent}<symbol id="${prefix}${name}" viewBox="0 0 ${grid} ${grid}">${renderSVGPaths(icon, indent.repeat(2))}\r\n${indent}</symbol>`;
};

export const renderSVGSymbols = (icons: IcomoonData[], indent: string): string => icons.reduce((acc, icon) => `${acc}${renderSVGSymbol(icon, indent)}`, '');

export const renderSASSIcons = (icons: IcomoonData[], quotes: string, divider: string, start: string): string => {
  const output: string[] = [];

  icons.forEach((icon) => {
    const name = /^\d/.test(icon.name) ? `_${icon.name}` : icon.name;

    output.push(`${start}${name}: ${quotes}\\${icon.code}${quotes}`);
  });

  return output.join(divider);
};
