#!/usr/bin/env node
import { parseArgs } from './cli/parse-args.js';
import { ArgumentError } from './errors/argument-error.js';

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    if (err instanceof ArgumentError) {
      console.error(`Ошибка аргументов: ${err.message}`);
      console.error('Запуск: node src/index.js --city "Москва" --days 3');
      process.exitCode = 1;
      return;
    }
    throw err;
  }

  if (args.help) {
    printHelp();
    return;
  }

  // Заглушка для проверки работы CLI.
  console.log('Города:', args.cities);
  console.log('Дней:', args.days);
  console.log('Без кэша:', args.noCache);
}

function printHelp() {
  console.log(`
Погодный дайджест (weather-digest)

Использование:
  node src/index.js --city "Москва" --days 3 [--no-cache]
  node src/index.js --city "Москва,Казань" --days 5

Параметры:
  --city     Название города или список городов через запятую (обязательно)
  --days     Количество дней прогноза, 1–7 (по умолчанию 3)
  --no-cache Игнорировать кэш и запросить данные заново
  --help     Показать эту справку
`);
}

main();