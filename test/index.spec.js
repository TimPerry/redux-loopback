import loopbackMiddleware from '../src/index.js';
import {actions} from '../src/index.js';
import chai from 'chai';

const expect = chai.expect;

describe('Index', function(){

  describe('has actions', function(){

    ['create', 'login', 'register'].forEach(function(action){

      it(action, function(){
        expect(actions[action]).to.not.be.undefined;
      })

    });

  });

});
