package beans;

import java.util.ArrayList;

public class Guest extends User {

	public ArrayList<Apartment> rentedApartment = new ArrayList<Apartment>();
	public ArrayList<Reservation> reservations = new ArrayList<Reservation>();
	public Boolean blocked;
	public Guest(ArrayList<Apartment> rentedApartment, ArrayList<Reservation> reservations) {
		super();
		this.rentedApartment = rentedApartment;
		this.reservations = reservations;
		this.blocked = false;
	}
	
	public Guest() {}
	
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
	public Boolean getBlocked() {
		return blocked;
	}
	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}
	
	
	
}
