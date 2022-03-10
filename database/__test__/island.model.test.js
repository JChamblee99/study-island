const Island = require('../models/island.model');

const testIslandData = {
    userId: 1,
    islandName: 'testIsland',
    description: "This is a test island",
    privacy: 'public',
    users: ['user1','user2','user3'],
    threads:['thread1', 'thread2','tread3'],
};

const { dbConnect,dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('Island Model Test Suite', () => {

    it('create and save island to database', async () => {
    
        const validIsland = new Island(testIslandData);
        const savedIsland = await validIsland.save();

        expect(savedIsland).not.toBeNull();
        expect(savedIsland.islandId).toBe(testIslandData.islandId);
        expect(savedIsland.islandName).toBe(testIslandData.islandName);
        expect(savedIsland.description).toBe(testIslandData.description);
        expect(savedIsland.privacy).toBe(testIslandData.privacy);
        expect(savedIsland.users).toEqual(testIslandData.users);
        expect(savedIsland.threads).toEqual(testIslandData.threads);
    });

});