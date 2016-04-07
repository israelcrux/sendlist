/**
 *
 * The server config
 * made by @dantaex
 *
 */
 
module.exports = {

	/**
	 * The app name
	 */
	app_name : 'Sendlist',

	/**
	 * The public access directory
	 */
	public_dir : '../client/public',

	/**
	 * The development port
	 */
	test_port  : 8282,

	/**
	 * The Mongodb URI (development)
	 */
	database_uri_DEV  : 'mongodb://localhost:27017/sendlist',

	/**
	 * The Mongodb URI (PRODUCTION)
	 * taken from env
	 */
	database_uri_PROD : process.env.MONGO_SENDLIST_URI

};