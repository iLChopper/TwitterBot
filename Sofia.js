var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: '3qtW36OADDjuQPA5AIeE9Rj84',
  consumer_secret: 'dB9Z2kg08ZHqKRqWYAUIj3wS9N8JmdZik9ey5vFZqcA4JCM2JZ',
  access_token: '2601693794-qmtzimxImBqdwl3RyB8s5NaywhzFxnDl7DLxMGe',
  access_token_secret: 'Qclb2omOjDeetlSOqjOJovccyDldJxX6SMDxiaitSmRc0'
});


var params = {
        q: "Celular",
        result_type: 'recent',     
        lang: "es",
        count:1
    };

var cont=0;

    var CronJob = require('cron').CronJob;

  var job = new CronJob('0 */20 * * * *', function(){

		T.get('search/tweets',  params , function(err, reply) {
		    if (err) {
		        console.dir(err);
		    } else {  
		    		
		           var status = reply.statuses;
		            var idTwit=status[0].id_str;
		            var twit=status[0].text;
		            var userId=status[0].user.id_str;
		            var userName=status[0].user.screen_name;

					T.post('statuses/retweet/' + idTwit, {}, function(err, data, response) {
					 
						 if (err) {
			       		 console.dir(err);
			       			}else{
			       				cont++;
			       				 console.log("ReTwiteando :"+ twit);
			       				 console.log("Tweet N°" +cont);	
			       		}
					})


				T.post('friendships/create', { id: userId }, function(err, data, response) {
					 
						 if (err) {
			       		 console.dir(err);
			       			}else{
			       				 console.log("Siguiendo a  :"+ userName);	
			       		}
					})		


		           
		         
		        }
		    });

 }, function () {
   

	  }, true 
	);

