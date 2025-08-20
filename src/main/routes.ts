import { createRoute } from 'react-corsair';

export const landingPageRoute = createRoute({
  pathname: '/',
  lazyComponent: () => import('./routes/LandingPage.js'),
});

export const doubterReadmeRoute = createRoute({
  pathname: '/doubter',
  lazyComponent: () => import('./routes/DoubterReadme.js'),
});

export const reactExecutorReadmeRoute = createRoute({
  pathname: '/react-executor',
  lazyComponent: () => import('./routes/ReactExecutorReadme.js'),
});

export const reactCorsairReadmeRoute = createRoute({
  pathname: '/react-corsair',
  lazyComponent: () => import('./routes/ReactCorsairReadme.js'),
});

export const roqueformReadmeRoute = createRoute({
  pathname: '/roqueform',
  lazyComponent: () => import('./routes/RoqueformReadme.js'),
});

export const racehorseReadmeRoute = createRoute({
  pathname: '/racehorse',
  lazyComponent: () => import('./routes/RacehorseReadme.js'),
});
