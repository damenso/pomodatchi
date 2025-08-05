package nl.hu.ipass.domain;

import java.util.Timer;

public class PomodoroTimer{
    private long id;
    private int focusMinutes;
    private int breakMinutes;
    private int amountLoops;
    private boolean paused;

    public PomodoroTimer() {
    }

    public void createTimer(int focusMinutes, int breakMinutes, int amountLoops) {
        this.focusMinutes = focusMinutes;
        this.breakMinutes = breakMinutes;
        this.amountLoops = amountLoops;

        runTimer();
    }

    public int getFocusMinutes() {
        return focusMinutes;
    }

    public int getBreakMinutes() {
        return breakMinutes;
    }

    public int getAmountLoops() {
        return amountLoops;
    }

    public void runTimer(){
        for (int i = amountLoops; i >= 0; i--) {
            if (runFocus() == true) {
                runBreak();
            } else {
                runFocus();
            }
        }
    }


    public boolean runFocus(){
        int focusInSeconds = focusMinutes * 60;
        for (int i = focusInSeconds; i >= 0; i--) {
            if (paused == true) {
                int pausedOnSecond = i;
                System.out.println(pausedOnSecond);
                break;
            } else if (paused == false) {
                System.out.println(i);
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Stopped early");
            }
        }
        if (focusInSeconds == 0){
            return true;
        }
        return false;
    }

    public boolean runBreak(){
        int breakInSeconds = breakMinutes * 60;
        for (int i = breakInSeconds; i >= 0; i--) {
            if (paused == true) {
                int pausedOnSecond = i;
                System.out.println(pausedOnSecond);
                break;
            } else if (paused == false) {
                System.out.println(i);
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Stopped early");
            }
        }
        if (breakInSeconds == 0){
            return true;
        }
        return false;
    }

    public boolean pauseTimer(){
        return false;
    }

    public void resumeTimer(){

    }
}
