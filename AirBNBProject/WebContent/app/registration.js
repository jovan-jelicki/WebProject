var userJS = new Vue ({
    el :  '#registrationModal',
    data : {
        user : {
        	gender : "Muski",
        	surname : "",
        	username : "",
        	password : "",
        	name : ""
        },
        header : "Registracija",
        message : "",
        disabled : "yes"
    },
    methods : {
        register: function(){    
            var registeredUser = JSON.parse(localStorage.getItem("user"));
            if(registeredUser == undefined || registeredUser == null || registeredUser == ""){
            axios
                .post('rest/guestRegistration/save', this.user)
                .then(response => {
                       alert('Uspesno ste registrovali korisnika ' + this.user.name + ' ' + this.user.surname);
                       $('#registrationModal').modal('hide');
                })
                .catch(error => {
                	event.preventDefault();
                	this.message = "Korisnicko ime je zauzeto!";
                	pUsername.style.display = "inline";
                });
            }else if(registeredUser.role == "Admin") {
                axios
                .post('rest/guestRegistration/save-host', this.user , { headers : {
                	Authorization : 'Bearer ' + localStorage.getItem("token")
                }
                })
                .then(response => {
                     alert('Uspesno ste registrovali korisnika ' + this.user.name + ' ' + this.user.surname);
                     $('#registrationModal').modal('hide');
                })
                .catch(error => {
                	event.preventDefault();
                	this.message = "Korisnicko ime je zauzeto!";
                	pUsername.style.display = "inline";
                });
            }
        },
        validation : function(){
        	if(this.user.name == undefined || this.user.name == "" || this.user.name.length == undefined){
        		this.disabled = "yes";
        		pName.style.display = "inline";
        	}else{
        		pName.style.display = "none";
        	}
        	if(this.user.surname == undefined || this.user.surname == "" || this.user.surname.length == undefined){
        		this.disabled = "yes";
        		pSurname.style.display = "inline";
        	}else {
        		pSurname.style.display = "none";
        	} 		
        	if(this.user.username == undefined || this.user.username == "" || this.user.username.length == undefined){
        		this.disabled = "yes";
        		pUsername.style.display = "inline"
        	}else {
        		pUsername.style.display = "none";
        	}
        	if(this.user.password == undefined || this.user.password == "" || this.user.password.length == undefined){
        		this.disabled = "yes";
        		pPassword.style.display = "inline";
        	}else {
        		pPassword.style.display = "none";
        	}
        	if (this.user.name.length >  0   &&
                this.user.surname.length  >  0   &&
                this.user.username.length  >  0   &&
                this.user.password.length  >  0   &&
                this.user.password == this.$refs.ConfirmPassword.value) {
        		pConfirm.style.display = "none";
                this.disabled = "no";
        	}else {
        		pConfirm.style.display = "inline";
        		this.disabled = "yes";
        	};
    }
    }
        

});