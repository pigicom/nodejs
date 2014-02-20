// Require HTTP module (to start server) and Socket.IO


 var http = require('http');
 var io   = require('socket.io').listen(8081);
 //var gcm  = require('node-gcm'); 
 SendPush('4','test8');									 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 io.disable('heartbeats');
 io.set('log level', 1);

 var clientsVett =  {};
 
 var server = http.createServer(function(req, res){ 
	
	// Send HTML headers and message
	res.writeHead(200,{ 'Content-Type': 'text/html' }); 
	res.end('<h1>Hello Socket Lover!</h1>');
});
//server.listen(8080);
/*
function PushMessage(regIdReceiver)
{
	  var message = new gcm.Message();
	  var sender = new gcm.Sender('AIzaSyAdJvJswvhknhWKePHtgXm5HqHZ7qFwD-Q'); //API KEY DI PuzzleMatch sulla Google api console
	  var message = new gcm.Message({
						collapseKey: 'demo',
						delayWhileIdle: true,
						timeToLive: 3,
						data: {
							price: 'message'
						}
					});             
				message.collapseKey = 'demo';
				message.delayWhileIdle = true;
				message.timeToLive = 3;
	var registrationIds = [];
	registrationId.push(regIdReceiver);
	//registrationIds.push('APA91bF6rc3oN4ALa63kNd7VHL9pZ7MgM7Jz681Wap5MqOqm94VISxUVVlGD5UiPRgwY9A7zBHxuXK86SY-sKXNABC0BeUL_JNaZ2vARvQdx3M65gKyH2TrjfNAgcCtyU-0By4bw4AdvEYXjubOb3Bb5UK_pmahPO4ThEOtBGMg5-gVZ0SpA6LA');
	sender.send(message, registrationIds, 4, function (err, result) {
	console.log(result);
});
}
*/
function SendPush(idTo,idFrom)
{
			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/SendPush/'+ idTo + '/' + idFrom + '/' + 'C',// the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(d) {
			console.log("push sent to : ", idTo);
			});
         });

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}

function FinishMatch(id1,moves,seconds,room)
{
            var roomCorrente=room;
			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/FinishMatch/'+ id1 + '/' + moves + '/' + seconds + '/' + room,// the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(d) {
			console.log("ha vinto : ", JSON.parse(d));
			if (d!=null)
				io.sockets.in(roomCorrente).emit('vincitore', JSON.parse(d));
			});
            
		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}

function CreateMatch(id1,id2,room)
{
 
			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/CreateMatch/'+ id1 + '/' + id2 + '/' + room,// the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(d) {
			console.log('creato il match' + room);
		    });

		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}

function checklogin(p1,p2)
{
 
			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/CheckLogin/'+ p1 +'/'+ p2, // the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(d) {
			});

		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}

function CreateNewUser(id,email,AndroidId)
{
 
			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/CreateNewUser/'+ id +'/'+ email +'/'+ AndroidId, // the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			res.on('data', function(d) {
			    if (d!=null){
				 console.log('Create New User:' + id);
				}
			});

		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}

function inattesa(id)
{
           var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/InAttesa/',// the rest of the url with parameters if needed
			method : 'GET' // do GET
			};
       
		var reqGet = http.request(optionsLogin ,function(res) {
			res.on('data', function(d) {
										//console.log('Recupero dal DB degli utenti in attesa');
										//process.stdout.write(d);
										io.sockets.socket(id).emit("showWaitingRoom", ""+d);
				});
		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});

}

/*			
function confirmInvitation(from,to)
{
var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/GetSession/'+ to ,// the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(s) {
			var conf= JSON.parse(s)
			      console.log(conf.code);
				 io.sockets.socket(conf.code).emit("confirminvitation", "" + from);
			});

		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});

}			
*/			
function disconnect(p1)
{

			var optionsLogin = {
			host : 'localhost', // here only the domain name
			port : 3571,
			path : '/Wcf2Nod/Service.svc/Disconnect/'+ p1 ,// the rest of the url with parameters if needed
			method : 'GET' // do GET
		};

		var reqGet = http.request(optionsLogin ,function(res) {
			console.log("statusCode: ", res.statusCode);
			res.on('data', function(d) {
			console.log('Si è disconnesso il client:' +  d);
		    });

		});

		reqGet.end();
		reqGet.on('error', function(e) {
			console.error(e);
		});
}
// Add a connect listener
io.sockets.on('connection', function(socket){ 
		console.log('Si è appena connesso il client:' +  socket.id);
		 //clients.push(socket.id);
		var interval = 5000;
		// Success!  Now listen to messages to be received
		socket.on('message',function(event){ 
				 console.log('Received message from client!',event);
		});
		
		socket.on('CheckExists',function(user){
				console.log('Controllo se utente è nuovo');
				var res= JSON.parse(user);
				console.log('Invio client in attesa a : ' + res.id + '   ' + res.email + 'res.AndroidId' + res.AndroidId);
				CreateNewUser(res.id,res.email,res.AndroidId);
		});
		
		socket.on('FBID',function(fbid){ 
				clientsVett[fbid]=socket.id;   // creo un vettore di client del tipo client[][]
				checklogin(fbid,socket.id)
				console.log('Received FBID from client!',fbid);
				//process.stdout.write(clientsVett[fbid])  ;
				});
		
		socket.on('disconnect',function(){
				clearInterval(interval);
				disconnect(socket.id)
		});
		
		socket.on('showWaitingRoom',function(sid){
		        var res= JSON.parse(sid)
				clearInterval(interval);
				console.log('Invio client in attesa a : ' + res.sid);
				inattesa(res.sid);
		});
		///////////////////////////////  INVITO A GIOCARE ///////////////////////////////////////////////////////////////////
		socket.on('invitation',function(data){
		        var res= JSON.parse(data)
				clearInterval(interval);
		        console.log("from: clientsVett[" + res.from + "] : -->"  + clientsVett[res.from] + " -- >  to clientsVett["+ res.to +"] : -->" + clientsVett[res.to]);
				io.sockets.socket(clientsVett[res.to]).emit("confirminvitation", JSON.stringify(data));
				SendPush(res.to,res.from);
			  	 
		});
		////////////////////////////////  ACCETTATO L'INVITO A GIOCARE /////////////////////////////////////////////////////////////////// 
		socket.on('invitationAccepted',function(data){
		        var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		        var res= JSON.parse(data)
				var roomid=Math.random().toString(36).substring(7);
				console.log("invito accettato");
				clearInterval(interval);
				process.stdout.write(data);
			//	console.log("clientsVett['"+ res.to +"']" + clientsVett[res.to] + ' ' + clientsVett[res.from]);
				var room=res.from+res.to+roomid;
				io.sockets.socket(clientsVett[res.from]).join(room);
				io.sockets.socket(clientsVett[res.to]).join(room);
				io.sockets.in(room).emit('startmatch', JSON.stringify({"room" : room , "img": num}));
				CreateMatch(res.to,res.from,room);
		});
		////////////////////////////////  RIFIUTO! ///////////////////////////////////////////////////////////////////////////////////////
		socket.on('invitationRefused',function(data){
				var res= JSON.parse(data)
				clearInterval(interval);
				process.stdout.write(data);
				console.log('Invito from : ' + res.from +  " to: " + res.to + " sessionto: " + res.tosessionid);
				//confirmInvitation(res.from,res.to);
				console.log("clientsVett['"+ res.to +"']" + clientsVett[res.to]);
				io.sockets.socket(clientsVett['test']).emit("refusedmatch", "" + res.from);
				PushMessage();
			  	 
		});
		////////////////////////////////  Il CLIENT score.sessionid comunica il punteggio ///////////////////////////////////////////////////////////////////
		socket.on('sendMyScore', function(score){
				var res= JSON.parse(score)
				process.stdout.write(score);
				console.log('session: ' + res.sessionid +  " moves " + res.moves + " seconds: " + res.seconds + " room :" + res.room);
				FinishMatch(res.sessionid,res.moves,res.seconds,res.room);
		});
		 
		
});
