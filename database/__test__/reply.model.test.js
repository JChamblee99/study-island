const Reply = require('../models/reply.model');

const testReplyData = {
    replyId: 1,
    replyAuthor: 'reply-author',
    content: 'Content of the reply',
};

const { dbConnect, dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Reply Model Test Suite', () => {

    it('create and save reply to database', async () => {

        const validReply = new Reply(testReplyData);
        const savedReply = await validReply.save();

        expect(savedReply).not.toBeNull();
        expect(savedReply.replyId).toBe(testReplyData.replyId);
        expect(savedReply.replyAuthor).toBe(testReplyData.replyAuthor);
        expect(savedReply.replyTitle).toBe(testReplyData.replyTitle);
    });

});