const express = require('express');
const router = express.Router();

const islandController = require('../controllers/islands');
const auth_middleware = require('../middleware/auth');

//Enforce login
router.use(auth_middleware.isLoggedIn);

/* Island Routes */
//Get all islands
router.get('/', islandController.getAllIslands);

//Get individual island
router.get('/:islandId', auth_middleware.isIslandUser, islandController.getSingleIsland);

//Get request for create island page
router.get('/add-island/create', islandController.addIslandForm);

//Create new island
router.post('/add-island', islandController.addIsland);

//Update island info
router.put('/update-island/:islandId', auth_middleware.isIslandModerator, islandController.editIsland);

//Delete Island
router.delete('/remove-island/:islandId', auth_middleware.isIslandModerator, islandController.deleteIslandById);

//Add user to an island
router.put('/:islandId/add-user/:userId', auth_middleware.isIslandModerator, islandController.addUserById);

//Remove user from an island
router.put('/:islandId/remove-user/:userId', auth_middleware.isIslandModerator, islandController.deleteUserById);

//User Joins island
router.put('/:islandId/join-island', auth_middleware.isIslandPublic, islandController.joinPublicIsland);

//User Leaves island
router.put('/:islandId/leave-island', islandController.leaveIsland);

//Get all threads
router.get('/:islandId/threads', auth_middleware.isIslandUser, islandController.getAllThreads);

//Get single thread
router.get('/:islandId/threads/:threadId', auth_middleware.isIslandUser, islandController.getSingleThread);

//Create Thread on Island
router.get('/:islandId/create-thread', auth_middleware.isIslandUser, islandController.showCreateThread);

//Create thread
router.post('/:islandId/threads', auth_middleware.isIslandUser, islandController.addThread);

//Delete thread
router.delete('/:islandId/threads/:threadId', auth_middleware.isAuthorOrModerator, islandController.deleteThreadById);

// //Edit thread
// router.put('/:islandId/threads/:threadId', auth_middleware.isAuthor, islandController.editThread);

//Create reply
router.post('/:islandId/threads/:threadId/replies', auth_middleware.isIslandUser, islandController.addReply);

//Get single reply
router.get('/:islandId/threads/:threadId/replies/:replyId', auth_middleware.isIslandUser, islandController.getSingleReply);

//Delete reply
router.delete('/:islandId/threads/:threadId/replies/:replyId', auth_middleware.isAuthorOrModerator, islandController.deleteReplyById);

// //Edit reply
// router.put('/:islandId/threads/:threadId/replies/:replyId', auth_middleware.isAuthor, islandController.editReply);

module.exports = router;
