import expect from 'expect';
import React from 'react';
import _ from 'lodash';
import { renderSingleComponent, renderAssets } from '../src/renderer.js';
import { render, simpleRender } from './mocks/render.js';
import { getDefaultAssets } from './mocks/assets.js';

const TestComponent = () => (
  <div className="testClass">TestComponent</div>
);

describe('renderComponent()', () => {
  it('should render', () => {
    const defaultOptions = {
    };
    const options = {
      title: 'MegaComponent',
      bundle: 'mega.js',
      stylesheet: 'megastyle.css',
      render,
      favicon: 'favfav.svg',
      staticMarkup: true,
    };
    const result = renderSingleComponent(TestComponent, options, defaultOptions);
    const expectedSource = render(_.assign({}, options, {
      body: '<div class="testClass">TestComponent</div>',
    }));
    expect(result).toEqual(expectedSource);
    expect(result.length).toEqual(expectedSource.length);
  });
});

describe('renderAssets()', () => {
  it('should render with a simple method', () => {
    const sources = [
      { bundle: 'img.js' },
      { bundle: 'text.js' },
    ];
    const defaultOptions = {
      title: 'DefTitle',
      stylesheet: 'style.css',
      favicon: 'fav.svg',
      render: simpleRender,
      staticMarkup: true,
    };
    const result = renderAssets(
      sources,
      getDefaultAssets(),
      () => null,
      defaultOptions
    );
    const expectedResult = [
      {
        name: 'img.html',
        source: '<html><img src="img.jpg" alt="Test"/><script src="img.js"></script></html>',
      },
      {
        name: 'text.html',
        source: '<html><span>TextComponent</span><script src="text.js"></script></html>',
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});
