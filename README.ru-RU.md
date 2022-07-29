<div align="center">
  <img alt="Icomoon Converter" src="https://github.com/digikid/icomoon-converter/raw/main/logo.svg" height="117" />
  <h1>Icomoon Converter</h1>
  <p>Конвертер проекта Icomoon в SASS / SVG файл.<br>Мгновенный импорт иконок в ваш проект.</p>
  <p>
    <a href="https://github.com/digikid/icomoon-converter/blob/main/README.md">English</a> | <b>Русский</b></p>
  <img src="https://img.shields.io/github/release/digikid/icomoon-converter.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/icomoon-converter.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/icomoon-converter.svg?style=flat-square&logo=appveyor" alt="MIT License">
</div>

## Преимущества

- Экспорт иконок в SASS / SCSS либо встраиваемый SVG файл
- Опции позволяют на лету задавать название, тип и форматирование выходного файла
- Написан на TypeScript

## Установка

```shell
npm i -g digikid/icomoon-converter
```

## Запуск

Перейдите в папку с проектом Icomoon, содержащую файл `selection.json` и запустите команду:

```shell
cd path/to/icomoon/project
icomoon-converter
```

После конвертации выходной файл будет сохранен в исходной директории.

## Параметры

| Параметр            | По умолчанию | Описание                                        |
|---------------------|--------------|-------------------------------------------------|
| <b>-n, --name</b>   | icomoon      | Название файла                                  |
| <b>-f, --format</b> | scss         | Формат файла (scss &#124; sass &#124; svg)      |
| <b>-i, --indent</b> | 2            | Размер отступа (&#60;number&#62; &#124; tab)    |
| <b>-t, --type</b>   | map          | Тип SASS файла (map &#124; var)                 |
| <b>-q, --quotes</b> | single       | Тип кавычек в SASS файле (single &#124; double) |
| <b>-m, --map</b>    | icons        | Имя SASS-карты                                  |

## Использование

В зависимости от формата выходного файла, вы можете использовать конвертер двумя способами:

- Добавить иконки в SASS / SCSS файл в виде [переменных](https://sass-lang.com/documentation/variables) или [карты](https://sass-lang.com/documentation/values/maps)
- Создать [SVG-спрайт](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) для последующего встраивания в HTML

### SASS переменные

```shell
icomoon-converter -t var
```

Для использования переменных импортируйте полученный файл в свой SASS проект. Название каждой переменной соответствует коду иконки.

```scss
import 'icons';

.awesome-icon {
  content: $awesome-icon;
  // ...
}
```

### SASS карта (map)

SASS карта генерируется по умолчанию, если параметр `-t` не передан:

```shell
icomoon-converter
```

Для работы с SASS картой помимо импорта файла вам потребуется использовать вспомогательные миксины:

```scss
import 'icons';

$icomoon-font-family: 'icomoon';

@mixin icomoon-base {
    font-family: $icomoon-font-family !important;
    font-weight: normal;
    font-style: normal;
    font-variant: normal;
    line-height: 1;
    text-transform: none;
    text-rendering: auto;
    speak: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@mixin icomoon($icon, $position: before, $replace: false) {
    @if $replace {
        font-size: 0;
    }

    &:#{$position} {
        content: map-get($icons, $icon);

        @include icomoon-base();

        @if $replace {
            font-size: 1rem;
        }

        @content;
    }
}
```

После этого вы сможете добавлять иконки, используя их код в качестве параметра для миксина:

```scss
.awesome-icon {
  @include icomoon(awesome-icon) {
    // ...
  }
}
```

### SVG-спрайт

```shell
icomoon-converter -t svg
```

Импортируйте файл в HTML и вставляйте иконки через добавление следующего кода:

```html
<svg class="awesome-icon">
    <use xlink:href="#awesome-icon"></use>
</svg>
```

## Команды

| Команда        | Описание                            |
|----------------|-------------------------------------|
| <b>config</b>  | Изменить настройки                  |
| <b>help</b>    | Показать раздел справки             |
| <b>restore</b> | Восстановить настройки по умолчанию |
| <b>version</b> | Показать текущую версию             |

### Изменение настроек

Настройки сохраняются локально и применяются при всех последующих запусках.

Чтобы изменить их, запустите команду `config`:

```shell
icomoon-converter config
```

Для того чтобы сбросить настройки до значений по умолчанию, воспользуйтесь командой `restore`:

```shell
icomoon-converter restore
```

### Раздел справки

Команда `help` отображает справочный раздел со списком доступных параметров и команд:

```shell
icomoon-converter help
```

### Текущая версия

Для просмотра текущей версии установленного пакета запустите команду `version`:

```shell
icomoon-converter version
```

## Лицензия

[The MIT License (MIT)](LICENSE)
