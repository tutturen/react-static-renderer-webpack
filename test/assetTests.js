import expect from 'expect';
import { pickAssets, pickSingleAsset } from '../src/renderer.js';
import { getDefaultAssets } from './mocks/assets.js';
import { TextComponent, ImgComponent, ListComponent } from './mocks/components.js';

describe('pickSingleAsset()', () => {
  it('picks a single asset', () => {
    const assets = getDefaultAssets();
    const source = { bundle: 'img.js', title: 'Img!' };
    const result = pickSingleAsset(assets, source);
    const expectedResult = {
      bundle: 'img.js',
      title: 'Img!',
      file: {
        testSrc: ImgComponent,
        name: 'img',
      },
    };
    expect(result).toEqual(expectedResult);
  });
});

describe('pickAssets()', () => {
  it('returns all files that arent maps by default', () => {
    const sources = [];
    const assets = getDefaultAssets();
    const result = pickAssets(sources, assets);
    const expectedResult = [
      { bundle: 'text.js', file: { name: 'text', testSrc: TextComponent } },
      { bundle: 'img.js', file: { name: 'img', testSrc: ImgComponent } },
      { bundle: 'li.js', file: { name: 'li', testSrc: ListComponent } },
    ];
    expect(result).toEqual(expectedResult);
  });

  it('returns assets selected by source', () => {
    const sources = [
      { bundle: 'text.js', title: 'Text!' },
      { bundle: 'li.js', title: 'List Item!' },
    ];
    const assets = getDefaultAssets();
    const result = pickAssets(sources, assets);
    const expectedResult = [
      {
        bundle: 'text.js',
        title: 'Text!',
        file: {
          testSrc: TextComponent,
          name: 'text',
        },
      },
      {
        bundle: 'li.js',
        title: 'List Item!',
        file: {
          testSrc: ListComponent,
          name: 'li',
        },
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});
