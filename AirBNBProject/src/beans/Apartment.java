package beans;

import java.sql.Date;
import java.util.ArrayList;

public class Apartment {
	
	public int id;
	public ApartmentType type;
	public int numberOfRooms;
	public int numberOfGuests;
	public Location location;
	public ArrayList<Date> datesForRenting = new ArrayList<Date>();
	public ArrayList<Date> freePeriods = new ArrayList<Date>();
	public User host;
	public ArrayList<Comment> comments = new ArrayList<Comment>();
	//pikcure
	public double pricePerNight;
	public String checkIn ="2PM";
	public String checkOut = "10PM";
	public ApartmentStatus status;
	public ArrayList<Amenity> amenities = new ArrayList<Amenity>();
	public ArrayList<Reservation> reservations = new ArrayList<Reservation>();
	public Boolean deleted;
	
	public Apartment(int id, ApartmentType type, int numberOfRooms, int numberOfGuests, Location location,
			ArrayList<Date> datesForRenting, ArrayList<Date> freePeriods, User host, ArrayList<Comment> comments,
			double pricePerNight, String checkIn, String checkOut, ApartmentStatus status, ArrayList<Amenity> amenities,
			ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.datesForRenting = datesForRenting;
		this.freePeriods = freePeriods;
		this.host = host;
		this.comments = comments;
		this.pricePerNight = pricePerNight;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
		this.deleted = false;
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

	public ArrayList<Date> getDatesForRenting() {
		return datesForRenting;
	}

	public void setDatesForRenting(ArrayList<Date> datesForRenting) {
		this.datesForRenting = datesForRenting;
	}

	public ArrayList<Date> getFreePeriods() {
		return freePeriods;
	}

	public void setFreePeriods(ArrayList<Date> freePeriods) {
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

	public ArrayList<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(ArrayList<Amenity> amenities) {
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
