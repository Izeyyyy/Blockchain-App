package note.app.blockchain.Controller;

import note.app.blockchain.Entity.NoteEntity;
import note.app.blockchain.Service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<NoteEntity> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public NoteEntity getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @PostMapping
    public NoteEntity createNote(@RequestBody NoteEntity note) {
        return noteService.createNote(note);
    }

    @PutMapping("/{id}")
    public NoteEntity updateNote(
            @PathVariable Long id,
            @RequestBody NoteEntity updatedNote) {

        return noteService.updateNote(id, updatedNote   );
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}