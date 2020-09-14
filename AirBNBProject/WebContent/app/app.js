const search = {template : '<search></search>'}
const userSettings = {template : '<user-settings></user-settings>'}
const showUsers = {template : '<show-users></show-users>'}
const newApartment={template: '<new-apartment></new-apartment>'}
const editAmenity={template:'<edit-amenity></edit-amenity>'}
const apartmentDetails = {template: '<apartment-details></apartment-details>'}
const editApartment = {template: '<edit-apartment></edit-apartment>'}
const viewApartments={template: '<view-apartment></view-apartment>'}
const viewReservations = {template: '<view-reservations></view-reservations>'}

const router = new VueRouter({
        mode:'hash',
        routes: [ 
            {path:'/', component: search},
            {path:'/us', component : userSettings},
            {path:'/su', component : showUsers},
            {path:'/na', component: newApartment},
            {path:'/sa', component: editAmenity},
            {path:'/ad', component : apartmentDetails},
            {path:'/ea', component : editApartment},
            {path:'/va', component : viewApartments},
            {path:'/vr', component : viewReservations}

        ]
});
 
var logInJs = new Vue ({
	router,
    el : '#authorized',
    data : {
        user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
        parameters : {},
        message:"",
        isAuthorizedPar : !!localStorage.getItem("user") ? true :  false
    },
    mounted()  {
    	 var input = document.getElementById('city');
    	  new google.maps.places.Autocomplete(input);
    },

    methods : {
        logIn :  function(event) {
             axios
        		.post('rest/userService/logIn', this.parameters)
                .then((response) => 
                 {this.user = response.data.user;
                    if(this.user == undefined || this.user == null || this.user === "") {
                        console.log(this.user);    
                        event.preventDefault();
                        this.message="Molimo ponovite unos.";
                     }else{ 
                        console.log(this.user);
                        localStorage.setItem("user", JSON.stringify(this.user));
                        localStorage.setItem("token", response.data.authorizedToken);
                        localStorage.setItem("refreshToken", response.data.refreshToken);
                        $('#modalLogIn').modal('hide');
                       // console.log(this.user.role);
                        this.message="";
                        this.isAuthorizedPar = true;
                        location.reload();
                        if(this.user.role != "Guest"){
                        	 location.replace('#/va');
                        }
                        location.reload();
                     } 
                 }
                 )
                 .catch(error => {
                	 this.message = "Netacna lozinka ili korisnicko ime!"
                 });

        	
        },
        
        logOut : function(){
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            location.replace('#/');
            location.reload();
        }

    }
    
});