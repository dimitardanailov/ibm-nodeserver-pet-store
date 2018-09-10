import * as mongoose from "mongoose";

const server = 'mongodb://127.0.0.1:27017';
const database = 'petstore';

/** 
 * useNewUrlParser - The underlying MongoDB driver has deprecated 
 * their current connection string parser. 
 * 
 * Because this is a major change, they added the useNewUrlParser flag to allow users to 
 * fall back to the old parser if they find a bug in the new parser. 
 * You should set useNewUrlParser: true unless that prevents you from connecting. 
 * 
 * Note that if you specify useNewUrlParser: true, you must specify 
 * a port in your connection string, like mongodb://localhost:27017/dbname. 
 * The new url parser does not support connection strings 
 * that do not have a port, like mongodb://localhost/dbname.
 */

const mongo = {
	uri: `${server}/${database}`,
	opt: {
		useNewUrlParser: true
	}
};

mongoose.connect(mongo.uri, mongo.opt).then(() => {
	console.debug('Connected to Database');

	return mongoose.connection;
}).catch(err => {
	console.error(err)
});

export { mongoose };
