package beans;

public class Location {

	public int id;
	public double longitude; // duzina :D
	public double latitude;
	public Adress adress;
	
	public Location(int id, double longitude, double latitude, Adress adress) {
		super();
		this.id = id;
		this.longitude = longitude;
		this.latitude = latitude;
		this.adress = adress;
	}

	public Location() {}
	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public Adress getAdress() {
		return adress;
	}

	public void setAdress(Adress adress) {
		this.adress = adress;
	}
	
	
}
