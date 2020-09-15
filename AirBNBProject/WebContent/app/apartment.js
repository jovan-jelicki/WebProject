function getAvgGrade(List){
	var grades = 0;
	for(comm of List){
		grades += comm.grade;
	}
	return Math.round((grades/List.length) * 10) / 10;
}


Vue.component('apartment-details', {
	data : function () {
		return  {
			user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
			apartment : !!localStorage.getItem("apartment") ? JSON.parse(localStorage.getItem("apartment")) : {},
			comForm : "none",
			grade : "5",
			avgGrade : {},
			disabledPicker : true,
			disabledDatesFirst : {},
			disabledDatesSecond: {},
			reservation : {
				message : ""
			},
			fullPrice : {}
		}
	},
	mounted() {
		if(this.apartment.name == undefined)
			history.back();
		else {
			this.avgGrade = getAvgGrade(this.apartment.comments);
			if(this.apartment.freePeriods != undefined){
				var ranges = [];
				var first = {};
				var second = {};
				first = this.apartment.freePeriods[0].dateTo;
				var lastDay = {};
				//20.06 - 25.06   19-19  27.06 - 29.06
				for(let period of this.apartment.freePeriods){
					if(period.dateTo != first){
						ranges.push({from: new Date(first), to: new Date(period.dateFrom)});
						first = period.dateTo;
						console.log(new Date( first))
						
					}
					lastDay = new Date(period.dateTo + 86400000);
				}
				
				this.disabledDatesFirst["ranges"] = ranges;
				this.disabledDatesFirst["from"] = lastDay;
				this.disabledDatesFirst["to"] = new Date();
			}
				
		
		}
		
		
	},
	
	
	template: `
	<div>
		</br>
		</br>
		
		<div style="display : inline">
			<h3 class="display-4" style="float : left; margin-left : 10%">Smestaj {{apartment.name}}</h3>
			<button class="btn btn-info" type="button" v-on:click="backToSearch()" style="float: right; margin-right : 10%" >Povratak na pretragu </button>
		</div>
		<div>
		  <template v-if="this.user.name!=undefined">
		  <button class="btn btn-outline-primary" type="button" v-on:click="editApartment()" style="float: right; margin-right : 4%" >Izmeni apartman</button>
		  <button class="btn btn-outline-primary" type="button"  data-toggle="modal" data-target="#deleteModal"  style="float: right; margin-right : 4%">Obrisi apartman</button>
		</template>
		</div>
		<br>
		</br>
		<br>

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
	        <img class="d-block w-100" v-bind:src="a" >
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
		
		
		
		<div style="display : flex; height : auto; width : 100%;">
			<div style="margin-right: 5%; margin-left : 5%">
				<p v-if="avgGrade"> <b> Ocena: </b> {{avgGrade}} ({{apartment.comments.length}})</p>
				
				<p class="card-text" style="font-family: Arial, Helvetica, sans-serif;"> </br> <b> Lokacija : </b> {{apartment.location.adress.street}} {{apartment.location.adress.numberOfStreet}}, {{apartment.location.adress.city}} {{apartment.location.adress.postNumber}} </br>		 	
	    			<b> Geografska sirina i duzina : </b> {{apartment.location.latitude}} {{apartment.location.longitude}} </br>
	    		</p>
	    		
	    		<!--Opis apartmana-->
	    		<p 	style="word-wrap: break-word;"> {{apartment.note}}</p>
			
			</div>
		</div>
		
		
		<div class="filter-div" style="background-color : white">
			<div style="display : inline">
				<div class="container">
					<h4> Dodaci </h4>
					<div style="display : inline" v-for="a in apartment.amenities">
						 <p style="display : inline"> <b> {{a.name}}  </b>  </p> 
					</div>
				</div>
				
				<br>
				<br>
				<div class="container">
				  	<h4>Komentari: </h4>
				  	</br>
				  		<div class="comments-list" v-for="com in apartment.comments" v-if="com.isApproved">
				  			<div class="media" style="display : inline ">
				  				 <p class="float-right" >Ocena : {{com.grade}} </p>
				  				<div class="media-body"> 
				  				<h4 class="media-heading user_name" style="font-size: 15px">Jovan Jelicki</h4>
				  					{{com.text}}
				  				</div>
				  			</div>
				  			<hr>
				  		</div>
			  	<button id="buttonComment" class="btn btn-primary" v-on:click="commentForm()"> Ostavi komentar </button>
					<div class="form-group" v-bind:style="{display : comForm}">
						<div style="display : inline" >
							<p style="float : left" > Ocenite smestaj:  </p>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text">
										<input v-model="grade" type="radio" id="1" name="grade" value="1">
										<label style="margin : 5; font-size: 100%" >1</label><br>
										<input v-model="grade" type="radio" id="2" name="grade" value="2">
										<label style="margin : 5; font-size: 100%">2</label><br>
									  	<input v-model="grade" type="radio" id="3" name="grade" value="3">
										<label style="margin : 5; font-size: 100%">3</label><br>
										<input v-model="grade"  type="radio" id="4" name="grade" value="4">
										<label style="margin : 5; font-size: 100%">4</label><br>
										<input v-model="grade"  type="radio" id="5" name="grade" value="5" checked>
										<label style="margin : 5; font-size: 100%">5</label><br>
									</div>
								</div>
							</div>
						</div>
						
						<textarea class="form-control" rows="5" cols="30" placeholder="Ostavite komentar..." id="comment"></textarea>
						<br>
						<div style="display : flex" >
							<button class="btn btn-primary" v-on:click="leaveComment()"> Prosledi komentar </button>
							<button class="btn btn-primary" style="background-color : gray; margin-left : 5%; border-color : gray" v-on:click="cancel()" > Odustanak </button>
						</div>
					</div>
				</div>
			</div>
				
			<div>
				<label style="margin-bottom: 10%;"><b>  Domacin smestaja {{apartment.host.name}} {{apartment.host.surname}} </b> </label>
				
				</br>
				<div style="width : 25rem; min-width: max-content" class="card">
					<h5 class="card-header"> Pogledajte dostupnost </h5>
					<div class="card-body">
						<p> <b> Cena po noci : </b> {{apartment.pricePerNight}}</p>
						<hr>
						<div style="display : flex; margin-left : 3%">
							<vuejs-datepicker id="date1"  @closed="enableDatePicker()" v-model="reservation.reservationStart" :monday-first="true" :disabled-dates="disabledDatesFirst" placeholder="Unesite pocetni datum" format="dd.MM.yyyy"></vuejs-datepicker>
							<vuejs-datepicker id="date2" v-bind:disabled="disabledPicker" v-model="reservation.reservationEnd" :monday-first="true" :disabled-dates="disabledDatesSecond" placeholder="Unesite krajnji datum" format="dd.MM.yyyy"></vuejs-datepicker>
						</div>
						<hr>
						<div style="display : flex">
							<p style="margin-top: 3%;"> <b> Broj gostiju: </b> </p>
							<input type="number" v-model="reservation.guests"  min="1" v-bind:max="apartment.numberOfGuests" onkeydown="return false" style="width: 20%; margin-left: 5%;" />
						</div>
							
						<button class="btn btn-primary" v-if="user.role == 'Guest' || user.role == undefined" v-on:click="fullPriceM()"> Zakazi </button>
						<p style="color : red; display : none" id="logInMessage"> Potrebno je prvo da se ulogujete! </p>
					</div>
				</div>
			</div>
		</div>

		
		<div class="modal" id="success">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Obavestenje</h1>
                    </div>
                    <div class="modal-body">
						<p> Uspesno ste kreirali rezervaciju! </p>
						<hr>
						<button class="btn btn-primary" v-on:click="exit()" style="background-color : gray; margin-left : 5%" > Ok </button>
					</div>
                </div>
            </div>
        </div>
		
		
		<div class="modal" id="modalReservation">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Rezervacija</h1>
                    </div>
                    <div class="modal-body">
						<p> Ukupna cena : {{fullPrice}} </p>
						<p> Unesite poruku za domacina : </p>
						<textarea class="form-control" rows="5" cols="20" v-model="reservation.message" placeholder="Ostavite poruku..." id="comment"></textarea>
						<div style="display : flex; margin-top : 5%"> 
							<button class="btn btn-primary" data-target="#success" data-backdrop="static"  data-toggle="modal" v-on:click="makeReservation()"> Rezervisi </button>
							<button class="btn btn-primary" v-on:click="exitModal()" style="background-color : gray; margin-left : 5%" > Otkazi </button>
						</div>
					</div>
                </div>
            </div>
        </div>
		

<!-- Modalni za brisane -->
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
        Da li ste sigurni da zelite da obrisete apartman {{apartment.name}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Otkazi</button>
        <button type="button" class="btn btn-primary" v-on:click="deleteApartment()">Potvrdi brisanje</button>
      </div>
    </div>
  </div>
</div>
	</div>
	
	`,
	methods : {
		exit : function (){
			$('#success').modal('hide');
			location.replace("#/");
			location.reload();
		},
		makeReservation : function() {
			this.reservation.guest = this.user;
			this.reservation.apartment = this.apartment;
			axios
			.post("rest/reservationService/save", this.reservation, { headers : {
   	        	Authorization : 'Bearer ' + localStorage.getItem("token")
   	        }
			}).then(response => {
				localStorage.removeItem("apartment");
				localStorage.removeItem("apartments");
				$('#modalReservation').modal('hide');
				console.log(response.data)
			}).catch(error => {
				console.log(error.response);
			})
			
				
		},
		exitModal : function (){
			$('#modalReservation').modal('hide');
		},
		fullPriceM : function() {
			if(localStorage.getItem("user") == null || localStorage.getItem("user") == undefined ){
				logInMessage.style.display = "inline";
				return;
			}
			if(this.reservation.reservationStart != undefined && this.reservation.reservationEnd != undefined && this.reservation.guests != undefined)	{
				this.fullPrice = Math.floor((this.reservation.reservationEnd - this.reservation.reservationStart)/ 86400000)*this.apartment.pricePerNight;
				$('#modalReservation').modal('show');
			}
		},
		cancel : function() {
			this.comForm = "none";
			buttonComment.style.display = "inline";
		},
		backToSearch : function () {
			if(this.user == undefined || this.user == {} || this.user == null)
				location.replace('#/');
			else if(this.user.role == "Admin" || this.user.role == "Host")
				location.replace('#/va');
			else 
				location.replace('#/');
		},
		commentForm : function() {
			this.comForm = "inline";
			buttonComment.style.display = "none";
		},
		leaveComment : function () {
			this.comForm = "none";
			buttonComment.style.display = "inline";
			this.apartment.comments.push({"text" : comment.value, "apartment" : this.apartment.id, "grade" : this.grade});
			console.log(this.grade);
			axios
			.post("rest/apartmentService/edit", this.apartment, { headers : {
	        	Authorization : 'Bearer ' + localStorage.getItem("token")
	        }
			})
			.then(response => {
				this.apartment = response.data;
				var apartments = JSON.parse(localStorage.getItem("apartments"));
				for(a of apartments){
					if(a.id == this.apartment.id)
						a.comments = this.apartment.comments;
				}
				localStorage.setItem("apartments",  JSON.stringify(apartments));
				localStorage.setItem("apartment", JSON.stringify(this.apartment));
				this.avgGrade = getAvgGrade(this.apartment.comments);
			})
		},
		editApartment: function(){
			location.replace('#/ea');
		},
		deleteApartment: function(){
			axios
			.post("rest/apartmentService/delete", this.apartment, { headers : {
	        	Authorization : 'Bearer ' + localStorage.getItem("token")
	        }
			})
			.then(response => {
				this.apartment = response.data;
				 $('#deleteModal').modal('hide');

				location.replace('#/va');

				})
		},
		enableDatePicker : function() {
			if(this.reservation.reservationStart != undefined){
				this.disabledPicker = false;
				
				var lastDay = {};
				//20.06 - 25.06     27.06 - 29.06
				for(let period of this.apartment.freePeriods){
					if(this.reservation.reservationStart >= new Date(period.dateFrom) && this.reservation.reservationStart <= new Date(period.dateTo)){
						lastDay = new Date(period.dateTo + 86400000);
						break;
					}
				}
				this.disabledDatesSecond["to"] = this.reservation.reservationStart;
				this.disabledDatesSecond["from"] = lastDay;
				
			}
		}
		
		
	},
	components : { vuejsDatepicker }

})