import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedStylish = readFile('expectedStylish.txt');
  const expectedPlain = readFile('expectedPlain.txt');
  const expectedJSON = readFile('expectedJson.json');

  expect(generateDiff(filePath1, filePath2)).toEqual(expectedStylish);
  expect(generateDiff(filePath1, filePath2, 'plain')).toEqual(expectedPlain);
  expect(generateDiff(filePath1, filePath2, 'json')).toEqual(expectedJSON);
});
