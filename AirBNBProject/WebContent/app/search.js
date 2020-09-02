Vue.component('search', {
    data : function() {
        return {
            message : "",
            apartements : {},
            data : {},
        }
    },
    
    
    template: 
`
<div>
    <div id="br" style="display : inline">
    	</br>
    	</br>
    	</br>
    </div>
    
    <h2 class="naslov"> Dobrodošli na AIRBNB!</h2>
    <form class="naslov" >
        <input type="text" id="city" name="location"  placeholder="Unesite grad ili državu">
        <input type="date" id="startDate" name="search1" v-model="data.startDate" v-on:change="startDateSelected()" placeholder="Odaberite datum">
        <input type="date" id="endDate" name="search2" ref="endDate" v-model="data.endDate"  placeholder="Odaberite datum" disabled>
        <input type='number' min="0" id="guests" v-model="data.guests" name="search3" placeholder="Broj gostiju">
        <input type="number" min="0" id="price1" name="search4" ref="min" v-model="data.minPrice" v-on:change="setMin()" placeholder="Minimalna cena po noci">
        <input type="number" min="0" id="price2" name="search5" ref="max" v-model="data.maxPrice" v-on:change="setMax()" placeholder="Maksimalna cena po noci" >
        <input type="number" min="0" id="rooms" v-model="data.rooms" name="search6" placeholder="Broj soba">
        <input type="submit" id="search7" value="Pretraži" v-on:click="search()">
    </form>
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
		.then(response => {this.apartements = response.data})
	}
    
}

})