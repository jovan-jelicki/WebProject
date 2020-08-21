package beans;

import java.util.ArrayList;

public class Host extends User{
	public ArrayList<Apartment> apartements = new ArrayList<Apartment>();
	public Boolean blocked;
	public Host(ArrayList<Apartment> apartements) {
		super();
		this.apartements = apartements;
	}
	
	public Host() {}
	
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
	
	
	
	
}
