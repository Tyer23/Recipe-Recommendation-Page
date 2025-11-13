<template>
   <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
         <div class="container justify-content-center">
              <ul class="navbar-nav">
                 <li class="nav-item">
                    <router-link to="/" class="nav-link text-white">Home</router-link>
                 </li>
                 <li class="nav-item">
                    <router-link to="/recipe" class="nav-link text-white">Recipe</router-link>
                 </li>
                 <li class="nav-item">
                    <router-link to="/news" class="nav-link text-white">News</router-link>
                 </li>
                 <li class="nav-item">
                    <router-link to="/about" class="nav-link text-white">About</router-link>
                 </li>
              </ul>
         </div>
      </nav>

      <div class="page-content container">
         <router-view />
      </div>
   </div>
</template>

<style>
   .page-content {
      padding-top: 80px; 
      min-height: 150vh;
   }
</style>

