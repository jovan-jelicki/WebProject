package dao;

import java.io.File;
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

import beans.Reservation;

public class ReservationDAO {
	
	private Gson gson;
	private String path="";
	
	public ReservationDAO() {
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\reservation.json");
		this.path=f.getAbsolutePath();
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
	}
	
	public ReservationDAO(String contextPath) {
		this.gson=new GsonBuilder()
				.setPrettyPrinting()
				.create();
		File f=new File("webproject\\AirBNBProject\\WebContent\\resources\\reservation.json");
		this.path=f.getAbsolutePath();
	}
	
	public void Save(ArrayList<Reservation> reservations) throws IOException {
		Writer out=new FileWriter(path);
		gson.toJson(reservations,out);
		out.flush();
		out.close();
	}
	
	public List<Reservation> GetAll() throws JsonSyntaxException, IOException {
		List<Reservation> list = gson.fromJson( new JsonReader(new FileReader(path)), new TypeToken<List<Reservation>>(){}.getType());
	//	List<Reservation> result = new ArrayList<Reservation>();
		
		//TODO : proveri da li sve vracas !!
		/*
		 * if(list!=null) { for(Reservation a : list) { // if(!a.getDeleted())
		 * result.add(a); } }
		 */
		
		return list;
	}
	
	public int getMaxId() throws JsonIOException, JsonSyntaxException, IOException {
		ArrayList<Reservation> reservations =new ArrayList<Reservation>();
		int maxId = -1;
		reservations = (ArrayList<Reservation>) GetAll();
		if(reservations != null) {
			for(Reservation reservation : reservations) {
				if(reservation.getId() > maxId) {
					maxId = reservation.getId();
				}
			}
		}
		return ++maxId;
		
	}
	public void Create(Reservation reservation) throws IOException {
		ArrayList<Reservation> reservations = new ArrayList<Reservation>();

		reservations = (ArrayList<Reservation>) GetAll();
		if(reservations == null) {
			reservations = new ArrayList<Reservation>();
		}
		reservation.setId(getMaxId());
		
		reservations.add(reservation);
		Save(reservations);	
	}
	
	/*
	 * public Reservation Delete(Reservation reservation) throws IOException {
	 * ArrayList<Reservation> reservations = (ArrayList<Reservation>) GetAll();
	 * for(Reservation a : reservations) { if(a.getId() == reservation.getId()) {
	 * a.setDeleted(true); break; } } Save(apartments); return apartment; }
	 */
	
	public Reservation Edit(Reservation reservation) throws IOException {
		ArrayList<Reservation> reservations = (ArrayList<Reservation>) GetAll();
		for(Reservation a: reservations) {
			if(a.getId() == reservation.getId()) {
				a.setApartment(reservation.getApartment());
				a.setStartDate(reservation.getStartDate());
				a.setNumberOfNights(reservation.getNumberOfNights());
				a.setFullPrice(reservation.getFullPrice());
				a.setMessage(reservation.getMessage());
				a.setStatus(reservation.getStatus());
				a.setGuest(reservation.getGuest());
				break;
			}
		}
		Save(reservations);
		return reservation;
	}

}
