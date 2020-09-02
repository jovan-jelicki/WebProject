Vue.component('new-apartment', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            apartment: {},
            adress:{},
            amenities:{},
            selectedAmenities:[],
            country:"",
            period:[],
	        dateTo:'',
	        dateFrom:'',

        }
    },  
   
    mounted() {
        axios
        .get('rest/amenityService/getAmenities')
        .then(response =>
             {this.amenities = response.data}
        );
    },
	  
    template : 
    `  
  <form>
      <br>
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Dodavanje novog apartmana</h1>
      <hr>
   <div class="col-md-12 personal-info">

      <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Domacin</label>
	    <div class="col-sm-10">
              <input class="form-control" id="name" type="text" v-model="user.name" disabled>
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label">Ime apartmana:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="name" type="text" v-model="apartment.name">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="staticEmail" class="col-sm-2 col-form-label">Tip apartmana</label>
	    <div class="col-sm-10">
  				<div class="tip"><input type="radio" name="apartmentType" v-model="apartment.type" value="apartman"> apartman<br></div>
  				<div class="tip"><input type="radio" name="apartmentType" v-model="apartment.type" value="room"> soba<br></div>

	    </div>
	  </div>
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label">Broj soba</label>
	    <div class="col-sm-10">
              <input class="form-control" id="roomNum" type="text" v-model="apartment.numberOfRooms">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Broj gostiju</label>
	    <div class="col-sm-10">
              <input class="form-control" id="guestNum" type="text" v-model="apartment.numberOfGuests" >
	    </div>
	  </div>
	    
	    <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Drzava:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="country" type="text"  v-model="country">
	    </div> 
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label " >Grad:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="text" v-model="adress.city">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label"  >Ulica:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="street" type="text" v-model="adress.street">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label" >Broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="number" v-model="adress.numberOfStreet">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label" >Postanski broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="number" v-model="adress.postNumber">
	    </div>
	  </div>
	  
	    <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Cena po noci:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="price" type="text" v-model="apartment.pricePerNight">
	    </div>
	  </div>
	  
	    <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Vreme za prijavu:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="time1" type="text" v-model="apartment.checkIn">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Vreme za odjavu:</label>
	    <div class="col-sm-10">
         <input class="form-control" id="time2" type="text"  v-model="apartment.checkOut">
	    </div>
	  </div>
	
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Datum za izdavanje od:</label>
	    <div class="col-sm-10">
			<vuejs-datepicker placeholder="Unesite pocetni datum" format="dd.MM.yyyy" v-model="dateFrom" ></vuejs-datepicker>
	    </div>
	  </div>

	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Datum za izdavanje do:</label>
	    <div class="col-sm-10">
	    <div id="app">
			<vuejs-datepicker placeholder="Unesite pocetni datum" format="dd.MM.yyyy" v-model="dateTo" ></vuejs-datepicker>
	   </div>
	    </div>
	  </div>


  	  <div class="form-check" >
  	  <div v-for="a in amenities" v-if="a.deleted == false" :value="a" >
  	       <input class="form-check-input"  type="checkbox" value="" id="defaultCheck1" v-model="selectedAmenities" :value="a">
    	   <label class="form-check-label"> {{a.name}} </label>
      </div>
	  </div>
	  
	  <button id="editAccButton" type="button" class="btn btn-primary"  v-on:click="geocodeAddress" >Potvrdi izmene</button>

   </div>
   </form>
    `, 
     
    
    methods:{
    	geocodeAddress: function(){
    		var geoAddress=this.adress.streetNum +" "+this.adress.street+" "+this.adress.city+" "+this.country;
    		axios
    		.get('https://maps.googleapis.com/maps/api/geocode/json', {
    			params: {
    				address:geoAddress, 
    				key: 'AIzaSyCJ-9l16ACAmjuZ0xcZr-xcT-EYJZQ-md4',
    			}
    		})

    		.then( (response) => {
    			this.location
    			this.location={longitude:response.data.results[0].geometry.location.lng, latitude:response.data.results[0].geometry.location.lat,
    					adress: this.adress};
    			this.apartment.location=this.location;
    			this.apartment.amenities=this.selectedAmenities;

    			
    			let dateFrom = (new Date(this.dateFrom.getFullYear(),this.dateFrom.getMonth() , this.dateFrom.getDate())).getTime(); 
				let dateTo = (new Date(this.dateTo.getFullYear(),this.dateTo.getMonth() , this.dateTo.getDate())).getTime(); 
				this.period.dateFrom=this.dateFrom;
				this.period.dateTo=this.dateTo;
				this.apartment.datesForRenting=this.period;

    			
    			this.addApartment();
    			
    		});
    	},
    	
    	addApartment: function(){
    		axios
   			.post('rest/apartmentService/save',this.apartment)
   	        .then((response) => {console.log(response);}
   	        );
			
    	}
    
    
    },
    components : { vuejsDatepicker },
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	},

    })