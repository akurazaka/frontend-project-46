### Hexlet tests and linter status:
[![Actions Status](https://github.com/akurazaka/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/akurazaka/frontend-project-46/actions)  [![Maintainability](https://api.codeclimate.com/v1/badges/2d032859044a30d353fa/maintainability)](https://codeclimate.com/github/akurazaka/frontend-project-46/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/2d032859044a30d353fa/test_coverage)](https://codeclimate.com/github/akurazaka/frontend-project-46/test_coverage)

# Вычислитель отличий
«Вычислитель отличий» — это специализированная программа, предназначенная для выявления различий между двумя структурами данных. Она находит широкое применение в таких областях, как автоматизированное тестирование, где помогает в сравнении результатов, а также в системах контроля версий, позволяя эффективно отслеживать изменения в конфигурационных файлах. Этот механизм не только упрощает процесс анализа данных, но и повышает точность выявления несоответствий, что делает его незаменимым инструментом для разработчиков и системных администраторов.

## Поддержка разных входных форматов: yaml, yml, json

## Установка

1. Клонирование репозитория:

   ```bash
   git clone https://github.com/vladislav-gh-dump/frontend-project-46.git

2. Переход в директорию проекта:
    
    cd frontend-project-46

3. Установка необходимых модулей:

    npm ci
4. Установка пакета в систему

    npm link

### Примеры использования
Вывод справочной информации:
  gendiff -h

Определение разницы между двумя структурами данных (по-умолчанию формат вывода stylish)

//формат stylish
$ gendiff --format stylish filepath1 filepath2

//формат plain
gendiff --format plain filepath1 filepath2

//формат json
gendiff --format json filepath1 filepath2