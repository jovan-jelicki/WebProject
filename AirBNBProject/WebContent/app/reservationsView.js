Vue.component('view-reservations', {
	data : function () {
		return {
			reservations : {}
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
									<th scope="col"> Gost </th>
									<th scope="col">  </th>
								</tr>
							<thead>
							<tbody>
								<tr v-for="res of reservations">
									<td class="w-25"> <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep"> </td>
									<td> {{res.apartment.name}} </td>
									<td> {{res.startDate}} </td>
								</tr>
								
							</tbody>
						</table>
					</div>
				</div>
			
			</div>
		
		</div>
	
	`,
	methods : {
		
	}
})