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

public class AmenityDAO {
 
	private Gson gson;
	private String path="";
	private static ApartmentDAO apartmentDao;
	
	public AmenityDAO(ApartmentDAO apartmentDao) {
		this.apartmentDao = apartmentDao;
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
	}
	
	public AmenityDAO(String contextPath) {
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\amenity.json");
		this.path=f.getAbsolutePath();
	}
	
	public void Save(ArrayList<Amenity> amenities) throws IOException {
		Writer out=new FileWriter(path);
		gson.toJson(amenities,out);
		out.flush();
		out.close();
	}
	
	
	public List<Amenity> GetAll() throws JsonIOException, JsonSyntaxException, FileNotFoundException {
		return gson.fromJson( new JsonReader(new FileReader(path)), new TypeToken<List<Amenity>>(){}.getType());
	}
	
	public int getMaxId() throws JsonIOException, JsonSyntaxException, FileNotFoundException {
		ArrayList<Amenity> amenities=new ArrayList<Amenity>();
		int maxId=-1;
		amenities=(ArrayList<Amenity>) GetAll();
		if(amenities!=null) {
			for(Amenity amenity : amenities) {
				if(amenity.getId()>maxId) {
					maxId=amenity.getId();
				}
			}
		}
		return ++maxId;
		
	}

	public void Create(Amenity amenity) throws IOException {
		ArrayList<Amenity> amenities=new ArrayList<Amenity>();

		amenities=(ArrayList<Amenity>) GetAll();
		if(amenities==null) {
			amenities=new ArrayList<Amenity>();
		}
		amenity.setId(getMaxId());
		amenities.add(amenity);

		Save(amenities);	
	}
	
	public Amenity Edit(Amenity amenity) throws IOException {
		ArrayList<Amenity> amenities =(ArrayList<Amenity>) GetAll();
		for(Amenity a: amenities) {
			if(a.getId()==amenity.getId()) {
				a.setName(amenity.getName());
				break;
			}
		}
		Save(amenities);
		apartmentDao.EditAmenity(amenity);
		return amenity;
	}
	
	public Amenity Delete(Amenity amenity) throws IOException {
		ArrayList<Amenity> amenities=(ArrayList<Amenity>) GetAll();
		for(Amenity a:amenities) {
			if(a.getId()==amenity.getId()) {
				a.setDeleted(true);
				break;
			}
		}
		Save(amenities);
		apartmentDao.DeleteAmenity(amenity);
		return amenity;
	}
}
