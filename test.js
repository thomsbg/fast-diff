var _ = require('lodash');
var googlediff = require('googlediff');
var seedrandom = require('seedrandom');
var diff = require('./diff.js');

googlediff = new googlediff();

var ITERATIONS = 10000;
var ALPHABET = 'GATTACA';
var LENGTH = 100;

var seed = Math.floor(Math.random() * 10000);
var random = seedrandom(seed);

console.log('Running computing ' + ITERATIONS + ' diffs with seed ' + seed + '...');

console.log('Generating strings...');
var strings = [];
for(var i = 0; i <= ITERATIONS; ++i) {
  var chars = [];
  for(var l = 0; l < LENGTH; ++l) {
    var letter = ALPHABET.substr(Math.floor(random() * ALPHABET.length), 1);
    chars.push(letter);
  }
  strings.push(chars.join(''));
}

console.log('Running tests...');
for(var i = 0; i < ITERATIONS; ++i) {
  var result = diff(strings[i], strings[i+1]);
  var expected = googlediff.diff_main(strings[i], strings[i+1]);
  if (!_.isEqual(result, expected)) {
    console.log('Expected', expected);
    console.log('Result', result);
    throw new Error('Diff produced difference results.');
  }
}

console.log('Checking semantic cleanup...');
var verse1 = 'Particle man, particle man / Doing the things a particle can / What\'s he like? It\'s not important / Particle man';
var verse2 = 'Triangle man, triangle man / Triangle man hates person man / They have a fight, triangle wins / Triangle man';
var result = diff(verse1, verse2, true);
var expected = googlediff.diff_main(verse1, verse2);
googlediff.diff_cleanupSemantic(expected);

if (!_.isEqual(result, expected)) {
  console.log('Expected', expected);
  console.log('Result', result);
  throw new Error('Diff produced different semantic results.');
}

console.log("Success!");
