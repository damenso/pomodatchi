package nl.hu.ipass.domain;

import java.util.Timer;

public class PomodoroTimer{
    private long id;
    private int focusMinutes;
    private int breakMinutes;
    private int amountLoops;
    private boolean paused;
    private long passedFocusInSeconds;
    private boolean isFocusRunning = false;


    public PomodoroTimer() {
    }

    public void createTimer(int focusMinutes, int breakMinutes, int amountLoops) {
        this.focusMinutes = focusMinutes;
        this.breakMinutes = breakMinutes;
        this.amountLoops = amountLoops;

        new Thread(this::runTimer).start();
        //runTimer();
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
        for (int i = 0; i < amountLoops; i++) {
            if (switchToFocus() != true) {
                return;
            } else if (switchToBreak() != true) {
                return;
            }
        }
    }

    public int getTotalStudyTime(){
        return (focusMinutes * 60) * amountLoops;
    }

    public boolean switchToFocus(){
        int focusInSeconds = focusMinutes * 60;
        isFocusRunning = true;
        passedFocusInSeconds = 0;
        long startTime = System.currentTimeMillis();

        for (int i = focusInSeconds; i >= 0; i--) {
            if (paused == true) {
                System.out.println(focusInSeconds);
                isFocusRunning = false;
                return false;
            }
            passedFocusInSeconds = (System.currentTimeMillis() - startTime) / 1000;
            System.out.println(i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Stopped early");
                isFocusRunning = false;
                return false;
            }
        }
        isFocusRunning = false;
        return true;
    }

    public long getpassedFocusInSeconds() {
        return passedFocusInSeconds;
    }

    public boolean switchToBreak(){
        int breakInSeconds = breakMinutes * 60;
        for (int i = breakInSeconds; i >= 0; i--) {
            if (paused == true) {
                System.out.println(breakInSeconds);
                return false;
            }
            System.out.println(i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Stopped early");
                return false;
            }
        }
        return true;
    }

    public void pauseTimer(){
        paused = true;
    }

    public void resumeTimer(){
        paused = false;
    }
}
