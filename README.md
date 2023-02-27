### Hexlet tests and linter status:

[![Actions Status](https://github.com/Antony11659/backend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Antony11659/backend-project-46/actions)    <a href="https://codeclimate.com/github/Antony11659/backend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/10e691ae9b8d98a87cea/maintainability" /></a>    [![Test Coverage](https://api.codeclimate.com/v1/badges/10e691ae9b8d98a87cea/test_coverage)](https://codeclimate.com/github/Antony11659/backend-project-46/test_coverage)

# Description

*Difference generator* is a compare tool program that determines the difference between two data structures. This is a popular task. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files, for example http://www.jsondiff.com.


## Utility Features
- Support for different input formats: yaml, json.
- Report generation in the form of *plain text*, *stylish* and *json*.


## Usage example  *[( see example )](https://asciinema.org/a/nO47hrh9JzdDmUbEFpAjntXXq)*

```
#format plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

#format stylish (by default)
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
}

#format json
gendiff -f json filepath1.json filepath2.json

 {
   "name": "root",
     "rightBranch": [
       {
         'name':'common',
         'rightBranch': [
              ...
         ],
         'leftBranch': [
              ...
          ]
        },
     ],
     "leftBranch": [
       {'name': 'group2'}
     ]
  }
``` 
<<<<<<< HEAD
### See example: https://asciinema.org/a/nO47hrh9JzdDmUbEFpAjntXXq  

=======
>>>>>>> ae7adfc (check #2 correct README.md mistakes, fix parsers, rename buildASTree.js)

