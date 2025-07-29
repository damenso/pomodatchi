package nl.hu.ipass.service;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import nl.hu.ipass.domain.Buddy;
import nl.hu.ipass.domain.PomodoroTimer;
import nl.hu.ipass.domain.Task;
import nl.hu.ipass.domain.ToDoList;

import javax.servlet.annotation.WebServlet;
import java.sql.Time;

@WebServlet
@Path("/study")
public class StudyResource {
    private final ToDoList toDoList = new ToDoList();
    private final PomodoroTimer timer = new PomodoroTimer();
    private final Buddy buddy = new Buddy();

    // choose buddy
    @POST
    @Path("/buddy/{name}/{chosenBuddy}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void chooseBuddy(@PathParam("name") String name, @PathParam("chosenBuddy") String chosenBuddy){
        buddy.createBuddy(name, chosenBuddy);
        //Voeg buddy toe aan user
        // user.setBuddy(buddyBool)
        //buddyBool 0 = kat, 1 = hond
    }
    // set timer
    @POST
    @Path("/timer/{workTime}{breakTime}{loopAmount}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response setTimer(@PathParam("workTime") Time workTime, @PathParam("breakTime") Time breakTime, @PathParam("loopAmount") int loopAmount){
        timer.createTimer(workTime, breakTime, loopAmount);

        return Response.status(Response.Status.CREATED).entity(timer).build();
    }

    // pause/resume timer
    @POST
    @Path("/pauseTimer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response pauseTimer(){
        timer.pauseTimer();
        return Response.ok().build();
    }

    @POST
    @Path("/resumeTimer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
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
        return Response.ok().build();
    }

    // update buddy status based on timer

    // taking care of buddy button

    // adopt buddy


}
