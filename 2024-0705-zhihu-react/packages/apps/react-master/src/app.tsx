import React, { FC } from 'react';
import { HashRouter, useRoutes } from 'react-router-dom';
import { router } from './router';

type Props = {
  name?: string
}

const Routers = () => useRoutes(router);

const App: FC<Props> = () => {

  return (
    <HashRouter>
      <Routers />
    </HashRouter>
  );
};

export default App;