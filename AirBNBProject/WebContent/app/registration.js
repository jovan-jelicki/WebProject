var userJS = new Vue ({
    el :  '#registrationModal',
    data : {
        user : {},
        header : "Registracija",
        message : ""
    },
    methods : {
        register: function(){
            
            axios
                .post('rest/guestRegistration/save', this.user)
                .then(response => alert("Uspesno ste registrovali korisnika " + this.user.name + " " + this.user.surname))
                .catch(function(error){console.log(error); });
            
        }
    }

});