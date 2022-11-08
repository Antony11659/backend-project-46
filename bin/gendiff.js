#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const program = new Command();

const sortAndStringify = (array) => {
  const sortedArray = array.sort((a, b) => a[2].toUpperCase().localeCompare(b[2].toUpperCase()));
	 return `{\n${sortedArray.join(' \n')}\n}`;
};

export const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
	 return (keys.reduce((acc, el) => {
		  if (Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
			   if (obj1[el] === obj2[el]) {
				    acc.push(`  ${el}: ${obj1[el]}`);
				  } else {
					   acc.push(`- ${el}: ${obj1[el]}`);
					   acc.push(`+ ${el}: ${obj2[el]}`);
					 }
			 }
		  if (Object.hasOwn(obj1, el) && !Object.hasOwn(obj2, el)) {
			   acc.push(`- ${el}: ${obj1[el]}`);
			 }
		  if (!Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
			   acc.push(`+ ${el}: ${obj2[el]}`);
			 }
		    return acc;
		  }, []));
};

program
  .option('-f, --format <format>', 'output format', genDiff)
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .argument('<path1>')
  .argument('<path2>')
  .action((path1, path2) => {
	         const file1 = JSON.parse(fs.readFileSync(path.resolve(path1), 'utf8'));
	         const file2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
	         const array = genDiff(file1, file2);
	         console.log(sortAndStringify(array));
	         });

program.parse();
