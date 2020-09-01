package services;

import java.io.FileNotFoundException;
import java.io.IOException;
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

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import dao.ApartmentDAO;

@Path("/apartmentService")

public class ApartmentService {
	
	@Context
	ServletContext sc;
	
	public ApartmentService() {}
	
	@PostConstruct
	public void init() {
		if (sc.getAttribute("apartmentDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
	}
	
	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment save(Apartment apartment) throws IOException {
		ApartmentDAO dao = (ApartmentDAO) sc.getAttribute("apartmentDAO");
		List<Apartment> apartments;
		apartments = dao.GetAll();
		for (Apartment a : apartments) {
			System.out.println(a.getId()+apartment.getId());
			if(a.getName().equals(apartment.getName())) {
				return null;
			}
		}
		dao.Create(apartment);
		return apartment;
	}
	
	@POST
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment edit(Apartment apartment) throws IOException {
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");

		Apartment editApartment=dao.Edit(apartment);
		return editApartment;
	}
	
	@POST
	@Path("/delete")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment delete(Apartment apartment) throws IOException {
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("apartmentDAO");
		dao.Delete(apartment);
		return apartment;
	}
	
	@GET
	@Path("/getAmpartments")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getAllApartments() throws JsonIOException, JsonSyntaxException, FileNotFoundException{
		ApartmentDAO dao=(ApartmentDAO) sc.getAttribute("ApartmentDAO");
		return dao.GetAll();
	}
	
}
