Vue.component('new-apartment', {
    data : function(){
        return {
            user : !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            backup:[],

        }
    }, 
	  
        template : 
    `  
  <form>
      <br>
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Dodavanje novog apartmana</h1>
      <hr>
      <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Domacin</label>
	    <div class="col-sm-10">
              <input class="form-control" id="name" type="text" v-model="user.name" disabled>
	    </div>
	  </div>
	  
	  <div class="form-group row">
	    <label for="staticEmail" class="col-sm-2 col-form-label">Tip apartmana</label>
	    <div class="col-sm-10">
	        <div class="form-check form-check-inline">
        		<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        		<label class="form-check-label" for="inlineCheckbox1">apartman</label>
        	</div>
      
        	<div class="form-check form-check-inline">
        		<input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
        		<label class="form-check-label" for="inlineCheckbox2">soba</label>
        	</div>
	    </div>
	  </div>
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label">Broj soba</label>
	    <div class="col-sm-10">
              <input class="form-control" id="name" type="text">
	    </div>
	  </div>
	  
	   <div class="form-group row">
	    <label for="inputPassword" class="col-sm-2 col-form-label ">Broj gostiju</label>
	    <div class="col-sm-10">
              <input class="form-control" id="name" type="text">
	    </div>
	  </div>
	    
	  <div class="form-row">
       <div class="form-group col-md-3">
        	<label for="inputCity">Drzava</label>
        	<input type="text" class="form-control" id="inputCity">
       </div>
       <div class="form-group col-md-3">
        	<label for="inputState">Grad</label>
        	<select id="inputState" class="form-control">
        		<option selected>Choose...</option>
        		<option>...</option>
        	</select>
       </div>
       <div class="form-group col-md-3">
        	<label for="inputState">Ulica</label>
        	<select id="inputState" class="form-control">
        		<option selected>Choose...</option>
        		<option>...</option>
        	</select>
       </div>
       <div class="form-group col-md-1">
        	<label for="inputZip">Broj</label>
        	<input type="text" class="form-control" id="inputZip">
       </div>
       </div>
 
   </form>
    `

    })