package beans;

public class Period {

	private long dateFrom;
	private long dateTo;
	
	public Period() {
	}
	
	public Period(long dateF, long dateT) {
		this.dateFrom = dateF;
		this.dateTo = dateT;
	}

	public long getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(long dateFrom) {
		this.dateFrom = dateFrom;
	}

	public long getDateTo() {
		return dateTo;
	}

	public void setDateTo(long dateTo) {
		this.dateTo = dateTo;
	}
	
	
	
	
}
