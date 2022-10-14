import 'dotenv/config';

import UserRoute from './routes/user.route';
import validateEnv from './utils/validateEnv';
import App from './app';

validateEnv();
const app = new App([
    new UserRoute()
]);

app.listen();
