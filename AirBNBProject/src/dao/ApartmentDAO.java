package dao;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.ws.rs.BadRequestException;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import beans.Amenity;
import beans.Apartment;
import beans.Period;
import beans.Reservation;
import jdk.nashorn.internal.runtime.ListAdapter;

public class ApartmentDAO {

	private Gson gson;
	private String path="";
	
	
	public ApartmentDAO() {
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\apartment.json");
		this.path=f.getAbsolutePath();
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
	}
	
	public ApartmentDAO(String contextPath) {
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\apartment.json");
		this.path=f.getAbsolutePath();
	}
	
	public void Save(ArrayList<Apartment> apartments) throws IOException {
		Writer out=new FileWriter(path);
		gson.toJson(apartments,out);
		out.flush();
		out.close();
	}


	
	public List<Apartment> GetAll() throws JsonSyntaxException, IOException {
		List<Apartment> list = gson.fromJson( new JsonReader(new FileReader(path)), new TypeToken<List<Apartment>>(){}.getType());
		List<Apartment> result = new ArrayList<Apartment>();
		
		if(list!=null) {
			for(Apartment a : list) {
				if(!a.getDeleted())
					result.add(a);
			}
		}

		
		return result;
	}
	
	public int getMaxId() throws JsonIOException, JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments=new ArrayList<Apartment>();
		int maxId=-1;
		apartments=(ArrayList<Apartment>) GetAll();
		if(apartments!=null) {
			for(Apartment apartment : apartments) {
				if(apartment.getId()>maxId) {
					maxId=apartment.getId();
				}
			}
		}
		return ++maxId;
		
	}

	public void Create(Apartment apartment) throws IOException {
		ArrayList<Apartment> apartments=new ArrayList<Apartment>();

		apartments=(ArrayList<Apartment>) GetAll();
		if(apartments==null) {
			apartments=new ArrayList<Apartment>();
		}
		apartment.setId(getMaxId());
		apartment.setFreePeriods(apartment.getDatesForRenting());
		apartments.add(apartment);
		Save(apartments);	
	}

	public Apartment Edit(Apartment apartment) throws IOException {
		ArrayList<Apartment> apartments =(ArrayList<Apartment>) GetAll();
		for(Apartment a: apartments) {
			//TODO obrati paznju na prelepljivanje listi
			if(a.getId()==apartment.getId()) {
				a.setType(apartment.getType());
				a.setName(apartment.getName());
				a.setNumberOfRooms(apartment.getNumberOfRooms());
				a.setNumberOfGuests(apartment.getNumberOfGuests());
				a.setLocation(apartment.getLocation());
				a.setPricePerNight(apartment.getPricePerNight());
				a.setCheckIn(apartment.getCheckIn());
				a.setCheckOut(apartment.getCheckOut());
				a.setStatus(apartment.getStatus());
				
				a.setDatesForRenting(apartment.getDatesForRenting());
				a.setFreePeriods(apartment.getFreePeriods());
				a.setComments(apartment.getComments());
				a.setAmenities(apartment.getAmenities());
				a.setReservations(apartment.getReservations());
				break;
			}
		}
		Save(apartments);
		return apartment;
	}
	
	public Apartment Delete(Apartment apartment) throws IOException {
		ArrayList<Apartment> apartments=(ArrayList<Apartment>) GetAll();
		for(Apartment a:apartments) {
			if(a.getId()==apartment.getId()) {
				a.setDeleted(true);
				break;
			}
		}
		Save(apartments);
		return apartment;
	}
	//TODO ove dve metode treba proveriti
	public  void DeleteAmenity(Amenity amenity) throws JsonSyntaxException, IOException {
		System.out.println("usao sammm \n");
		//ArrayList<Apartment> apartments=(ArrayList<Apartment>) GetAll();

		ArrayList<Apartment> apartments=new ArrayList<Apartment>();
		apartments=(ArrayList<Apartment>) GetAll();
		System.out.println("usao sammm \n");

		for(Apartment apa : apartments) {
			ArrayList<Amenity> amenities=(ArrayList<Amenity>) apa.getAmenities();
			for(Amenity amen: amenities) {
				if(amen.getId()==amenity.getId()) {
					amenities.remove(amen);
					apa.setAmenities(amenities);
					break;
				}
			}
		}
		Save(apartments);
	}
	
	public void EditAmenity(Amenity amenity) throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments=(ArrayList<Apartment>) GetAll();
		for(Apartment apa : apartments) {
			ArrayList<Amenity> amenities=(ArrayList<Amenity>) apa.getAmenities();
			for(Amenity amen: amenities) {
				if(amen.getId()==amenity.getId()) {
					amenities.remove(amen);
					amenities.add(amenity);
					apa.setAmenities(amenities);
					break;
				}
			}
		}
		Save(apartments);
	}
	public List<String> saveImage(List<FormDataBodyPart> parts ) {
		int brojac=0;
		List<String> names=new ArrayList<String>();
		for(FormDataBodyPart field : parts){
			InputStream valueAs=field.getValueAs(InputStream.class);
			try {
				BufferedImage img = ImageIO.read(valueAs);
				
		        Random rand = new Random(); 
				int rand_int1 = rand.nextInt(1000); 
				String imgName="slika"+rand_int1+".jpg";
				
				File f=new File("webproject\\AirBNBProject\\WebContent\\pictures\\"+imgName);
				ImageIO.write(img, "jpg", f);
				
				
				String name="pictures/"+f.getName();
				names.add(name);
				
			}catch(Exception e){
			e.printStackTrace();	
			}
		 }
		return names;
	}

	public Apartment schedulePeriod(Apartment apartment, Date reservationStart, Date reservationEnd) throws IOException {
		ArrayList<Period> freePeriods = new ArrayList<Period>();
		for(Period period : apartment.getFreePeriods()) {
			if(reservationStart.getTime() >= period.getDateFrom() && reservationEnd.getTime() <= period.getDateTo()) {
					Period first = new Period();
					Period second = new Period();
					first.setDateFrom(period.getDateFrom());
					first.setDateTo(reservationStart.getTime());
					second.setDateFrom(reservationEnd.getTime());
					second.setDateTo(period.getDateTo());
					freePeriods.add(first);
					freePeriods.add(second);
			}else {
				freePeriods.add(period);
			}
		}
		
		apartment.setFreePeriods(freePeriods);
		Edit(apartment);
		ArrayList<Apartment> help = (ArrayList<Apartment>) GetAll();
		for(Apartment a : help) {
			if(a.getId() == apartment.getId())
				return a;
		}
		throw new BadRequestException();
		
	}

	public Reservation rejectReservation(Reservation reservation) throws IOException {
		Apartment apartment = reservation.getApartment();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		ArrayList<Period> freePeriods = (ArrayList<Period>) apartment.getFreePeriods();
		List<Period> help = new ArrayList<Period>();
		int flag = 0;
		int index = 0;
		Period per = new Period();
		
		for(Period period : apartment.getFreePeriods()) {
			
			if(period == freePeriods.get(0)) {
				
				if(formatter.format(period.getDateFrom()).equals(formatter.format(reservation.getEndDate()))) {
					per.setDateFrom(reservation.getStartDate().getTime());
					per.setDateTo(period.getDateTo());
					help.add(per);
					index = freePeriods.indexOf(period);
					flag = 1;
				}else if(formatter.format(period.getDateTo()).equals(formatter.format(reservation.getStartDate()))){
					for(Period period2 : apartment.getFreePeriods()) {
						if(formatter.format(period2.getDateFrom()).equals(formatter.format(reservation.getEndDate()))){
							per.setDateFrom(period.getDateFrom());
							per.setDateTo(period2.getDateTo());
							help.add(per);
							index = freePeriods.indexOf(period2);
							flag = 1;
						}
					}
					
				}else {
					help.add(period);
				}
			
			}else {
			
				if(flag != 1 && formatter.format(period.getDateTo()).equals(formatter.format(reservation.getStartDate()))) {
					for(Period period2 : apartment.getFreePeriods()) {
						if(formatter.format(period2.getDateFrom()).equals(formatter.format(reservation.getEndDate()))){
							per.setDateFrom(period.getDateFrom());
							per.setDateTo(period2.getDateTo());
							help.add(per);
							index = freePeriods.indexOf(period2);
							flag = 1;
						}
					}
					if(flag != 1) {
						per.setDateFrom(period.getDateFrom());
						per.setDateTo(reservation.getEndDate().getTime());
						help.add(per);
						index = freePeriods.indexOf(period);
						flag = 1;
					}
				
				}else if(flag != 1 &&formatter.format(period.getDateFrom()).equals(formatter.format(reservation.getEndDate()))) {
					per.setDateFrom(reservation.getStartDate().getTime());
					per.setDateTo(period.getDateTo());
					help.add(per);
					index = freePeriods.indexOf(period);
					flag = 1;
				
				}else if(index != freePeriods.indexOf(period)) {
					help.add(period);
				}
			}
		}
		//ako ga nije nasao!
		if(flag != 1) {
			per.setDateFrom(reservation.getStartDate().getTime());
			per.setDateTo(reservation.getEndDate().getTime());
			
			help.add(per);
		}
		Collections.sort(help);
	
		
		apartment.setFreePeriods(help);
		Edit(apartment);
		reservation.setApartment(apartment);
		return reservation;
	}
	
	public List<Period> sortDatesForRenting(ArrayList<Period> datesForRenting){
		List<Period> retVal=new ArrayList<Period>();
		Date today=new Date(); 
		Boolean flag=false;
		
		for (Period period : datesForRenting) { //14-18
		//	System.out.println("pocetni datum"+new Date(period.getDateFrom()));
		//	System.out.println("danasnji datum"+new Date(today.getTime()));

			if(period.getDateFrom()>=today.getTime()) {
				int index=0;
				flag=false;
				for(Period retPeriod :retVal) {// retval 11.a0 i 23.10 su dodati
					if(period.getDateFrom()<retPeriod.getDateFrom()) {//20.9< 11.10
						retVal.add(index,period);
						flag=true;
						break;
					}
					index++;
				}
				
				if(!flag) {
					retVal.add(period);  //11-15
				}
			}
			
		}
	
		//for (Period period2 : retVal) {
		//	System.out.println(new Date(period2.getDateFrom()));
		//}
		return retVal;
	}

	












}
