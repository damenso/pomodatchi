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

    }

    selectedBuddy(event){
        const name = this.nameInput?.value;
        if (!name){
            console.warn("Enter the buddy name first.");
        }

        if (event.currentTarget?.id === 'dog-button'){
            this.dogButton.style.background = "red";
            this.catButton.style.background = "none";
            this.buddyService.getChosenBuddy(name,"Dog")
            console.log(`Dog selected and its name is ${name}`);
        } else if (event.currentTarget?.id === 'cat-button'){
            this.catButton.style.background = "red";
            this.dogButton.style.background = "none";
            this.buddyService.getChosenBuddy(name, "Cat")
            console.log(`Cat selected and its name is ${name}`);
        }
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