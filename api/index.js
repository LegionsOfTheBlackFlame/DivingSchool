import serverless from "serverless-http";
import app from './server/app.js';
consol.log('LOADED API INDEX.JS')
export default serverless(app);
//this is to get the commit through...