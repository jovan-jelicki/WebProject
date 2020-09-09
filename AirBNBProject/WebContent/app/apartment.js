Vue.component('apartment-details', {
	data : function () {
		return  {
			user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
			apartment : !!localStorage.getItem("apartment") ? JSON.parse(localStorage.getItem("apartment")) : {},
			comForm : "none"
		}
	},
	template: `
	<div>
		</br>
		</br>
		
		<div style="display : inline">
			<h3 style="float : left; margin-left : 20%">Smestaj {{apartment.name}}</h3>
			<button class="btn btn-primary" v-on:click="backToSearch()" style="float: right; margin-right : 10%" >Povratak na pretragu </button>
		</div>
		<div>
		  <template v-if="this.user.name!=undefined">
		  <button class="btn btn-primary" v-on:click="editApartment()" style="float: right; margin-right : 10%" >Izmeni apartman</button>
			</template>
		</div>
		<br>
		</br>
		<br>
		<div style="display : flex; align-items : center; justify-content : center; height : auto; width : 100%;">
			<div>
				<img style="margin-left : 5%; border-radius: 20%; padding: 10px;"  width="350" height="300" src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg">
			</div>
			<div style="margin-right: 5%; margin-left : 5%">
				<p class="card-text" style="font-family: Arial, Helvetica, sans-serif;"> </br> <b> Lokacija : </b> {{apartment.location.adress.street}} {{apartment.location.adress.numberOfStreet}}, {{apartment.location.adress.city}} {{apartment.location.adress.postNumber}} </br>		 	
	    			<b> Geografska sirina i duzina : </b> {{apartment.location.latitude}} {{apartment.location.longitude}} </br>
	    			<b> Cena po noci : </b> {{apartment.pricePerNight}}
	    		</p>
	    		<!--Opis apartmana-->
	    		<p 	style="word-wrap: break-word;"> "AAAAAAAAAAA AaaaaAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAA AAAAAAAAAAAAAA a    aaaaaa aaaaa aaaaa aaaaa aaaa"</p>
			</div>
		</div>
		
		<!--<p> Domacin smestaja : {{apartment.host.name}} {{apartment.host.surname}} </p>-->
		<br>
		
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
		  		<div class="comments-list">
		  			<div class="media">
		  				 <p class="float-right" >Ocena : 4.5 </p>
		  				<div class="media-body"> 
		  				<h4 class="media-heading user_name" style="font-size: 15px">Jovan Jelicki</h4>
		  					Na adicama nema more ovo je laz!
		  				</div>
		  			</div>
		  			<hr>
		  			<div class="media">
		  				<div class="media-body"> 
		  				<h4 class="media-heading user_name" style="font-size: 15px">Jovan Jelicki</h4>
		  					Dobio sam batine na adicama!
		  				</div>
		  			</div>
		  			<hr>
		  			<div class="media">
		  				<div class="media-body">
							<h4 class="media-heading user_name" style="font-size: 15px">Jovan Jelicki</h4>
		  					Kakva prevara..
		  				</div>
		  			</div>
		  		</div>
		  	<hr>
		  	<button id="buttonComment" v-on:click="commentForm()"> Ostavi komentar </button>
			<div class="form-group" v-bind:style="{display : comForm}">
				<textarea class="form-control" rows="5" cols="30" placeholder="Ostavite komentar..." id="comment"></textarea>
				<br>
				<button v-on:click="leaveComment()"> Prosledi komentar </button>
			</div>
		</div>

	
	</div>
	
	`,
	methods : {
		backToSearch : function () {
			location.replace('#/');
		},
		commentForm : function() {
			this.comForm = "inline";
			buttonComment.style.display = "none";
		},
		leaveComment : function () {
			this.comForm = "none";
			buttonComment.style.display = "inline";
		},
		editApartment: function(){
			location.replace('#/ea');

		},
		
	}

})