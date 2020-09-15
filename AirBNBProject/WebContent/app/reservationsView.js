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
									<td><button class="btn btn-primary" v-if="user.role == 'Guest'" > Otkazi </button></td>
									<td><button class="btn btn-primary" v-if="user.role == 'Host'" > Prihvati </button></td>
									<td> <button class="btn btn-primary"  v-if="user.role == 'Host'" > Odbij </button></td>
								</tr>
								
							</tbody>
						</table>
					</div>
				</div>
			
			</div>
		
		</div>
	
	`,
	methods : {
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