package nl.hu.ipass.domain;

import java.sql.Time;

public class Timer {
    private long id;
    private Time workTime;
    private Time pauseTime;
    private int amountLoops;

    public Timer(Time workTime, Time pauseTime, int amountLoops) {  }
}
