package nl.hu.ipass.domain;

import nl.hu.ipass.domain.enums.Age;

public class Buddy {
    private long id;
    private String name;
    private Age age;
    private String chosenBuddy;

    public Buddy() {
        this.age = Age.BABY;
    }

    public void createBuddy(String name, String buddy){
        this.name = name;
        if(buddy == "Cat"){
            this.chosenBuddy = "Cat";
        }else{
            this.chosenBuddy = "Dog";
        }
    }

    public void updateAge(Age age) {
        this.age = age;
    }
}


