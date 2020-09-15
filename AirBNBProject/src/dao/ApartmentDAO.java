package dao;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
import beans.Comment;
import beans.Period;

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
	


	public int getMaxIdForComment(Apartment apartment) {
		ArrayList<Apartment> apartments=new ArrayList<Apartment>();
		int maxId=0;
		
		for(Comment comment:apartment.getComments()) {
			if(comment.getId()>maxId) {
				maxId=comment.getId();
			}
		}

		return ++maxId;
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
				a.setPictures(apartment.getPictures());
				
				a.setDatesForRenting(apartment.getDatesForRenting());
				a.setFreePeriods(apartment.getFreePeriods());
				int br=0;
				for (Comment com : apartment.getComments()) {
					if(com.getId()==0) {
						++br;
						if(br!=1) {
							com.setId(getMaxIdForComment(apartment));
						}
					}
				}
				a.setComments(apartment.getComments());
				a.setAmenities(apartment.getAmenities());
				a.setReservations(apartment.getReservations());
				a.setNote(apartment.getNote());
				break;
			}
		}
		Save(apartments);
		//sortDatesForRenting(apartment.getDatesForRenting());
		return apartment;
	}
	//11-23.10  20-23.9
	public List<Period> sortDatesForRenting(List<Period> datesForRenting){
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
	
	public void deleteImage(String url) throws IOException {
		String pom=url.split("/")[1];
		System.out.println(pom);
		String imgName=pom.substring(0, pom.length() - 1);
		System.out.println(imgName);
		Path path=Paths.get("webproject\\AirBNBProject\\WebContent\\pictures\\"+imgName);
		System.out.println(path);
        Files.delete(path);
        
        String url1=url.substring(1, url.length()-1);
		ArrayList<Apartment> apartments=(ArrayList<Apartment>) GetAll();
		List<String> pic= new ArrayList<String>();
		
		for (Apartment apartment : apartments) {
			for (String picPath : apartment.getPictures()) {
				System.out.println(picPath);
				if(picPath.equals(url1)) {
					pic.add(picPath);	
					apartment.pictures.removeAll(pic);
					break;
				}
			}
		}
		Save(apartments);
		//return apartments;
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
	












}
