package nl.hu.ipass.domain;

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
}
