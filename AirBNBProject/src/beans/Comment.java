package beans;

public class Comment {

	public int id;
	public Apartment apartment;
	public User guest;
	public String text;
	public double grade;
	public Boolean isApproved;
	
	public Comment() {}
	
	public Comment(int id, Apartment apartment, User guest, String text, double grade, Boolean approved) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.guest = guest;
		this.text = text;
		this.grade = grade;
		this.isApproved = approved;
	}	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public User getGuest() {
		return guest;
	}

	public void setGuest(User guest) {
		this.guest = guest;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}
	
	
	
	
	
}
