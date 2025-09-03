package nl.hu.ipass.data.request;

public class TimerRequest {
    public int focusMinutes;
    public int breakMinutes;
    public int loopAmount;

    public TimerRequest() {}
    public TimerRequest(int focusMinutes, int breakMinutes, int loopAmount) {
        this.focusMinutes = focusMinutes;
        this.breakMinutes = breakMinutes;
        this.loopAmount = loopAmount;
    }
}
