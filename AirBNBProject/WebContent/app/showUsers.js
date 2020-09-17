Vue.component('show-users', {
    data: function(){
        return {
            users : {},
            searchUsers : {},
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            text : "",
            userForBlock : {}
        }
    },
    mounted() {
        axios
        .get('rest/userService/getUsers',	{ headers : {
        	Authorization : 'Bearer ' + localStorage.getItem("token")
        }
        })
        .then(response =>
             {this.users = response.data;
             this.searchUsers = response.data}
        ).catch(error => {
        	history.back();
        }
        );
    },
    template : 
    `
    
    <div>
    
    <br>
    <br>
    
    <input type="text" v-model="text">
    <button type="button" class="btn btn-primary" v-on:click="search" > Pretrazi </button>
    
    <table class="table">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ime</th>
      <th scope="col">Prezime</th>
      <th scope="col">Username</th>
      <th scope="col">Pol</th>
      <th scope="col" v-if="user.role == 'Admin'">Uloga</th>
      <th scope="col" v-if="user.role == 'Admin'" > </th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="u in searchUsers" scope="row" v-bind:style="u.blocked ? 'background-color : gray; opacity : 0.6' : 'background-color : white'" >
        <td>#</td>
        <td>{{u.name}}</td>
        <td>{{u.surname}}</td>
        <td>{{u.username}}</td>
        <td>{{u.gender}}</td>
        <td v-if="user.role == 'Admin'">{{u.role}}</td>
        <td v-if="user.role == 'Admin' && !u.blocked && u.role != 'Admin'" > 
        	<button type="button" class="btn btn-primary"  v-on:click="showModal(u)" > Blokiraj </button>
        </td>
    </tr>
  </tbody>
</table>

<div class="modal" id="delete">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Upozorenje</h1>
                    </div>
                    <div class="modal-body">
						<p> Da li ste sigurni da zelite da obrisete korisnika? </p>
						<hr>
						<button class="btn btn-primary" v-on:click="block()"> Potvrda </button>					
						<button class="btn btn-primary" v-on:click="exit()" style="background-color : gray; margin-left : 5%" > Odustanak </button>
					</div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods : {
    	showModal : function(u){
    		this.userForBlock = u;
    		$('#delete').modal('show');
    	},
    	exit : function () {
    		$('#delete').modal('hide');
    	},
    	block : function (){
    		axios
    		.post("rest/userService/blockUser", this.userForBlock, { headers : {
            	Authorization : 'Bearer ' + localStorage.getItem("token")
            }
    		})
    		.then(response => {
    			 axios
    		        .get('rest/userService/getUsers',	{ headers : {
    		        	Authorization : 'Bearer ' + localStorage.getItem("token")
    		        }
    		        })
    		        .then(response =>
    		             {this.users = response.data;
    		             this.searchUsers = response.data}
    		        );
    			console.log("Uspe");
    			$('#delete').modal('hide');
    		})
    		.catch(error => {
    			$('#delete').modal('hide');
    		})
    	},
    	search : function () {
    		if(this.text == '' || this.text == {}){
    			this.searchUsers = this.users;
    		}else {
    			var help = [];
    			for (let u of this.users){
    				if(u.name.toLowerCase().includes(this.text.toLowerCase()) || u.surname.toLowerCase().includes(this.text.toLowerCase()) || 
    					u.username.toLowerCase().includes(this.text.toLowerCase()) || u.gender.toLowerCase().includes(this.text.toLowerCase()) || u.role.toLowerCase().includes(this.text.toLowerCase())){
    					help.push(u);
    				}
    					
    			}
    			if(help != []){
    				this.searchUsers = help;
    			}
    		}
    	}
    }

})