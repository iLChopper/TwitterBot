var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: 'b84seHu3r3QKREJwA5D4ownGy',
  consumer_secret: 'jwv3rJCD2jId2IcoIsMMnYZTY4GajXvxuPE7vMtoJQNfD9tEkk',
  access_token: '2988587566-viQVvE6dYvZq0jQJ2GdmqMrK1PAFwGYc5NG9yuO',
  access_token_secret: 'O1IC42W5ORxQzbDFP2tQOPET0V8uC78RBio4gzZJTrCvM'
});


var params = {
        q: "Android",
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

