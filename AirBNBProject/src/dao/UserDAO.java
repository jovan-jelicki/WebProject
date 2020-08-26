package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import beans.User;

public class UserDAO {

	private HashMap<String, User> users = new HashMap<String, User>();
	
	private  Gson gson;
	private String path="";  //putanja do users.json
	
	public UserDAO () {
		this.gson = new GsonBuilder()
				.setPrettyPrinting()
				.create();
	}

	
	public UserDAO(String contextPath) {
		this.gson = new GsonBuilder()
				.setPrettyPrinting()
				.create();
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\users.json");
		this.path=f.getAbsolutePath();		
	}
	public void Save(ArrayList<User> users) throws IOException {
		System.out.println(users);
		Writer out=new FileWriter(path);
		gson.toJson(users, out); 
		out.flush();
		out.close();
	}
	
	public List<User> GetAll() throws JsonIOException, JsonSyntaxException, FileNotFoundException {
		return gson.fromJson( new JsonReader(new FileReader(path)), new TypeToken<List<User>>(){}.getType());
	}
	
	public void Create(User user) throws IOException {
		ArrayList<User> users=new ArrayList<User>();
		System.out.println(path+"***********************");

		users=(ArrayList<User>) GetAll();
		if(users==null) {
			users=new ArrayList<User>();
		}
		users.add(user);
		Save(users);	
	}
	
	public User LogIn(String username, String password) throws JsonIOException, JsonSyntaxException, FileNotFoundException {
		for(User user : GetAll()) { 
			if(user.getUsername().equals(username) && user.getPassword().equals(password)) {
				return user;
			}
		}
		return null;
	}
}

