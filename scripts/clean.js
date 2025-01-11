import {rimrafSync} from 'rimraf';
import webpackPaths from '../configs/webpack.paths';
import process from 'process';

const args = process.argv.slice(2);

const commandMap = {
  dist: webpackPaths.distPath,
  release: webpackPaths.releasePath,
  ['dist']: webpackPaths.distPath,
  ['dist/main']: webpackPaths.distMainPath,
  ['dist/renderer']: webpackPaths.distRendererPath,
};

args.forEach((x) => {
  const pathToRemove = commandMap[x];
  if (pathToRemove !== undefined) {
    rimrafSync(pathToRemove);
  }
});
