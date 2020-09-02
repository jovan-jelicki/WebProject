Vue.component('search', {
    data : function() {
        return {
            message : "",
            apartements : {},
            startDate : {},
            endDate : {}
        }
    },
    
    
    template: 
`
<div>
</br>
</br>
    <h1 class="naslov"> Dobrodošli na AIRBNB!</h1>
    <form class="naslov" action="http://www.google.com">
        <input type="text" id="city" name="search" placeholder="Unesite grad ili državu">
        <input type="date" id="startDate" name="search" v-model="startDate" v-on:change="startDateSelected()" placeholder="Odaberite datum">
        <input type="date" id="endDate" name="search" ref="endDate" v-model="endDate"  placeholder="Odaberite datum" disabled>
        <input type='number' min="0" id="guests" name="search" placeholder="Broj gostiju">
        <input type="number" min="0" id="price" name="search" placeholder="Cena">
        <input type="number" min="0" id="rooms" name="search" placeholder="Broj soba">
        <input type="submit" id="search" value="Pretraži">
    </form>
</div>
`,
methods : {
	startDateSelected : function() {
		console.log(this.startDate);
		this.$refs.endDate.min = this.startDate;
		this.$refs.endDate.disabled = false;
		
		
	}
}

})