package nl.hu.ipass.service;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import nl.hu.ipass.domain.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;

@Path("/study")
public class StudyResource {
    private static final StudySession studySession = new StudySession();
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
        buddy.getAge();
        return Response.ok(buddy).build();
    }

    // set timer
    @POST
    @Path("/timer/create/{focusMinutes}/{breakMinutes}/{loopAmount}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response setTimer(@PathParam("focusMinutes") int focusMinutes, @PathParam("breakMinutes") int breakMinutes, @PathParam("loopAmount") int loopAmount) throws IOException {
        //source: https://www.w3schools.com/java/java_files_create.asp
        // voor bufferedWriter: https://stackoverflow.com/questions/18549704/create-a-new-line-in-javas-filewriter van blackbird104
        try {
            BufferedWriter output = new BufferedWriter(new FileWriter("C:\\Users\\damen\\herkansing\\pomodatchi\\src\\main\\java\\nl\\hu\\ipass\\data\\timer.txt", true)) ;
            output.append(focusMinutes + "," + breakMinutes + "," + loopAmount);
            output.newLine();
            output.close();
            timer.createTimer(focusMinutes, breakMinutes, loopAmount);
            return Response.ok().build();
        }catch (IOException e) {
            System.out.println(e);
            e.printStackTrace();
            return Response.serverError().build();
        }
//        try {
//            System.out.println(System.getProperty("user.home"));
//            System.out.println(System.getProperty("user.dir"));
//            String base = System.getProperty("user.home");
//            java.nio.file.Path dataDir = java.nio.file.Paths.get(base, "pomodatchi","data");
//            java.nio.file.Files.createDirectories(dataDir);
//
//            java.nio.file.Path file = dataDir.resolve("timer.txt");
//
//            try (java.io.BufferedWriter w = java.nio.file.Files.newBufferedWriter(
//                    file,
//                    java.nio.charset.StandardCharsets.UTF_8,
//                    java.nio.file.StandardOpenOption.CREATE,
//                    java.nio.file.StandardOpenOption.APPEND)) {
//
//                w.write("Focus: " + focusMinutes + ", Break: " + breakMinutes + ", Loop: " + loopAmount);
//                w.newLine();
//            }
//
//            System.out.println("Timer opgeslagen in: " + file.toAbsolutePath());
//            return Response.status(Response.Status.CREATED).entity(timer).build();
//
//        } catch (IOException e){
//            e.printStackTrace();
//            return Response.serverError().entity("{\"message\":\"Kon niet naar timer schrijven\"}").build();
//        }

    }

    // pause/resume timer
    @POST
    @Path("/timer/pause")
    public Response pauseTimer(){
        timer.pauseTimer();
        return Response.ok().build();
    }

    @POST
    @Path("/timer/resume")
    public Response resumeTimer(){
        timer.resumeTimer();
        return Response.ok().build();
    }
    // add task to todolist
    @POST
    @Path("/todoList/add/{taskMessage}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTask(@PathParam("taskMessage") String taskMessage){
        if (taskMessage == null || taskMessage.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("{\"error\":\"message is required\"}").build();
        }
        toDoList.addTask(taskMessage);
        return Response.status(Response.Status.CREATED).entity(taskMessage).build();
    }

    // delete task from todolist
    @DELETE
    @Path("/todoList/delete/{taskMessage}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTask(@PathParam("taskMessage") String taskMessage){
        //Kan ook id gebruiken als unieke maar dat ga je miss niet gebruiken als je geen database gebruikt
        //Ik gebruik nu taskMessage omdat ik dat uniek genoeg vind
        //Dus een task word geidentificeerd via de message nu
        //Al wil je het veranderen naar id ga dan naar ToDoList deleteTask en verander String taskMessage argument naar long id
        if (taskMessage == null || taskMessage.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("{\"error\":\"message is required\"}").build();
        }
        if (toDoList.getTasks().isEmpty()){
            return Response.status(Response.Status.BAD_REQUEST).entity("{\"error\":\"todo list is empty\"}").build();
        }
        toDoList.deleteTask(toDoList.getTask(taskMessage));
        return Response.ok().build();
    }

    // get todolist
    @GET
    @Path("/toDoList")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getToDoList(){
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

    // saving info for a session
    @POST
    @Path("/session/save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveSessionStartup(){
        return Response.ok().build();
    }


}
