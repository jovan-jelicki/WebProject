const search = {template : '<search></search>'}
const userSettings = {template : '<user-settings></user-settings>'}
const showUsers = {template : '<show-users></show-users>'}
const newApartment={template: '<new-apartment></new-apartment>'}
const editAmenity={template:'<edit-amenity></edit-amenity>'}
const apartmentDetails = {template: '<apartment-details></apartment-details>'}
const editApartment = {template: '<edit-apartment></edit-apartment>'}
const viewApartments={template: '<view-apartment></view-apartment>'}

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
            {path:'/va', component : viewApartments}

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
                 {this.user = response.data;
                    if(this.user == undefined || this.user == null || this.user === "") {
                        console.log(this.user);    
                        event.preventDefault();
                        this.message="Molimo ponovite unos.";
                     }else{ 
                        console.log(this.user);
                        localStorage.setItem("user", JSON.stringify(this.user));
                        $('#modalLogIn').modal('hide');
                       // console.log(this.user.role);
                        this.message="";
                        this.isAuthorizedPar = true;
                        if(this.user.role != "Guest"){
                        	 location.replace('#/us');
                        }
                     } 
                }
                 );

        	
        },
        
        logOut : function(){
            localStorage.removeItem("user");
            location.replace('#/');
            location.reload();
        }

    }
    
});