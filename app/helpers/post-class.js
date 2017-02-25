import Ember from 'ember';

export function postClass([type]) {
   let strClass = '';
   switch(type) {
	    case 'link':
	        strClass = '<i class="fa fa-link"></i> ' + type;
	        break;
	    case 'status':
	        strClass = '<i class="fa fa-comment-o"></i> ' + type;
	        break;
	    case 'photo':
	        strClass = '<i class="fa fa-camera"></i> ' + type;
	        break;
	    case 'video':
	        strClass = '<i class="fa fa-video-camera"></i> ' + type;
	    case 'offer':
	        strClass = '<i class="fa fa-paper-plane"></i> ' + type;
	        break;
	    default:
			console.log('post sem tipo');
	}
    return Ember.String.htmlSafe(strClass);
}

export default Ember.Helper.helper(postClass);