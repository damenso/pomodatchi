import {BuddyService} from "./service/BuddyService";

export default class Buddy {

    constructor(){
        const dogButton = document.querySelector('#dog-buddy');
        const catButton = document.querySelector('#cat-buddy');
        const buddyService = new BuddyService();
    }

    checkDogSelected(event) {
        dogButton.addEventListener("click", function () {
            dogButton.style.display = "none";
            buddyService.getChosenBuddy("dog")
        });
    }

    checkCatSelected(event){
        catButton.addEventListener("click", function(){
            catButton.style.display = "none";
            buddyService.getChosenBuddy("cat")
        });
    }



}