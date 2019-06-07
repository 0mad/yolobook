import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../styles/base.scss';

// global pre setting
addParameters({
  backgrounds: [
    { name: 'gray', value: 'gray', default: true },
    { name: 'white', value: '#ffffff' },
    { name: 'black', value: '#000000' },
  ],
});

addDecorator(withKnobs);

// automatically import all files ending in *.stories.tsx
const req = require.context('../components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
