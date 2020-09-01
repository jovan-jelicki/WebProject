Vue.component('new-apartment', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            apartment: {},
            amenities:{},
            selectedAmenities: [],
            country:"",
           city:"",
           street:"", 
           streetNum:"",
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
   <div class="col-md-9 personal-info">

      <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Domacin</label>
	    <div class="col-sm-9">
              <input class="form-control" id="name" type="text" v-model="user.name" disabled>
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="staticEmail" class="col-sm-2 col-form-label">Tip apartmana</label>
	    <div class="col-sm-10">
	        <div class="form-check form-check-inline">
        		<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        		<label class="form-check-label" for="inlineCheckbox1">apartman</label>
        	</div>
      
        	<div class="form-check form-check-inline">
        		<input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
        		<label class="form-check-label" for="inlineCheckbox2">soba</label>
        	</div>
	    </div>
	  </div>
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label">Broj soba</label>
	    <div class="col-sm-10">
              <input class="form-control" id="roomNum" type="text">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Broj gostiju</label>
	    <div class="col-sm-10">
              <input class="form-control" id="guestNum" type="text">
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
              <input class="form-control" id="city" type="text" v-model="city">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label"  >Ulica:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="street" type="text" v-model="street">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label" >Broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="text" v-model="streetNum">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Postanski broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="postNum" type="text">
	    </div>
	  </div>
	  
	    <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Cena po noci:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="price" type="text">
	    </div>
	  </div>
	  
	    <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Vreme za prijavu:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="time1" type="text">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Vreme za odjavu:</label>
	    <div class="col-sm-10">
         <input class="form-control" id="time2" type="text">
	    </div>
	  </div>

  	  <div class="form-check" >
  	  <div v-for="a in amenities" v-if="a.deleted == false" :value="a" >
  	       <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="selectedAmenities" :value="a">
    	   <label class="form-check-label"> {{a.name}} </label>
      </div>
	  </div>
	  
	  
	  <button id="editAccButton" type="button" class="btn btn-primary"  v-on:click="geocodeAddress" >Potvrdi izmene</button>

   </div>
   </form>
    `, 
    methods:{
    	geocodeAddress: function(){
    		var geoAddress=this.streetNum +" "+this.street+" "+this.city+" "+this.country;
    		axios
    		.get('https://maps.googleapis.com/maps/api/geocode/json', {
    			params: {
    				address:geoAddress, 
    				key: 'AIzaSyCJ-9l16ACAmjuZ0xcZr-xcT-EYJZQ-md4',
    			}
    		})
    		.then( response => {
    			console.log(response);
    			console.log(response.data.results[0].geometry.location.lat);
    			});
    	}
    }

    })