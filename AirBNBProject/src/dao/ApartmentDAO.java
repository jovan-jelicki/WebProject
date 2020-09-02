package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import beans.Amenity;
import beans.Apartment;

public class ApartmentDAO {

	private Gson gson;
	private String path="";
	
	public ApartmentDAO() {
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

	public List<Apartment> GetAll() throws JsonIOException, JsonSyntaxException, FileNotFoundException {
		return gson.fromJson( new JsonReader(new FileReader(path)), new TypeToken<List<Apartment>>(){}.getType());
	}

	public void Create(Apartment apartment) throws IOException {
		System.out.println(apartment.getCheckIn()+"*************************"+"\n");
		ArrayList<Apartment> apartments=new ArrayList<Apartment>();

		apartments=(ArrayList<Apartment>) GetAll();
		if(apartments==null) {
			apartments=new ArrayList<Apartment>();
		}
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
				a.setNumberOfGuests(apartment.getNumberOfRooms());
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
	public void DeleteAmenity(Amenity amenity) throws JsonIOException, JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments=(ArrayList<Apartment>) GetAll();
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
	
	public void EditAmenity(Amenity amenity) throws JsonIOException, JsonSyntaxException, IOException {
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











}
