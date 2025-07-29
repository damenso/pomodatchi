package nl.hu.ipass.domain;

import java.sql.Time;

public class PomodoroTimer{
    private long id;
    private Time workTime;
    private Time pauseTime;
    private int amountLoops;

    public PomodoroTimer() {
    }

    public void createTimer(Time workTime, Time pauseTime, int amountLoops) {
        this.workTime = workTime;
        this.pauseTime = pauseTime;
        this.amountLoops = amountLoops;

        startTimer(workTime);
    }

    public Time getWorkTime() {
        return workTime;
    }

    public Time getPauseTime()  {
        return pauseTime;
    }

    public int getAmountLoops() {
        return amountLoops;
    }

    //TIMER logica is nodig bedenk hier hoe je de timer opbouwt kan bijv met https://www.baeldung.com/java-measure-elapsed-time
    //Al gebruik je externe bron pls zet het hier in comments zodat ze weten dat het geen plagiaat is

    public void startTimer(Time workTime) {
        java.util.Timer timer = new java.util.Timer(String.valueOf(1000));
    }

    public void pauseTimer(){

    }

    public void resumeTimer(){

    }
}
