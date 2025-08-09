package nl.hu.ipass.service;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import nl.hu.ipass.domain.*;

@Path("/study")
public class StudyResource {
    private final StudySession studySession = new StudySession();
    private final Buddy buddy = studySession.getBuddy();
    private final PomodoroTimer timer = studySession.getTimer();
    private final ToDoList toDoList = studySession.getToDoList();

    // choose buddy
    @POST
    @Path("/buddy/{name}/{chosenBuddy}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response chooseBuddy(@PathParam("name") String name, @PathParam("chosenBuddy") String chosenBuddy){
        buddy.createBuddy(name, chosenBuddy);
        studySession.setCurrentBuddy(buddy);
        return Response.ok(buddy).build();
    }

    // set timer
    @POST
    @Path("/timer/{focusMinutes}/{breakMinutes}/{loopAmount}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response setTimer(@PathParam("focusMinutes") int focusMinutes, @PathParam("breakMinutes") int breakMinutes, @PathParam("loopAmount") int loopAmount){
        timer.createTimer(focusMinutes, breakMinutes, loopAmount);
        return Response.status(Response.Status.CREATED).entity(timer).build();
    }

    // pause/resume timer
    @POST
    @Path("/pauseTimer")
    public Response pauseTimer(){
        timer.pauseTimer();
        return Response.ok().build();
    }

    @POST
    @Path("/resumeTimer")
    public Response resumeTimer(){
        timer.resumeTimer();
        return Response.ok().build();
    }
    // add task to todolist
    @POST
    @Path("/task/add/{taskMessage}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTask(@PathParam("taskMessage") String taskMessage){
        Task task = new Task(taskMessage);
        toDoList.addTask(task);
        return Response.ok().build();
    }

    // delete task from todolist
    @DELETE
    @Path("/task/delete/{taskMessage}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTask(@PathParam("taskMessage") String taskMessage){
        //Kan ook id gebruiken als unieke maar dat ga je miss niet gerbuiken als je geen database gebruikt
        //Ik gebruik nu taskMessage omdat ik dat uniek genoeg vind
        //Dus een task word geindentificeerd via de message nu
        //Al wil je het veranderen naar id ga dan naar ToDoList deleteTask en verander String taskMessage argument naar long id
        toDoList.deleteTask(toDoList.getTask(taskMessage));
        return Response.ok().build();
    }

    // get todolist
    @GET
    @Path("/toDoList")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getToDoList(){
        //get add task todolist object en doe
        //ToDoList.getToDoList() dat een lijst returneerd
        return Response.ok(toDoList.getTasks()).build();
    }

    // update buddy status based on timer
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBuddyStatus() {
        //

        return Response.ok().build();
    }

    // taking care of buddy button

    // adopt buddy

    @GET
    @Path("/ping")
    public String ping(){ return "ok"; }

}
