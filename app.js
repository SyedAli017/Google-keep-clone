class App {
    constructor() {
      this.notes = JSON.parse(localStorage.getItem('notes')) || [];
      this.title = "";
      this.text = "";
      this.id = "";
  
      
      this.$form = document.querySelector(".form");
      this.$placeholder = document.querySelector(".placeholder");
      this.$notes = document.querySelector(".notes");
      this.$noteTitle = document.querySelector(".note-title");
      this.$noteText = document.querySelector(".note-text");
      this.$formBtns = document.querySelector(".form-btns");
      this.$closeBtn = document.querySelector(".close-btn");
      this.$modalSection = document.querySelector(".modal-section");
      this.$modalTitle = document.querySelector(".modal-title");
      this.$modalText = document.querySelector(".modal-text");
      this.$modalCloseBtn = document.querySelector(".modal-close-btn");
      this.$colorTooltip = document.querySelector(".color-tooltip");
  
      this.saveNotes();
      this.showNotes();
      this.addEventListeners();
    }
  
    addEventListeners() {
      document.body.addEventListener("click", event => {
        this.handleFormClick(event);
        this.selectNote(event);
        this.modalOpen(event);
        this.deleteNote(event);
      });
  
      document.body.addEventListener("mouseover", event => {
        this.openTooltip(event);
      });
  
      document.body.addEventListener("mouseout", event => {
        this.closeTooltip(event);
      });
  
      this.$colorTooltip.addEventListener("mouseover", function() {
        this.style.display = "flex";
      });
  
      this.$colorTooltip.addEventListener("mouseout", function() {
        this.style.display = "none";
      });
  
      this.$colorTooltip.addEventListener("click", event => {
        const color = event.target.dataset.color;
        if (color) {
          this.editNoteColor(color);
        }
      });
  
      this.$form.addEventListener("submit", event => {
        event.preventDefault();
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNote = title || text;
        if (hasNote) {
          this.addNote({ title, text });
        }
      });
  
      this.$closeBtn.addEventListener("click", event => {
        event.stopPropagation();
        this.closeForm();
      });
  
      this.$modalCloseBtn.addEventListener("click", event => {
        this.modalClose(event);
      });
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$form.contains(event.target);
  
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      const hasNote = title || text;
  
      if (isFormClicked) {
        this.openForm();
      } else if (hasNote) {
        this.addNote({ title, text });
      } else {
        this.closeForm();
      }
    }
  
    openForm() {
      this.$form.classList.add("form-open");
      this.$noteTitle.style.display = "block";
      this.$formBtns.style.display = "block";
    }
  
    closeForm() {
      this.$form.classList.remove("form-open");
      this.$noteTitle.style.display = "none";
      this.$formBtns.style.display = "none";
      this.$noteTitle.value = "";
      this.$noteText.value = "";
    }

    addNote({ title, text }) {
      const newNote = {
        title,
        text,
        color: "white",
        id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
      };
      this.notes = [...this.notes, newNote];
      this.saveNotes();
      this.showNotes();
      this.closeForm();
    }
  
    modalOpen(event) {
      if (event.target.matches('.fa-trash')) return;  
        
      if (event.target.closest(".display-note")) {
        this.$modalSection.classList.toggle("open-modal");
        this.$modalTitle.value = this.title;
        this.$modalText.value = this.text;
      }
    }
  
    modalClose(event) {
      this.editNote(event);
      this.$modalSection.classList.toggle("open-modal");
    }

    editNote() {
      const title = this.$modalTitle.value;
      const text = this.$modalText.value;
      this.notes = this.notes.map(note =>
        note.id === Number(this.id) ? { ...note, title, text } : note
      );
      this.saveNotes();
      this.showNotes();
    }

    
    selectNote(event) {
      const $selectedNote = event.target.closest(".display-note");
      if (!$selectedNote) return;
      const [$noteTitle, $noteText] = $selectedNote.children;
      this.title = $noteTitle.innerText;
      this.text = $noteText.innerText;
      this.id = $selectedNote.dataset.id;
    }
  
    openTooltip(event) {
      if (!event.target.matches(".fa-palette")) return;
      this.id = event.target.nextElementSibling.dataset.id;
      const noteCoords = event.target.getBoundingClientRect();
      const horizontal = noteCoords.left;
      const vertical = window.scrollY - 20;
      this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
      this.$colorTooltip.style.display = "flex";
    }
  
    closeTooltip(event) {
      if (!event.target.matches(".fa-palette")) return;
      this.$colorTooltip.style.display = "none";
    }
  
    
  
    
  
    editNoteColor(color) {
      this.notes = this.notes.map(note =>
        note.id === Number(this.id) ? { ...note, color } : note
      );
      this.saveNotes();
      this.showNotes();
    }
  
    
    deleteNote(event) {
      event.stopPropagation();
      if (!event.target.matches('.fa-trash')) return;
      const id = event.target.dataset.id;
      this.notes = this.notes.filter(note => note.id !== Number(id));
      this.saveNotes();
      this.showNotes();
    }
    
    
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))  
    }
  
    showNotes() {
      const hasNotes = this.notes.length > 0;
      this.$placeholder.style.display = hasNotes ? "none" : "flex";
  
      this.$notes.innerHTML = this.notes
        .map(
          note => `
          <div style="background: ${note.color};" class="display-note" data-id="${
            note.id
          }">
            <div class="${note.title && "display-note-title"}">${note.title}</div>
            <div class="display-note-text">${note.text}</div>
            <div class="toolbar-container">
              <div class="toolbar">
              <i class="fa-solid fa-palette" data-id=${note.id}></i>
              <i class="fa-solid fa-trash" data-id=${note.id}></i>
              </div>
            </div>
          </div>
       `
        )
        .join("");
    }
  }
  
  new App();

   // <i class="fa-solid fa-palette"></i>
   // <i class="fa-solid fa-trash"></i>

  
  