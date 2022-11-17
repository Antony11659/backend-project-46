#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const program = new Command();

const sortAndStringify = (array) => {
  const sortedArray = array.sort((a, b) => a[2].toUpperCase().localeCompare(b[2].toUpperCase()));
  return `{\n${sortedArray.join(' \n')}\n}`;
};

program
  .option('-f, --format <format>', 'output format', genDiff)
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .argument('<path1>')
  .argument('<path2>')
  .action((path1, path2) => {
    const file1 = JSON.parse(fs.readFileSync(path.resolve(path1), 'utf8'));
    const file2 = JSON.parse(fs.readFileSync(path.resolve(path2), 'utf8'));
    console.log(genDiff(file1, file2));
  });

program.parse();
