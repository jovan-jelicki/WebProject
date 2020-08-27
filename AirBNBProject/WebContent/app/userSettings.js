Vue.component('user-settings', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
        }
    },
    template : 
`
        <div>
            <h3> {{user.username}} </h3>

            <label> Ime </label>
            <input type="text" v-model="user.name" /></br>
            <label> Prezime </label>
            <input type="text" v-model="user.surname" /></br>
            <label> Pol </label>
            <input type="text" v-model="user.name" /></br>
            <label> Stara sifra </label>
            <input type="text" ref="OldPassword" id="OldPassword" /></br>
            <label> Nova sifra </label>
            <input type="text" ref="NewPassword" id="NewPassword" /></br>
            <label> Potvrda nove sifre </label>
            <input type="text" v-model="user.password" id="ConfirmNewPassword" ref="ConfirmNewPassword"/></br>
        </div>
        `
})