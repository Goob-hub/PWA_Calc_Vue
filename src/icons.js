import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faSun, faTimes, faDivide, faSquareRootAlt, faPlus, faMinus, faMoon } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faTimes, faDivide, faSquareRootAlt, faPlus, faMinus, faSun, faMoon)

Vue.component('fa-icon', FontAwesomeIcon)