import Ember from 'ember';

export function postReactions([reactions]) {
   // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
   let like = 0;
   let love = 0;
   let wow = 0;
   let haha = 0;
   let angry = 0;
   let sad = 0;
   let thankful = 0;
   // debugger;
   function getJSON(url) {
     return new Promise(function(resolve, reject){
       var xhr = new XMLHttpRequest();

       xhr.open('GET', url);
       xhr.onreadystatechange = handler;
       xhr.responseType = 'json';
       xhr.setRequestHeader('Accept', 'application/json');
       xhr.send();

       function handler() {
         if (this.readyState === this.DONE) {
           if (this.status === 200) {
             resolve(this.response);
           } else {
             reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
           }
         }
       };
     });
   }
   var out = '';
   function countReactions(reactions, out) {
      // let out = '';
      reactions.data.map(function(reaction) {
         switch (reaction.type) {
            case 'LIKE':
               like += 1;
               break;
            case 'LOVE':
               love += 1;
               break;
            case 'HAHA':
               haha += 1;
               break;
            case 'WOW':
               wow += 1;
               break;
            case 'SAD':
               sad += 1;
               break;
            case 'ANGRY':
               angry += 1;
               break;
            case 'THANKFUL':
               thankful += 1;
               break;
         }
      });

      out +=  '<li><img src="/assets/images/facebook-like.png" alt="..." class="fb-reactions"> ' + like + '</li>';
      out +=  '<li><img src="/assets/images/facebook-love.png" alt="..." class="fb-reactions"> ' + love + '</li>';
      out +=  '<li><img src="/assets/images/facebook-haha.png" alt="..." class="fb-reactions"> ' + haha + '</li>';
      out +=  '<li><img src="/assets/images/facebook-wow.png" alt="..." class="fb-reactions"> ' + wow + '</li>';
      out +=  '<li><img src="/assets/images/facebook-sad.png" alt="..." class="fb-reactions"> ' + sad + '</li>';
      out +=  '<li><img src="/assets/images/facebook-angry.png" alt="..." class="fb-reactions"> ' + angry + '</li>';
      out +=  '<li><i class="fa fa-leaf"></i> ' + thankful + '</li>';
         
      if (reactions.paging.next) {
         console.log('tem mais reactions');
         // $.get(reactions.paging.next).then(function(data) {
         //    console.log('paginating...');
         //    countReactions(data);
         // });
         getJSON(reactions.paging.next).then(function(data) {
            // on fulfillment
            console.log('paginating...');
            countReactions(data, out);
         }, function(reason) {
            // on rejection
            console.log('page bug...');
            // countReactions(data);
         });
      } else {
         console.log('acabou paginação', out);
         return out;
      }
   }
   // let saida = countReactions(reactions, out);
   
   // out += '</ul>';
   // var PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
   
   var saida = new Promise(function(resolve, reject) {
     // on success
     let value = countReactions(reactions, '');
     resolve(value);

     // on failure
     reject(new Error('DEU BUG NA REACION'));
   });
   return saida.then(function(data) {
      // debugger;
      return Ember.String.htmlSafe(data);
   });
   // return PromiseObject.create({
   //    promise: this.get('something')
   // });

   // return Ember.String.htmlSafe(saida);
   
}

export default Ember.Helper.helper(postReactions);