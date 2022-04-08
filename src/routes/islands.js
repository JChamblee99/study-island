const express = require('express');
const router = express.Router();

const islandController = require('../controllers/islands');

/* Island Routes */
//Get all islands
router.get('/', islandController.getAllIslands);

//Get individual island
router.get('/:id', islandController.getSingleIsland);

// //Create new island
router.post('/', islandController.addIsland);

// //Update island info
router.put('/:id', islandController.editIsland);

// //Delete Island
router.delete('/:id', islandController.deleteIslandById);

// //Add user to an island
router.put('/:islandId/users/:userId', islandController.addUserById);

// //Edit user
// router.put('/:id/users/:id', islandController.editUserById);

// //Remove user from an island
// router.delete('/:id/users/:id', islandController.deleteUserById);

// //Get all threads
// router.get('/:id/threads', islandController.getAllThreads)

// //Get individual thread
// router.get('/:id/threads/:id', islandController.getSingleThread)

// //Add thread to island
// router.post('/:id/threads', islandController.addThread);

// //Edit thread on island
// router.put('/:id/threads/:id', islandController.editThread);

module.exports = router;