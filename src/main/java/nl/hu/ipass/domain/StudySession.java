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
        if (timer.getpassedFocusInSeconds() >= (timer.getTotalStudyTime() *  0.67 ) && timer.getpassedFocusInSeconds() < (timer.getTotalStudyTime() * 0.8) ){
            buddy.updateAge(Age.TEEN);
        } else if (timer.getpassedFocusInSeconds() >= (timer.getTotalStudyTime()* 0.8)){
            buddy.updateAge(Age.ADULT);
        } else {
            buddy.updateAge(Age.BABY);
        }
    }



}
