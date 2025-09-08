import {BuddyService} from "../service/BuddyService.js";

export default class Buddy {

    constructor(){
        const name = document.querySelector("#buddy-name");
        this.nameInput = document.querySelector('#buddy-name');
        this.dogButton = document.querySelector('#dog-button');
        this.catButton = document.querySelector('#cat-button');
        this.buddyService = new BuddyService();
        this.dogButton?.addEventListener("click", (event) => this.selectedBuddy(event));
        this.catButton?.addEventListener("click", (event) => this.selectedBuddy(event));
        this.buddyContainer = document.querySelector('#buddy');
        this.nextButton = document.querySelector('#next-button');
        this.nextButton?.addEventListener("click", (event) => this.nextPage(event));
        this.renderBuddyFromStorage();
    }

    selectedBuddy(event){
        const name = this.nameInput?.value;
        if (!name){
            console.warn("Enter the buddy name first.");
        }
        let species = null;
        if (event.currentTarget?.id === 'dog-button'){
            this.dogButton.style.background = "red";
            this.catButton.style.background = "none";
            species = "Dog";
            this.buddyService.getChosenBuddy(name,"Dog")
            console.log(`Dog selected and its name is ${name}`);
        } else if (event.currentTarget?.id === 'cat-button'){
            this.catButton.style.background = "red";
            this.dogButton.style.background = "none";
            species = "Cat";
            this.buddyService.getChosenBuddy(name, "Cat")
            console.log(`Cat selected and its name is ${name}`);
        }

        if (species){
            sessionStorage.setItem("selectedBuddySpecies", species);
            sessionStorage.setItem("selectedBuddyName", name);
            this.renderBuddyFromStorage();
        }
    }

    renderBuddyFromStorage(){
        if (!this.buddyContainer) return;
        const species = sessionStorage.getItem("selectedBuddySpecies");
        if (!species){
            this.buddyContainer.innerHTML = "";
            return;
        }
        const src = species === "Dog"
            ? "assets/dog_buddy_setup.png"
            : "assets/cat_buddy_setup.png";

        this.buddyContainer.innerHTML =
            `<img src="${src}" alt="${species}" style="image-rendering:pixelated;width:140px;height:140px;">`;
    }
    nextPage(event){
        const name = this.nameInput?.value.trim();
        if (!name || !this.selectedBuddy) {
            alert("Enter a name and select a buddy before continuing");
            return;
        }
        if (event.currentTarget?.id === 'next-button') {
            window.location.href = "todolist-setup.html";
        }
    }
}

new Buddy();