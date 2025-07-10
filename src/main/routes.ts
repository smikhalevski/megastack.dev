import { createRoute } from 'react-corsair';
import { LandingPage } from './routes/LandingPage';
import { DoubterReadme } from './routes/DoubterReadme';
import { ReactExecutorReadme } from './routes/ReactExecutorReadme';
import { ReactCorsairReadme } from './routes/ReactCorsairReadme';
import { RoqueformReadme } from './routes/RoqueformReadme';

export const landingPageRoute = createRoute('/', LandingPage);
export const doubterReadmeRoute = createRoute('/doubter', DoubterReadme);
export const reactExecutorReadmeRoute = createRoute('/react-executor', ReactExecutorReadme);
export const reactCorsairReadmeRoute = createRoute('/react-corsair', ReactCorsairReadme);
export const roqueformReadmeRoute = createRoute('/roqueform', RoqueformReadme);
