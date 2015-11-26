DataGuise
=========

A simple data formatter.

Code badges:
[![Build Status](https://travis-ci.org/kawamanza/dataguise.svg?branch=master)](https://travis-ci.org/kawamanza/dataguise)
[![Coverage Status](https://coveralls.io/repos/kawamanza/dataguise/badge.svg?branch=master&service=github)](https://coveralls.io/github/kawamanza/dataguise?branch=master)
[![Code Climate](https://codeclimate.com/github/kawamanza/dataguise.png)](https://codeclimate.com/github/kawamanza/dataguise)
[![Dependency Status](https://david-dm.org/kawamanza/dataguise.svg)](https://david-dm.org/kawamanza/dataguise)

Project badges:
[![NodeJS Version](https://badge.fury.io/js/dataguise.svg)](http://badge.fury.io/js/dataguise)
[![GitHub version](https://badge.fury.io/gh/kawamanza%2Fdataguise.svg)](http://badge.fury.io/gh/kawamanza%2Fdataguise)
[![devDependency Status](https://david-dm.org/kawamanza/dataguise/dev-status.svg)](https://david-dm.org/kawamanza/dataguise#info=devDependencies)

[![NPM](https://nodei.co/npm/dataguise.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/dataguise)

Usage
=====

NodeJS:

```javascript
// Formatting a number for better viewing
var DataGuise = require("dataguise");
var toCurrency = DataGuise.compile("#.##0,00", {"reverse": true});
var balance = 1234567.89;
var formattedBalance = toCurrency( String(balance) );
// #=> 1.234.567,89
```

