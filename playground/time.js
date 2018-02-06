'use strict'

const moment = require('moment');

let date = moment();
console.log(date.format('MMM Do YYYY h:mm a'));

// unix epoch Jan-1-1970 00:00:00 am


date = moment();
console.log(date.format('h:mm a'));
