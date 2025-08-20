import { createBrowserHistory, HistoryProvider } from 'react-corsair/history';
import { createRoute, redirect, Router, RouterProvider } from 'react-corsair';
import React from 'react';
import {
  doubterReadmeRoute,
  landingPageRoute,
  racehorseReadmeRoute,
  reactCorsairReadmeRoute,
  reactExecutorReadmeRoute,
  roqueformReadmeRoute,
} from './routes.js';

const history = createBrowserHistory();

const router = new Router({
  routes: [
    landingPageRoute,
    doubterReadmeRoute,
    reactExecutorReadmeRoute,
    reactCorsairReadmeRoute,
    roqueformReadmeRoute,
    racehorseReadmeRoute,
    createRoute('/:slug*?', () => redirect(landingPageRoute)),
  ],

  // notFoundComponent: () => redirect(landingPageRoute),

  errorComponent: () => <div>{'An error occurred'}</div>,

  loadingComponent: () => <div className={'spinner'} />,
});

history.subscribe(() => {
  if (router.location?.pathname !== history.location.pathname) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  router.navigate(history.location);
});

router.subscribe(event => {
  if (event.type === 'redirect') {
    history.replace(event.to);
  }
});

router.navigate(history.location);

export function App() {
  return (
    <HistoryProvider value={history}>
      <RouterProvider value={router} />
    </HistoryProvider>
  );
}
