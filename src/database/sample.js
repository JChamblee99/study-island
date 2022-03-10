const Island = require('./models/island.model');
const Thread = require('./models/thread.model');
const Reply = require('./models/reply.model');
const User = require('./models/user.model');

module.exports.build = async () => {
    const testUserData = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johnDoe',
        email: 'john@email.com',
        password: 'password',
        role: 'user'
    };

    const testUser = new User(testUserData);

    const testReplyData = {
        author: testUser,
        content: 'Content of the reply',
    };

    const testReply = new Reply(testReplyData);

    const testThreadData = {
        author: testUser,
        title: 'Thread Title',
        content: 'Content of the thread',
        replies: [testReply]
    };

    const testThread = new Thread(testThreadData);

    const testIslandData = {
        name: 'testIsland',
        description: "This is a test island",
        privacy: 'public',
        users: [testUser],
        threads: [testThread]
    };

    const testIsland = new Island(testIslandData);

    await testUser.save();
    await testReply.save();
    await testThread.save();
    await testIsland.save();
}
