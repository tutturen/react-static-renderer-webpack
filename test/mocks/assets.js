import {
  TextComponent,
  ImgComponent,
  ListComponent,
} from './components';

export const getDefaultAssets = () => {
  const assets = {
    'text.js': {
      name: 'text',
      testSrc: TextComponent,
    },
    'text.js.map': {
      name: 'text.map',
    },
    'img.js': {
      name: 'img',
      testSrc: ImgComponent,
    },
    'img.js.map': {
      name: 'img.map',
    },
    'li.js': {
      name: 'li',
      testSrc: ListComponent,
    },
    'li.js.map': {
      name: 'li.map',
    },
  };
  return Object.freeze(assets);
};
