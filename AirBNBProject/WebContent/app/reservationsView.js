function updateList(res, List) {
	for(var r of List){
		if(r.id == res.id)
			r = res
	}
	return List;
}

Vue.component('view-reservations', {
	data : function () {
		return {
			reservations : {},
			backUp : {},
			sort : "desc",
			status : "All",
			user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
		}
	},
	mounted () {
		axios
		.get("rest/reservationService/getReservations", { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
        }
		})
		.then(response => {
			this.reservations = response.data;
			this.backUp = response.data;
		})
		.catch(error => {
			location.replace("#/");
			location.reload();
		})
	},
	
	template : `
		<div>
		</br>
		<div class="filter-div" v-if="backUp != 'undefine' && backUp != {} && backUp.length > 0">
    		<div style="display : flex; white-space: nowrap;">
    			<p style="margin-top: 5% ; margin-right : 3%"> <b> Sortiraj po ceni </b> </p>
    			<button v-on:click="sortCall()"  class="btn btn-primary"> 
    				<!--img width="50px" height="40px" src="https://img.favpng.com/0/11/14/computer-icons-sorting-algorithm-download-font-awesome-png-favpng-TgpcVDhbLgfA4TBAHKXU21VH6.jpg" /-->
    				Sortiraj
    			</button>
    		</div>
    		<div v-if="user.role != 'Guest'">
    			<select @change="showStatus()" class="browser-default custom-select" id="status" v-model="status">
    				<option value="All">Prikazi sve</option>
    				<option value="Accepted" > Prihvacen </option>
    				<option value="Rejected" > Odbijen </option>
    				<option value="Created" > Kreiran </option>
    				<option value="Quit" > Obustavljen </option>
    				<option value="Done" > Zavrsen </option>
    			</select>
    		</div>
    	</div>
		</br>
		<p style="color : green; display : none; margin-left= 20%" id="succ" > Uspesno ste otkazali rezervaciju! </p>
		<p style="color : red; display : none; margin-left= 20%" id="bad" > Rezervacija nije uspela da se otkaze! </p>
			<div class="container" >
			
				<div class="row">
					<div class="col-12">
						<table class="table table-image">
							<thead>
								<tr>
									<th scope="col"> Slika </th>
									<th scope="col"> Naziv apartmana </th>
									<th scope="col"> Datum pocetka  </th>
									<th scope="col"> Broj noci </th>
									<th scope="col"> Ukupna cena  </th>
									<th scope="col"> Broj gostiju </th>
									<th scope="col" v-if="user.role != 'Guest'"> Gost </th>
									<th scope="col"> Status </th>
									<th scope="col"> Poruka domacinu </th>
									<th scope="col" v-if="user.role != 'Admin'">  </th>
									<th scope="col" v-if="user.role == 'Host'" > </th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="res of reservations">
									<td class="w-25" v-on:click="apartmentDetails(res.apartment)"> <img v-bind:src="res.apartment.pictures[0]" class="img-fluid img-thumbnail" alt="Sheep"> </td>
									<td> {{res.apartment.name}} </td>
									<td> {{new Date(res.startDate)| dateFormat('DD.MM.YYYY')}} </td>
									<td> {{res.numberOfNights}} </td>
									<td> {{res.fullPrice}} </td>
									<td> {{res.numberOfGuests}} </td>
									<td  v-if="user.role != 'Guest'"> {{res.guest.username}} </td>
									<td> {{res.status}} </td>

									<td> {{res.message}} </td>		
									<td><button class="btn btn-primary" v-on:click="quitReservation(res)" v-if="res.startDate > new Date() && user.role == 'Guest' && (res.status == 'Created' || res.status == 'Accepted')" > Otkazi </button> </td>
									<td><button class="btn btn-primary" v-on:click="acceptReservation(res)" v-if="res.startDate > new Date() && user.role == 'Host' && res.status == 'Created'" > Prihvati </button> </td>
									<td> <button class="btn btn-primary" v-on:click="rejectReservation(res)" v-if="res.startDate > new Date() && user.role == 'Host' && (res.status == 'Created' || res.status == 'Accepted')" > Odbij </button> </td>
									<td> <button class="btn btn-primary" v-on:click="finishReservation(res)" v-if="res.endDate <= new Date() && user.role == 'Host' && res.status == 'Accepted'" > Zavrsi </button> </td>
								</tr>
								
							</tbody>
						</table>
					</div>
				</div>
			
			</div>
		
		</div>
	
	`,
	methods : {
		sortCall : function(){
			if(this.sort == "desc"){
				this.reservations.sort((a,b) => (a.fullPrice > b.fullPrice) ? -1 : 1);
				this.sort = "asc";
			}else{ 
				this.reservations.sort((a,b) => (a.fullPrice > b.fullPrice) ? 1 : -1);
				this.sort = "desc";
			}
		},
		showStatus : function() {
			this.reservations = this.backUp;
			if(this.status == "Done"){
				this.reservations = this.reservations.filter(obj => {return obj.status == "Done"});
			}else if(this.status == "Accepted"){
				this.reservations = this.reservations.filter(obj => {return obj.status == "Accepted"});
			}else if(this.status == "Rejected"){
				this.reservations = this.reservations.filter(obj => {return obj.status == "Rejected"});
			}else if(this.status == "Quit"){
				this.reservations = this.reservations.filter(obj => {return obj.status == "Quit"});
			}else if(this.status == "Created") {
				this.reservations = this.reservations.filter(obj => {return obj.status == "Created"});
			}else {
				this.reservations = this.backUp;
			}
			
		},
		acceptReservation : function(res){
			res.status = "Accepted";
			axios
			.post("rest/reservationService/edit", res , { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
			}
			})
			.then(response => {
				console.log(response.data);
				this.reservations = updateList(res,this.reservations);
			})
		},
		finishReservation : function(res){
			res.status = "Done";
			axios
			.post("rest/reservationService/edit", res , { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
			}
			})
			.then(response => {
				console.log(response.data);
				this.reservations = updateList(res,this.reservations);
			})
		},
		rejectReservation : function(res){
			res.status = "Rejected";
			axios
			.post("rest/reservationService/rejectReservation", res , { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
			}
			})
			.then(response => {
				console.log(response.data);
				this.reservations = updateList(res,this.reservations);
				succ.style.display = "inline";
			})
			.catch(error => {
				bad.style.display = "inline"
			})
		},
		
		quitReservation : function(res) {
			res.status = "Quit";
			axios
			.post("rest/reservationService/rejectReservation", res , { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
			}
			})
			.then(response => {
				console.log(response.data);
				this.reservations = updateList(res,this.reservations);
				succ.style.display = "inline";
			})
			.catch(error => {
				bad.style.display = "inline"
			})
		},
		
		apartmentDetails : function(apart) {
			axios
			.post("rest/apartmentService/getApartment", apart, { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
			}
			})
			.then(response => {
				localStorage.setItem("apartment", JSON.stringify(response.data));
				location.replace("#/ad");
			})
			
		}
	},
	 filters: {
	    	dateFormat: function (value, format) {
	    		var parsed = moment(value);
	    		return parsed.format(format);
	    	}
	   	}
})