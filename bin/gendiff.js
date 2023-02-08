#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .option('-f, --format <format>', 'output format ( default: "stylish)"', 'stylish')
  .description('Compares two configuration files and shows a difference')
  .argument('<path1>')
  .argument('<path2>')
  .action((path1, path2, options) => {
    console.log(genDiff(path1, path2, options.format));
  });

program.parse();
