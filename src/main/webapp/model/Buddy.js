import {BuddyService} from "../service/BuddyService.js";

export default class Buddy {

    constructor(){
        const name = document.querySelector("#buddy-name");
        this.nameInput = document.querySelector('#buddy-name');
        this.dogButton = document.querySelector('#dog-buddy');
        this.catButton = document.querySelector('#cat-buddy');
        this.buddyService = new BuddyService();
        this.dogButton?.addEventListener("click", (event) => this.selectedBuddy(event));
        this.catButton?.addEventListener("click", (event) => this.selectedBuddy(event));
        this.buddyContainer = document.querySelector('#buddy');

    }

    selectedBuddy(event){
        const name = this.nameInput?.value;
        if (!name){
            console.warn("Vul eerst een naam in.");
        }

        if (event.currentTarget?.id === 'dog-buddy'){
            this.dogButton.style.background = "red";
            this.catButton.style.background = "none";
            this.buddyService.getChosenBuddy(name,"Dog")
            console.log(`Dog selected and its name is ${name}`);
        } else if (event.currentTarget?.id === 'cat-buddy'){
            this.catButton.style.background = "red";
            this.dogButton.style.background = "none";
            this.buddyService.getChosenBuddy(name, "Cat")
            console.log(`Cat selected and its name is ${name}`);
        }
    }

    renderBuddyImage(){

    }

}

new Buddy();