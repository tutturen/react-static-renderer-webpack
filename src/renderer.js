import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import _ from 'lodash';

export const formatSources = (sources, assets) => {
  if (sources.length === 0) {
    const isNotJsMap = (src) => !_.includes(src, '.js.map');
    const nonMapKeys = _.filter(_.keys(assets), isNotJsMap);
    const bundles = _.map(nonMapKeys, (key) => ({ bundle: key }));
    return bundles;
  }
  return sources;
};

export const pickSingleAsset = (assets, source) => {
  const asset = _.pick(assets, source.bundle)[source.bundle];
  return _.assign({}, { file: asset }, source);
};

export const pickAssets = (sources = [], assets) => {
  const newSources = formatSources(sources, assets);
  return _.map(newSources, (source) => (
    pickSingleAsset(assets, source)
  ));
};

export const renderSingleComponent = (Component, options, defaultOptions) => {
  const renderOptions = _.assign({}, defaultOptions, options);
  const { staticMarkup, stylesheet, favicon, bundle, title, render } = renderOptions;
  const renderBody = staticMarkup ? renderToStaticMarkup : renderToString;
  const body = renderBody(<Component />);
  const doc = render({
    title,
    body,
    stylesheet,
    favicon,
    bundle,
  });

  return doc;
};

export const assetsToComponents = (assets, fetchSrc) => (
  _.map(assets, (asset) => (
    _.assign({}, asset, { component: asset.file.testSrc || fetchSrc(asset.file) })
  ))
);

export const renderComponents = (assets, defaultOptions) => (
  _.map(assets, (asset) => ({
    name: `${_.trimEnd(asset.bundle, '.js')}.html`,
    source: renderSingleComponent(asset.component, _.omit(asset, 'component'), defaultOptions),
  }))
);

export const renderAssets = (
  sources,
  assetList,
  fetchSrc,
  defaultOptions
) => {
  const assets = pickAssets(sources, assetList);
  const assetsWithComponents = assetsToComponents(assets, fetchSrc);
  return renderComponents(assetsWithComponents, defaultOptions);
};
