const {app,} = require('./app');
const port =  process.env.PORT || 5000;

app.listen(port, _=>{
    // console.log('Listening on port: ', port);
    console.log(`Listening on port: ${port}`);
});