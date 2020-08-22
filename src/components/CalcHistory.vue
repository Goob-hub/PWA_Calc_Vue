<template>
  <div class="history">
       {{updateHistory()}}
       <div class="container" >
            <ul>
                 <li v-bind:key="item.id" v-for="item in history"><p id="item">{{item.equation}}</p></li>
            </ul>
              
       </div>
       <footer>
          <button @click="$emit('change')" class="btn">Back</button>
          <button @click="clearHistory()" class="btn">Clear</button>
       </footer>
  </div>
</template>

<script>
export default {
     name: 'History',
     data(){
          return{
               'history': []
          }
     },
     methods: {
          updateHistory(){
               setTimeout(() => {
                    let History = localStorage.getItem('History') ? JSON.parse(localStorage.getItem('History')) : [];
                    this.history = History;

               });
          },
          clearHistory(){
               localStorage.setItem('History', [])
          }
     }
}
</script>

<style lang="scss">
//breakpoints
$bp-xxsmall: 26em; //416px
$bp-xsmall: 35.5em; //568px
$bp-small: 48em; // 768px
$bp-medium: 64em; // 1024px
$bp-large: 85.375em; // 1366px
$bp-xlarge: 120em; // 1920px
$bp-xxlarge: 160em; // 2560px

.history{
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100%;
     width: 100%;
     padding: 6em .5em 2em .5em;
     transition: .5s linear;

     button{
          color: var(--txtclr);
          background: var(--clrLight);
          border: 1px solid var(--txtclr);
          font-family: var(--ff2);
          font-size: 1.5em;
          padding: .5em;
          margin: .5em;
          transition: .3s linear;
          &:hover{
               background: var(--clrDark);
               color: white;
               text-shadow: 1px 1px 5px rgba(255, 255, 255, .7);
          }
     }

     footer{
          display: flex;
          justify-content: center;
          align-items: center;          
          height: 20%;
          margin: 1em;
          width: 100%;
     }

     .container{
          max-height: 80%;
          width: 100%;
          ul{
               height: 100%;
               width: 100%;
               list-style: none;
               display: grid;
               grid-template-columns: 1fr 1fr;
               grid-template-rows: repeat(minmax(1,5), 1fr);
               
               li{
                    margin: 1em;  
               }
          }

          #item{
               height: 100%;
               font-size: 1.2em;
               color: var(--txtclr);
               font-family: var(--ff1);
               font-weight: bolder;
          }
     }
}

@media(max-height: $bp-xxsmall){
     .history{
          padding-top: 5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .container{
               display: flex;
               justify-content: center;
               align-items: center;
               ul{
                    font-size: .8em;
                    width: 100%;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: repeat(minmax(1,5), max-content);
                    li{
                         place-content: center;
                    }
               }
          }
          footer{
               button{
                    font-size: 1.3em;
               }
          }

     }

}

@media(min-width: $bp-small) and (min-height: $bp-xsmall){
     .history{
          .container{
               ul{
                    grid-gap: 1em;
               }
               #item{
                    font-size: 2em;
               }  
          } 
          footer{
               button{
                    font-size: 3em;
               }
          }
     } 

}
@media(min-width: $bp-xlarge){
     .history{
          display: flex;
          flex-direction: column;
          justify-content: center;
          .container{
               ul{
                    margin-top: 4em;
                    grid-gap: 1em;
                    grid-template-columns: 1fr 1fr 1fr;
               }
               #item{
                    font-size: 2.5em;
               }  
          } 
          footer{
               justify-self: flex-end;
               margin-top: 5em;
               button{
                    font-size: 4em;
               }
          }
     } 

}

</style>