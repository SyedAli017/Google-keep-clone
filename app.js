class App {
  constructor() {
    this.$form = document.querySelector(".form");
    this.$noteTitle = document.querySelector(".note-title");
    this.$noteText = document.querySelector(".note-text");
    this.$buttons = document.querySelector(".buttons");

    this.eventListeners();
  }

  eventListeners() {
    document.body.addEventListener("click", (event) => {
      this.formClick(event);
    });
  }

  formClick(event) {
    const formClicked = this.$form.contains(event.target);

    if (formClicked) {
      this.formOpen();
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
}

new App();
