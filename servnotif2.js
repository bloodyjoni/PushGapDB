var GCM = require('./gcm');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var gcm = new GCM('AIzaSyBlW_WFq615ZalVxdNhqFy5LFtZ2uRpFbM'); // https://code.google.com/apis/console

// Get the tokens list 
var xhr= new XMLHttpRequest();
xhr.open("GET", "http://www.proyectored.com.ar/mobile/gettokens.php", false);
xhr.send(null);
var destList = xhr.responseText;

// delete of unexpected characters (need to be improved)
destList = destList.replace(/\\\"/g,"");
destList = destList.replace(/\n/g,"");

//Regxp to split the String returned by gettokens.php
splitLayout= new RegExp(",","g");
destTab =destList.split(splitLayout);
console.log(destTab);

// create the message
var msg = {
  registration_ids: destTab, // this is the devices tokens array (phone)
  // don't know what it is
  collapse_key: "your_collapse_key", // http://developer.android.com/guide/google/gcm/gcm.html#send-msg
  time_to_live: 180, // just 30 minutes
  data: {
    message: "Hello mundo cruel bis:P" // your payload data
  }
};
 console.log(msg.registration_ids);
// send the message and see what happened
gcm.send(msg, function(err, response) {
  // that error is from the http request, not gcm callback
  console.log(response); // http://developer.android.com/guide/google/gcm/gcm.html#response
});