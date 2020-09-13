package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import beans.ApartmentStatus;
import beans.User;
import beans.UserType;
import dao.ApartmentDAO;
import dao.SearchDAO;
import dao.UserDAO;

@Path("/apartmentService")

public class ApartmentService {
	
	@Context
	ServletContext sc;
	
	private static final Charset UTF_8 = Charset.forName("UTF-8");
	private static final Charset ISO = Charset.forName("ISO-8859-1");
	
	public ApartmentService() {}
	
	@PostConstruct
	public void init() {
		if (sc.getAttribute("apartmentDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
		if(sc.getAttribute("userDAO") == null) {
			sc.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/save")
	@Secured({UserType.Host})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment save(Apartment apartment) throws IOException {
		ApartmentDAO dao = (ApartmentDAO) sc.getAttribute("apartmentDAO");
		dao.Create(apartment);
		return apartment;
	}
	
	@POST
	@Path("/edit")
	@Secured({UserType.Admin, UserType.Host, UserType.Guest})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment edit(Apartment apartment) throws IOException {
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");

		Apartment editApartment=dao.Edit(apartment);
		return editApartment;
	}
	
	@POST
	@Path("/delete")
	@Secured({UserType.Admin, UserType.Host})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment delete(Apartment apartment) throws IOException {
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");
		dao.Delete(apartment);
		return apartment;
	}
	
	@GET
	@Path("/getApartments")
	@Secured({UserType.Admin, UserType.Host})
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getAllApartments(@Context SecurityContext securityContext) throws JsonIOException, JsonSyntaxException, FileNotFoundException{
		Principal principal = securityContext.getUserPrincipal();
		String username = principal.getName();
		UserDAO daou = (UserDAO) sc.getAttribute("userDAO");
		User user = daou.getUserByUsername(username);
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");
		List<Apartment> retVal =  dao.GetAll();
		if(user.getRole() == UserType.Admin) {
			return retVal;
		}else {
			ArrayList<Apartment> apartments = new ArrayList<Apartment>();
			for(Apartment a : retVal) {
				if(a.getHost().getUsername().equals(username))
					apartments.add(a);
			}
			return apartments;
		}
	}
	
	
	@POST
	@Path("/searchApartments")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getFilteredApartments(SearchDAO parameters) throws JsonIOException, JsonSyntaxException, FileNotFoundException, UnsupportedEncodingException{
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");
		List<Apartment> retVal =  new ArrayList<Apartment>();
		retVal = dao.GetAll();
		//prvo adresa
		retVal = filterPlace(retVal, parameters);
		
		//TODO datumi da se vide, cekam tvoj kod
		
		
		//broj gostiju
		if(parameters.guests != 0) {
			retVal = filterGuests(retVal, parameters);
		}
		
		//cena
		if((parameters.maxPrice >= 0 && parameters.minPrice >= 0) && (parameters.maxPrice != 0 || parameters.minPrice != 0) && parameters.maxPrice >= parameters.minPrice) {
			retVal = filterPrice(retVal, parameters);
		}
		
		//broj soba
		if(parameters.rooms > 0) {
			retVal = filterRooms(retVal, parameters);
		}
		
		System.out.println(retVal);
		
		ArrayList<Apartment> apartments = new ArrayList<Apartment>();
		for(Apartment a : retVal) {
			if(!a.getDeleted() && a.getStatus() == ApartmentStatus.Active)
				apartments.add(a);
		}
		
		return apartments;
	}
	
	

	//Filteri
	
	private ArrayList<Apartment> filterRooms(List<Apartment> list, SearchDAO parameters) {
		ArrayList<Apartment> retVal = new ArrayList<Apartment>();
		for(Apartment apartment : list) {
			//ovo mi glupo
			if(apartment.numberOfRooms >= parameters.rooms)
				retVal.add(apartment);
		}
		
		return retVal;
	}
	
	
	private ArrayList<Apartment> filterPlace(List<Apartment> list, SearchDAO parameters) {
		ArrayList<Apartment> retVal = new ArrayList<Apartment>();
		for(Apartment aparment : list) {
			/*
			 * TODO moramo da encodujemo stringove
			 * String s = new String (aparment.location.adress.street.getBytes(ISO), UTF_8);
			 * System.out.println(aparment.location.adress.city + s);
			 * 
			 * za sad ostavljam samo grad da se pretrazuje
			 */
			if(parameters.location.contains(aparment.location.adress.city)) {
				retVal.add(aparment);
			}
		}
		return retVal;
	}
	
	private ArrayList<Apartment> filterGuests(List<Apartment> list, SearchDAO parameters){
		
		ArrayList<Apartment> retVal = new ArrayList<Apartment>();
		for(Apartment apartment : list) {
			if(apartment.numberOfGuests >= parameters.guests)
				retVal.add(apartment);
		}
		return retVal;
	}
	
	private ArrayList<Apartment> filterPrice(List<Apartment> list, SearchDAO parameters){
		ArrayList<Apartment> retVal = new ArrayList<Apartment>();
		if(parameters.maxPrice != 0 && parameters.minPrice != 0) {
			for(Apartment apartment : list) {
				if(apartment.pricePerNight >= parameters.minPrice && apartment.pricePerNight <= parameters.maxPrice)
					retVal.add(apartment);
			}
		}else if(parameters.maxPrice != 0 && parameters.minPrice == 0) {
			for(Apartment apartment : list) {
				if(apartment.pricePerNight <= parameters.maxPrice)
					retVal.add(apartment);
			}
		}else {
			for(Apartment apartment : list) {
				if(apartment.pricePerNight >= parameters.minPrice)
					retVal.add(apartment);
			}
		}
		return retVal;
	}
}



