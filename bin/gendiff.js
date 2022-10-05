#!/usr/bin/env node
import  { program } from 'commander';

const diff = (fale1, fale2) => {
  return `${fale1} / ${fale2}`;
};

program
       .arguments('<fale1>', '<fale2>')
       .option('-f, --format <format>', 'output format', diff )
       .description('Compares two configuration files and shows a difference')
       .version('0.0.1')
       .parse(process.argv);
