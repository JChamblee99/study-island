const express = require('express');
const router = express.Router();

const Islands = require('../controllers/islands');

/* Island Routes */
//Get all islands
router.get('/islands', Island.getAllIslands);

//Get individual island
router.get('/islands/:id', Island.getSingleIsland);

//Create new island
router.post('/islands', Island.addIsland);

//Update island info
router.put('/islands/:id', Island.editIsland);

//Delete Island
router.delete('/islands/:id', Island.deleteIslandById);

//Add user to an island
router.post('/islands/:id/users', Island.addUserById);

//Edit user
router.put('/islands/:id/users/:id', Island.editUserById);

//Remove user from an island
router.delete('/islands/:id/users/:id', Island.deleteUserById);

//Get all threads
router.get('/islands/:id/threads', Island.getAllThreads)

//Get individual thread
router.get('/islands/:id/threads/:id', Island.getSingleThread)

//Add thread to island
router.post('/islands/:id/threads', Island.addThread);

//Edit thread on island
router.put('/islands/:id/threads/:id', Island.editThread);

module.exports = router;