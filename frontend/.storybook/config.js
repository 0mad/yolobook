import { configure, addParameters } from '@storybook/react';
import '../styles/base.scss';

// global pre setting
addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'black', value: '#000000' },
  ],
});

// automatically import all files ending in *.stories.tsx
const req = require.context('../components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
