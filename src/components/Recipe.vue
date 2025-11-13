<template>
   <div>
      <h1 class="mt-0">Recipes for passionate home cooks</h1>

      <div class="mb-4">
        <!-- Search section -->
        <div class="d-flex justify-content-center">
           <label for="searchRecipe" class="me-2"><strong>Search recipe: </strong></label>
           <input v-model="searchRecipe" type="text" id="searchRecipe" @input="searchMeal" class="form-control form-control-sm" style="max-width: 300px; height: 30px; " >
        </div>

        <br>

        <!-- Filter section -->
        <div>
           <label><strong>Filter Recipes By:</strong></label><br>
           <label>Category</label><br>
           <span v-for="cate in Categories" :key="cate.strCategory" class="badge rounded-pill me-2 mb-3"
                 :class="selectedCategory === cate.strCategory ? 'bg-dark text-white px-4 py-3 fs-7' : 'bg-primary text-white px-4 py-3 fs-7'"
                 role="button" @click="filterByCategory(cate.strCategory)">
                {{ cate.strCategory }}
           </span>
           <br>
           <label>Area</label><br>
           <span v-for="a in Areas" :key="a.strArea" class="badge rounded-pill me-2 mb-3"
                 :class="selectedArea === a.strArea ? 'bg-dark text-white px-4 py-3 fs-7' : 'bg-primary text-white px-4 py-3 fs-7'"
                 role="button" @click="filterByArea(a.strArea)">
                {{ a.strArea }}
           </span>
        </div>
       </div>

       <!-- Recipe section-->
       <div class="row">
           <div v-for="allRecipes in showRecipes" :key="allRecipes.idMeal" class="col-md-6 col-lg-4">
              <!-- Make cards for each recipe -->
              <div class="card" style="width: 400px">
                 <img class="card-img-top" :src="allRecipes.strMealThumb" alt="Recipes" >
                   <div class="card-body">
                      <p class="fst-italic">Recipes</p>
                      <h4 class="fw-bold">{{ allRecipes.strMeal }}</h4>
                      <div class="mt-auto">
                         <span class="badge rounded-pill bg-info text-white px-4 py-3" style="font-size: 1rem;" >
                            {{ allRecipes.strArea }}
                         </span>
                      </div>
                      <div class="card-footer d-flex justify-content-center" style="border: none;" >
                          <button type="button" class="btn btn-primary px-4 me-1" data-bs-toggle="modal" :data-bs-target="`#modal-${allRecipes.idMeal}`" @click="lookupMealDetail(allRecipes.idMeal)">See Recipe</button>
                          <button type="button" class="btn btn-danger" @click="toggle(allRecipes.idMeal)">
                              {{ likeRecipe[allRecipes.idMeal] === 'Liked' ? 'Liked' : 'Like' }}
                          </button>
                      </div>
                   </div>
               </div>
           
               <!-- Modal for showing full info of selected recipe -->
               <div class="modal fade" :id="`modal-${allRecipes.idMeal}`" tabindex="-1" role="dialog" :aria-labelledby="`modalTitle-${allRecipes.idMeal}`" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                       <div class="modal-content">
                          <div class="modal-header justify-content-center">
                             <h4 class="modal-title" :id="`modalTitle-${allRecipes.idMeal}`">{{ selectedRecipe?.strMeal || 'Loading recipe' }}</h4>
                             <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                             </button>
                          </div>
                          <div class="modal-body" v-if="selectedRecipe">
                               <img :src="selectedRecipe.strMealThumb" class="img-fluid mb-3" style="max-width: 400px; height: auto;">
                               <p><strong>Category:</strong> {{ selectedRecipe.strCategory }}</p>
                               <p><strong>Area:</strong> {{ selectedRecipe.strArea }}</p>
                               <p><strong>Instructions:</strong></p>
                               <p>{{ selectedRecipe.strInstructions }}</p>
                          </div>
                          <div class="modal-body" v-else>
                               <p>Loading details</p>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                      </div>
                    </div>
               </div>
           </div>
       </div>

       <br>

       <!-- Pagination section -->
       <paginate
		   :page-count="getPageCount" 
           :page-range="getPageRange"
		   :margin-pages="1"
		   :click-handler="clickCallback" 
		   :prev-text=" 'Prev' " 		
		   :next-text=" 'Next' " 
		   :container-class=" 'pagination justify-content-center' " 
		   :active-class="'currentPage'"
	   ></paginate>
   </div>
</template>

<script>
   export default {
      name: 'Recipe',
      components: {
          paginate: VuejsPaginateNext
      },
      // defining data to be used in the component
      data: function() {
          return {
             selectedArea: '',
             selectedCategory: '',
             selectedRecipe: null,
             filteredRecipes: [],
             Categories: [],
             Areas: [],
             likeRecipe: [],
             searchRecipe: '',
             currentPage: 1,
             perPage: 6
          };
      },

      computed: {
          getPageCount: function() {
             return Math.ceil((this.filteredRecipes.length) / this.perPage);
          },
          showRecipes: function() {
             const begin = (this.currentPage - 1) * this.perPage;
             const finish = begin + this.perPage;
             return this.filteredRecipes.slice(begin, finish);
          },
          getPageRange() {
              return Math.min(this.getPageCount, 10);
          }
      },

      methods: {
         clickCallback: function(pageNum) {
            this.currentPage = Number(pageNum);
         },
         
         fetchAPIData() {
           // Show full list of recipes from the API
           fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
              .then(res => res.json())
              .then(data => {
                this.filteredRecipes = data.meals || [];
                this.currentPage = 1;
           });
           
           // Show all recipe categories from the API
           fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
              .then(res => res.json())
              .then(data => this.Categories = data.meals || []);

           // Show all recipe areas from the API
           fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
              .then(res => res.json())
              .then(data => this.Areas = data.meals || []);
         },
         
         // Search meal by name
         searchMeal() {
           if (!this.searchRecipe) return this.fetchAPIData();
           fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchRecipe}`)
              .then(res => res.json())
              .then(data => {
                  this.filteredRecipes = data.meals || [];
                  this.currentPage = 1;
              });
         },

         // Show recipes with chosen category
         filterByCategory(recipeCat) {
            if (this.selectedCategory === recipeCat) {
               this.selectedCategory = '';
               this.filterRules();
            } else {
               this.selectedCategory = recipeCat;
               this.filterRules();
            }
         },

         // Show recipes with chosen area
         filterByArea(recipeArea) {
            if (this.selectedArea === recipeArea) {
               this.selectedArea = '';
               this.filterRules();
            } else {
               this.selectedArea = recipeArea;
               this.filterRules();
            }
         },

         // Function of the interaction when choosing both category and area
         filterRules() {
            if (this.selectedCategory && this.selectedArea) {
               Promise.all([
                  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.selectedCategory}`).then(res => res.json()),
                  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.selectedArea}`).then(res => res.json())
               ]).then(([chosenCatAPI, chosenAreaAPI]) => {
                     const chosenCatMeals = chosenCatAPI.meals || [];
                     const chosenAreaMeals = chosenAreaAPI.meals || [];
                     const intersect = chosenCatMeals.filter(m => chosenAreaMeals.some(i => i.idMeal === m.idMeal));
                     this.filteredRecipes = intersect;
                     this.currentPage = 1;
               });
            } else {
                let weblink = '';
                if (this.selectedCategory) {
                    weblink = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.selectedCategory}`;
                } else if (this.selectedArea) {
                    weblink = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.selectedArea}`;
                } else {
                    this.fetchAPIData();
                    return;
                }

                fetch(weblink)
                   .then(res => res.json())
                   .then(data => {
                      this.filteredRecipes = data.meals || [];
                      this.currentPage = 1;
                   });
            }
         },

         // Look up full recipe detail by ID
         lookupMealDetail(iD) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${iD}`)
              .then(res => res.json())
              .then(data => this.selectedRecipe = data.meals[0]);
         },
     
         // Function relating to like button
         toggle(iD) {
            if (this.likeRecipe[iD] === 'Liked') {
               this.likeRecipe[iD] = 'Like';
            } else {
               this.likeRecipe[iD] = 'Liked';
            }
         } 
      },

      mounted() {
         this.fetchAPIData();
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

