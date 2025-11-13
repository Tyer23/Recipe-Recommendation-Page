<template>
  <div>
     <h1 class="mt-0">Tyler's Recipe Recommendation Page</h1>
     <p>Welcome to my Recipe Recommendation Page! You can find a variety of recipes that are tailored for passionate home cooks like yourself - from Italian, Asian, to Moroccan and beyond.
        I hope you have a great experience visiting the website and find recipes that excite your taste buds!</p>

     <div class="row">
           <div class="col-md-6">
              <img src="../assets/chef.jpg" alt="Chef" style="max-width: 300px;" >
           </div>
        
           <div class="col-md-6">
              <img src="../assets/utensils.jpg" alt="Utensils" style="max-width: 300px;" >
           </div>
     </div>
  </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>

<style scoped>
   h1 {
    text-align: center;
    font-size: 2.5em;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(255, 0, 0);
    font-weight: bold;
   }

   p {
    font-family: Arial, Helvetica, sans-serif;
   }
</style>



