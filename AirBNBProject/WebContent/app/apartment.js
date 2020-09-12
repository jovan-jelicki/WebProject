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
			avgGrade : {}
		}
	},
	mounted() {
		this.avgGrade = getAvgGrade(this.apartment.comments);
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
							<vuejs-datepicker id="date1" :monday-first="true" placeholder="Unesite pocetni datum" format="dd.MM.yyyy"></vuejs-datepicker>
							<vuejs-datepicker id="date2" :monday-first="true" placeholder="Unesite krajnji datum" format="dd.MM.yyyy" disabled></vuejs-datepicker>
						</div>
						<hr>
						<div style="display : flex">
							<p style="margin-top: 3%;"> <b> Broj gostiju: </b> </p>
							<input type="number" onkeydown="return false" style="width: 20%; margin-left: 5%;" />
						</div>
							
						<button class="btn btn-primary"> Pretrazi </button>
					</div>
				</div>
			</div>
		</div>
		
		
		

	
	</div>
	
	`,
	methods : {
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
			.post("rest/apartmentService/edit", this.apartment)
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
		
	},
	components : { vuejsDatepicker }

})