const express = require('express');
const router = express.Router();

const islandController = require('../controllers/islands');

/* Island Routes */
//Get all islands
router.get('/', islandController.getAllIslands);

//Get individual island
router.get('/one/:id', islandController.getSingleIsland);

// //Create new island
// router.post('/islands', islandController.addIsland);

// //Update island info
// router.put('/islands/:id', islandController.editIsland);

// //Delete Island
// router.delete('/islands/:id', islandController.deleteIslandById);

// //Add user to an island
// router.post('/islands/:id/users', islandController.addUserById);

// //Edit user
// router.put('/islands/:id/users/:id', islandController.editUserById);

// //Remove user from an island
// router.delete('/islands/:id/users/:id', islandController.deleteUserById);

// //Get all threads
// router.get('/islands/:id/threads', islandController.getAllThreads)

// //Get individual thread
// router.get('/islands/:id/threads/:id', islandController.getSingleThread)

// //Add thread to island
// router.post('/islands/:id/threads', islandController.addThread);

// //Edit thread on island
// router.put('/islands/:id/threads/:id', islandController.editThread);

module.exports = router;