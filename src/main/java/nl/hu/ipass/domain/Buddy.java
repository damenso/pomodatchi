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
        if(buddy.equalsIgnoreCase("Cat")){
            this.chosenBuddy = "Cat";
        }else if (buddy.equalsIgnoreCase("Dog")){
            this.chosenBuddy = "Dog";
        } else {
            throw new IllegalArgumentException("Invalid buddy");
        }
    }

    public void updateAge(Age age) {
        this.age = age;
    }

    public String getName(){
        return name;
    }

    public String getBuddy() {
        return chosenBuddy;
    }

    public String getChosenBuddy() {
        return chosenBuddy;
    }
}


