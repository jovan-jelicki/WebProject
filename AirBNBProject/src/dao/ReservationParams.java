package dao;

import java.util.Date;

import beans.Apartment;
import beans.User;

public class ReservationParams {
	public Apartment apartment;
	public Date reservationStart;
	public Date reservationEnd;
	public int 	guests;
	public User guest;
	public String message;
	
	public ReservationParams () {}

	public ReservationParams(Apartment apartment, Date reservationStart, Date reservationEnd, int guests, User guest,
			String message) {
		super();
		this.apartment = apartment;
		this.reservationStart = reservationStart;
		this.reservationEnd = reservationEnd;
		this.guests = guests;
		this.guest = guest;
		this.message = message;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getReservationStart() {
		return reservationStart;
	}

	public void setReservationStart(Date reservationStart) {
		this.reservationStart = reservationStart;
	}

	public Date getReservationEnd() {
		return reservationEnd;
	}

	public void setReservationEnd(Date reservationEnd) {
		this.reservationEnd = reservationEnd;
	}

	public int getGuests() {
		return guests;
	}

	public void setGuests(int guests) {
		this.guests = guests;
	}

	public User getGuest() {
		return guest;
	}

	public void setGuest(User guest) {
		this.guest = guest;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
