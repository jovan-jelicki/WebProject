package services;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import beans.ApartmentStatus;
import beans.Period;
import beans.Reservation;
import beans.User;
import beans.UserType;
import dao.ApartmentDAO;
import dao.ReservationDAO;
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
	@Secured({UserType.Host})
	@Path("/saveImages")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public List<String> image(@FormDataParam("files") InputStream fileInputStream, FormDataMultiPart  cdh) throws IOException {
		ApartmentDAO dao = (ApartmentDAO) sc.getAttribute("apartmentDAO");
		List<FormDataBodyPart> parts = cdh.getFields("files");
		
		List<String> names=dao.saveImage(parts);


		return names;
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
		ReservationDAO resDao = new ReservationDAO();
		ArrayList<Reservation> reservations = (ArrayList<Reservation>) resDao.GetAll();
		for(Reservation res : reservations) {
			if(res.getApartment().getId() == editApartment.getId()) {
				res.setApartment(editApartment);
				resDao.Edit(res);
			}
		}
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
	public List<Apartment> getAllApartments(@Context SecurityContext securityContext) throws JsonIOException, JsonSyntaxException, IOException{
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
	@Path("/getApartment")
	@Secured({UserType.Admin, UserType.Guest, UserType.Host})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getApartmen(Apartment apartmen) throws JsonSyntaxException, IOException {
		Apartment retVal = new Apartment();
		ApartmentDAO dao = new ApartmentDAO();
		for(Apartment a : dao.GetAll()) {
			if(a.getId() == apartmen.getId()) {
				retVal = a;
				break;
			}
		}
		
		return retVal;
	}
	
	
	@POST
	@Path("/searchApartments")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getFilteredApartments(SearchDAO parameters) throws JsonIOException, JsonSyntaxException, IOException{
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");
		List<Apartment> retVal =  new ArrayList<Apartment>();
		retVal = dao.GetAll();
		if(parameters.getEndDate() == null && parameters.getGuests() == 0 &&
			parameters.getLocation() == "" && parameters.getMaxPrice() == 0 
			&& parameters.getMinPrice() == 0 && parameters.getRooms() == 0
			&& parameters.getStartDate() == null) {
			throw new BadRequestException();
		}else if(parameters.getLocation() == "" || parameters.getLocation() == null) {
			throw new BadRequestException();
		}
		//prvo adresa
		retVal = filterPlace(retVal, parameters);
		
		//TODO datumi da se vide, cekam tvoj kod
		if(parameters.getEndDate() != null || parameters.getStartDate() != null)
			retVal = filterDates(retVal, parameters);
		
		
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
		
		//Samo aktivni
		ArrayList<Apartment> apartments = new ArrayList<Apartment>();
		for(Apartment a : retVal) {
			if(!a.getDeleted() && a.getStatus() == ApartmentStatus.Active)
				apartments.add(a);
		}
		
		return apartments;
	}
	
	

	//Filteri
	private ArrayList<Apartment> filterDates(List<Apartment> list, SearchDAO parameters){
		ArrayList<Apartment> retVal = new ArrayList<Apartment>();
		for(Apartment apartment : list) {
			for(Period period : apartment.getFreePeriods()) {
				Date start = new Date(period.getDateFrom());
				Date end = new Date(period.getDateTo());
				if(parameters.getEndDate() != null && parameters.getStartDate() != null){
						if(parameters.getStartDate().getTime() >= start.getTime() && parameters.getEndDate().getTime() <= end.getTime()) {
							retVal.add(apartment);
						}
				}else if(parameters.getEndDate() == null && parameters.getStartDate() != null) {
						if(parameters.getStartDate().getTime() >= start.getTime()) {
							retVal.add(apartment);
						}
				}else if(parameters.getEndDate() != null && parameters.getStartDate() == null) {
					if( parameters.getEndDate().getTime() <= end.getTime()) {
						retVal.add(apartment);
					}
				}
			}
		}
		
		return retVal;
	}
	
	
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
			if(parameters.location.toLowerCase().contains(aparment.location.adress.city.toLowerCase())) {
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



