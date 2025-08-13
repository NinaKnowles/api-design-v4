import * as user from '../user';

describe('user handler', () => {
    it('should create a new user', async () => {
        // should really use a local database for testing and should clear and empty the database before and after
        // you never want to have stateful tests
        // Basically don't use this test as it doesn't mock the database or anything
        const req = {body: {username: 'hello', password: 'hi'}}
        const res = {json(token) {
            expect(token).toBeTruthy()
        }}
        await user.createNewUser(req,res, () => {})
    })
})