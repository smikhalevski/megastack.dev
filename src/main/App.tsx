import { createBrowserHistory, HistoryProvider } from 'react-corsair/history';
import { createRoute, redirect, Router, RouterProvider, useRoute } from 'react-corsair';
import React from 'react';
import {
  doubterReadmeRoute,
  landingPageRoute,
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
    createRoute('/:slug*?', () => redirect(landingPageRoute)),
  ],

  // notFoundComponent: () => redirect(landingPageRoute),

  errorComponent: () => <div>{'An error occurred'}</div>,

  loadingComponent: () => <div className={'spinner'} />,
});

history.subscribe(() => {
  const prevLocation = router.location;
  const nextLocation = history.location;

  if (prevLocation === null || prevLocation.pathname !== nextLocation.pathname) {
    // Page has changed
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } else if (prevLocation.hash !== nextLocation.hash) {
    // Anchor has changed
    console.log('Scroll to ', nextLocation.hash, document.getElementById(nextLocation.hash));
    document.getElementById(nextLocation.hash)?.scrollIntoView(true);
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
