const router1 = require('express').Router();
const auth = require('../middleware/auth');
const notesCtrlc=require('../contoller/notesCtrl');


router1.route('/')
      .get(auth, notesCtrlc.getNotes)
      .post(auth, notesCtrlc.creteNotes)

router1.route('/:id')
        .get(auth, notesCtrlc.getNote)
        .put(auth, notesCtrlc.updateNotes)
        .delete(auth, notesCtrlc.deleteNotes)



module.exports = router1