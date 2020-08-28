package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
import dao.UserDAO;

@Path("/userService")
public class UserService {

	@Context 
	ServletContext sc;
	
	public UserService() {
		// TODO Auto-generated constructor stub
	}
	
	@PostConstruct
	public void init() {
		if (sc.getAttribute("userDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	@POST
	@Path("/logIn")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User logIn(User user) throws IOException{
		User retVal = new User();
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		User findUser=dao.LogIn(user.getUsername(), user.getPassword());
		if(findUser==null) {
			return null;
		}
		return findUser;
	}

	@POST
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User edit(User user) throws JsonIOException, JsonSyntaxException, IOException {
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		User editUser=dao.Edit(user);
		return editUser;
	}

	@GET
	@Path("/getUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getAllUsers() throws JsonIOException, JsonSyntaxException, FileNotFoundException{
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		return dao.GetAll();
	}
	
}
