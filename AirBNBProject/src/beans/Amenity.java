package beans;

public class Amenity {
	public int id;
	public String name;
	public Boolean deleted=false;
	
	public Amenity() {}
	
	public Amenity(int id, String name) {
		super();
		this.id = id;
		this.name = name;
		this.deleted = false;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getDeleted() {
		return deleted;
	}
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
}	
