import {create, createSuccess, createError} from '../../src/actions/create';
import {expect} from 'chai';

describe('Create Actions Creators', function() {

    describe('create', function() {

        const payload = {
            some: 'data'
        }
        const result = create('modelName', payload);

        it('should set the payload type to "LOOPBACK_MODEL_CREATE"', function() {
            expect(result.type).to.not.be.undefined;
            expect(result.type).to.equal('LOOPBACK_MODEL_CREATE');
        });

        it('should set the attach the provided modelName to the metadata', function() {
            expect(result.meta).to.not.be.undefined;
            expect(result.meta.modelName).to.equal('modelName');
        });

        it('should set the actions payload to the given payload', function() {
            expect(result.payload).to.not.be.undefined;
            expect(result.payload).to.deep.equal(payload);
        });

    });

    describe('createSuccess', function() {

        const payload = {
            some: 'data'
        }
        const result = createSuccess('modelName', payload);

        it('should set the payload type to "LOOPBACK_MODEL_CREATE_SUCCESS"', function() {
            expect(result.type).to.not.be.undefined;
            expect(result.type).to.equal('LOOPBACK_MODEL_CREATE_SUCCESS');
        });

        it('should set the attach the provided modelName to the metadata', function() {
            expect(result.meta).to.not.be.undefined;
            expect(result.meta.modelName).to.equal('modelName');
        });

        it('should set the actions payload to the given payload', function() {
            expect(result.payload).to.not.be.undefined;
            expect(result.payload).to.deep.equal(payload);
        });

    });

    describe('createError', function() {

        const payload = {
            some: 'data'
        }
        const result = createError('modelName', payload);

        it('should set the payload type to "LOOPBACK_MODEL_CREATE_ERROR"', function() {
            expect(result.type).to.not.be.undefined;
            expect(result.type).to.equal('LOOPBACK_MODEL_CREATE_ERROR');
        });

        it('should set the attach the provided modelName to the metadata', function() {
            expect(result.meta).to.not.be.undefined;
            expect(result.meta.modelName).to.equal('modelName');
        });

        it('should set the actions payload to the given payload', function() {
            expect(result.payload).to.not.be.undefined;
            expect(result.payload).to.deep.equal(payload);
        });

        it('should set the error to true', function() {
            expect(result.error).to.not.be.undefined;
            expect(result.error).to.equal(true);
        });

    });

});
