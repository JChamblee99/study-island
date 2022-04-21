const express = require('express');
const router = express.Router();

const islandController = require('../controllers/islands');

/* Island Routes */
//Get all islands
router.get('/', islandController.getAllIslands);

//Get individual island
router.get('/:islandId', islandController.getSingleIsland);

//Get request for create island page
router.get('/add-island/create', islandController.addIslandForm); 

//Create new island
router.post('/add-island', islandController.addIsland);

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

//Get single thread
router.get('/:islandId/threads/:threadId', islandController.getSingleThread)

//Create thread
router.post('/:islandId/threads', islandController.addThread);

// //Edit thread
// router.put('/:id/threads/:id', islandController.editThread);

//Create reply
router.post('/:islandId/threads/:threadId/replies', islandController.addReply);

module.exports = router;
