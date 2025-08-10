package nl.hu.ipass.domain;

public class Task {
    private long id;
    private String message;

    public Task(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



}
