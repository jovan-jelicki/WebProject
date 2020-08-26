var logInJs = new Vue ({
    el : '#authorized',
    data : {
        isAuthorized : false,
        user : {}
    },
    methods : {
        logIn : function(data,event) {
            event.preventDefault();
            $('#modalLogIn').modal('hide');
            this.isAuthorized = true;
        },
        logOut : function(){
            location.reload();
        }

    }

});