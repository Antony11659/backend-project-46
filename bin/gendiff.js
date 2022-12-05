#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import genDiff from '../index.js';

const program = new Command();

program
  .option('-f, --format <format>', 'output format', genDiff)
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .argument('<path1>')
  .argument('<path2>')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2));
  });

program.parse();
