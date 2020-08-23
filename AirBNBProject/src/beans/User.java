package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class User implements Serializable{

	private static final long serialVersionUID = 7785755074278264666L;
	
	public String username;
	public String password;
	public String name;
	public String surname;
	public Gender gender;
	public UserType role;
	public ArrayList<Apartment> rentedApartment = new ArrayList<Apartment>();
	public ArrayList<Reservation> reservations = new ArrayList<Reservation>();
	public ArrayList<Apartment> apartements = new ArrayList<Apartment>();
	public Boolean blocked;
	
	public User () {}
	
	public User(String username, String password, String name, String surname, Gender gender, UserType role,
			ArrayList<Apartment> rentedApartment, ArrayList<Reservation> reservations, ArrayList<Apartment> apartements,
			Boolean blocked) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role;
		this.rentedApartment = rentedApartment;
		this.reservations = reservations;
		this.apartements = apartements;
		this.blocked = blocked;
	}

	public ArrayList<Apartment> getRentedApartment() {
		return rentedApartment;
	}
	public void setRentedApartment(ArrayList<Apartment> rentedApartment) {
		this.rentedApartment = rentedApartment;
	}
	public ArrayList<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
	public ArrayList<Apartment> getApartements() {
		return apartements;
	}
	public void setApartements(ArrayList<Apartment> apartements) {
		this.apartements = apartements;
	}
	public Boolean getBlocked() {
		return blocked;
	}
	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public UserType getRole() {
		return role;
	}
	public void setRole(UserType role) {
		this.role = role;
	}

	
}
