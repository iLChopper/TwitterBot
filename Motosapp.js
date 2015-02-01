var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: 'Z1ZSz8OcYyr5n1jWt3vVZA3tP',
  consumer_secret: 'KdYvZ0xrQVMrMy9DDbthLMXgZffVZ0za9s7WwRmiSsScX2tbCE',
  access_token: '2600363732-iKX4kqJGdjiJzu131KaFZZR3Pm5Pa7VQjWwL1n7',
  access_token_secret: 'QdJkxuzU3ax7ZDYMJkNTUQ1tJJwYLwm74xH82APSRsnwE'
});


var params = {
        q: "Motos",
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

