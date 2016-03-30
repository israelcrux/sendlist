/**
 *
 * The server config
 * 
 */


module.exports = {

	app_name : 'Sendlist',

	public_dir : '../client/public',

	test_port  : 8080,

	database_uri_DEV  : 'mongodb://localhost:27017/sendlist',

	database_uri_PROD : process.env.MONGO_SENDLIST_URI

};