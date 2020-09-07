Vue.component('search', {
    data : function() {
        return {
            message : "",
            apartements : !!localStorage.getItem("apartments") ? JSON.parse(localStorage.getItem("apartments")) : {},
            data : {},
            disp : "none",
            disp1 : "inline"
        }
    },
    mounted() {
    	if(this.apartements.length != 0){
    		this.disp = "inline";
    		this.disp1 = "none";
    	}
    },
    
    
    template: 
`
<div>
    <div id="br" v-bind:style="{display : disp1}">
    	</br>
    	</br>
    	</br>
    </div>
    
    <h2 class="naslov"> Dobrodošli na AIRBNB!</h2>
    <div class="naslov" >
        <input type="text" id="city" name="location"  placeholder="Unesite grad ili državu">
        <input type="date" id="startDate" name="search1" v-model="data.startDate" v-on:change="startDateSelected()" placeholder="Odaberite datum">
        <input type="date" id="endDate" name="search2" ref="endDate" v-model="data.endDate"  placeholder="Odaberite datum" disabled>
        <input type='number' min="0" id="guests" v-model="data.guests" name="search3" placeholder="Broj gostiju">
        <input type="number" min="0" id="price1" name="search4" ref="min" v-model="data.minPrice" v-on:change="setMin()" placeholder="Minimalna cena po noci">
        <input type="number" min="0" id="price2" name="search5" ref="max" v-model="data.maxPrice" v-on:change="setMax()" placeholder="Maksimalna cena po noci" >
        <input type="number" min="0" id="rooms" v-model="data.rooms" name="search6" placeholder="Broj soba">
        <button class="btn btn-primary" id="search7" v-on:click="search()"> Pretraži </button>
    </div>
    
	
	<div name="apartment"  v-bind:style="{display : disp}"  class="row" >
    	<div class="filter-div">
    		<div style="display : flex; white-space: nowrap;">
    			<p style="margin-top: 5% ; margin-right : 3%"> <b> Sortiraj po ceni </b> </p>
    			<button  class="btn btn-primary"> 
    				<!--img width="50px" height="40px" src="https://img.favpng.com/0/11/14/computer-icons-sorting-algorithm-download-font-awesome-png-favpng-TgpcVDhbLgfA4TBAHKXU21VH6.jpg" /-->
    				Proba
    			</button>
    		</div>
    		<div>
    			<select  class="browser-default custom-select" id="type">
    				<option selected>Odaberite tip apartmana</option>
    				<option value="Apartman" > Apartman </option>
    				<option value="Hotel" > Hotel </option>
    			</select>
    		</div>
    		<div class="dropdown">
    			<button  class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				Izaberite dodatke
    			</button>
    		</div>
    	</div>
    	
    	</br>
			<div  v-for="a in apartements" style="margin-left : 7%" class="column" >
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
	startDateSelected : function() {
		console.log(this.data.startDate);
		this.$refs.endDate.min = this.data.startDate;
		this.$refs.endDate.disabled = false;
	},
	setMin : function(){
		console.log(this.data.minPrice);
		this.$refs.max.min = this.data.minPrice;
	},
	setMax : function() {
		this.$refs.min.max = this.data.maxPrice;
	},
	search : function() {
		this.data.location = city.value;
		axios
		.post("rest/apartmentService/searchApartments", this.data)
		.then(response => {
			this.apartements = response.data;
			localStorage.setItem("apartments",  JSON.stringify(this.apartements));
			if(this.apartements.length != 0){
				console.log(this.apartements);
				this.disp = "inline";
				this.disp1 = "none";
			}else {
				localStorage.removeItem("apartments");
				this.disp = "none";
				this.disp1 = "inline";
			}
			})
	},
	sendData : function(apartment) {
		localStorage.setItem("apartment",  JSON.stringify(apartment));
		location.replace('#/ad');
	}
    
}

})