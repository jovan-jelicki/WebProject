package beans;

import java.sql.Date;

public class Reservation {

	public int id;
	public Apartment apartment;
	public Date startDate;
	public int numberOfNights;
	public double fullPrice;
	public String message;
	public Guest guest;
	public ReservationStatus status;

	public Reservation(int id, Apartment apartment, Date startDate, int numberOfNights, double fullPrice,
			String message, Guest guest, ReservationStatus status) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.fullPrice = fullPrice;
		this.message = message;
		this.guest = guest;
		this.status = status;
	}

	public Reservation() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public double getFullPrice() {
		return fullPrice;
	}

	public void setFullPrice(double fullPrice) {
		this.fullPrice = fullPrice;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	
	
}
