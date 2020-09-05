Vue.component('apartment-details', {
	data : function () {
		return  {
			apartment : !!localStorage.getItem("apartment") ? JSON.parse(localStorage.getItem("apartment")) : {}
		}
	},
	template: `
	<div>
		</br>
		</br>
		
		<div style="display : inline">
			<h3 style="float : left; margin-left : 20%">{{apartment.name}}</h3>
			<button class="btn btn-primary" v-on:click="backToSearch()" style="float: right; margin-right : 10%" >Povratak na pretragu </button>
		</div>
		<br>
		
		</br>
		<br>
		<div style="display : inline">
			<img style="float : left; margin-left : 5%; border-radius: 20%; padding: 10px;" width="350" height="300" src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg">
			<div style="float : right; margin-right:20%">
				<p class="card-text" style="{font-family: Arial, Helvetica, sans-serif;}"> </br>Lokacija : {{apartment.location.adress.street}} {{apartment.location.adress.numberOfStreet}}, {{apartment.location.adress.city}} {{apartment.location.adress.postNumber}} </br>		 	
	    				 Geografska sirina i duzina : {{apartment.location.latitude}} {{apartment.location.longitude}} </br>
	    				 Cena po noci : {{apartment.pricePerNight}}
	    				 </p>
			</div>
		</div>
	
	</div>
	
	`

})