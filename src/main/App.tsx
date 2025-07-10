import { createBrowserHistory, HistoryProvider } from 'react-corsair/history';
import { Router, RouterProvider } from 'react-corsair';
import React from 'react';
import {
  doubterReadmeRoute,
  landingPageRoute,
  reactCorsairReadmeRoute,
  reactExecutorReadmeRoute,
  roqueformReadmeRoute,
} from './routes';

const history = createBrowserHistory();

const router = new Router({
  routes: [
    landingPageRoute,
    doubterReadmeRoute,
    reactExecutorReadmeRoute,
    reactCorsairReadmeRoute,
    roqueformReadmeRoute,
  ],
  notFoundComponent: () => <div>{'Not found (App)'}</div>,
  errorComponent: () => <div>{'Error (App)'}</div>,
  loadingComponent: () => <div>{'Loading (App)'}</div>,
});

history.subscribe(() => router.navigate(history.location));

router.subscribe(event => {
  if (event.type === 'redirect') {
    history.replace(event.to);
  }
  if (event.type === 'navigate') {
    // console.log(router.location?.pathname, event.location.pathname);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
