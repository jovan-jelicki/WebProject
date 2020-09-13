Vue.component('user-settings', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            backup:[],
            oldPass:"",
            newPass:"", 
            newPass1:""
        }
    },
    mounted() {
    	if(this.user.username == undefined)
    		history.back();
    },
    template : 
`
<div class="container bootstrap snippets bootdey">
    <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Korisnički nalog</h1>
      <hr>
      
      <div class="col-md-9 personal-info">
        <div  id="firstAlert" class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i  class="fa fa-coffee"></i>
          Izmena lozinke i korisnickog naloga su moguci na dugme "Izmeni nalog"!
        </div>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Ime:</label>
            <div class="col-lg-8">
              <input class="form-control" id="name" type="text" v-model="user.name" disabled>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Prezime:</label>
            <div class="col-lg-8">
              <input class="form-control" id="surname" type="text" v-model="user.surname" disabled>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Pol:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="gender" class="form-control" v-model="user.gender" disabled>
                  <option > Muski</option>
                  <option >Zenski</option>
                  <option >Drugo</option>
                  </select>
              </div>
            </div>
            <br>
            <div id="success" class="alert alert-success" role="alert" style = "display: none" > Informacije su uspesno promenjene!</div>
            <div id="infoErr" class="alert alert-success" role="alert" style = "display: none" > Molimo ponovite unos. Uneti podaci nisu validni!</div>

    		<br>
            <button id="potvrdi" type="button" class="btn  btn-primary" style = "display: none" v-on:click="edit"  >Potvrdi izmene</button>
    		<button id="otkazi" type="button" class="btn  btn-secondary" style = "display: none" v-on:click="cancel" >Ponisti izmene</button>  
    		<br>
    		<br>
    		<br>
            <div class="form-group" id="pass" style = "display: none">
            	<label class="col-lg-9 control-label">Trenutna lozinka</label>
            	<div class="col-lg-8">
               		<input id="pas1" type="password" v-model="oldPass" class="form-control" placeholder="Unesite trenutnu lozinku" disabled> 
            	</div>
                       
            	<label class="col-lg-9 control-label">Nova lozinka:</label>
           		<div class="col-lg-8">
    				<input id="pas2" type="password"  v-model="newPass"  class="form-control" placeholder="Unesite novu lozinku" disabled> 
           		</div>
            
            	<label class="col-lg-9 control-label">Potvrda nove lozinke:</label>
           		<div class="col-lg-8">
               		<input id="pas3" type="password"  v-model="newPass1" class="form-control" placeholder="Unesite novu lozinku" disabled> 
                </div>
            </div>
            <div id="oldAlert" class="alert alert-dark" role="alert"  style = "display: none" >Molimo pokusajte ponovo. Neophodno je uneti tacnu trenutnu lozinku!</div>
            
            <div id="newAlert" class="alert alert-dark" role="alert"  style = "display: none" >Morate uneti i potvrditi novu lozinku. Unosti moraju da se poklapaju!</div>
    		
    		<div id="successPass" class="alert alert-success" role="alert" style = "display: none" > Lozinka je uspesno promenjena!</div>
            <br>
            <button id="editButton" type="button" class="btn btn-primary"  v-on:click="dissapearButton()">Izmena naloga</button>
    		 <button id="potvrdiPas" type="button" class="btn  btn-primary" style = "display: none" v-on:click="editPas"  >Potvrdi izmenu lozinke</button>
    		<button id="otkaziPas" type="button" class="btn  btn-secondary" style = "display: none" v-on:click="cancel" >Otkazi izmenu lozinke</button>  
          </div>
        </form>
      </div>
  </div>
</div>

`,
methods:{
	dissapearButton: function(){
		firstAlert.style.display="none";
	   	editButton.style.display="none";
	   	potvrdi.style.display="inline";
	   	otkazi.style.display="inline";
	   	potvrdiPas.style.display="inline";
	   	otkaziPas.style.display="inline";
	   	pass.style.display="inline";
	   	

	    document.getElementById('name').disabled = false;
	    document.getElementById('surname').disabled = false;
	    document.getElementById('gender').disabled = false;
	    document.getElementById('pas1').disabled = false;
	    document.getElementById('pas2').disabled = false;
	    document.getElementById('pas3').disabled = false;
		this.backup = [this.user.username, this.user.name, this.user.surname, this.user.gender, this.user.password];

	},
	
	edit:   function() {
		if(this.user.name=="" || this.user.surname=="" ){
			infoErr.style.display="inline";
		}else{
			infoErr.style.display="none";
			success.style.display="inline";
			potvrdi.style.display="none";
			otkazi.style.display="none";
		}
        axios
		.post('rest/userService/edit', this.user, { headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
        }
		})
        .then((response) => this.user=response.data );
	}, 
	cancel: function(){
		this.user.username= this.backup[0];
		this.user.name= this.backup[1];
		this.user.surname= this.backup[2];
		this.user.gender =this.backup[3];
	    this.user.password=this.backup[4];
		window.location.href = "#/us";
	},
	
	editPas: function(){
		if(this.oldPass != this.backup[4] || this.oldPass==""){
		   	oldAlert.style.display="inline";
		   	newAlert.style.display="none";
		}else if(this.newPass=="" || this.newPass1=="" || this.newPass!=this.newPass1){
		   	oldAlert.style.display="none";
			newAlert.style.display="inline";
		}else{
			oldAlert.style.display="none";
			newAlert.style.display="none";
			successPass.style.display="inline";
			potvrdiPas.style.display="none";
		   	otkaziPas.style.display="none";
			this.user.password=this.newPass;
			
			  axios
				.post('rest/userService/edit', this.user, { headers : {
		        	Authorization : 'Bearer ' + localStorage.getItem("token")
		        }
				})
		        .then((response) => this.user=response.data );
		}
		
	}
}

})