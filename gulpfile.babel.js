'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import todo     from 'gulp-todoist';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import mocha    from 'gulp-mocha';
import chalk    from 'chalk';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpackHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

let root = 'client';

let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob);
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob);
};

let resolveToAPI = (glob = '') => {
  return path.join('server/api', glob);
};

let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'),
  serverTests: path.join('server/api/**/*.spec.js'),
  sass: resolveToApp('**/*.sass'),
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  componentTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  routerTemplates: path.join(__dirname, 'generator', 'router/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

gulp.task('todo', () => {
  return gulp.src(['client/app/**/*.js'])
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('webpack', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', ['todo'], () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    'webpack-hot-middleware/client?reload=true',
  ].concat(paths.entry);

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    proxy: "localhost:9000",
    open: false,
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddelware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.componentTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('router', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToAPI(), parentPath, name);

  return gulp.src(paths.routerTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath))
    .on('end', () => {
      console.log(chalk.green(`NEW ROUTER CREATED @ ${destPath}`));
      console.log(chalk.red(`DON'T FORGET TO ADD TO API.JS:`));
      console.log(chalk.yellow(`import ${cap(name)}Router    from './${name}/${name}.router';`));
      console.log(chalk.yellow(`ApiRouter.use('/${name}', ${cap(name)}Router);`));
    });
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

gulp.task('test', () => {
  return gulp.src(paths.serverTests, {
    read: false
  })
  .pipe(mocha({ reporter: 'spec' }))
  .once('end', process.exit);
});

gulp.task('default', ['watch']);
