class App {
  constructor() {
    this.notes = [];
    this.title = ""
    this.text = ""
    this.id = ""

    this.$form = document.querySelector(".form");
    this.$noteTitle = document.querySelector(".note-title");
    this.$noteText = document.querySelector(".note-text");
    this.$buttons = document.querySelector(".buttons");
    this.$closebtn = document.querySelector(".close-btn");
    this.$notes = document.querySelector(".notes");
    this.$placeholder = document.querySelector(".placeholder");
    this.$modalSection = document.querySelector(".modal-section")
    this.$modalTitle = document.querySelector(".modal-title")
    this.$modalText = document.querySelector(".modal-text")
    this.$modalCloseBtn = document.querySelector(".modal-close-btn")

    this.eventListeners();
  }

  eventListeners() {
    document.body.addEventListener("click", (event) => {
      this.formClick(event);
      this.selectNote(event)
      this.modalOpen(event)
      
    });

    this.$form.addEventListener("submit", (event) => {
      event.preventDefault();

      const noteTitle = this.$noteTitle.value;
      const noteText = this.$noteText.value;

      const isNotePresent = noteTitle || noteText;

      if (isNotePresent) {
        this.addNote({ noteTitle, noteText });
      }
    });

    this.$closebtn.addEventListener("click", (event) => {
      event.stopPropagation();
      this.formClose();

    });

    this.$modalCloseBtn.addEventListener("click", (event) => {
        this.modalClose(event)
    })
  }

  formClick(event) {
    const formClicked = this.$form.contains(event.target);

    const noteTitle = this.$noteTitle.value;
    const noteText = this.$noteText.value;

    const isNotePresent = noteTitle || noteText;

    if (formClicked) {
      this.formOpen();
      console.log("clicked");
    } else if (isNotePresent) {
      this.addNote({ noteTitle, noteText });
    } else {
      this.formClose();
    }
  }

  formOpen() {
    this.$noteTitle.style.display = "block";
    this.$buttons.style.display = "block";
  }

  formClose() {
    this.$noteTitle.style.display = "none";
    this.$buttons.style.display = "none";
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  addNote({ noteTitle, noteText }) {
    const newNote = {
      noteTitle,
      noteText,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };

    this.notes = [...this.notes, newNote];

    this.showNotes();
    this.formClose();
  }

  modalOpen(event) {
   if (event.target.closest(".display-notes" )) {
    this.$modalSection.classList.toggle("modal-open")
    this.$modalTitle.value = this.title
    this.$modalText.value = this.text


   }
  }

  modalClose(event) {
    this.editNote()
    this.$modalSection.classList.toggle("modal-open")
  }

  editNote() {
    const noteTitle = this.$modalTitle.value
    const noteText = this.$modalText.value
    this.notes = this.notes.map(note =>
        note.id === Number(this.id) ? {...note, noteTitle, noteText} : note
        
        )

        this.showNotes()
  }

  selectNote(event) {
    const $selectedNote = event.target.closest(".display-notes")
    if (!$selectedNote) return
    const [$noteTitle, $noteText] = $selectedNote.children
    this.title = $noteTitle.innerText
    this.text = $noteText.innerText
    this.id = $selectedNote.dataset.id
     
  }

  showNotes() {
    const isNotePresent = this.notes.length > 0;
    if (isNotePresent) {
      this.$placeholder.style.display = "none";
    } else {
      this.$placeholder.style.display = "flex";
    }

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
    <div style="background: ${note.color};" class="display-notes" data-id="${note.id}">
      <div class="${note.noteTitle && "display-notes-title"}">${note.noteTitle}</div>
      <div class="display-notes-text">${note.noteText}</div>
      <div class="toolbar-section">
        <div class="toolbar">
            <i class="fa-solid fa-palette"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
 `
      )
      .join("");
  }
}

new App();
