const Thread = require('../models/thread.model');

const testThreadData = {
    threadId: 1,
    threadAuthor: 'thread-author',
    threadTitle: 'Thread Title',
    content: 'Content of the thread',
    replies: ['reply1', 'reply2']
};

const { dbConnect,dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Thread Model Test Suite', () => {

    it('create and save thread to database', async () => {
    
        const validThread = new Thread(testThreadData);
        const savedThread = await validThread.save();

        expect(savedThread).not.toBeNull();
        expect(savedThread.threadId).toBe(testThreadData.threadId);
        expect(savedThread.threadAuthor).toBe(testThreadData.threadAuthor);
        expect(savedThread.threadTitle).toBe(testThreadData.threadTitle);
        expect(savedThread.content).toBe(testThreadData.content);
        expect(savedThread.replies).toEqual(testThreadData.replies);
    });

});