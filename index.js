#!/usr/bin/env node
var options = require('optimist')
    .options('c', {
        alias: 'command',
        demand: true,
        describe: 'identifiers'
    })
    .options('f', {
        alias: 'file',
        demand: true
    });

var argv = options.argv;

var arg = argv.c;

var commands = {
    identifiers: require('./src/identifiers.js')
};

if (commands[argv.c]) {
    commands[arg](argv);
} else {
    console.log(arg + " is not a valid command.");
    options.showHelp();
}