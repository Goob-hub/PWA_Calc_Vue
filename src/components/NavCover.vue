<template>
     <div id="cover">
          {{selectedTheme()}}
          <div class="main" :class="!HistoryShown ? '' : 'hide'"> 
               <button  @click="HistoryShown = true" class="btn menu-btn">History</button>
               <div  class="theme">
                    <h1>Color Themes</h1>
                    <section>
                         <button @click="$emit('changed', 'orange'), selectedTheme()" class="theme-btn btn orange"></button>
                         <button @click="$emit('changed', 'red'), selectedTheme()" class="theme-btn btn red"></button>
                         <button @click="$emit('changed', 'green'), selectedTheme()" class="theme-btn btn green"></button>
                         <button @click="$emit('changed', 'blue'), selectedTheme()" class="theme-btn btn blue"></button>
                    </section>
               </div>
               <Toggler  @toggle="$emit('toggle')"/>
          </div>
          <History :class="HistoryShown ? '': 'hide'" @change="HistoryShown = false" />
     </div>
</template>

<script>
import Toggler from '@/components/Toggler.vue'
import History from '@/components/CalcHistory.vue'
export default {
     name: "cover",
     props: ["mode"],
     components: {
          Toggler,
          History
     },
     data(){
          return{
               'HistoryShown': true,
          }
     },
     methods: {
          selectedTheme(){
               setTimeout(() => {
                    let theme  = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'blue';
     
                    document.querySelectorAll('.theme-btn').forEach(btn => {
                         btn.classList.remove('selected');
                    });
     
                    document.querySelector(`.${theme}`).classList.add('selected');
               });
          }
     }
}
</script>

<style lang="scss">
//breakpoints
$bp-xxsmall: 25em; //460px
$bp-xsmall: 35.5em; //568px
$bp-small: 48em; // 768px
$bp-medium: 64em; // 1024px
$bp-large: 85.375em; // 1366px
$bp-xlarge: 120em; // 1920px
$bp-xxlarge: 160em; // 2560px

#cover{
     position: fixed;
     z-index: 5;
     top: 0;
     left: 0;
     height: 0vh;
     width: 100vw;
     background: var(--navbgclr);
     overflow: hidden;
     transition: .5s linear;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;

     @for $i from 1 through 4 {
          &:nth-child(#{$i}) {
               transition: .5s linear;
          }
     }

     .main{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: .5s linear;
          width: 100%;
     }

     .menu-btn{
          color: var(--txtclr);
          background: var(--clrLight);
          font-size: 2em;
          margin-bottom: .5em;
          padding: .5em;
          border: 1px solid var(--txtclr);
          font-family: var(--ff2);
          transition: .3s linear;

          &:hover{
               background: var(--clrDark);
               color: white;
               text-shadow: 1px 1px 5px rgba(255, 255, 255, .7);
          }
     }

     .theme{
          h1{
               font-family: var(--ff2);
               color: var(--txtclr);
          }

          section{
               display: flex;
               justify-self: center;
               justify-content: space-between;
               align-items: center;
               height: 3em;
          }

          h1,section{
               margin: 1em;
          }

          &-btn{
               height: 3em;
               width: 3em;
               border: 1px solid var(--txtclr);
               border-radius: 5px;

               &:hover{
                    height: 4em;
                    width: 4em;
               }
          }

          .orange{
               background: linear-gradient(45deg, #FF1F01,#FD5D1B , #FFC700);
          }

          .red{
               background: linear-gradient(45deg, #b121b6, #ff003c);
          }

          .green{
               background: linear-gradient(45deg, #1E6305, #BDFF00);
          }

          .blue{
               background: linear-gradient(45deg, #191654, #43C6AC);
          }
     }

     .selected{
          border: 3px solid var(--txtclr);
          height: 4em;
          width: 4em;
     }
     
}
@media(max-height: $bp-xxsmall){
          #cover{
               .menu-btn{
                    font-size: 1.2em;
               }
     
               .theme{
                    h1{
                         font-size: 1.5em;
                         font-weight: bolder;
                    }
     
                    &-btn{
                         height: 2em;
                         width: 2em;
                         &:hover{
                              height: 3em;
                              width: 3em;
                         }
                    }
               }
               .selected{
                    border: 3px solid var(--txtclr);
                    height: 3em;
                    width: 3em;
               }
               
          }
          
}

@media(min-width: $bp-small) and (min-height: $bp-xsmall){
          #cover{
               .menu-btn{
                    font-size: 3em;
               }
     
               .theme{
                    h1{
                         font-size: 3em;
                         font-weight: bolder;
                    }
     
                    &-btn{
                         height: 4em;
                         width: 4em;
                         &:hover{
                              height: 5em;
                              width: 5em;
                         }
                    }
               }
               .selected{
                    border: 5px solid var(--txtclr);
                    height: 5em;
                    width: 5em;
               }
          }
          
}

@media(min-width: $bp-xlarge){
          #cover{
               .menu-btn{
                    font-size: 5em;
               }
     
               .theme{
                    h1{
                         font-size: 5em;
                         font-weight: bolder;
                    }
     
                    &-btn{
                         height: 7em;
                         width: 7em;
                         &:hover{
                              height: 8em;
                              width: 8em;
                         }
                    }
               }
               .selected{
                    border: 8px solid var(--txtclr);
                    height: 8em;
                    width: 8em;
               }
          }
          
}
</style>