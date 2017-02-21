import Ember from 'ember';

export function postReactions([reactions]) {
   // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
   let like = 0;
   let love = 0;
   let wow = 0;
   let haha = 0;
   let angry = 0;
   let thankful = 0;
   // debugger;
   reactions.map(function(reaction) {
   	console.log(reaction.type);
      switch (reaction.type) {
   		case 'LIKE':
   			like += 1;
   			break;
   		case 'LOVE':
   			love += 1;
   			break;
   		case 'WOW':
   			wow += 1;
   			break;
   		case 'HAHA':
   			haha += 1;
   			break;
   		case 'ANGRY':
   			angry += 1;
   			break;
   		case 'THANKFUL':
   			thankful += 1;
   			break;
    }
   });
   let out = '';
   out +=  '<li><i class="fa fa-thumbs-up"></i> ' + like + '</li>';
   out +=  '<li><i class="fa fa-heart"></i> ' + love + '</li>';
   out +=  '<li><i class="fa fa-heart"></i> ' + wow + '</li>';
   out +=  '<li><i class="fa fa-heart"></i> ' + haha + '</li>';
   out +=  '<li><i class="fa fa-heart"></i> ' + angry + '</li>';
   out +=  '<li><i class="fa fa-heart"></i> ' + thankful + '</li>';
   // out += '</ul>';
   return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(postReactions);