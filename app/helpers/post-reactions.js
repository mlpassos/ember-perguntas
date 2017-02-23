import Ember from 'ember';

export function postReactions([postId, accessToken]) {
   // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
   let like = 0;
   let love = 0;
   let wow = 0;
   let haha = 0;
   let angry = 0;
   let sad = 0;
   let thankful = 0;

   function getJSON(id, tk) {
     return new Promise(function(resolve, reject){

      $.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
        access_token: tk,
        id: id
      }).then(item => {
        let jsonItem = JSON.parse(item);
        // console.log('jsonItemReactions', jsonItem.like.summary.total_count);
        let response =  Ember.String.htmlSafe('Likes: ' + jsonItem.like.summary.total_count);
        console.log('response', response.string);
        // return response;
        resolve(response.string);
        // return jsonItem;
      },  function() {
        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
        // return "bug";
      });

     });
   }
   // // console.log('OKEN', accessToken);
   // var out = getJSON(postId, accessToken).then(response=>{
   //  console.log('saida', response);
   //  return response;
   // });
   // console.log('saida', out);
   // var PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
   
   // var saida = new Promise(function(resolve, reject) {
   //   // on success
   //   let value = countReactions(reactions, '');
   //   resolve(value);

   //   // on failure
   //   reject(new Error('DEU BUG NA REACION'));
   // });
   // return saida.then(function(data) {
   //    // debugger;
   //    return Ember.String.htmlSafe(data);
   // });
   // return PromiseObject.create({
   //    promise: Ember.RSVP.cast(getJSON(postId, accessToken))
   // }); 
   return getJSON(postId, accessToken).then(res=> {
    console.log('res', res);
    return res;
   });
   // proxy.then(function(json){
   //    // the json
   //    let jsonItem = JSON.parse(json);
   //    console.log('saida', jsonItem);
   //    let response =  Ember.String.htmlSafe('Likes: ' + jsonItem.like.summary.total_count)
   //    return response;

   // }, function(reason) {
   //    console.log('erro na saída');
   //    // the reason why you have no json
   // });

   // return Ember.String.htmlSafe(out);
   
}

export default Ember.Helper.helper(postReactions);