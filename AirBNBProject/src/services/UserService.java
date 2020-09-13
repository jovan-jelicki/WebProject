package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;


import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.BadRequestException;
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

@Path("/userService")
public class UserService {

	@Context 
	ServletContext sc;
	
	private static final String JWT_TOKEN_KEY = "yZJsnXojT3";
	private static final int Token_Time = 24;
	private static final int Refresh_Token = 300;
	
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
	public UserDAO logIn(User user) throws IOException{
		User retVal = new User();
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		User findUser=dao.LogIn(user.getUsername(), user.getPassword());
		
		if(findUser==null) {
			throw new BadRequestException();
		}
		String token = generateToken(findUser, Token_Time);
		String refreshToken = generateToken(findUser, Refresh_Token);
		dao.user = findUser;
		dao.authorizedToken = token;
		dao.refreshToken = token;
		return dao;
	}

	@POST
	@Secured({UserType.Admin, UserType.Guest, UserType.Host})
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User edit(User user) throws JsonIOException, JsonSyntaxException, IOException {
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		User editUser=dao.Edit(user);
		return editUser;
	}

	@GET
	@Secured({UserType.Admin})
	@Path("/getUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getAllUsers() throws JsonIOException, JsonSyntaxException, FileNotFoundException{	
		UserDAO dao=(UserDAO) sc.getAttribute("userDAO");
		return dao.GetAll();
	}
	
	private String generateToken(User user, int time) {
		try {
			 Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_KEY);
		        Date expirationDate = Date.from(ZonedDateTime.now().plusHours(time).toInstant());
		        Date issuedAt = Date.from(ZonedDateTime.now().toInstant());
		        return JWT.create()
		                // Issue date.
		                .withIssuedAt(issuedAt)
		                // Expiration date.
		                .withExpiresAt(expirationDate)
		                // User id - here we can put anything we want, but for the example userId is appropriate.
		                .withClaim("username", user.getUsername())
		                // Issuer of the token.
		                .withIssuer("jwtauth") 
		                
		                .withAudience("audience")
		                // And the signing algorithm.
		                .sign(algorithm); 
		} catch (JWTCreationException  e) {
	        e.printStackTrace();
	    }
		return null;
	}
	
}
