const Island = require('./models/island.model');
const Thread = require('./models/thread.model');
const Reply = require('./models/reply.model');
const User = require('./models/user.model');

module.exports.build = async () => {
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johnDoe',
        email: 'john@email.com',
        role: 'user',
        islands: []
    };

    const user = new User(userData);

    const nestedReplyData = {
        author: user,
        content: 'Content of the nested reply',
        replies: []
    };

    const nestedReply = new Reply(nestedReplyData);

    const replyData = {
        author: user,
        content: 'Content of the reply',
        replies: [nestedReply]
    };

    const reply = new Reply(replyData);

    const threadData = {
        author: user,
        title: 'Thread Title',
        content: 'Content of the thread',
        replies: [reply]
    };

    const thread = new Thread(threadData);

    const islandData = {
        name: 'testIsland',
        description: "This is a test island",
        privacy: 'public',
        users: [user],
        threads: [thread]
    };

    const islandData2 = {
        name: 'testIsland2',
        description: "This is a test island",
        privacy: 'public',
        users: [user],
        threads: [thread]
    };

    const islandData3 = {
        name: 'testIsland3',
        description: "This is a test island",
        privacy: 'public',
        users: [user],
        threads: [thread]
    };

    const islandData4 = {
        name: 'testIsland4',
        description: "This is a test island",
        privacy: 'private',
        users: [user],
        threads: [thread]
    };

    const island = new Island(islandData);
    const island2 = new Island(islandData2);
    const island3 = new Island(islandData3);
    const island4 = new Island(islandData4);

    user.islands.push(island);

    await user.save();
    await nestedReply.save();
    await reply.save();
    await thread.save();
    await island.save();
    await island2.save();
    await island3.save();
    await island4.save();
}
