import Ember from 'ember';

export function postIsfollowing([postid, following]) {
   let out = '';
   // console.log('flwhelper', following);
   // following.map(data=> {
   	 if (postid === following) {
   	 	out = 'seguindo';
   	 }
   // });

   return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(postIsfollowing);