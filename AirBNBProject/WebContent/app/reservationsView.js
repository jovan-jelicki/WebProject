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
		})
		.catch(error => {
			location.replace("#/");
			location.reload();
		})
	},
	
	template : `
		<div>
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
									<td class="w-25" v-on:click="apartmentDetails(res.apartment)"> <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep"> </td>
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
									<td> <button class="btn btn-primary" v-if="res.endDate <= new Date() && user.role == 'Host' && res.status == 'Accepted'" > Zavrsi </button> </td>
								</tr>
								
							</tbody>
						</table>
					</div>
				</div>
			
			</div>
		
		</div>
	
	`,
	methods : {
		acceptReservation : function(res){
			res.status = "Accepted";
			axios
			.post("rest/reservationService/acceptReservation", res , { headers : {
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