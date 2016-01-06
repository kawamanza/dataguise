DataGuise
=========

A simple data formatter.

Code badges:  
[![Build Status](https://travis-ci.org/kawamanza/dataguise.svg?branch=master)](https://travis-ci.org/kawamanza/dataguise)
[![Coverage Status](https://coveralls.io/repos/kawamanza/dataguise/badge.svg?branch=master&service=github)](https://coveralls.io/github/kawamanza/dataguise?branch=master)
[![Code Climate](https://codeclimate.com/github/kawamanza/dataguise.png)](https://codeclimate.com/github/kawamanza/dataguise)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/4bb786e81f4d47a98b32ea83d4642b67)](https://www.codacy.com/app/manzan/dataguise)
[![bitHound Code](https://www.bithound.io/github/kawamanza/dataguise/badges/code.svg)](https://www.bithound.io/github/kawamanza/dataguise)
[![bitHound Dependencies](https://www.bithound.io/github/kawamanza/dataguise/badges/dependencies.svg)](https://www.bithound.io/github/kawamanza/dataguise/master/dependencies/npm)
[![Dependency Status](https://david-dm.org/kawamanza/dataguise.svg)](https://david-dm.org/kawamanza/dataguise)

Project badges:  
[![NodeJS Version](https://badge.fury.io/js/dataguise.svg)](http://badge.fury.io/js/dataguise)
[![GitHub version](https://badge.fury.io/gh/kawamanza%2Fdataguise.svg)](http://badge.fury.io/gh/kawamanza%2Fdataguise)
[![bitHound Overalll Score](https://www.bithound.io/github/kawamanza/dataguise/badges/score.svg)](https://www.bithound.io/github/kawamanza/dataguise)
[![bitHound Dev Dependencies](https://www.bithound.io/github/kawamanza/dataguise/badges/devDependencies.svg)](https://www.bithound.io/github/kawamanza/dataguise/master/dependencies/npm)
[![devDependency Status](https://david-dm.org/kawamanza/dataguise/dev-status.svg)](https://david-dm.org/kawamanza/dataguise#info=devDependencies)

[![NPM](https://nodei.co/npm/dataguise.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/dataguise)

Usage
=====

NodeJS:

```javascript
// Formatting a number for better viewing
var DataGuise = require("dataguise");
var toCurrency = DataGuise.compile("#.##0,00", {"reverse": true});
console.log( toCurrency("1234567.89") );
// #=> 1.234.567,89
```

