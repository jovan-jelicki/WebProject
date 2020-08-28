Vue.component('show-users', {
    data: function(){
        return {
            users : {},
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    mounted() {
        axios
        .get('rest/userService/getUsers')
        .then(response =>
             {this.users = response.data}
        );
    },
    template : 
    `
    </br>
    </br>
    <div>
    <table class="table">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ime</th>
      <th scope="col">Prezime</th>
      <th scope="col">Username</th>
      <th scope="col" v-if="user.role == 'Admin'">Pol</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="u in users" scope="row">
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
    `

})