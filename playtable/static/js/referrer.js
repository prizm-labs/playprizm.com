var cookies = require('browser-cookies');
var queryString = require('query-string');


var qsparams = queryString.parse(location.search);
console.log(parsed);



cookies.set('firstName', 'Lisa');
cookies.set('firstName', 'Lisa', {expires: 365}); // Expires after 1 year 
cookies.set('firstName', 'Lisa', {secure: true, domain: 'www.example.org'});
 
console.log(cookies.get('firstName')); // Returns cookie value (or null) 
 
//cookies.erase('firstName'); // Removes cookie 