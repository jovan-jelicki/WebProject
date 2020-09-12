package services;

import java.io.FileNotFoundException;
import java.io.IOException;
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

import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import beans.Amenity;
import beans.UserType;
import dao.AmenityDAO;


@Path("/amenityService")
public class AmenityService {

	@Context
	ServletContext sc;
	
	public AmenityService() {}
	
	@PostConstruct
	public void init() {
		if (sc.getAttribute("amenityDAO") == null) {
	    	String contextPath = sc.getRealPath("");
			sc.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
	}
	
	@POST
	@Path("/save")
	@Secured({UserType.Admin})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity save(Amenity amenity) throws IOException {
		AmenityDAO dao = (AmenityDAO) sc.getAttribute("amenityDAO");
		List<Amenity> amenities;
		amenities = dao.GetAll();
		for (Amenity a : amenities) {
			System.out.println(a.getId()+amenity.getId());
			if(a.getName().equals(amenity.getName())) {
				return null;
			}
		}
		dao.Create(amenity);
		return amenity;
	}
	
	@POST
	@Path("/edit")
	@Secured({UserType.Admin})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity edit(Amenity amenity) throws IOException {
		AmenityDAO dao=(AmenityDAO) sc.getAttribute("amenityDAO");
		//Amenity amenity=new Amenity();
		//for(Amenity a : dao.GetAll()) {
			//if(a.getName().equals(name)) {
			//	amenity=a;
			//}
		//}
		Amenity editAmenity=dao.Edit(amenity);
		return editAmenity;
	}
	
	@POST
	@Path("/delete")
	@Secured({UserType.Admin})
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity delete(Amenity amenity) throws IOException {
		AmenityDAO dao=(AmenityDAO) sc.getAttribute("amenityDAO");
		//Amenity amenity=new Amenity();
		//for(Amenity a : dao.GetAll()) {
		//	if(a.getName().equals(name)) {
		//		amenity=a;
		//	}
		//}
		dao.Delete(amenity);
		System.out.println("*******************"+amenity.name+amenity.deleted+"\n");
		return amenity;
	}
	
	@GET
	@Path("/getAmenities")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Amenity> getAllAmenities() throws JsonIOException, JsonSyntaxException, FileNotFoundException{
		AmenityDAO dao=(AmenityDAO) sc.getAttribute("amenityDAO");
		List<Amenity> amenities = dao.GetAll();
		ArrayList<Amenity> retVal = new ArrayList<Amenity>();
		for(Amenity a : amenities) {
			if(!a.getDeleted())
				retVal.add(a);
		}
		return retVal;
	}

}
