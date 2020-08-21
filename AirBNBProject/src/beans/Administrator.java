package beans;

public class Administrator extends User{

	public Administrator (String username, String password, String name, String surname, Gender gender) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = UserType.Admin;
	}
	
	public Administrator() {}
	
	
}
