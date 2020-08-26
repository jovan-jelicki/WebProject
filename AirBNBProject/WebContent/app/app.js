const search={template:'<search></search>'}

const router=new VueRouter({
        mode:'hash',
        routes: [ {path:'/', component: Search} ]
});
 
var logInJs = new Vue ({
	router,
    el : '#authorized',
    data : {
        isAuthorized : false,
        user : {},
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
    		 	 event.preventDefault();
    	            $('#modalLogIn').modal('hide');
    	            this.isAuthorized = true;
    	            this.message="";
    		 }
        },
        
        logOut : function(){
            location.reload();
        }

    }

});