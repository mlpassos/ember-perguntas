import Ember from 'ember';

export function postReactions([postId, reaction]) {
   
   // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
   let out = '';
   if (postId === reaction.id) {
     out += '<li><img src="/assets/images/facebook-like.png" class="fb-reactions"> ' + reaction.like.summary.total_count + '</li>' +
       '<li><img src="/assets/images/facebook-like.png" class="fb-reactions"> ' + reaction.love.summary.total_count + '</li>' +
       '<li><img src="/assets/images/facebook-wow.png" class="fb-reactions"> ' + reaction.wow.summary.total_count + '</li>' +
       '<li><img src="/assets/images/facebook-haha.png" class="fb-reactions"> ' + reaction.haha.summary.total_count + '</li>' +
       '<li><img src="/assets/images/facebook-sad.png" class="fb-reactions"> ' + reaction.sad.summary.total_count + '</li>' +
       '<li><img src="/assets/images/facebook-angry.png" class="fb-reactions"> ' + reaction.angry.summary.total_count + '</li>';
   }
   return Ember.String.htmlSafe(out);
   
}

export default Ember.Helper.helper(postReactions);