import Ember from 'ember';

export function postClass([type]) {
   let strClass = '';
   switch(type) {
	    case 'link':
	        strClass = '<i class="fa fa-link link"></i> ' + type;
	        break;
	    case 'status':
	        strClass = '<i class="fa fa-comment-o status"></i> ' + type;
	        break;
	    case 'photo':
	        strClass = '<i class="fa fa-camera photo"></i> ' + type;
	        break;
	    case 'video':
	        strClass = '<i class="fa fa-video-camera video"></i> ' + type;
	        break;
	    case 'offer':
	        strClass = '<i class="fa fa-home offer"></i> ' + type;
	        break;
	    case 'event':
	        strClass = '<i class="fa fa-calendar event"></i> ' + type;
	        break;
	    default:
			console.log('post sem tipo');
	}
    return Ember.String.htmlSafe(strClass);
}

export default Ember.Helper.helper(postClass);