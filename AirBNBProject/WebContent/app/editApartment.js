Vue.component('edit-apartment', {
    data : function(){
        return {
        	apartment : !!localStorage.getItem("apartment") ? JSON.parse(localStorage.getItem("apartment")) : {},
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
             adress:{},
             amenities:{},
             selectedAmenities:[],
             country:"",
             period:[],
             dateTo:'',
             dateFrom:'',
             backup:[],
             disabledDates: {to: new Date()}, // Disable all dates up to specific date
             dateParse1:new Date(),
             dateTo:'',
 	         dateFrom:'',
 	        disabledDates: {to: new Date()},
            pom:[]

             }
             },  
                   
   mounted() {
       axios
       .get('rest/amenityService/getAmenities')
       .then(response =>
       {this.amenities = response.data
    	   
    	   
       		let ranges=[];
       		if(this.apartment.datesForRenting!=undefined){
   				for(let dates of this.apartment.datesForRenting){
   					ranges.push({from: new Date(dates.dateFrom), to: new Date(dates.dateTo)});
   				}
   				this.disabledDates["ranges"]=ranges;
   				this.disabledDates["to"]=new Date();
       		}else{
       			this.disabledDates["to"]=new Date();
       		}
       	
    	//   var parsed = moment(new Date(this.apartment.datesForRenting[0].dateFrom));
      // this.dateParse1=parsed.format('DD.MM.YYYY');
       //    this.dateParse1=new Date(this.apartment.datesForRenting[0].dateFrom, 'DD.MM.YYYY');
}
     );
    },
  template : `
     <form>
      <br>
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Izmena apartmana</h1>
      <hr>
   <div class="col-md-12 personal-info">

      <div class="form-group row">
	    <label  class="col-sm-2 col-form-label ">Domacin</label>
	    <div class="col-sm-10">
              <input class="form-control" id="nameUser" type="text" v-model="user.name" disabled>
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label">Ime apartmana:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="apartmentName" type="text" v-model="apartment.name">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label">Tip apartmana</label>
	    <div class="col-sm-10">
  				<div><input type="radio"  id="status1" name="apartmentStatus" v-model="apartment.status" value="NonActive">neaktivan<br></div>
  				<div><input type="radio" id="status2" name="apartmentStatus" v-model="apartment.status" value="Active">aktivan<br></div>
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label">Status apartmana</label>
	    <div class="col-sm-10">
  				<div><input type="radio"  id="type1" name="apartmentType" v-model="apartment.type" value="Apartment"> apartman<br></div>
  				<div ><input type="radio" id="type2" name="apartmentType" v-model="apartment.type" value="Room"> soba<br></div>
	    </div>
	  </div>
	  
	  
	  
	  
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label">Broj soba</label>
	    <div class="col-sm-10">
              <input class="form-control" id="roomNum" type="number" v-model="apartment.numberOfRooms">
	    </div>
	  </div>
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label ">Broj gostiju</label>
	    <div class="col-sm-10">
              <input class="form-control" id="guestNum" type="number" v-model="apartment.numberOfGuests" >
	    </div>
	  </div>

	    
	    <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Drzava:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="country" type="text"  v-model="apartment.location.adress.country">
	    </div> 
	  </div>

	   <div class="form-group row">
	    <label  class="col-sm-2 col-form-label " >Grad:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="text" v-model="apartment.location.adress.city">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label  class="col-sm-2 col-form-label"  >Ulica:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="street" type="text" v-model="apartment.location.adress.street">
	    </div>
	  </div>
	   <div class="form-group row">
	    <label class="col-sm-2 col-form-label" >Broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="numOfStreet" type="number" v-model="apartment.location.adress.numberOfStreet">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label" >Postanski broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="postNum" type="number" v-model="apartment.location.adress.postNumber">
	    </div>
	  </div>

	    <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Cena po noci:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="price" type="number" v-model="apartment.pricePerNight">
	    </div>
	  </div>
	  
	    <div class="form-group row">
	    <label  class="col-sm-2 col-form-label ">Vreme za prijavu:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="time1" type="text" v-model="apartment.checkIn">
	    </div>
	  </div>


	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Vreme za odjavu:</label>
	    <div class="col-sm-10">
         <input class="form-control" id="time2" type="text"  v-model="apartment.checkOut">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Uneti datumi dostupnosti apartmana od-do:</label>

	    <div class="col-sm-15">
	        <label id="dateFrom1" class="col-sm-2 col-form-label"  v-for="a in this.apartment.datesForRenting" style="float: left; margin-right : 20%">{{a.dateFrom | dateFormat('DD.MM.YYYY')}}  {{a.dateTo  | dateFormat('DD.MM.YYYY')}} </label>
    	    <button id="editDates" type="button" class="btn btn-outline-primary" v-on:click="editDate" >Izmeni periode </button>
    	    
	    </div>
	  </div>
	  
	  <div id="i" style = "display: none">
		  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Datum za izdavanje od:</label>
	    <div class="col-sm-10">
			<vuejs-datepicker id="date1" :monday-first="true" :disabled-dates="disabledDates"  v-model="dateFrom"	placeholder="Unesite pocetni datum" format="dd.MM.yyyy" ></vuejs-datepicker>
	    </div>
	  </div>

	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Datum za izdavanje do:</label>
	    <div class="col-sm-10">
			<vuejs-datepicker id="date2" :monday-first="true" :disabled-dates="disabledDates" v-model="dateTo" placeholder="Unesite krajnji datum" format="dd.MM.yyyy"  ></vuejs-datepicker>
	    </div>
	  </div>
     
		  <button id="okDate" type="button" class="btn btn-outline-primary" v-on:click="okDate" >Potvrdi nove periode</button>
		  <button id="cancelDate" type="button" class="btn btn-outline-primary"  v-on:click="cancelDate" >Otkazi nove periode</button>

     </div>
     
     <div class="form-group row">
   	    <label class="col-sm-2 col-form-label ">Izaberite dodatni sadrzaj koji poseduje apartman:</label>
    	</div>

    <div class="col-md-2 personal-info">
  	  <div class="form-check"  >
  	  <div v-for="a in amenities" v-if="a.deleted == false" :value="a" >
  	       <input class="form-check-input"   type="checkbox"  id="defaultCheck1"  v-model="selectedAmenities" :value="a" >
  	       <label class="form-control" id="amenity" > {{a.name}} </label>

      </div>
	  </div>
	 </div>
	  <br>
	  
	    <div class="form-group row">
	    <label  class="col-sm-2 col-form-label ">Dodatne beleske:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="note" type="text" v-model="apartment.note">
	    </div>
	  </div>
	  
	  <br>
	     <div id="infoSuccess" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste izmenili apartman!!</div>
        <div id="infoErr" class="alert alert-success" role="alert" style = "display: none" >Neophodno je uneti sve podatke!</div>
        <div id="infoErr1" class="alert alert-success" role="alert" style = "display: none" >Molimo proverite unete podatke. Doslo je do nevalidnog unosa.</div>
        <div id="dateErr" class="alert alert-success" role="alert" style = "display: none" > Molimo izaberite vremenski period izdavanja apartmana.</div>
        <div id="dateErr1" class="alert alert-success" role="alert" style = "display: none" > Datum pocetka izdavanja mora biti pre krajnjeg datuma izdavanja.</div>
      <br>
	  <button id="editAccButton" type="button" class="btn btn-primary"  style = "display:inline" v-on:click="geocodeAddress" >Potvrdi izmene</button>
	  <br>
	  <button id="goBackButton" type="button" class="btn btn-primary"  style = "display:none" v-on:click="back" >Povratak na pregled apartmana</button>


   </div>
   </form>`
    
    ,
    methods:{
    	editDate: function(){
    		editDates.style.display="none";
    		i.style.display="inline";
    	},
    	geocodeAddress: function(){
    		var geoAddress=this.apartment.location.adress.numberOfStreet +" "+this.apartment.location.adress.street+" "+this.apartment.location.adress.city+" "+this.apartment.location.adress.country;
    		axios
    		.get('https://maps.googleapis.com/maps/api/geocode/json', {
    			params: {
    				address:geoAddress, 
    				key: 'AIzaSyCJ-9l16ACAmjuZ0xcZr-xcT-EYJZQ-md4',
    			}
    		})

    		.then( (response) => {
    			this.location={longitude:response.data.results[0].geometry.location.lng, latitude:response.data.results[0].geometry.location.lat,
    					adress: this.apartment.location.adress};
    			this.apartment.location=this.location;
    			this.apartment.amenities=this.selectedAmenities;
				this.apartment.host=this.user;    			
    			this.editApartment();
    			
    		});
    	},

    	editApartment: function(){
    		if(this.apartment.type==undefined || this.apartment.name==undefined || this.apartment.location.adress.country==undefined || this.apartment.location.adress.city==undefined || this.apartment.location.adress.street==undefined ||
    				this.apartment.numberOfRooms==undefined || this.apartment.numberOfGuests==undefined || this.apartment.location.adress.numberOfStreet==undefined || 
    				this.apartment.location.adress.postNumber==undefined || this.apartment.pricePerNight==undefined || this.apartment.checkIn==undefined || this.apartment.checkOut==undefined ){
    			infoSuccess.style.display="none";
    			infoErr.style.display="inline";
    			infoErr1.style.display="none";

    		}else if(this.apartment.numberOfRooms<0 || this.apartment.numberOfGuests<0 || this.adress.numberOfStreet<0 || 
    				this.adress.postNumber<0 || this.apartment.pricePerNight<0){
    			infoSuccess.style.display="none";
    			infoErr.style.display="none";
    			infoErr1.style.display="inline";
    		}
			
    		else{
				
    		axios
   		.post('rest/apartmentService/save',this.apartment, { headers : {
   	        	Authorization : 'Bearer ' + localStorage.getItem("token")
   	        }
   			})
   	        .then((response) => {console.log(response);

   	           document.getElementById('apartmentName').disabled = true;
   	           document.getElementById('type1').disabled = true;
   	           document.getElementById('type2').disabled = true;
   	           document.getElementById('status1').disabled = true;
	           document.getElementById('status2').disabled = true;
   	           document.getElementById('roomNum').disabled = true;
   	           document.getElementById('guestNum').disabled = true;
   	           document.getElementById('country').disabled = true;
   	           document.getElementById('city').disabled = true;
   	           document.getElementById('street').disabled = true;
   	           document.getElementById('numOfStreet').disabled = true;
   	           document.getElementById('postNum').disabled = true;
   	           document.getElementById('price').disabled = true;
   	           document.getElementById('time1').disabled = true;
   	           document.getElementById('time2').disabled = true;
   	           document.getElementById('date1').disabled = true;
   	           document.getElementById('date2').disabled = true;
   	           document.getElementById('amenity').disabled = true;
   	           document.getElementById('note').disabled = true;


			    editAccButton.style.display="none";
				infoErr.style.display="none";
    			infoErr1.style.display="none";
    			dateErr.style.display="none";
    			dateErr1.style.display="none";
				infoSuccess.style.display="inline";
				goBackButton.style.display="inline";
   	        		});
    		}
    	},
    	
    	goBack: function(){
    		
			location.reload();
    	}, 
    	okDate: function(){
    	  if(this.dateTo.getTime() <= this.dateFrom.getTime()){
				infoSuccess.style.display="none";
    			infoErr.style.display="none";
    			infoErr1.style.display="none";
    			dateErr.style.display="none";
    			dateErr1.style.display="inline";
			}else{
				this.pom=this.apartment.datesForRenting;
				let dateFrom1 = (new Date(this.dateFrom.getFullYear(),this.dateFrom.getMonth() , this.dateFrom.getDate())).getTime();
				let dateTo1 = (new Date(this.dateTo.getFullYear(),this.dateTo.getMonth() , this.dateTo.getDate())).getTime();
				let period1={dateFrom:dateFrom1, dateTo:dateTo1}
				this.pom.push(period1);
				this.apartment.datesForRenting=this.pom;
			
		    		let ranges=[];
		    		if(this.apartment.datesForRenting!=undefined){
						for(let dates of this.apartment.datesForRenting){
							ranges.push({from: new Date(dates.dateFrom), to: new Date(dates.dateTo)});
						}
						this.disabledDates["ranges"]=ranges;
						this.disabledDates["to"]=new Date();
		    		}else{
		    			this.disabledDates["to"]=new Date();
		    		}
		    	
				
			i.style.display="none";
			editDates.style.display="inline";
			}
		}, 
    	cancelDate: function(){
    		i.style.display="none";
    		editDates.style.display="inline";
    	},
    	back: function(){
    		location.replace('#/va');

    	}
    	
    
    
    },
    components : { vuejsDatepicker },
    
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	}

    
})