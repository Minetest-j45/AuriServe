// if (process.env.NODE_ENV === 'development') require('preact/debug');

import * as Preact from 'preact';

import App from './components/App';

Preact.render(Preact.h(App, null), document.getElementById('root')!);
