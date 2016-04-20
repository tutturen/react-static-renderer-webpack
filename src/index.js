import evaluate from 'eval';
import _ from 'lodash';
import { renderAssets } from './renderer';
import { name as packName } from '../package.json';

const fitComponentToWebpack = (comp) => ({
  name: comp.name,
  body: {
    source: () => comp.source,
    size: () => comp.source.length,
  },
});

const fetchSource = (asset) => {
  const src = evaluate(asset.source(), true);
  return _.has(src, 'default') ? src.default : src;
};

function ReactStaticRenderer({ sources = [], defaults }) {
  this.sources = sources;
  this.defaultOptions = _.assign({}, { staticMarkup: false }, defaults);
  if (!defaults.render) {
    throw new Error(`${packName} - Rendering-function missing.`);
  }
}

ReactStaticRenderer.prototype.apply = function apply(compiler) {
  compiler.plugin('emit', (compilation, cb) => {
    const assets = renderAssets(
      this.sources,
      compilation.assets,
      fetchSource,
      this.defaultOptions
    );

    const webpackAssets = _.map(assets, fitComponentToWebpack);

    _.each(webpackAssets, (asset) => {
      compilation.assets[asset.name] = asset.body; // eslint-disable-line
    });

    return cb();
  });
};

module.exports = ReactStaticRenderer;
