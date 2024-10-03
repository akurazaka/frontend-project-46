import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');

const cases = [
  ['stylish', readFile('expectedStylish.txt')],
  ['plain', readFile('expectedPlain.txt')],
  ['json', readFile('expectedJson.json')],
];

test.each(cases)('generateDiff with format "%s"', (format, expected) => {
  expect(generateDiff(filePath1, filePath2, format)).toEqual(expected);
});
