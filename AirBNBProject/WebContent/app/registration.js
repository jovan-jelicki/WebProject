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
            axios
                .post('rest/guestRegistration/save', this.user)
                .then(response => {if(response.data == "Good")
                    alert('Uspesno ste registrovali korisnika ' + user.name + ' ' + user.surname);
                })
                .catch(function (error) {
                    return error.response.data;
                  });
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