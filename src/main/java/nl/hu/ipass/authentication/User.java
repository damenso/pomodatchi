package nl.hu.ipass.authentication;

import nl.hu.ipass.domain.StudySession;

import java.util.HashMap;
import java.util.Map;

public class User {
    private long id;
    private String username;
    private String password;
    private static HashMap<String, User> users = new HashMap<>();

    public User( String username, String password) {
        this.id = StudySession.getInstance().getNextUserId();
        this.username = username;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public static User getUserByName(String username) {
        return users.get(username);
    }

    public static User login(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public static void addUser(User user) {
        users.put(user.getUsername(), user);
        StudySession.getInstance().setUser(new User(user.getUsername(), user.getPassword()));
        System.out.println("User added: " + user.getUsername());
    }


}
