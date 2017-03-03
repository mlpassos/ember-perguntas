import Ember from 'ember';

export function userInfo([userId, postUser]) {
   
	// NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL
    let out = '';
    // console.log('postUsersInfo', postUsers);
    console.log('postUsersInfoType', typeof postUser);
  
   	if (userId === postUser.id) {
   		console.log('postUsersInfo', postUser);
	    out += '<img class="user-info-image" src="'+postUser.picture.data.url+'" alt="imagem do usuário, geralmente mostra o rosto"> ';
    } else {
    	console.log('NAO ACHEI');
    }
    
   
    return Ember.String.htmlSafe(out);
   
}

export default Ember.Helper.helper(userInfo);