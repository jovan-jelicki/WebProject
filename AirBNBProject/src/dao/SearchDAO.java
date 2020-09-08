package dao;

import java.util.Date;

public class SearchDAO {
	public String location;
	public Date startDate;
	public Date endDate;
	public double minPrice;
	public double maxPrice;
	public int guests;
	public int rooms;
	
	public SearchDAO() {}
	
	public SearchDAO(String location, Date startDate, Date endDate, double minPrice, double maxPrice, int guests,
			int rooms) {
		super();
		this.location = location;
		this.startDate = startDate;
		this.endDate = endDate;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.guests = guests;
		this.rooms = rooms;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public double getMinPrice() {
		return minPrice;
	}
	public void setMinPrice(double minPrice) {
		this.minPrice = minPrice;
	}
	public double getMaxPrice() {
		return maxPrice;
	}
	public void setMaxPrice(double maxPrice) {
		this.maxPrice = maxPrice;
	}
	public int getGuests() {
		return guests;
	}
	public void setGuests(int guests) {
		this.guests = guests;
	}
	public int getRooms() {
		return rooms;
	}
	public void setRooms(int rooms) {
		this.rooms = rooms;
	}
	
	
}
