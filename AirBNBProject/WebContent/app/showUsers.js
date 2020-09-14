Vue.component('show-users', {
    data: function(){
        return {
            users : {},
            searchUsers : {},
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            text : ""
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
    </tr>
  </thead>
  <tbody>
     <tr v-for="u in searchUsers" scope="row">
        <td>#</td>
        <td>{{u.name}}</td>
        <td>{{u.surname}}</td>
        <td>{{u.username}}</td>
        <td>{{u.gender}}</td>
        <td v-if="user.role == 'Admin'">{{u.role}}</td>
    </tr>
  </tbody>
</table>

    </div>
    `,
    methods : {
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