<template>
  <div class="home">
    <main>
      {{useLocalStorage()}}
      <BurgerMenu @toggle="setMode($event)" @changed="changeTheme($event)" :mode="mode"/>
      <div class="calculator">
        <section class="equation"></section>
        <ResultBox />
        <MainButtons />
        <button class="solve btn"><p>=</p></button>
      </div>
    </main>
  </div>
</template>

<script>
import MainButtons from '@/components/MainButtons.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';
import ResultBox from '@/components/ResultBox.vue';

export default {
  name: 'Home',
  components: {
    MainButtons,
    BurgerMenu,
    ResultBox
  },
  data(){
    return{
      'mode': '',
      'lightBase': [
        {name:'navbgclr', value: 'rgba(206,206,206, .9)'},
        {name:'navBtnClr', value: 'black'},
        {name:'txtclr', value: 'black'},
      ],
      'darkBase': [
        {name:'navbgclr', value: 'rgba(0,0,0, .9)'},
        {name:'navBtnClr', value: '#cecece'},
        {name:'txtclr', value: 'white'},
      ],
      'lightBlue': 
      [
        {name:'clrDark', value: '#191654'}, 
        {name:'clrLight', value: '#43c6ac'}, 
        {name:'gradient', value: 'linear-gradient(45deg, #191654, #43C6AC)'},
        
      ],
      'darkBlue': 
      [
        {name: 'clrDark', value:'#090738'},
        {name: 'clrLight', value: '#302b63'}, 
        {name: 'gradient', value: 'linear-gradient(45deg,#090738,#302b63)'},
        
      ],
      'lightOrange': 
      [
        {name:'clrDark', value: '#FF1F01'}, 
        {name:'clrLight', value: '#FFC700'}, 
        {name:'gradient', value: 'linear-gradient(45deg, #FF1F01, #FD5D1B , #FFC700)'},
        
      ],
      'darkOrange': 
      [
        {name: 'clrDark', value:'black'},
        {name: 'clrLight', value: '#c06a11'}, 
        {name: 'gradient', value: 'linear-gradient(45deg, black ,#e57502)'},
      ],
      'lightRed': 
      [
        {name:'clrDark', value: '#ff003c'}, 
        {name:'clrLight', value: '#b121b6'}, 
        {name:'gradient', value: 'linear-gradient(45deg, #b121b6, #ff003c)'},
        
      ],
      'darkRed': 
      [
        {name: 'clrDark', value:'black'},
        {name: 'clrLight', value: '#e50202'}, 
        {name: 'gradient', value: 'linear-gradient(45deg, black , #891a1a, #e50202)'},
      ],
      'lightGreen': 
      [
        {name:'clrDark', value: '#1E6305'}, 
        {name:'clrLight', value: '#BDFF00'}, 
        {name:'gradient', value: 'linear-gradient(45deg, #1E6305, #BDFF00)'},
        
      ],
      'darkGreen': 
      [
        {name: 'clrDark', value:'black'},
        {name: 'clrLight', value: '#269808'}, 
        {name: 'gradient', value: 'linear-gradient(45deg, black , #13610b, #269808)'},
      ],
    }
  }, 
  methods:{
    setMode(toggle){
      
      let lightTheme;
      let darkTheme;
      
      let mode = this.getLocalStorage('mode', '');

      this.mode = mode;
        
      localStorage.setItem('mode', JSON.stringify(mode));

      switch(this.theme){
          case 'orange':
           lightTheme = this.lightOrange; 
           darkTheme = this.darkOrange;
          break;
          case 'red':
           lightTheme = this.lightRed; 
           darkTheme = this.darkRed;
          break;
          case 'green':
           lightTheme = this.lightGreen; 
           darkTheme = this.darkGreen;
          break;
          case 'blue':
           lightTheme = this.lightBlue; 
           darkTheme = this.darkBlue;
          break;
          default:
            lightTheme = this.lightBlue; 
           darkTheme = this.darkBlue;
            break;
      }

        if(toggle === true){
            if(this.mode === 'light'){
              this.mode = 'dark';
              mode = this.mode;
              localStorage.setItem('mode', JSON.stringify(mode));
              darkTheme.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
              this.darkBase.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
            } 
            else {
              this.mode = 'light';
              mode = this.mode;
              localStorage.setItem('mode', JSON.stringify(mode));
              lightTheme.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value);
              });
              this.lightBase.forEach(clr => {
                  document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
              
            }
        } 
        else {
            if(this.mode === 'light'){
              lightTheme.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value);
              });
              this.lightBase.forEach(clr => {
                  document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
            } 
            else{
              darkTheme.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
              this.darkBase.forEach(clr => {
                document.documentElement.style.setProperty(`--${clr.name}`, clr.value );
              });
            }
        }
        
    },

    changeThemeVar(lightTheme, darkTheme){
        this.mode === 'light' ? 
        (lightTheme.forEach(clr => {
          document.documentElement.style.setProperty(`--${clr.name}`, clr.value )
        })) : 
        (darkTheme.forEach(clr => {
          document.documentElement.style.setProperty(`--${clr.name}`, clr.value);
        }))
    },

    changeTheme(theme){
      this.theme = theme;

      switch (this.theme) {
        case 'orange':
           this.changeThemeVar(this.lightOrange, this.darkOrange)
          break;
        case 'red':
           this.changeThemeVar(this.lightRed, this.darkRed)
          break;
        case 'green':
           this.changeThemeVar(this.lightGreen, this.darkGreen)
          break;
        case 'blue':
           this.changeThemeVar(this.lightBlue, this.darkBlue)
          break;
        default:
          this.changeThemeVar(this.lightBlue, this.darkBlue)
          this.theme = 'blue';
          break;
      }
      let themeStorage = this.getLocalStorage('theme', 'blue');
      themeStorage = this.theme;
      localStorage.setItem('theme', JSON.stringify(themeStorage));
    },

    getLocalStorage(item, value){
      let s = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : value;
      return s
    },

    useLocalStorage(){
      let mode = this.getLocalStorage('mode', 'light');
      let theme = this.getLocalStorage('theme', 'blue');
      
      this.setMode(mode);
      this.changeTheme(theme);
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

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
}

.equation{
  position: absolute;
  top: -1.5em;
  right: .9em;
  font-family: var(--ff1);
  font-weight: bold;
  align-self: flex-start;
  color: var(--txtclr);
}
        
main{
  position: relative;
  min-height: 100vh;
  color: #e6e6e6;
  background: var(--gradient);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
}

.btn{
    background: none;
     border: none;
     font-weight: bold;
     cursor: pointer;
     transition: .3s linear;

     &:focus{
          outline: none;
     }
}

.solve{
  width: 100%;
  padding: .5em;
  font-size: 1.5em;
  background: var(--clrLight);
  color: black;
   &:hover, &:focus{
     background: var(--clrDark);
     color: var(--clr3);
    }
}

.calculator{
  margin: 3em 0 3em 0 ;
  position: relative;
  display: grid;
  background: var(--gradient);
  width: max-content;
  max-width: 256px;
 box-shadow: 1px 4px 15px 0px rgba(0,0,0,0.29);
}

@media(min-width: $bp-small) and (min-height: $bp-small){
  .calculator{
    font-size: 1.6em;
    max-width: 80%;
    margin-top: 2em;
    justify-self: center;
  }

  main{
    justify-content: start;
  }
}

@media(min-width: $bp-medium) and (max-width: $bp-large){
  .calculator{
    margin-top: 8em;
  }
}

@media(min-width: $bp-xlarge){
  .calculator{
    font-size: 2em;
  }
}
</style>
