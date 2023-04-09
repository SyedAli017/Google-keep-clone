class App {
  constructor() {
    this.notes = [];

    this.$form = document.querySelector(".form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$buttons = document.querySelector(".buttons");
    this.$notes = document.querySelector(".notes");
    this.$placeholder = document.querySelector(".placeholder");

    this.eventListeners();
  }

  eventListeners() {
    document.body.addEventListener("click", (event) => {
      this.formClick(event);
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
  }

  formClick(event) {
    const formClicked = this.$form.contains(event.target);

    if (formClicked) {
      this.formOpen();
      console.log("clicked");
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
  }

  addNote(note) {
    const newNote = {
      title: note.noteTitle,
      text: note.noteText,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };

    this.notes = [...this.notes, newNote];

    this.showNotes();
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
    <div style="background: ${note.color};" class="note">
      <div class="${note.title && "note-title"}">${note.title}</div>
      <div class="note-text">${note.text}</div>
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
