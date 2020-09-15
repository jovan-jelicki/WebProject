Vue.component('view-apartment', {
    data : function() {
        return {
            message : "",
            apartements : {},
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            disp : !!localStorage.getItem("apartments") ? "inline" : "none",
            disp1 : "inline",
            sort : "desc",
            amenities : {},
            selectedAmenities : [],
            typeOf : "All", 

        }
    },
    mounted() {
    	axios
		.get("rest/apartmentService/getApartments",{ headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
        }
		})
		.then(response => {
			this.apartements = response.data;
			this.disp = "inline";
		})
		.catch(error => {
			console.log(error);
			history.back();
		})
    },
    
    
    template: 
`
<div>
   <br>
	<div name="apartment"  v-bind:style="{display : disp}"  class="row" >
    	<div class="filter-div">
    		<div style="display : flex; white-space: nowrap;">
    			<p style="margin-top: 5% ; margin-right : 3%"> <b> Sortiraj po ceni </b> </p>
    			<button v-on:click="sortCall()"  class="btn btn-primary"> 
    				<!--img width="50px" height="40px" src="https://img.favpng.com/0/11/14/computer-icons-sorting-algorithm-download-font-awesome-png-favpng-TgpcVDhbLgfA4TBAHKXU21VH6.jpg" /-->
    				Sortiraj
    			</button>
    		</div>
    		<div>
    			<select @change="showType()" class="browser-default custom-select" id="type" v-model="typeOf">
    				<option value="All">Prikazi sve</option>
    				<option value="Apartment" > Apartman </option>
    				<option value="Room" > Soba </option>
    			</select>
    		</div>
    	</div>
    	</div>
    	
    	</br>
			<div  v-for="a in this.apartements" style="margin-left : 7%" class="column" >
    			<div class="card"  v-on:click="sendData(a)" style="width: 18rem;" >
    				<img  class="card-img-right" src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg" alt="Card image cap">
    				<h5 class="card-header">{{a.name}}</h5>
    				<div class="card-body">
	    				 <p class="card-text" > Lokacija : {{a.location.adress.street}} {{a.location.adress.numberOfStreet}}, {{a.location.adress.city}} {{a.location.adress.postNumber}} </br>		 	
	    				 Geografska sirina i duzina : {{a.location.latitude}} {{a.location.longitude}} </br>
	    				 Cena po noci : {{a.pricePerNight}}
	    				 </p>
	    			</div>
    			</div>
			</div>
	</div>
	
</div>
`,
methods : {
	sendData : function(apartment) {
		localStorage.setItem("apartment",  JSON.stringify(apartment));
		location.replace('#/ad');
	},
	
	sortCall : function(){
		if(this.sort == "desc"){
			this.apartements.sort((a,b) => (a.pricePerNight > b.pricePerNight) ? -1 : 1);
			this.sort = "asc";
		}else{ 
			this.apartements.sort((a,b) => (a.pricePerNight > b.pricePerNight) ? 1 : -1);
			this.sort = "desc";
		}
	},
	
	showType : function() {
		if(this.typeOf == "Apartment"){
			this.apartements = !!localStorage.getItem("apartments") ? JSON.parse(localStorage.getItem("apartments")) : {};
			this.apartements = this.apartements.filter(obj => {return obj.type == "Apartment"});
		}else if(this.typeOf == "Room"){
			this.apartements = !!localStorage.getItem("apartments") ? JSON.parse(localStorage.getItem("apartments")) : {};
			this.apartements = this.apartements.filter(obj => {return obj.type == "Room"});
		}else {
			this.apartements = !!localStorage.getItem("apartments") ? JSON.parse(localStorage.getItem("apartments")) : {};
		}
		
	}
    
}

})