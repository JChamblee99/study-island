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
        password: 'password',
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

    const island = new Island(islandData);

    user.islands.push(island);

    await user.save();
    await reply.save();
    await thread.save();
    await island.save();
}
