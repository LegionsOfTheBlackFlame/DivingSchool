import serverless from "serverless-http";
import app from './server/app.js';

export default serverless(app);
//this is to get the commit through...