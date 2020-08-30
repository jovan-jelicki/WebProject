const search = {template : '<search></search>'}
const userSettings = {template : '<user-settings></user-settings>'}
const showUsers = {template : '<show-users></show-users>'}

const router = new VueRouter({
        mode:'hash',
        routes: [ 
            {path:'/', component: search},
            {path:'/us', component : userSettings},
            {path:'/su', component : showUsers}
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
                        this.isAuthorized();
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
        },

        isAuthorized : function(){
            console.log("aaaaaaa" +localStorage.getItem("user"));
            return !!localStorage.getItem("user") ? this.isAuthorizedPar = true :  this.isAuthorizedPar = false;
        }

    }
    
});