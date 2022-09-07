const express = require('express');
const router = express.Router();

const network_controller = require('../controllers/networkController');

router.get('/', network_controller.index);

router.get('/person/create', network_controller.create_get);
router.post('/person/create', network_controller.create_post);

router.get('/person/:id/delete', network_controller.delete_get);
router.post('/person/:id/delete', network_controller.delete_post);

router.get('/person/:id/update', network_controller.update_get);
router.post('/person/:id/update', network_controller.update_post);

router.get('/person/:id', network_controller.person_detail);

router.get('/people', network_controller.person_list);

module.exports = router
