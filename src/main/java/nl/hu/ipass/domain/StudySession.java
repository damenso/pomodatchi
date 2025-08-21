package nl.hu.ipass.domain;

import nl.hu.ipass.authentication.User;
import nl.hu.ipass.domain.enums.Age;

import java.util.HashMap;

public class StudySession {
    private long id;
    private PomodoroTimer timer;
    private Buddy buddy;
    private ToDoList toDoList;
    private User user;
    private static StudySession studySessionInstance = new StudySession();
    private HashMap<Integer, User> users = new HashMap<>();
    private static int nextUserId = 1;

    public StudySession() {
        this.timer = new PomodoroTimer();
        this.buddy = new Buddy();
        this.toDoList = new ToDoList();
    }

    public static StudySession getInstance() {
        return studySessionInstance;
    }

    public int getNextUserId() {
        return nextUserId++;
    }

    public void setUser(User user){
        this.user = user;
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


    public User getCurrentUser(){
        return user;
    }
    public void setCurrentUser(User user){
        this.user = user;
    }

    public Buddy getCurrentBuddy(){
        return buddy;
    }
    public void setCurrentBuddy(Buddy buddy){
        this.buddy = buddy;
    }

    public PomodoroTimer getCurrentTimer(){
        return timer;
    }
    public void setCurrentTimer(PomodoroTimer timer){
        this.timer = timer;
    }




}
