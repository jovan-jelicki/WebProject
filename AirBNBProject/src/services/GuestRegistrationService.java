package services;

import java.io.Console;
import java.io.FileNotFoundException;
import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.User;
import beans.UserType;
import dao.UserDAO;

@Path("/guestRegistration")
public class GuestRegistrationService {

	@Context 
	ServletContext sc;
	
	public GuestRegistrationService() {}
	
	@PostConstruct
	public void init() {
		if (sc.getAttribute("guestDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("guestDAO", new UserDAO(contextPath));
		}
	}
	
	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String saveUser(User user) throws JsonIOException, JsonSyntaxException, IOException  {
		UserDAO dao = (UserDAO) sc.getAttribute("guestDAO");
		List<User> users;
		users = dao.GetAll();
		for (User u : users) {
			System.out.println(u.name);
			System.out.println(user.name);
			if (u.getUsername().equals(user.getUsername()))
				return "Bad";
		}
		user.setRole(UserType.Guest);
		user.setBlocked(false);
		dao.Create(user);
		return "Good";
	}
}

