import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('noticias', {path: 'noticias/:page'}, function() {
    
  });
  this.route('noticia', {path: 'noticia/:slug'}, function() {

  });
  this.route('tags');
  this.route('contato');
  this.route('sobre');
  this.route('downloads');
  this.route('search');
  this.route('tags', {});
  this.route('tag', {path: 'tag/:slug/:pageid'}, function() {
    //
  });
  this.route('loading');
  this.route('login');
  this.route('logout');

  this.route('pauta', {path: 'pauta/:slug'}, function() {
    this.route('adicionar');
    this.route('alterar');
    this.route('excluir');
    this.route('loading');
  });
  this.route('pautas', function() {});
  this.route('cadastro');
  this.route('usuarios');
  this.route('usuario', {path: 'usuario/:uid'}, function() {
    this.route('perfil');    
  });
  this.route('admin');
  this.route('perguntas');//, {path: 'perguntas/'}function() {});
});

export default Router;