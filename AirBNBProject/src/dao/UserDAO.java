package dao;

import java.util.HashMap;

import beans.User;

public class UserDAO {

	private HashMap<String, User> users = new HashMap<String, User>();
	
	public UserDAO () {}
	
	public UserDAO(String contextPath) {
		//TODO
	}
}
