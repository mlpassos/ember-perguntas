/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'embeter-materialize',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyCqf5Q__X91znhiNSmEAEcPs0LMtkFb_V8",
      authDomain: "para-responde.firebaseapp.com",
      databaseURL: "https://para-responde.firebaseio.com",
      storageBucket: "para-responde.appspot.com",
      messagingSenderId: "875663752394"
    },
    torii: {  
      sessionServiceName: 'session',
      providers: {
        'google-oauth2': {
          apiKey:"875663752394-ove2klo53p8ghamjr1p7l0loob08711o.apps.googleusercontent.com",
          redirectUri: "https://localhost:4200/oauth2callback"
        },
        'facebook-oauth2': {
          apiKey:      '5f009784cfc6d7ff48b4e309c5eebc76',
          redirectUri: 'https://para-responde.firebaseapp.com/__/auth/handler'
        },
        'facebook-connect': {
          appId: '188760751603326'
        }
      }
    },
    'ember-cli-lightbox': {
      lightboxOptions: {
        alwaysShowNavOnTouchDevices:  false,
        albumLabel:           "Imagem %1 de %2",
        disableScrolling:       false,
        fadeDuration:         500,
        fitImagesInViewport:      true,
        maxWidth:           1000,
        maxHeight:            1000,
        positionFromTop:        50,
        resizeDuration:         700,
        showImageNumberLabel:     true
      }
    },
    EmberENV: {

      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false,
        Array: true
      }
    },
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }    
  };

  // ENV.contentSecurityPolicy = {
  //   'default-src': "'none'",
  //   'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
  //   'font-src': "'self' fonts.gstatic.com",
  //   'connect-src': "'self' maps.gstatic.com",
  //   'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
  //   'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
  // };

  ENV.googleMap = {
    apiKey: 'AIzaSyAcqXF6nzd3bfoM7LvN9Y4NloaHI-leLq0',
    // apiKey: 'AIzaSyDLHtT7XeTZqbJYbAZprumVFHa9ZJuX2Tc',
    libraries: ['places','drawing', 'visualization']
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
