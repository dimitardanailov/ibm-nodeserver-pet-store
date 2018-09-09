module.exports = (app) => {
	require('./swagger')(app);
	require('./health')(app);
};  
