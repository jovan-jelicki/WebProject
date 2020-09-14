Vue.component('new-apartment', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            apartment: {},
            adress:{},
            amenities:{},
            selectedAmenities:[],
            period:[],
	        dateTo:'',
	        dateFrom:'',
	        disabledDates: {}, // Disable all dates up to specific date
            pom:[],
            files: ''
        }
    },  
   
    mounted() {
        axios
        .get('rest/amenityService/getAmenities')
        .then(response =>
             {this.amenities = response.data;
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
             }
        );
    },
	  
    template : 
    `  
  <div>
      <br>
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Dodavanje novog apartmana</h1>
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
  				<div class="tip"><input type="radio"  id="type1" name="apartmentType" v-model="apartment.type" value="Apartment"> apartman<br></div>
  				<div class="tip"><input type="radio" id="type2" name="apartmentType" v-model="apartment.type" value="Room"> soba<br></div>

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
              <input class="form-control" id="country" type="text"  v-model="adress.country">
	    </div> 
	  </div>

	   <div class="form-group row">
	    <label  class="col-sm-2 col-form-label " >Grad:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="city" type="text" v-model="adress.city">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label  class="col-sm-2 col-form-label"  >Ulica:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="street" type="text" v-model="adress.street">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label class="col-sm-2 col-form-label" >Broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="numOfStreet" type="number" v-model="adress.numberOfStreet">
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label" >Postanski broj:</label>
	    <div class="col-sm-10">
              <input class="form-control" id="postNum" type="number" v-model="adress.postNumber">
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
	  
	  <div class="form-group row"  id="pomoc">
	    <label class="col-sm-2 col-form-label ">Klikom na dugme izaberite datume za izdavanje</label>
	    <div class="col-sm-10">
	    <button id="datesButton" type="button" class="btn btn-primary"   v-on:click="display()" >Dodaj periode</button>
	    </div>
	  </div>
	  
	    
	<div id="dates" style = "display: none" >
	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Datum za izdavanje od:</label>
	    <div class="col-sm-10">
			<vuejs-datepicker id="date1" :monday-first="true" :disabled-dates="disabledDates" 	placeholder="Unesite pocetni datum" format="dd.MM.yyyy" v-model="dateFrom" ></vuejs-datepicker>
	    </div>
	  </div>

	  <div class="form-group row">
	    <label class="col-sm-2 col-form-label ">Datum za izdavanje do:</label>
	    <div class="col-sm-10" >
			<vuejs-datepicker id="date2" :monday-first="true" :disabled-dates="disabledDates"  placeholder="Unesite krajnji datum" format="dd.MM.yyyy" v-model="dateTo" ></vuejs-datepicker>
	 	    <button id="newPeriod" type="button" class="btn btn-outline-primary"   v-on:click="addNewPeriod()" >Dodaj period</button>
			<br>
			<div id="uputstvo"class="alert alert-warning alert-dismissible fade show" role="alert">
			  Potvrdite dodavanje perioda pritiskom na dugme "Dodaj period". Mozete dodavati vise perioda jedan za drugim.
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
			</div>
	    </div>
	  </div>
	</div>

	
	
    <div class="form-group row">
   	    <label class="col-sm-2 col-form-label ">Izaberite dodatni sadrzaj koji poseduje apartman:</label>
    </div>

    <div class="col-md-2 personal-info">
  	  <div class="form-check" >
    	<div v-for="a in amenities" v-if="a.deleted == false" :value="a" >
  	       <input class="form-check-input"   type="checkbox" value="" id="defaultCheck1" v-model="selectedAmenities" :value="a">
    	   <label class="form-control" id="amenity"> {{a.name}} </label>
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
	  
	 
	 <div>
		<label  class="col-sm-2 col-form-label ">Izaberite slike apartmana:</label>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
		 <button type="button" v-on:click="submitFiles()">Potvrdi izbor slika</button>
	 </div>
	



	  <br>
	     <div id="infoSuccess" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste dodali apartman!!</div>
        <div id="infoErr" class="alert alert-success" role="alert" style = "display: none" >Neophodno je uneti sve podatke!</div>
        <div id="infoErr1" class="alert alert-success" role="alert" style = "display: none" >Molimo proverite unete podatke. Doslo je do nevalidnog unosa.</div>
        <div id="dateErr" class="alert alert-success" role="alert" style = "display: none" > Molimo izaberite vremenski period izdavanja apartmana.</div>
        <div id="dateErr1" class="alert alert-success" role="alert" style = "display: none" > Datum pocetka izdavanja mora biti pre krajnjeg datuma izdavanja.</div>
      <br>
	  <button id="editAccButton" type="button" class="btn btn-primary"  style = "display:inline" v-on:click="geocodeAddress" >Potvrdi izmene</button>
	  <br>
	  <button id="addNew" type="button" class="btn btn-primary"  style = "display: none" v-on:click="goBack" >Povratak na dodavanje novog</button>

   </div>
   </div>
    `, 
     
    
    methods:{
    	geocodeAddress: function(){
    		if(this.adress.numberOfStreet==undefined || this.adress.street==undefined || this.adress.city==undefined || this.adress.country==undefined){
    			infoSuccess.style.display="none";
    			infoErr.style.display="inline";
    			infoErr1.style.display="none";
    		}else{
	    		var geoAddress=this.adress.streetNum +" "+this.adress.street+" "+this.adress.city+" "+this.adress.country;
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
	
	    			
	    			
	
					this.apartment.host=this.user;
	    			
	    			
	    			this.addApartment();
	    			
	    		});
    		}
    	},
    	addNewPeriod: function(){
    		dateErr.style.display="none";
    		dateErr1.style.display="none";
    		if(this.dateFrom == '' && this.dateTo == ''){
    			dateErr.style.display="inline";
			}else if(this.dateFrom.getTime() > this.dateTo.getTime()){
				dateErr1.style.display="inline";
			}else {
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
				
			}

    	},
    	addApartment: function(){
    		if(this.apartment.type==undefined || this.apartment.name==undefined || this.adress.country==undefined || this.adress.city==undefined || this.adress.street==undefined ||
    				this.apartment.numberOfRooms==undefined || this.apartment.numberOfGuests==undefined || this.adress.numberOfStreet==undefined || 
    				this.adress.postNumber==undefined || this.apartment.pricePerNight==undefined || this.apartment.checkIn==undefined || this.apartment.checkOut==undefined ){
    			infoSuccess.style.display="none";
    			infoErr.style.display="inline";
    			infoErr1.style.display="none";

    		}else if(this.apartment.numberOfRooms<0 || this.apartment.numberOfGuests<0 || this.adress.numberOfStreet<0 || 
    				this.adress.postNumber<0 || this.apartment.pricePerNight<0){
    			infoSuccess.style.display="none";
    			infoErr.style.display="none";
    			infoErr1.style.display="inline";
    		}else if(this.dateFrom == "" || this.dateTo == ""){
    			infoSuccess.style.display="none";
    			infoErr.style.display="none";
    			infoErr1.style.display="none";
    			dateErr.style.display="inline";
    		}
			else if(this.dateTo.getTime() <= this.dateFrom.getTime()){
				infoSuccess.style.display="none";
    			infoErr.style.display="none";
    			infoErr1.style.display="none";
    			dateErr.style.display="none";
    			dateErr1.style.display="inline";
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
   	            addNew.style.display="inline";
				infoErr.style.display="none";
    			infoErr1.style.display="none";
    			dateErr.style.display="none";
    			dateErr1.style.display="none";
				infoSuccess.style.display="inline";
   	        		});
    		}
    	},
    	
    	goBack: function(){
    		
			location.reload();
    	},
    	
    	display: function(){
    		pomoc.style.display="none";
    		dates.style.display="inline";
    		
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
 
    	},
    	submitFiles(){

          let formData = new FormData();
            for( var i = 0; i < this.files.length; i++ ){
              let file = this.files[i];
              formData.append('files', file);
            }
	    		axios
	    		.post( 'rest/apartmentService/saveImages',formData,
	              {
	                headers: {
	                    'Content-Type': 'multipart/form-data',
	                    Authorization : 'Bearer ' + localStorage.getItem("token")
	                }
	              }
	            )
		        .then((response) => this.apartment.pictures=response.data );
	    },
   
       handleFilesUpload(){
              this.files = this.$refs.files.files;
         }
    	
    },
    components : { vuejsDatepicker },

    })
