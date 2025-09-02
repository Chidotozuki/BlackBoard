import express from "express"; 
import { getAllNotes, createNote, getNoteById, updateNote, deleteNote } from "../controllers/notesController.js";
import { authenticate } from "../middleware/authMiddleware.js"


const router = express.Router();

router.use(authenticate);

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;