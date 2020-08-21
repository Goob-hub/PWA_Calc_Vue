<template>
     <div class="nav-container">
          <div class="btn-container">
               <nav @click="$emit('navclick', navClick())">
                    <div class="middle"></div>
               </nav>
          </div>
          <Cover @toggle="$emit('toggle', true)" @changed="$emit('changed', $event)" :mode="mode"/>
     </div>
</template>

<script>
import Cover from '@/components/NavCover.vue'
export default {
     name: "BurgerMenu",
     components: {
          Cover
     },
     props: ["mode"],
     methods: {
          navClick(){
               setTimeout(() => {
                    let cover = document.querySelector("#cover");
                    let nav = document.querySelector("nav");
     
                    (cover.classList.contains('open')) ? 
                    (cover.style.height = "0", cover.classList.remove("open")) 
                    : (cover.style.height = "100vh", cover.classList.add("open"));
     
                    (nav.classList.contains('openNav')) ? 
                    (nav.classList.remove("openNav")) 
                    : (nav.classList.add("openNav"));
               });
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

.nav-container{
    align-self: flex-start; 
}

nav{
     z-index: 10;
     position: relative;
     height: 3em;
     width: 3em;
     cursor: pointer;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     

     &.openNav{
          position: fixed;
          div{
               transform: translateX(-3em);
               background: transparent;
               border: none;
               box-shadow: none; 
               &::before, &::after{
                    background: red;
                    box-shadow: 0 0 10px red, 0 0 40px red, 0 0 80px red;
               }
                         
               &::before{
                    transform: rotate(45deg) translate(35px, -35px);
               }
               &::after{
                    transform: rotate(-45deg) translate(35px, 35px);
               }
          }

     }

     div{
          position: relative;
          width: 2em;
          background: var(--navBtnClr);
          height: .4em;
          border-radius: 5px;
          transition: .5s linear;
         
          &::before, &::after{
               transition: .5s linear;
               content: '';
               top: 0;
               left: 0;
               position: absolute;
               width: 3em;
               height: .4em;
               background: var(--navBtnClr);
               border-radius: 5px;
          }

          &::before{
               transform: translateY(1em);
          }
          &::after{
               transform: translateY(-1em);
          }


     }
}

@media(max-height: $bp-xxsmall){
     nav{
          top: 1em;
          left: 1em;
          div{    
               width: 2em;
               &::before, &::after{
                    width: 2.8em;    
               }
          }
     }
}

@media(min-width: $bp-small){
     .nav-container{
          margin-bottom: 2em;
          justify-self: flex-start;
     }
     nav{
          height: 8em;
          width: 8em;
          display: flex;
          justify-content: space-evenly;
          &.openNav{
               top: 1.5em;
               left: 1.5em;
          }
          div{    
               width: 3.5em;
               height: .6em;
               &::before, &::after{
                    width: 5.5em; 
                    height: .6em;  
               }

                &::before{
                    transform: translateY(1.5em);
               }
               &::after{
                    transform: translateY(-1.5em);
               }
          }
     }
}

@media(min-width: $bp-xlarge){
     nav{
          height: 16em;
          width: 16em;
          display: flex;
          justify-content: space-evenly;
          &.openNav{
               top: 2em;
               left: 2em;
          }
          div{    
               width: 5em;
               height: .7em;
               &::before, &::after{
                    width: 7em; 
                    height: .7em;  
               }

                &::before{
                    transform: translateY(2em);
               }
               &::after{
                    transform: translateY(-2em);
               }
          }
     }
}

@media(min-width: $bp-large){
     .nav-container{
          margin-bottom: 2em;
          position: fixed;
          z-index: 20;
     }
}


</style>