Vue.component('edit-amenity', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            amenity:{},
            amenities:{},
            selected: {},
        }
    },
    mounted() {
        axios
        .get('rest/amenityService/getAmenities')
        .then(response =>
             {this.amenities = response.data}
        );
    },

    
    template : 
    `  
    <div class="container bootstrap snippets bootdey">
     <div class="col-md-9 personal-info">
             <br>

        <div  id="firstAlert" class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          
          <i  class="fa fa-coffee"></i>
          
          Unesite novi sasdrzaj ili zaberite sadrzaj, a zatim i akciju koju zelite da izvrsite!
        </div>
    	</div>
     <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span> Dodvanje novog sadrzaja apartmana</h1>
    	<hr>
     <div class="col-md-12 personal-info">

      <div class="form-group">    		
          	<div class="form-group">
            <label class="col-lg-3 control-label">Unesite naziv:</label>
            <div class="col-lg-8">
              <input class="form-control" id="amenityName" type="text" v-model="amenity.name">
            </div>
          	</div>	
    	
      </div>
      <div id="infoErr" class="alert alert-success" role="alert" style = "display: none" > Molimo ponovite unos. Uneti podaci nisu validni!</div>
      <div id="infoSuccess" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste uneli novi sadrzaj!</div>
    	
      <button id="potvrdi" type="button" class="btn  btn-primary"  v-on:click="addNewAmenity"  >Potvrdi</button>
    	<br>
    	<br>
	  <div class="form-group">
     <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span> Izmena sadrzaja apartmana</h1>
         
    	
    	<select id="selected" v-model="selected">   		
        	<option v-for="a in amenities" v-if="a.deleted == false" :value="a" >
	        	  {{a.name}}
        	</option>
       	</select>
       	
       	  <div class="form-group row">
            <label class="col-lg-3 control-label"  id="labelEditName" style = "display: none" >Izmenite naziv:</label>
            <div class="col-lg-5">
              <input class="form-control" style = "display: none" id="editName" type="text" v-model="selected.name">
            </div>
          	</div>	
       	        	    	
        	<br>
            <div id="infoSuccessEdit" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste izvrsili izmenu!!</div>
            <div id="infoSuccessDelete" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste obrisali sadrzaj!!</div>

        	<br>
         	<button id="editButton" type="button" class="btn btn-primary"  v-on:click="disappear">Izmeni</button>
         	<button id="deleteButton" type="button" class="btn btn-primary"  v-on:click="deleteAmenity">Obrisi </button> 
         	<br>
            <button id="editAccButton" type="button" class="btn btn-primary"  v-on:click="editAmenity" style = "display: none">Potvrdi izmene</button>
            <button id="cancelButton" type="button" class="btn btn-primary"  v-on:click="cancelEdit" style = "display: none">Povratak</button>

	  </div>
	</div>
	</div>
	
    `,
    
   	methods:{
   		addNewAmenity:  function(){
			if(this.amenity.name==null){
   				infoErr.style.display="inline";
   			}else{
   				infoErr.style.display="none";
   				axios
   	   			.post('rest/amenityService/save', this.amenity)
   	   	        .then((response) => {
   	   	        	
   	   	        	this.amenity=response.data;
   	   	        	if(this.amenity==""){
   	    				infoErr.style.display="inline";
   	    				infoSuccess.style.display="none";
   	   	        	}else{
   	    				infoErr.style.display="none";
   	    				infoSuccess.style.display="inline";
   	    				location.reload();
   	   	        	}
   	   	        });
   	   	        }
   		},
   		
   		disappear: function(){
   			labelEditName.style.display="inline";
  			editName.style.display="inline";
  			deleteButton.style.display="none";
  			editButton.style.display="none";
  			selected.style.display="none";
  			editAccButton.style.display="inline";
  			firstAlert.style.display="none";
  			cancelButton.style.display="inline";
   		},
   		cancelEdit: function(){
   			labelEditName.style.display="none";
  			editName.style.display="none";
  			deleteButton.style.display="inline";
  			editButton.style.display="inline";
  			selected.style.display="inline";
  			editAccButton.style.display="none";
  			cancelButton.style.display="none";
  			infoSuccessEdit.style.display="none";

   		},
  
  		editAmenity: function(){
  			editAccButton.style.display="none";
  			infoSuccessEdit.style.display="inline";
  			axios
	   			.post('rest/amenityService/edit',this.selected)
	   	        .then((response) => {console.log(response);}
	   	        );
  		},
  		deleteAmenity: function(){
  			infoSuccessDelete.style.display="inline";
  		axios
   			.post('rest/amenityService/delete',this.selected)
   	        .then((response) => { console.log(response);}
   	        );
  		}
  }
})