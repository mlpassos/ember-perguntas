import Ember from 'ember';

export function comparePosts([post, updatedPost, what, classOnly]) {
   let out = '';
   let outClass = "";
   let compare = 0;
   let diff = 0;
   // console.log('ClassOnly', classOnly);
   switch(what) {
	    case 'shares':
	    	let shares = post.get('shares').count;
		    if (updatedPost.shares) {
		   		compare = updatedPost.shares.count;
		    } else {
		   		// sem compartilhamentos
		   		compare = 0;
		    }
	        // console.log('shares', shares);
	        if (compare > shares) {
	        	diff = (compare - shares);
	        } else {
	        	diff = shares - compare;
	        }
	        if (diff > 0) {
	        	out += "+ " + diff;
	        	// out += diff;
	        	outClass = 'green white-text';
	        } else if (diff < 0) {
	        	out += "- " + diff*(-1);
	        	// out += diff;
	        	outClass = 'red';
	        } else {
	        	out += '0';
	        	outClass = 'deep-purple white-text';
	        }
	        break;
	    case 'comments':
	    	let comments = post.get('summary').total_count;
	    	// .then(data=>{
	    	// 	// return data.summary.total_count;
	    	// 	console.log('summary', data.get('summary'));
	    	// });
		    if (updatedPost.comments) {
		   		compare = updatedPost.comments.summary.total_count;
		    } else {
		   		// sem compartilhamentos
		   		compare = 0;
		    }
	        // console.log('comments', comments);
	        // console.log('compare', compare);
	        if (compare > comments) {
	        	diff = (compare - comments);
	        } else {
	        	diff = comments - compare;
	        }
	        if (diff > 0) {
	        	out += "+ " + diff;
	        	// out += diff;
	        	outClass = 'green white-text';
	        } else if (diff < 0) {
	        	out += "- " + diff*(-1);
	        	// out += diff;
	        	outClass = 'red white-text';
	        } else {
	        	out += '0';
	        	outClass = 'deep-purple white-text';
	        }
	        break;
	    default:
			console.log('sem filtro');
	}
   // console.log('helper post', shares.count);
	if (classOnly) {
		// console.log('outClass', outClass);
		return Ember.String.htmlSafe(outClass);
	} else  {
		return Ember.String.htmlSafe(out);
	}
   
}

export default Ember.Helper.helper(comparePosts);