// src/cli/parse-args.js
import { ArgumentError } from '../errors/argument-error.js';

const DEFAULT_DAYS = 3;
const MIN_DAYS = 1;
const MAX_DAYS = 7;

export function parseArgs(argv) {
  const result = {
    cities: [],
    days: DEFAULT_DAYS,
    noCache: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      result.help = true;
      continue;
    }

    if (arg === '--no-cache') {
      result.noCache = true;
      continue;
    }

    if (arg === '--city') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new ArgumentError('Не указано значение для --city');
      }
      result.cities = value
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      i += 1;
      continue;
    }

    if (arg === '--days') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new ArgumentError('Не указано значение для --days');
      }
      const days = Number(value);
      if (!Number.isInteger(days) || days < MIN_DAYS || days > MAX_DAYS) {
        throw new ArgumentError(
          `--days должен быть целым числом от ${MIN_DAYS} до ${MAX_DAYS}`,
        );
      }
      result.days = days;
      i += 1;
      continue;
    }

    throw new ArgumentError(`Неизвестный аргумент: ${arg}`);
  }

  if (!result.help && result.cities.length === 0) {
    throw new ArgumentError('Параметр --city обязателен');
  }

  return result;
}