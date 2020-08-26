const search = {template : '<search></search>'}

const router = new VueRouter({
        mode:'hash',
        routes: [ 
            {path:'/', component: search}
        ]
});
 
var logInJs = new Vue ({
	router,
    el : '#authorized',
    data : {
        user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
		message:""
    },
    methods : {
        logIn : function(data,event) {
        	axios
        		.post('rest/userService/logIn', this.user)
        		.then(response => this.user=response.data);
        	if(this.user == undefined || this.user== null) {
   		 	    event.preventDefault();
    			this.message="Molimo ponovite unos.";
    	     }else{ 
                 localStorage.setItem("user", JSON.stringify(this.user));
    		 	 event.preventDefault();
    	            $('#modalLogIn').modal('hide');
    	            this.message="";
    		 }
        },
        
        logOut : function(){
            localStorage.removeItem("user");
            location.reload();
        },

        isAuthorized : function(){
            //console.log("aaaaaaa" +localStorage.getItem("user"));
            return !!localStorage.getItem("user");
        }

    }

});