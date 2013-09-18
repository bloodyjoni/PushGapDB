
var pushNotification;

var PushConf = {
		 addTokenScript : "http://www.proyectored.com.ar/mobile/addtoken.php?token=",
		 deleteTokenScript  : "http://www.proyectored.com.ar/mobile/deletetoken.php?token=",
		 token: "0" ,
		 senderID : "447745035223",
		// Application Constructor
		 initialize : function() {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		 bindEvents : function() {
			document.addEventListener('deviceready', onDeviceReadyforPush, false);
			
		}
};




function onDeviceReadyforPush() {
			pushNotification =  window.plugins.pushNotification;
			pushRegister();
			// used to unregister the device
			document.addEventListener("backbutton", onBackButton, false);


		}


			
			
function pushRegister(){

	pushNotification.register(successHandler, errorHandler,{"senderID":PushConf.senderID,"ecb":"onNotificationGCM"});

}

function getXMLHttpRequest(){
	var xhr = null;

	
			xhr = new XMLHttpRequest(); 

	return xhr;
}

function  onNotificationGCM(e) {
	switch( e.event )
	{
	case 'registered':
		if ( e.regid.length > 0 )
		{
			PushConf.token=e.regid;
			var xhr= getXMLHttpRequest();
			console.log("Regid " + PushConf.token);
			alert('registration id = '+ PushConf.token);
			var sVar1 = encodeURIComponent(PushConf.token);
			xhr.open("GET", PushConf.addTokenScript +sVar1, false);
			xhr.send(null);
			// store the token value
			console.log("access remote server done")

		}
		break;

	case 'message':
		// this is the actual push notification. its format depends on the data model from the push server
		alert('message = '+e.message+' msgcnt = '+e.msgcnt);
		break;

	case 'error':
		alert('GCM error = '+e.msg);
		break;

	default:
		alert('An unknown GCM event has occurred');
	break;
	}
}
function onBackButton(e){

	if (e){
		e.preventDefault();

		console.log("access remote server done")
		var xhr= getXMLHttpRequest();
		console.log("Regidunregister" + PushConf.token);
		alert('registration id = '+ PushConf.token);
		var sVar1 = encodeURIComponent(PushConf.token);
		console.log(sVar1);
		xhr.open("GET", PushConf.deleteTokenScript + sVar1, false);
		xhr.send(null);
		pushNotification.unregister(successHandler,errorHandler);
		navigator.app.exitApp();
	}
	else
	{
		navigator.app.backHistory();
	}


}

	 function successHandler(e) {


			console.log(result);

		}
		function errorHandler(error) {
			alert(error);
		}


