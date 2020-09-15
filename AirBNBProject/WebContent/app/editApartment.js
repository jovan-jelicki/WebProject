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
            pom:[],
            amenityPom:[],
            ind:'',
            files: [],
            datesForDelete:[],
            list:[]
             }
            },  
                   
   mounted() {
       axios
       .get('rest/amenityService/getAmenities')
       .then(response =>
       {
    	   this.amenities = response.data;
    	   for (let amenity of this.apartment.amenities){
    		  this.amenityPom.push(amenity);
    		   
    	   }
    	   
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
	    </div>
	  </div>
	     <button id="editDates" type="button" class="btn btn-outline-primary" v-on:click="editDate" >Dodaj novi period</button>
    	    <button id="delDates" type="button" class="btn btn-outline-primary" v-on:click="openDelete">Obrisi neki od postojecih perioda </button>


	 <div id="deletePeriod" style = "display: none">
		  <div class="col-md-2 personal-info">
	  	  <div class="form-check"  >
	  	  <div v-for="a in apartment.datesForRenting" :value="a" >
	  	       <input class="form-check-input"  ref="refSelected" type="checkbox"  id="check" checked="checked"  v-model="datesForDelete" :value="a" >
	  	       <label class="form-control" id="datesForDelete" >{{a.dateFrom | dateFormat('DD.MM.YYYY')}}-{{a.dateTo  | dateFormat('DD.MM.YYYY')}}</label>
	      </div>
	      	 <button id="deleteDate" type="button" class="btn btn-outline-primary" v-on:click="deleteDates()" >Obrisi periode</button>
	      	  <button id="cancelDeleteDate" type="button" class="btn btn-outline-primary"  v-on:click="cancelDate" >Otkazi brisanje</button>
		  </div>
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
  	       <input class="form-check-input"  ref="refSelected" type="checkbox"  id="check" checked="checked"  v-model="amenityPom" :value="a" >
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
	  
	  <div class="form-group row">
	    <label  class="col-sm-2 col-form-label ">Izmeni fotografije:</label>
	    <div class="col-sm-10">
		      <button id="dispPic" type="button" class="btn btn-outline-primary" v-on:click="displayPic()" >Izmeni</button>
	    </div>
	  </div>
	  
	  
	  
	  
	  
	  <div id="imageDiv"  style = "display: none">
	  	<div>
			<label  class="col-sm-2 col-form-label ">Dodajte nove fotografije apartmana:</label>
	        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
			 <button class="btn btn-info" type="button" v-on:click="submitFiles()">Potvrdi izbor slika</button>
			<br>
		 </div>
	  
	  
	  <div class="alert alert-info" role="alert"> Klikom na fotografiju izaberite onu koju zelite da obrisete.</div>

		 <div id="carousel-example-2" class="carousel slide carousel-fade z-depth-1-half" data-ride="carousel"  style="width: 800px ; margin: 0 auto ">
			  <!--Indicators-->
			  <ol class="carousel-indicators">	    
				  <div v-for="a in apartment.pictures" >
				    <li data-target="#carousel-example-2" data-slide-to=idx class="{ active: idx==0 }" ></li>
				  </div>
			  </ol>	
			  <div class="carousel-inner" role="listbox">
			    <div   v-for="(a,index) in apartment.pictures"  :class="(index === 0 ? 'carousel-item active' : 'carousel-item')">
			      <!--Mask color-->
			      <div class="view">
			        <img class="d-block w-100" v-bind:src="a"  @click="openModal(index)" >
			        <div class="mask rgba-black-light"></div>
			      </div>    
			    </div>
			  </div>
			  <a class="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
	  </div>



		<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        Da li ste sigurni da zelite da obrisete izabranu fotografiju?
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Otkazi</button>
		        <button type="button" class="btn btn-primary" v-on:click="deleteImage()">Potvrdi brisanje</button>
		      </div>
		    </div>
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
    		delDates.style.display="none";
    	},
    	geocodeAddress: function(){
    		if(this.apartment.location.adress.numberOfStreet=="" || this.apartment.location.adress.street=="" || this.apartment.location.adress.city=="" || this.apartment.location.adress.country==""){
    			infoSuccess.style.display="none";
    			infoErr.style.display="inline";
    			infoErr1.style.display="none";
    		}else{

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
    			this.apartment.amenities=this.amenityPom;
				this.apartment.host=this.user;    			
    			this.editApartment();
    			
    		});
    		}
    	},

    	editApartment: function(){
    		if(this.apartment.type=="" || this.apartment.name=="" || this.apartment.location.adress.country=="" || this.apartment.location.adress.city=="" || this.apartment.location.adress.street=="" ||
    				this.apartment.numberOfRooms=="" || this.apartment.numberOfGuests=="" || this.apartment.location.adress.numberOfStreet=="" || 
    				this.apartment.location.adress.postNumber=="" || this.apartment.pricePerNight=="" || this.apartment.checkIn=="" || this.apartment.checkOut=="" || this.apartment.datesForRenting.length==0){
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
   		.post('rest/apartmentService/edit',this.apartment, { headers : {
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
    		deletePeriod.style.display="none";

    		editDates.style.display="inline";
       	    delDates.style.display="inline";

    	},
    	back: function(){
    		location.replace('#/va');

    	},
    	openModal:function(index){
    		this.ind=index;
    		 $('#deleteModal').modal('show');
    	},
    	deleteImage: function(){
    	    var pictures=this.apartment.pictures;
    		
    		//Vue.delete(this.apartment.pictures,a);
    		Array.prototype.splice.call(pictures, this.ind, 1);
    		console.log(this.apartment.pictures);
    		   Vue.set(this.apartment.pictures,pictures);
    		 $('#deleteModal').modal('hide');
    		 
    	},
    	displayPic: function(){
    		imageDiv.style.display="inline";
    	},
    	submitFiles(){
    	  
          let formData = new FormData();
          if(this.files.length==0){
        	  picErr.style.display="inline";
          }else{
        	//picErr.style.display="none";
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
		        .then((response) => {
		        	this.apartment.pictures=response.data;
		        	//end.style.display="inline";
		        	});
          }
         },
   
       handleFilesUpload(){
	    	let uploadedFiles = this.$refs.files.files;

	    	/*
	    	  Adds the uploaded file to the files array
	    	*/
	    	for( var i = 0; i < uploadedFiles.length; i++ ){
	    	  this.files.push( uploadedFiles[i] );
	    	}
	    	for(var i=0; i<this.apartment.pictures.length; i++){
	    		this.files.push(this.apartment.pictures[i]);
	    	}
         },
         deleteDates: function(){
        	 this.list=this.apartment.datesForRenting;
        	 
        	 for(let i=0; i< this.list.length; i++){
        		 for(let pom of this.datesForDelete){
        			 if(pom.dateFrom== this.list[i].dateFrom){
        				 Array.prototype.splice.call( this.list,i, 1);
        			 }
        		 }
        		 
        	 }
        	 Vue.set(this.apartment.datesForRenting, this.list);
        	 editDates.style.display="inline";
        	 delDates.style.display="inline";
        	 deletePeriod.style.display="none";deletePeriod.style.display="none";
         },
         openDelete: function(){
        	 deletePeriod.style.display="inline";
        	 delDates.style.display="none";
        	 editDates.style.display="none";
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