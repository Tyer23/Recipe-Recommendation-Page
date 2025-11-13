<template>
   <div>
      <h1 class="mt-0">News, tips, and inspiration for passionate home cooks</h1>

      <!-- Search section -->
      <div class="d-flex justify-content-center">
        <label for="search" class="me-2"><strong>Search: </strong></label>
        <input v-model="search" type="text" id="search" class="form-control form-control-sm" style="max-width: 300px; height: 30px; " >
      </div>

      <br>

      <!-- News section-->
      <div class="row">
           <div v-for="allNews in showNews" :key="allNews.id" class="col-md-6 col-lg-4">
              <!-- Make cards for each news -->
              <div class="card" style="width: 400px">
                 <img class="card-img-top" src="../assets/news.png" alt="News" >
                   <div class="card-body">
                      <p class="fst-italic">Date: {{ allNews.date }}</p>
                      <h4 class="fw-bold">{{ allNews.title }}</h4>
                      <p>{{ allNews.content }}</p>
                      <div class="mt-auto">
                         <span class="badge rounded-pill bg-info text-white px-4 py-3" style="font-size: 1.2rem;" >
                            {{ allNews.category }}
                         </span>
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
      name: 'News',
      components: {
          paginate: VuejsPaginateNext
      },
      // defining data to be used in the component
      data: function() {
          return {
             allNews: [],
             search: '',
             currentPage: 1,
             perPage: 6,
          };
      },
      computed: {
          filteredNews: function() {
             const userSearch = this.search.toLowerCase();
             return this.allNews.filter(m =>
                 m.date.toLowerCase().includes(userSearch) || m.title.toLowerCase().includes(userSearch) || m.content.toLowerCase().includes(userSearch) || m.category.toLowerCase().includes(userSearch)
             );
          },
          getPageCount: function() {
             return Math.ceil(this.filteredNews.length / this.perPage);
          },
          showNews: function() {
             const begin = (this.currentPage - 1) * this.perPage;
             const finish = begin + this.perPage;
             return this.filteredNews.slice(begin, finish);
          },
          getPageRange() {
              return Math.min(this.getPageCount, 10);
          }
      },
      methods: {
         clickCallback: function(pageNum) {
            this.currentPage = Number(pageNum);
         }
      },
      mounted() {
         fetch('/cos30043/s103830572/A3/news.json')
         .then(response => response.json())
          .then(data => {
               this.allNews = data;
           })
          .catch(errMsg => {
              console.error('Failed to fetch the json file', errMsg);
           });
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
