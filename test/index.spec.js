import {actions} from '../src/index.js';
import {expect} from 'chai';

describe('Index', function(){

  describe('has actions', function(){

    ['create'].forEach(function(action){

      it(action, function(){
        expect(actions[action]).to.not.be.undefined;
      })

    });

  });

});
