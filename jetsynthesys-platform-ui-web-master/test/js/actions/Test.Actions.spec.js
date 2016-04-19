'use strict'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)

import TestActions from '../../../src/js/actions/Test.Actions'

// REVIEW: Mock Redux Store - https://www.npmjs.com/package/redux-mock-store

// TODO: Record HTTP requests/fixtures - https://www.ctl.io/developers/blog/post/http-apis-test-code

describe('Test.Actions', () => {

    it('syncExampleAction', () => {
        const action = TestActions.syncExampleAction

        expect(action).to.be.a('function')

        const result = action({abc: 123})

        expect(result).to.be.a('object')
        expect(result.type).to.equal('SYNC_EXAMPLE_ACTION')
        expect(result.payload).to.deep.equal({abc: 123})
    })

    it('asyncPromiseExampleAction', (done) => {
        const dispatch = sinon.spy()

        const action = TestActions.asyncPromiseExampleAction

        expect(action).to.be.a('function')

        const result = action({abc: 123})(dispatch)

        expect(result).to.be.a('object')
        expect(result.type).to.equal('ASYNC_PROMISE_EXAMPLE_ACTION')
        expect(result.payload).to.eventually.deep.equal({abc: 123}).notify(done)
    })

    it('asyncPromiseNotifyExampleAction', (done) => {
        const dispatch = sinon.spy()

        const action = TestActions.asyncPromiseNotifyExampleAction

        expect(action).to.be.a('function')

        const result = action({abc: 123})(dispatch)

        expect(result).to.be.a('object')
        expect(result.type).to.equal('ASYNC_PROMISE_NOTIFY_EXAMPLE_ACTION')
        expect(result.payload).to.eventually.deep.equal({abc: 123}).notify(done)
    })

    it('asyncPromiseFetchExampleAction', (done) => {
        const dispatch = sinon.spy()

        const action = TestActions.asyncPromiseFetchExampleAction

        expect(action).to.be.a('function')

        const result = action({abc: 123}, 'http://offline-news-api.herokuapp.com/stories')(dispatch)

        expect(result).to.be.an('object')
        expect(result.type).to.equal('ASYNC_PROMISE_FETCH_EXAMPLE_ACTION')
        expect(result.payload).to.eventually.be.fulfilled.and.have.property('data').notify(done)
        // later with mocked test endpoint: expect(result.payload).to.eventually.deep.equal({abc: 123}).notify(done)
    })

})
