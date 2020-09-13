package beans;

import java.sql.Date;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class Apartment {
	
	public int id;
	public String name;
	public ApartmentType type;
	public int numberOfRooms;
	public int numberOfGuests;
	public Location location;
	public List<Period> datesForRenting = new ArrayList<Period>();
	public List<Date> freePeriods = new ArrayList<Date>();
	public User host;
	public ArrayList<Comment> comments = new ArrayList<Comment>();
	public List<String> pictures=new ArrayList<String>();
	public double pricePerNight;
	public String checkIn ="2PM";
	public String checkOut = "10PM";
	public ApartmentStatus status = ApartmentStatus.NonActive;
	public List<Amenity> amenities = new ArrayList<Amenity>();
	public ArrayList<Reservation> reservations = new ArrayList<Reservation>();
	public Boolean deleted = false;
	public String note;
	
	public Apartment(int id,String name, ApartmentType type, int numberOfRooms, int numberOfGuests, Location location,
			ArrayList<Period> datesForRenting, ArrayList<Date> freePeriods, User host, ArrayList<Comment> comments, List<String> pictures,
			double pricePerNight, String checkIn, String checkOut, ApartmentStatus status, ArrayList<Amenity> amenities,
			ArrayList<Reservation> reservations, String note) {
		super();
		this.id = id;
		this.name=name;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.datesForRenting = datesForRenting;
		this.freePeriods = freePeriods;
		this.host = host;
		this.comments = comments;
		this.pictures=pictures;
		this.pricePerNight = pricePerNight;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
		this.deleted = false;
		this.note=note;
	}
	

	
	
	public List<String> getPictures() {
		return pictures;
	}

	public void setPictures(List<String> pictures) {
		this.pictures = pictures;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ApartmentType getType() {
		return type;
	}

	public void setType(ApartmentType type) {
		this.type = type;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Period> getDatesForRenting() {
		return datesForRenting;
	}




	public void setDatesForRenting(List<Period> datesForRenting) {
		this.datesForRenting = datesForRenting;
	}




	public List<Date> getFreePeriods() {
		return freePeriods;
	}




	public void setFreePeriods(List<Date> freePeriods) {
		this.freePeriods = freePeriods;
	}




	public User getHost() {
		return host;
	}

	public void setHost(User host) {
		this.host = host;
	}

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}

	public String getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}

	public ApartmentStatus getStatus() {
		return status;
	}

	public void setStatus(ApartmentStatus status) {
		this.status = status;
	}

	public List<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
	public Apartment( ) {}
	
}
