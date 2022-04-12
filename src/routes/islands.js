const express = require('express');
const router = express.Router();

const islandController = require('../controllers/islands');

/* Island Routes */
//Get all islands
router.get('/', islandController.getAllIslands);

//Get individual island
router.get('/:islandId', islandController.getSingleIsland);

//Create new island
router.post('/', islandController.addIsland);

//Update island info
router.put('/update-island/:islandId', islandController.editIsland);

//Delete Island
router.delete('/remove-island/:islandId', islandController.deleteIslandById);

//Add user to an island
router.put('/:islandId/add-user/:userId', islandController.addUserById);

//Remove user from an island
router.put('/:islandId/remove-user/:userId', islandController.deleteUserById);

//Get all threads
router.get('/:islandId/threads', islandController.getAllThreads)

// //Get single thread
// router.get('/:id/threads/:id', islandController.getSingleThread)

// //Create thread
// router.post('/:id/threads', islandController.addThread);

// //Edit thread
// router.put('/:id/threads/:id', islandController.editThread);

module.exports = router;