package services;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import beans.Reservation;
import beans.User;
import beans.UserType;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.ReservationParams;
import dao.UserDAO;

@Path("/reservationService")
public class ReservationService {
	
	@Context
	ServletContext sc;
	
	public ReservationService() {}
	
	@PostConstruct
	public void init () {
		if (sc.getAttribute("reservationDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("reservationDAO", new ReservationDAO());
		}
		if(sc.getAttribute("userDAO") == null) {
			sc.setAttribute("userDAO", new UserDAO());
		}
		if(sc.getAttribute("apartmentDAO") == null)
			sc.setAttribute("apartmentDAO", new ApartmentDAO());
	}
	
	
	@GET
	@Path("/getReservations")
	@Secured({UserType.Admin, UserType.Guest, UserType.Host})
	@Produces(MediaType.APPLICATION_JSON)
	public List<Reservation> getReservations(@Context SecurityContext securityContext) throws JsonIOException, JsonSyntaxException, IOException{
		List<Reservation> retVal = new ArrayList<Reservation>();
		Principal principal = securityContext.getUserPrincipal();
		String username = principal.getName();
		UserDAO daou = new UserDAO();
		User user = daou.getUserByUsername(username);
		ReservationDAO resDao = new ReservationDAO();
		
		if(user.role == UserType.Admin) {
			return resDao.GetAll();
		}else if(user.role == UserType.Host) {
			for(Reservation r : resDao.GetAll()) {
				if(r.getApartment().getHost().getUsername().equals(username))
					retVal.add(r);
			}
			return retVal;
		}else {
			for(Reservation r : resDao.GetAll()) {
				if(r.getGuest().getUsername().equals(username))
					retVal.add(r);
			}
			return retVal;
		}
		
	}

	@POST
	@Path("/save")
	@Secured({UserType.Guest})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(ReservationParams reservation) throws IOException {
		ReservationDAO resDao = (ReservationDAO) sc.getAttribute("reservationDAO");
		UserDAO userDao = (UserDAO) sc.getAttribute("userDAO");
		ApartmentDAO apaDao = (ApartmentDAO) sc.getAttribute("apartmentDAO");
		Reservation retVal = new Reservation();
		
		if(reservation.getApartment() != null && reservation.getGuest() != null && reservation.getReservationEnd() != null && reservation.getReservationStart() != null) {
			retVal.setApartment(reservation.getApartment());
			retVal.setGuest(reservation.getGuest());
			retVal.setStartDate(reservation.getReservationStart());
			retVal.setMessage(reservation.getMessage());
			retVal.setNumberOfGuests(reservation.getGuests());
			int numbeNights = (int) ((reservation.getReservationEnd().getTime() - reservation.getReservationStart().getTime())/86400000);
			retVal.setNumberOfNights(numbeNights);
			retVal.setFullPrice(retVal.getNumberOfNights() * retVal.getApartment().getPricePerNight());
			
		}else {
			throw new BadRequestException();
		}
		Apartment help;
		try {
		
			help = apaDao.schedulePeriod(retVal.getApartment(), reservation.getReservationStart(), reservation.getReservationEnd());
		
		}catch (Exception e) {
			throw new BadRequestException();
		}
		retVal.setApartment(help);
		resDao.Create(retVal);
		
		return Response.status(200).build();
	}
}
