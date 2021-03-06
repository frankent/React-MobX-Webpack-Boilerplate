import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';
import a11y  from 'react-a11y';
import Store from './stores/Store';
import App from './components/App';
import {whyDidYouUpdate} from 'why-did-you-update';

const env = process.env.NODE_ENV;
const store = new Store();
window.store = store;

const consoleErrorReporter = ({error}) => {
  console.error(error);
  return <Redbox error={error} />;
};

consoleErrorReporter.propTypes = {
  error: React.PropTypes.error,
};

if(env === 'dev') {
  a11y(React);
  whyDidYouUpdate(React);
}

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    let AppNext = require('./components/App').default;
    render(
      <AppContainer>
        <AppNext store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
