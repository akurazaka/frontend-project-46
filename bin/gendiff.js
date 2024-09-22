#!/usr/bin/env node
import { program } from 'commander';
import compareFiles, { parseFile } from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    const result = compareFiles(data1, data2);
    console.log(result);
  })
  .parse();
