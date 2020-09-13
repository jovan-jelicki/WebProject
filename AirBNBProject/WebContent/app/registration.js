var userJS = new Vue ({
    el :  '#registrationModal',
    data : {
        user : {},
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
                    if(response.data == "Good"){
                        alert('Uspesno ste registrovali korisnika ' + user.name + ' ' + user.surname);
                    }
                });
            }else if(registeredUser.role == "Admin") {
                axios
                .post('rest/guestRegistration/save-host', this.user , { headers : {
                	Authorization : 'Bearer ' + localStorage.getItem("token")
                }
                })
                .then(response => {
                    if(response.data == "Good"){
                        alert('Uspesno ste registrovali korisnika ' + this.user.name + ' ' + this.user.surname);
                        $('#registrationModal').modal('hide');
                    }
                });
            }
        },
        validation : function(){
            if(this.user.name == undefined ||
                this.user.surname == undefined ||
                this.user.username == undefined ||
                this.user.password == undefined){
                    this.disabled = "yes";
                }
           else if (this.user.name.length > 0   &&
                this.user.surname.length  >   0   &&
                this.user.username.length  >   0   &&
                this.user.password.length    >   0 &&
                this.user.password == this.$refs.ConfirmPassword.value) {
                this.disabled = "no";
        }else {
            this.disabled = "yes";
        };
    }
    }
        

});