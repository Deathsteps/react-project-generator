'use strict';

function list(val) {
  return val.split('+');
}

function extend(src, target){
  let ret = Object.assign({}, src);
  for(let k in target){
    if (typeof ret[k] === 'undefined')
      ret[k] = target[k];
    if (Array.isArray(ret[k]) && Array.isArray(target[k]))
      ret[k] = ret[k].concat(target[k]);
    else if(ret[k].toString() === '[object Object]' && target[k].toString() === '[object Object]')
      ret[k] = Object.assign(ret[k], target[k]);
    else
      ret[k] = target[k];
  }
  return ret;
}

// set up command parser
let program = require('commander');
program
  .version('0.1.0')
  .option('-n, --name <name>', 'project name')
  .option('-p, --path <path>', 'project path')
  .option('-c, --config <configs>', 'project configs', list)
  .parse(process.argv);

// build package json
let packageJSON = 
  program.config.reduce((result, item) => {
    return extend(result, require(`./${item}.dependencies.json`));
  }, require('./base.package.json'));
packageJSON.name = program.name;

let fs = require('fs')
let path = require('path')
fs.writeFile(
  path.join(program.path, 'package.json'),
  JSON.stringify(packageJSON, null, 2),
  'utf-8',
  function(err){
    err ? console.log(err) : console.log('package.json created.');
  });

let fileNameMapping = {};
// pick webpack config files
let webpackConfigFiles = [
  "webpack.config.js",
  "webpack.config.release.js"
]
if (program.config.indexOf('less') > -1) {
  webpackConfigFiles = webpackConfigFiles.map((item) => {
    let ret = "less." + item;
    fileNameMapping[ret] = item;
    return ret;
  });
}

// copy files
let files = ['.babelrc', '.eslintrc', '.gitignore', 'init.sh'].concat(webpackConfigFiles);
let cmds = files.map((file) => {
  let src = path.join(__dirname, file);
  let target = path.join(program.path, fileNameMapping[file] || file);
  return `cp ${src} ${target}`;
});
let exec = require('child_process').exec;
exec(cmds.join(' && '),
  (err, stdout, stderr) => {
    err ? console.log(err) :
      stderr ? console.log(stderr) :
        console.log('dev-tool files created.');
  });

// copy project directory
exec(`cp -r ${path.join(__dirname, 'project')} ${program.path}`,
  (err, stdout, stderr) => {
    err ? console.log(err) :
      stderr ? console.log(stderr) :
        console.log('project directory created.')
  });