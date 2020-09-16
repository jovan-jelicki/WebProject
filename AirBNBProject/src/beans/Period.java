package beans;

public class Period implements Comparable<Period> {

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

	@Override
	public int compareTo(Period o) {
		// TODO Auto-generated method stub
		return (int) (o.getDateFrom() - this.getDateFrom());
	}
	
	
	
	
}
