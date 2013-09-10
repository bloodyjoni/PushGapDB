
var gcm = require('node-gcm');
var message = new gcm.Message();
 var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 
//API Server Key
var sender = new gcm.Sender('AIzaSyBlW_WFq615ZalVxdNhqFy5LFtZ2uRpFbM');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
message.timeToLive = 3;// Duration in seconds to hold and retry to deliver the message in GCM before timing out. Default 4 weeks if not specified
 
 var xhr= new XMLHttpRequest();
	xhr.open("GET", "http://www.proyectored.com.ar/mobile/gettokens.php", false);
    xhr.send(null);
var destList = xhr.responseText;
destList = destList.replace(/\\\'/g,"'");


//var destList ='banana';             	 
// At least one reg id required
// At least one reg id required
registrationIds.push(destList);
console.log (destList);
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});