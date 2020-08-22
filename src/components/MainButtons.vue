<template>
       <div class="buttons-main">
            {{addEvents()}}
               <button class="calc-btn operator" id="multiply">
                    <fa-icon :icon="['fas', 'times']" size="xs"/>
               </button>
               <button class="calc-btn operator" id="divide">
                    <fa-icon :icon="['fas', 'divide']" size="xs"/>
               </button>
               <button class="calc-btn operator" id="add">
                    <fa-icon :icon="['fas', 'plus']" size="xs"/>
               </button>
               <button class="calc-btn operator" id="subtract">
                    <fa-icon :icon="['fas', 'minus']" size="xs"/>
               </button>

               <button v-bind:key="btn.text" 
               class="calc-btn"
               v-for="btn in numbuttons" 
               :class="btn.name" 
               @click="$emit(btn.name, inputNum(btn.text, btn.name))">{{btn.text}}</button>

               <button v-bind:key="btn.text"
               class="calc-btn" 
               v-for="btn in modifiers" 
               :class="btn.name" 
                >{{btn.text}}</button>


               <button class="calc-btn sqrt" @click="$emit('dummy', sqrt())" >
                    <fa-icon :icon="['fas', 'square-root-alt']" size="xs"/>
               </button>
       </div>
</template>

<script defer>

export default {
     name: "MainButtons",
     data() {
          return {
               "numbuttons": [
                    {'name':'seven', 'text':'7'},
                    {'name':'eight', 'text':'8'},
                    {'name':'nine', 'text':'9'},
                    {'name':'four', 'text':'4'},
                    {'name':'five', 'text':'5'},
                    {'name':'six', 'text':'6'},
                    {'name':'one', 'text':'1'},
                    {'name':'two', 'text':'2'},
                    {'name':'three', 'text':'3'},
                    {'name':'zero', 'text':'0'},
                    
               ],
               "modifiers": [
                    {'name':'percent', 'text':'%'},
                    {'name':'decimal', 'text':'.'},
                    {'name':'invert', 'text':'+/-'},
                    {'name':'clear', 'text':'C'},
               ],
               'inputMem': [],
               'operator': '',
               'operatorCalled': false,
               'decimalCalled': false,
               'solved': false,
               'beg': '',
               'end': '',
               'index': 0,
          }
     },
     methods:{
          //Misc functionss
          addEvents(){ 
               setTimeout(() => {
                    let operatorBtns = document.querySelectorAll(".operator");
                    operatorBtns.forEach(btn => {
                         btn.addEventListener('click', e => {
                              this.updateEquationData(e.currentTarget)
                         })
                    })
                    this.equation = document.querySelector(".equation")
                    this.modifiers.forEach(btn => {
                         let button = document.querySelector(`.${btn.name}`);
                         switch (btn.name) {
                              case 'percent':
                                   button.addEventListener('click', () => {
                                        this.percent();
                                   })
                                   break;
                              case 'decimal':
                                   button.addEventListener('click', () => {
                                        this.decimal();
                                   })
                                   break;
                              case 'invert':
                                   button.addEventListener('click', () => {
                                        this.invert();
                                   })
                                   break;
                              case 'clear':
                                   button.addEventListener('click', () => {
                                        this.clear();
                                   });
                                   break;
                         
                              default:
                                   console.log('err at MainButtons.vue in addEvents function');
                                   break;
                         }
                    });
                    document.querySelector(".solve").addEventListener('click', () => {this.solve(); this.solved = true});
               });
          },
          inputNum(num, btnName){
               this.catchErr();
               let resultBox = document.querySelector(".results").childNodes[0];
                    if(!this.err){
                         (this.solved) ? (this.clear()) : '';
     
                         (resultBox.textContent === '0' ) ? resultBox.textContent = num : resultBox.textContent += num;
          
                         (resultBox.textContent === '0' && btnName === 'zero')? '': this.equation.textContent += ` ${num}`;
                    }

                    

          },
          catchErr(){
               let resultBox = document.querySelector(".results").childNodes[0];
               if(resultBox.textContent.length >= 14){
                    this.err = true;
                    resultBox.textContent = 'err';
                    this.equation.textContent = 'err';
               }

          },
          storeDataLocally(){
               let resultBox = document.querySelector(".results").childNodes[0];
               let history = localStorage.getItem('History') ? JSON.parse(localStorage.getItem('History')) : [];
               if(history.length === 10){
                    history[this.index] = {equation: `${this.equation.textContent.trim()} = ${resultBox.textContent}`, 
                    id: this.index};
                    (this.index === 9) ? this.index = 0: this.index += 1;
               } else {
                    history.push({equation: `${this.equation.textContent.trim()} = ${resultBox.textContent}`, 
                    id: history.length + 1});              
               }
               localStorage.setItem('History', JSON.stringify(history));
          },
          clear(num){
               
                    let resultBox = document.querySelector(".results").childNodes[0];
                    if(this.solved){
                         this.storeDataLocally();
                    }
                    (num) ? (this.equation.textContent = num, resultBox.textContent = num) : (this.equation.textContent = '', resultBox.textContent = '0');
                    this.solved = false;
                    this.decimalCalled = false;
                    this.operatorCalled = false;
                    this.inputMem.length = 0;
                    this.end = '';
                    this.beg = '';
                    this.err = false;
          },
          checkEquationTxt(char, isModifier, num = 0, modifier){
               let resultBox = document.querySelector(".results").childNodes[0];
               let equation = this.equation;
               let length = this.equation.textContent.length;
               let lastLetter = equation.textContent[length - 1];
               if(this.operatorCalled && !char.includes('.'))
               this.beg = this.beg + char;

               if(!isModifier){
                    switch (lastLetter) {
                         case '+':
                              (char.includes('.')) ? char = ' 0.' : ''
                              this.end = char;
                              equation.textContent = `${this.beg} ${this.end}`                         
                              break;
                         case '-':
                              (char.includes('.')) ? char = ' 0.' : ''
                              this.end = char;
                              equation.textContent = `${this.beg} ${this.end}`
                              break;
                         case '/':
                              (char.includes('.')) ? char = ' 0.' : ''
                              this.end = char;
                              equation.textContent = `${this.beg} ${this.end}`
                              break;
                         case 'x':
                              (char.includes('.')) ? char = ' 0.' : ''
                              this.end = char;
                              equation.textContent = `${this.beg} ${this.end}`
                              break;
                         default:
                              equation.textContent += char;
                              break;
                    }
               } else {
                    switch (modifier) {
                         case 'invert':
                              if(this.solved === true){
                                   this.storeDataLocally();
                                   setTimeout(() => {
                                        this.equation.textContent = resultBox.textContent;     
                                   });
                                   this.solved = false;
                                   this.end = '';
                                   this.beg = '';
                              } else {
                                   if(this.end.includes('√')) {
                                        (this.end.includes('-')) ?
                                         (this.end = this.end.replace('-', ''),
                                         this.end = this.end.replace('(', ''),
                                         this.end = this.end.replace(')', '')) : this.end = `(-${this.end})`, console.log(this.end)
                                   } else {
                                        this.end = (num * -1).toString();
                                   }
                                   
                              }
                              if(!isNaN(num))
                              equation.textContent = `${this.beg} ${this.end}`;
                              break;
                         case 'sqrt':
                              if(this.solved === true){
                                   this.storeDataLocally();
                                   this.equation.textContent = `√ ${resultBox.textContent}`; 
                                   this.solved = true;
                              } else {

                                   this.end = `√ ${num}`; 
                                   if(!isNaN(num))
                                   equation.textContent = `${this.beg} ${this.end}`;
                              }
                              break;
                         default:
                              console.log('err at MainButtons.vue line 186');
                              break;
                    }
               }
               
          },
          updateEquationData(btn){
               let resultBox = document.querySelector(".results").childNodes[0];
               let equation = this.equation;
               let num = parseFloat(document.querySelector(".results").childNodes[0].textContent);
               
               let char;
               if(this.operatorCalled === false){
                    switch (btn.id) {
                         case 'add':
                              char = ' +';
                              this.operator = 'add';
                              
                             
                              break;
                         case 'subtract':
                              char = ' -'
                              this.operator = 'subtract';
                              
                              break;
                         case 'divide':
                              char = ' /'
                              this.operator = 'divide';
                              
                              break;
                         case 'multiply':
                              char = ' x'
                              this.operator = 'multiply';
                              break;
                         default:
                              console.log('err at update equation in MainButtons.vue');
                              break;
                    }

                    this.inputMem.push(num);

                    this.beg = equation.textContent;
               
                    this.operatorCalled = true;

                    (this.solved) ? this.solved = false : ''

                    this.decimalCalled = false;

                    (equation.textContent === '') ? '' :
                    this.checkEquationTxt(char, false);
               } else {
                    if(resultBox.textContent !== ''){
                         this.solve();
                         this.updateEquationData(btn); 
                    }
               }

               resultBox.textContent = '';

          },
          roundAccurately(num, decimalPlaces) {
               return Number(Math.round(num + "e" + decimalPlaces) + "e-" + decimalPlaces);
          },
          solve(){
               let resultBox = document.querySelector(".results").childNodes[0];
               let num1 = parseFloat(this.inputMem[0]);
               let num2 = parseFloat(resultBox.textContent);
               let result;

               if(this.inputMem.length > 0) {
                    switch (this.operator) {
                         case 'add':
                              result = num1 + num2
                              break;
                         case 'subtract':
                              result = num1 - num2
                              break;
                         case 'multiply':
                              result = num1 * num2
                              break;
                         case 'divide':
                              result = num1 / num2
                              break;
                         default:
                              console.log('err at solve() in MainButtons.vue');
                              break;
                    }
                    this.end = num2.toString();
                    resultBox.textContent = this.roundAccurately(result, 3);   
                    this.operatorCalled = false;
                    this.decimalCalled = false;
                    this.inputMem.length = 0;    

               }
          },
          //Modifiers
          percent(){
               setTimeout(() => {
                    let resultBox = document.querySelector(".results").childNodes[0];
                    let num  = parseFloat(resultBox.textContent);
                    let result = num * .01;
                    result = this.roundAccurately(result, 3);
                    if(!isNaN(result) && result !== 0){
                    this.equation.textContent += ' x .01'
                    resultBox.textContent = result;}
                    this.decimalCalled = true;
               });

          },
          sqrt(){
               let resultBox = document.querySelector(".results").childNodes[0];
               let num  = parseFloat(resultBox.textContent);
               let result;
               (num > 0) ? result = Math.sqrt(num) : result = -1 * (Math.sqrt(num * -1))
               
               result = this.roundAccurately(result, 3);
               if(!isNaN(result)){
                    this.checkEquationTxt('', true, num, 'sqrt')
                    resultBox.textContent = result;}
               this.solved = true;
               
          },
          invert(){
               let resultBox = document.querySelector(".results").childNodes[0];
               let num = parseFloat(resultBox.textContent);
               let result = num * -1;
               if(!isNaN(result)){
                    this.checkEquationTxt('', true, num, 'invert')
                    resultBox.textContent = result;}
               
          },
          decimal(){
               let resultBox = document.querySelector(".results").childNodes[0];
               let equation = document.querySelector(".equation");
               let length = this.equation.textContent.length;
               
               if(!this.decimalCalled && !this.equation.textContent.includes('.')){
                    (equation.textContent[length - 1] === '.') ? '' : ( equation.textContent === '') ? equation.textContent = '0.': (!this.solved) ? this.checkEquationTxt('.', false) : '';
     
                    (resultBox.textContent === '') ? resultBox.textContent += '0.' : resultBox.textContent += '.';
               } else {
                    console.log('no more decimals');
               }
               this.decimalCalled = true;
          },
          
     }
}
</script>

<style lang="scss">
 .buttons-main{
     position: relative;
     justify-self: center;
     align-self: center;
     display: grid; 
     grid-template-rows: 1fr 1fr 1fr 1fr;
     grid-template-columns: 1fr 1fr 1fr 1fr;
     place-items: center;
     background: rgba(rgb(32, 29, 29), .6);
     width: 100%;
     transition: .5s linear;
     
     &:hover{
          box-shadow: 10px 10px 22px -1px rgba(0,0,0,0.23);
          width: 104%;
     }
}

.calc-btn{
     font-family: var(--ff1);
     background: none;
     border: none;
     color: var(--clr3);
     font-weight: bold;
     padding: 1em;
     font-size: 1.3em;
     cursor: pointer;
     transition: .3s linear;
     width: 82%;
     height: 82%;
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
     

     &:focus{
          outline: none;
     }

     &:hover, &:focus{
          background: var(--clrLight);
          color: black;
          box-shadow: 0 0 10px var(--clrLight), 0 0 40px var(--clrLight), 0 0 80px var(--clrLight);
     }
}

.border{
     border: 1px solid var(--clr3);
}

#multiply, #add, #subtract, #divide{
     grid-column: 4/5;
}

#divide{
     grid-row: 1/2;
}
#multiply{
     grid-row: 2/3;
}
#subtract{
     grid-row: 3/4;
}
#add, .percent{
     grid-row: 4/5;
}
.sqrt, .invert{
     grid-row: 5/6;
}
.sqrt{
     grid-column: 1/2;
}
.invert{
     grid-column: 2/3;
}

.clear{
     grid-column: 3/5;
}

.percent{
     grid-column: 1/2;
}



</style>