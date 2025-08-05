package nl.hu.ipass.domain;

import nl.hu.ipass.domain.enums.Age;

public class StudySession {
    private long id;
    private PomodoroTimer timer;
    private Buddy buddy;
    private ToDoList toDoList;
    private User user;

    public StudySession() {
        this.timer = timer;
        this.buddy = buddy;
        this.toDoList = toDoList;
    }

    public PomodoroTimer getTimer() {
        return timer;
    }

    public Buddy getBuddy() {
        return buddy;
    }

    public ToDoList getToDoList(){
        return toDoList;
    }

    public void updateBuddyAge(){
        if (getTimeStudied == ((getTotalStudyTime / 3) * 2)){
            buddy.updateAge(Age.TEEN);
        } else if (getCurrentWorkTime >= getTotalStudyTime ){
            buddy.updateAge(Age.ADULT);
        } else {
            buddy.updateAge(Age.BABY);
        }
    }

}
