package beans;

import java.util.Date;

public class Reservation {

	public int id;
	public Apartment apartment;
	public Date startDate;
	public Date endDate;
	public int numberOfNights;
	public double fullPrice;
	public String message;
	public User guest;
	public int numberOfGuests;
	public ReservationStatus status = ReservationStatus.Created;

	public Reservation(int id, Apartment apartment, Date startDate,Date endDAte ,int numberOfNights, double fullPrice,
			String message, User guest, ReservationStatus status, int guests) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.fullPrice = fullPrice;
		this.message = message;
		this.guest = guest;
		this.status = status;
		this.numberOfGuests = guests;
		this.endDate = endDAte;
	}
	
	

	public Reservation() {
		
	}

	
	
	
	public Date getEndDate() {
		return endDate;
	}



	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}



	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
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

	public User getGuest() {
		return guest;
	}

	public void setGuest(User guest) {
		this.guest = guest;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	
	
}
