(() => {
  const form = document.getElementById('noteForm');
  const noteInput = document.getElementById('noteInput');
  const notesContainer = document.getElementById('notesContainer');

  // Load notes from localStorage on page load
  const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(createNoteElement);
  };

  // Save notes to localStorage
  const saveNotes = () => {
    const notes = [];
    notesContainer.querySelectorAll('.note p').forEach(noteEl => {
      notes.push(noteEl.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  // Create and append note element
  const createNoteElement = (text) => {
    const note = document.createElement('article');
    note.classList.add('note');
    note.setAttribute('tabindex', '0');

    const noteText = document.createElement('p');
    noteText.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.setAttribute('aria-label', 'Delete note');
    deleteBtn.textContent = '×';

    note.appendChild(noteText);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);
  };

  // Handle form submit: add note
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (text) {
      createNoteElement(text);
      saveNotes();
      noteInput.value = '';
      noteInput.focus();
    }
  });

  // Handle delete button clicks with event delegation
  notesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
      const note = e.target.closest('.note');
      if (note) {
        notesContainer.removeChild(note);
        saveNotes();
      }
    }
  });

  // Initialize
  loadNotes();
})();
