import Ember from 'ember';

export function postReactions([postId, reaction, compare, like, love, wow, haha, sad, angry]) {
   
   // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
   
    let out = '';
    let reactionsArray = [{
      reaction: 'like',
      value: like
    },{
      reaction: 'love',
      value: love
    },{
      reaction: 'wow', 
      value: wow
    },{
      reaction: 'haha', 
      value: haha
    },{
      reaction: 'sad', 
      value: sad
    },{
      reaction: 'angry',
      value: angry
    }];
    
    function addReaction(type, atual, original) {
      let diff = atual - original;
      if (diff > 0 || diff < 0) {
        return '<li><img src="/assets/images/facebook-'+ type +'.png" class="fb-reactions"> ' + (diff) + '</li>';  
      } else  {
        return '';
      }
    }  
    // console.log('compare', compare);
    if (postId === reaction.id) {
      out = '<ul>';
      if (!compare) {
        out += '<li><img src="/assets/images/facebook-like.png" class="fb-reactions"> ' + reaction.like.summary.total_count + '</li>' +
         '<li><img src="/assets/images/facebook-love.png" class="fb-reactions"> ' + reaction.love.summary.total_count + '</li>' +
         '<li><img src="/assets/images/facebook-wow.png" class="fb-reactions"> ' + reaction.wow.summary.total_count + '</li>' +
         '<li><img src="/assets/images/facebook-haha.png" class="fb-reactions"> ' + reaction.haha.summary.total_count + '</li>' +
         '<li><img src="/assets/images/facebook-sad.png" class="fb-reactions"> ' + reaction.sad.summary.total_count + '</li>' +
         '<li><img src="/assets/images/facebook-angry.png" class="fb-reactions"> ' + reaction.angry.summary.total_count + '</li>';
      } else {
        console.log('compare', compare);
        console.log('like', like);
        console.log('reaction', reaction);
        // out += '<li><img src="/assets/images/facebook-like.png" class="fb-reactions"> ' + (reaction.like.summary.total_count - like) + '</li>' +
        //  '<li><img src="/assets/images/facebook-love.png" class="fb-reactions"> ' + (reaction.love.summary.total_count - love) + '</li>' +
        //  '<li><img src="/assets/images/facebook-wow.png" class="fb-reactions"> ' + (reaction.wow.summary.total_count - wow) + '</li>' +
        //  '<li><img src="/assets/images/facebook-haha.png" class="fb-reactions"> ' + (reaction.haha.summary.total_count - haha) + '</li>' +
        //  '<li><img src="/assets/images/facebook-sad.png" class="fb-reactions"> ' + (reaction.sad.summary.total_count - sad) + '</li>' +
        //  '<li><img src="/assets/images/facebook-angry.png" class="fb-reactions"> ' + (reaction.angry.summary.total_count - angry) + '</li>';
        reactionsArray.map(item=> {
          console.log('total', reaction[item.reaction].summary.total_count);//reaction.item.summary.total_count);
          out += addReaction(item.reaction, reaction[item.reaction].summary.total_count, item.value);
        });
        
      }
      out += '</ul><hr>';
    }
    
   
   return Ember.String.htmlSafe(out);
   
}

export default Ember.Helper.helper(postReactions);