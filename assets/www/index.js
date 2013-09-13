/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//pushPlugin global variable
var pushNotification;
var regid;
//Push configuration variable
var PConf={
sendID:"447745035223",

addTLink: "http://www.proyectored.com.ar/mobile/addtoken.php?token=",
deleteTLink: "http://www.proyectored.com.ar/mobile/deletetoken.php?token="

}

var app = {
		// Application Constructor
		initialize: function() {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
			pushRegister();
			// used to unregister the device
			document.addEventListener("backbutton", onBackButton, false);


		},
		// Update DOM on a Received Event

		receivedEvent: function(id) {
			var parentElement = document.getElementById(id);
			var listeningElement = parentElement.querySelector('.listening');
			var receivedElement = parentElement.querySelector('.received');
			pushNotification = window.plugins.pushNotification;
		

			listeningElement.setAttribute('style', 'display:none;');
		
			console.log('Received Event: ' + id);
		},
//		result contains any message sent from the plugin call
		successHandler: function(e) {


			console.log(result);

		},
		errorHandler:function(error) {
			alert(error);
		},



};

function pushRegister(){

	pushNotification.register(app.successHandler, app.errorHandler,{"senderID":PConf.sendID,"ecb":"onNotificationGCM"});

}
function successHandler (e) {
			console.log(result);
		}
function errorHandler(error) {
			alert(error);
		}
function getXMLHttpRequest(){
	var xhr = null;

		if(	xhr = new XMLHttpRequest()){
			console.log("xmlhttprequest Done");
		}
		
	 else {
		alert("Votre navigateur/ dispositif ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}

	return xhr;
}

function  onNotificationGCM(e) {
	switch( e.event )
	{
	case 'registered':
		if ( e.regid.length > 0 )
		{
			var xhr= getXMLHttpRequest();
			console.log("Regid " + e.regid);
			//alert('registration id = '+e.regid);
			var sVar1 = encodeURIComponent(e.regid);
			xhr.open("GET",PConf.addTLink+sVar1, false);
			xhr.send(null);
			regid=e.regid;// store the token value
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

		e.preventDefault();
		console.log("access remote server done");
		var xhr= getXMLHttpRequest();
		console.log("Regid Unregister" + regid);
		//alert('registration id = '+ regid);
		var sVar1 = encodeURIComponent(regid);
		console.log(sVar1);
		xhr.open("GET", PConf.deleteTLink+sVar1, false);
		xhr.send(null);
		pushNotification.unregister(app.successHandler,app.errorHandler);
		navigator.app.exitApp();

}


