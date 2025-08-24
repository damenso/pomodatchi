package nl.hu.ipass.authentication;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/authentication")
public class AuthenticationResource { 

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    public Response registerUser(LoginRequest login){
        if (User.getUserByName(login.getUsername()) != null){
            return Response.status(Response.Status.BAD_REQUEST).entity("User already exists").build();
        }

        User newUser = new User(login.getUsername(), login.getPassword());
        User.addUser(newUser);
        System.out.println("Registered new user: " + newUser.getUsername());

        return Response.status(Response.Status.CREATED).entity(newUser).build();
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response loginUser(LoginRequest loginreq){
        User user = User.login(loginreq.getUsername(), loginreq.getPassword());
        if (user == null){
            return Response.status(Response.Status.BAD_REQUEST).entity("User not found").build();
        }
        return Response.status(Response.Status.OK).entity(user).build();
    }


}
