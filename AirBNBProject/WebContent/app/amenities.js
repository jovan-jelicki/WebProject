Vue.component('edit-amenity', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            name: "",
            newAmenity:{},
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
     <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span> Dodavanje novog sadrzaja apartmana</h1>
    	<hr>
     <div class="col-md-12 personal-info">

      <div class="form-group">    		
          	<div class="form-group">
            <label id="amnamelbl" class="col-lg-3 control-label">Unesite naziv:</label>
            <div class="col-lg-8">
              <input id="amname"class="form-control" type="text" v-model="newAmenity.name">
            </div>
          	</div>	
    	
      </div>
      <div id="infoErr" class="alert alert-warning"role="alert" style = "display: none" > Molimo ponovite unos. Uneti podaci nisu validni!</div>
      <div id="infoSuccess" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste uneli novi sadrzaj!</div>
    	
      <button id="potvrdi" type="button" class="btn  btn-primary"  v-on:click="addNewAmenity()"  >Potvrdi</button>
      <button id="ponovi" type="button" class="btn btn-outline-primary"  v-on:click="reloadInfo()" style = "display: none" >Unesi novi</button>

    	<br>
    	<br>
	 <div class="form-group">
       <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span> Izmena sadrzaja apartmana</h1>
    	<select id="dropDown" v-model="selected">   		
        	<option ref="options" v-for="a in amenities" v-if="a.deleted == false" :value="a" >
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
        <div id="cantEdit" class="alert alert-warning"role="alert" style = "display: none" >Morate da izaberte neki sadrzaj pre njegove izmene.</div>
        <div id="infoSuccessDelete" class="alert alert-success" role="alert" style = "display: none" >Uspesno ste obrisali sadrzaj!!</div>

       	<br>
      	<button id="editButton" type="button" class="btn btn-primary"  v-on:click="disappear">Izmeni</button>
       	<button id="deleteButton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteModal" >Obrisi </button> 
      	<br>
    
        <button id="editAccButton" type="button" class="btn btn-primary"  v-on:click="editAmenity()" style = "display: none">Potvrdi izmene</button>
        <button id="cancelButton" type="button" class="btn btn-primary"  v-on:click="finishEdit()" style = "display: none">Povratak</button>

			<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body" v-if="selected.name==undefined">
			          Morate da izaberete sadrzaj pre brisanja.
			      </div>
			       <div class="modal-body" v-else>
			        Da li ste sigurni da zelite da obrisete sadrzaj: {{selected.name}}
			      </div>
			      
			      <div class="modal-footer" v-if="selected.name!=undefined" >
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Otkazi</button>
			        <button type="button" class="btn btn-primary" v-on:click="deleteAmenity()">Potvrdi brisanje</button>
			      </div>
			      <div class="modal-footer" v-else >
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
			      </div>
			    </div>
			  </div>
			</div>
				</div>




	  </div>
	</div>
	</div>
	
    `, 
    
   	methods:{
   		addNewAmenity:  function(){
			if(this.name==null){
   				infoErr.style.display="inline";
   			}else{
   				infoErr.style.display="none";
   				axios
   	   			.post('rest/amenityService/save',this.newAmenity, { headers : {
   	         	Authorization : 'Bearer ' + localStorage.getItem("token")
   	         }
   	         })
   	   	        .then((response) => {
   	   	        	
   	   	        	this.amenity=response.data;
   	   	        	if(this.amenity==""){
   	    				infoErr.style.display="inline";
   	    				infoSuccess.style.display="none";
   	   	        	}else{
   	    				infoErr.style.display="none";
   	    				infoSuccess.style.display="inline";
   	     	            document.getElementById('amname').disabled = true;
   	     	            amnamelbl.style.display="none";
   	     	            potvrdi.style.display="none";
   	     	            ponovi.style.display="inline";
   	   	        	}
   	   	        });
   	   	        }
   		},
   		
   		disappear: function(){
   			if(this.selected.name=="" || this.selected.name==undefined || this.selected.name==null){
   				cantEdit.style.display="inline";
   			}else{
   	   			cantEdit.style.display="none";

   			labelEditName.style.display="inline";
  			editName.style.display="inline";
  			deleteButton.style.display="none";
  			editButton.style.display="none";
  			dropDown.style.display="none";
  			editAccButton.style.display="inline";
  			firstAlert.style.display="none";
  			cancelButton.style.display="inline";
   			}
   		},
   		finishEdit: function(){
   			cantEdit.style.display="none";
   			labelEditName.style.display="none";
  			editName.style.display="none";
  			deleteButton.style.display="inline";
  			editButton.style.display="inline";
  			dropDown.style.display="inline";
  			editAccButton.style.display="none";
  			cancelButton.style.display="none";
  			infoSuccessEdit.style.display="none";

   		},
  
  		editAmenity: function(){
  			
  			editAccButton.style.display="none";
  			infoSuccessEdit.style.display="inline";
  			axios
	   			.post('rest/amenityService/edit',this.selected, { headers : {
	   	        	Authorization : 'Bearer ' + localStorage.getItem("token")
	   	        }
	   			})
	   	        .then((response) => {console.log(response);}
	   	        );
  		},
  		deleteAmenity: function(){
  		
  		axios
   			.post('rest/amenityService/delete',this.selected, { headers : {
   	        	Authorization : 'Bearer ' + localStorage.getItem("token")
   	        }
   			})
   	        .then((response) => { 
   	    	 $('#deleteModal').modal('hide');
   	    	
   	        	console.log(response);
   	        	}
   	        );
  		},
  		reloadInfo: function(){
  			    document.getElementById('amname').disabled = false;
  			    document.getElementById('amname').value = "";
  			    infoSuccess.style.display="none";
	            amnamelbl.style.display="inline";
	            potvrdi.style.display="inline";
	            ponovi.style.display="none";
  		}
  }
})