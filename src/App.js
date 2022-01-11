import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRoute } from './components/common/routes';


export const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
}

export default App;
