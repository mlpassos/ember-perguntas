import Ember from 'ember';

export function perguntaClass([perguntas, positivos, commentId]) {
    let out = '';
    // console.log('replies', replies);
    // if (replies) {
    // 	out = 'comment-reply-box';	
    // } else {
    // 	out = '';
    // }
    
    // console.log('pergunta', perguntas);
    if (perguntas) {
	    perguntas.map(pergunta=> {
	   		if (pergunta.id === commentId) {
	   			// console.log('pergunta', perguntas);
	   			out += ' pergunta';
		   	} else {
				out += ' sem-perguntas';
			} 
	    });
	    positivos.map(positivo=> {
	   		if (positivo.id === commentId) {
	   			// console.log('positivo', perguntas);
	   			out += ' positivo';
		   	} else {
				out += ' sem-positivo';
			} 
	    });
	} 
   // if (isDeleted === true) {
   // 	// console.log('PAUTA DELETADA');
   // 	strClass = 'pauta-deleted ';
   // } 
   // strClass += "col l4 m6 s12 isoitem item" + id;
   return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(perguntaClass);