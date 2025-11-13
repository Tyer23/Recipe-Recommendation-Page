<template>
   <div> 
      <h1 class="mt-0">About Page</h1>
      <p>This website is about introducing a variety of recipes as well as useful news for passionate home cooks.</p>
      <h3 v-if="userName">Welcome, {{ userName }}!</h3>
      <div class="row">
          <div class="col-md-6">
              <label for="firstName"><strong>First Name:</strong> </label>
              <input type="text" id="firstName" v-model="firstName" class="form-control" >
          </div>
          <div class="col-md-6">
              <label for="lastName"><strong>Last Name:</strong> </label>
              <input type="text" id="lastName" v-model="lastName" class="form-control" >
          </div>
      </div>
    
      <label><strong>Select your dietary preference:</strong></label>
      <br>
      <div class="row">
           <div class="col-md-6">
               <input type="radio" id="veggie" v-model="preference" value="Vegetarian" >
			      <label for="veggie">Vegetarian</label>
           </div>
           <div class="col-md-6">
               <input type="radio" id="non-veggie" v-model="preference" value="Non-vegetarian" >
				   <label for="meat">Meat Lover</label>
           </div>
      </div>

      <img v-if="picture" :src="picture" alt="Picture" style="max-width: 300px;">
   </div>
</template>

<script>
   export default {
      name: 'About',
      data() {
         return {
            firstName: '',
            lastName: '',
            preference: ''
         };
      },
      computed: {
         userName: function() {
           const fullName = `${this.firstName} ${this.lastName}`.trim();
           if (fullName.length > 0) {
              return fullName;
           } else {
              return null;
           }
         },
         picture: function() {
            if (this.preference === 'Vegetarian') {
               return new URL('../assets/veg.jpg', import.meta.url).href;
            }
            if (this.preference === 'Non-vegetarian') {
               return new URL('../assets/nonveg.png', import.meta.url).href;
            }
            return null;
         }
       }
   };
</script>

<style scoped>
   h1 {
    text-align: center;
    font-size: 2.5em;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(255, 0, 0);
    font-weight: bold;
   }

   div {
    font-family: Arial, Helvetica, sans-serif;
   }
</style>
