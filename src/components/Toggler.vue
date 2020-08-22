<template>
     <div class="toggle-wrapper">
          {{storeStateLocally()}}
          <label class="toggle">
               <input type="checkbox" :checked="(mode === 'dark') ? 'checked' : false" @change="$emit('toggle', true)">
               <span class="toggler"></span>
               <fa-icon class="icon sun" :icon="['fas', 'sun']"/>
               <fa-icon class="icon moon" :icon="['fas', 'moon']"/>
          </label>
     </div>
</template>

<script>
export default {
     name: "toggler",
     props: ["mode"],
     methods: {
          storeStateLocally(){
               setTimeout(() => {
                    let toggler = document.querySelector("input");
                    let mode = JSON.parse(localStorage.getItem('mode'));
                    (mode === "light") ? toggler.checked = false : toggler.checked = true;
               });
          }
     }
}
</script>

<style lang="scss">
//breakpoints
$bp-xxsmall: 25em; //400px
$bp-xsmall: 35.5em; //568px
$bp-small: 48em; // 768px
$bp-medium: 64em; // 1024px
$bp-large: 85.375em; // 1366px
$bp-xlarge: 120em; // 1920px
$bp-xxlarge: 160em; // 2560px

.toggle{
          margin-top: 1em;
          position: relative;
          background: var(--txtclr);
          width: 6em;
          height: 3em;
          display: inline-block;
          border-radius: 3em;

          .icon{
               position: absolute;
               color: var(--clrLight);
               &.moon{
                    
                    top: 1em;
                    right: 1em;
                    z-index: 6;
               }
               &.sun{
                    top: 1em;
                    left: 1em;
                    z-index: 6;
               }
          }

          .toggler{
               position: absolute;
               cursor: pointer;
               background: var(--navBtnClr);
               top: 0;
               left: 0;
               bottom: 0;
               right: 0;
               transition: .5s linear;
              

               &::before{
                    position: absolute; 
                    z-index: 7;
                    content: '';
                    height: 2.25em;
                    width: 2.25em;
                    left: .3em;
                    bottom: .35em;
                    background: var(--clrLight);
                    transition: .5s linear;
               }

          }

          input{
               display: none;
               &:checked + .toggler::before{
                    
                    transform: translateX(2.9em);
               }
          }


}

@media(max-height: $bp-xxsmall){
     .toggle{
          height: 2.5em;
          width: 4.5em;

          .icon{
               &.moon{
                   top: .8em; 
                   right: .5em;
               }
               &.sun{
                   top: .8em; 
                   left: .5em;
               }
          }

          .toggler{
               &::before{
                    height: 1.5em;
                    width: 1.5em;
                    left: .3em;
                    bottom: .45em;
               }
          }

          input:checked + .toggler::before{
               transform: translate(2.25em);
          }
     }
}

@media(min-width: $bp-small) and (min-height: $bp-small){
     .toggle{
          height: 5em;
          width: 9em;
          margin-top: 4em;

          .icon{
               &.moon{
                   top: .8em;
                   right: .5em;
                   font-size: 2em;
               }
               &.sun{
                   top: .8em;
                   left: .5em;
                   font-size: 2em;
               }
          }

          .toggler{
               &::before{
                    height: 3em;
                    width: 3em;
                    left: .7em;
                    bottom: .9em;
               }
          }

          input:checked + .toggler::before{
               transform: translateX(4.7em);
          }
     }
}

@media(min-width: $bp-xlarge){
     .toggle{
          height: 7em;
          width: 11em;
          margin-top: 6em;

          .icon{
               &.moon{
                   top: 1em;
                   right: .5em;
                   font-size: 2.3em;
               }
               &.sun{
                   top: 1em;
                   left: .5em;
                   font-size: 2.3em;
               }
          }

          .toggler{
               &::before{
                    height: 4.5em;
                    width: 4.5em;
                    left: .7em;
                    bottom: 1.2em;
               }
          }

          input:checked + .toggler::before{
               transform: translateX(4.7em);
          }
     }
}
</style>