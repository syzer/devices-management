/**
 * Created by syzer on 5/14/2015.
 */
require('./server').listen(24, '127.0.0.1', function() {
    console.log('Listening on port ' + this.address().port);
});
