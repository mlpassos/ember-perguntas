import Ember from 'ember';

export function postClass([type]) {
   let strClass = '';
   switch(type) {
	    case 'link':
	        strClass += 'fa fa-link';
	        break;
	    case 'status':
	        strClass += 'fa fa-comment-o';
	        break;
	    case 'photo':
	        strClass += 'fa fa-camera';
	        break;
	    case 'video':
	        strClass += 'fa fa-video-camera';
	        break;
	    case 'offer':
	        strClass += 'fa fa-paper-plane';
	        break;
	    default:
			console.log('post sem tipo');
	}
    return Ember.String.htmlSafe(strClass);
}

export default Ember.Helper.helper(postClass);