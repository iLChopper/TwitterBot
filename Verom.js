var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: 'RM6j0oOyFP7z7aGSUUMPl49sa',
  consumer_secret: 'ywVuQiR58IDu78RVq30x5Jndp4bewyiTTX1eYhJkxqSomYQAhU',
  access_token: '2991196671-r74ekNcSt7JgV49xusb0Bpbqt73DZ0rnJGDDByS',
  access_token_secret: 'yYcMKk6fIoi0uilhPco9rWqX3cwq99mNAhYlERFvN8IlF'
});


var params = {
        q: "Medicina",
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

