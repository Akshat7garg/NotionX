import { Router } from "express";
import {
    createNote,
    deleteNote,
    fetchNotes,
    modifyNote
} from '../controllers/note.controller.js';


const router = Router();

router.route('/create').post(createNote); // Create notes
router.route('/fetch').post(fetchNotes); // Fetch notes
router.route('/modify').put(modifyNote); // Update notes
router.route('/delete').delete(deleteNote); // Delete notes

export default router;