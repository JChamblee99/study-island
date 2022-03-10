const Island = require('../models/island.model');
const Thread = require('../models/thread.model');
const Reply = require('../models/reply.model');
const User = require('../models/user.model');

const { dbConnect, dbDisconnect } = require('../../../utils/test-utils/dbHandler.utils');

const Sample = require('../sample.js');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Sample Database Test Suite', () => {

    it('build sample database', async () => {

        await Sample.build();

        const islands = await Island.find().populate({ path: 'threads', populate: { path: 'replies' }});

        expect(islands).not.toBeNull();
        expect(islands[0].name).toBe('testIsland');
        expect(islands[0].threads[0].title).toBe('Thread Title');
        expect(islands[0].threads[0].replies[0].content).toBe('Content of the reply');
        expect(islands[0].threads[0].replies[0].replies.length).toBe(1);

        const users = await User.find().populate('islands');

        expect(users).not.toBeNull();
        expect(users[0].username).toBe('johnDoe');
        expect(users[0].islands[0].name).toBe('testIsland');
    });

});
