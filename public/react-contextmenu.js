!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactContextMenu=t(require("react")):e.ReactContextMenu=t(e.React)}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=11)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function o(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return"function"==typeof e&&e.apply(void 0,n)}function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function i(){return Math.random().toString(36).substring(7)}t.a=o,t.d=r,t.f=i,n.d(t,"c",function(){return u}),n.d(t,"e",function(){return a}),n.d(t,"b",function(){return s});var u={menu:"react-contextmenu",menuVisible:"react-contextmenu--visible",menuWrapper:"react-contextmenu-wrapper",menuItem:"react-contextmenu-item",menuItemActive:"react-contextmenu-item--active",menuItemDisabled:"react-contextmenu-item--disabled",menuItemDivider:"react-contextmenu-item--divider",menuItemSelected:"react-contextmenu-item--selected",subMenu:"react-contextmenu-submenu"},a={},s=Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)},function(e,t,n){e.exports=n(13)()},function(e,t,n){"use strict";function o(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var r=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,a,s=o(e),c=1;c<arguments.length;c++){n=Object(arguments[c]);for(var l in n)i.call(n,l)&&(s[l]=n[l]);if(r){a=r(n);for(var f=0;f<a.length;f++)u.call(n,a[f])&&(s[a[f]]=n[a[f]])}}return s}},function(e,t,n){"use strict";function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,o=void 0;"function"==typeof window.CustomEvent?o=new window.CustomEvent(e,{detail:t}):(o=document.createEvent("CustomEvent"),o.initCustomEvent(e,!1,!0,t)),n&&(n.dispatchEvent(o),a()(s.e,t))}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];o(c,a()({},e,{type:c}),t)}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];o(l,a()({},e,{type:l}),t)}n.d(t,"b",function(){return c}),n.d(t,"a",function(){return l}),t.d=r,t.c=i;var u=n(3),a=n.n(u),s=n(1),c="REACT_CONTEXTMENU_SHOW",l="REACT_CONTEXTMENU_HIDE"},function(e,t,n){var o,r;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=typeof o;if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o))e.push(n.apply(null,o));else if("object"===r)for(var u in o)i.call(o,u)&&o[u]&&e.push(u)}}return e.join(" ")}var i={}.hasOwnProperty;void 0!==e&&e.exports?e.exports=n:(o=[],void 0!==(r=function(){return n}.apply(t,o))&&(e.exports=r))}()},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=n(4),i=n(1),u=function e(){var t=this;o(this,e),this.handleShowEvent=function(e){for(var n in t.callbacks)Object(i.d)(t.callbacks,n)&&t.callbacks[n].show(e)},this.handleHideEvent=function(e){for(var n in t.callbacks)Object(i.d)(t.callbacks,n)&&t.callbacks[n].hide(e)},this.register=function(e,n){var o=Object(i.f)();return t.callbacks[o]={show:e,hide:n},o},this.unregister=function(e){e&&t.callbacks[e]&&delete t.callbacks[e]},this.callbacks={},i.b&&(window.addEventListener(r.b,this.handleShowEvent),window.addEventListener(r.a,this.handleHideEvent))};t.a=new u},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(0),a=n.n(u),s=n(2),c=n.n(s),l=n(8),f=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return d.call(n),n.seletedItemRef=null,n.state={selectedItem:null,forceSubMenuOpen:!1},n}return i(t,e),t}(u.Component);f.propTypes={children:c.a.node.isRequired};var d=function(){var e=this;this.handleKeyNavigation=function(t){if(!1!==e.state.isVisible)switch(t.keyCode){case 37:case 27:t.preventDefault(),e.hideMenu(t);break;case 38:t.preventDefault(),e.selectChildren(!0);break;case 40:t.preventDefault(),e.selectChildren(!1);break;case 39:e.tryToOpenSubMenu(t);break;case 13:t.preventDefault(),e.tryToOpenSubMenu(t),e.seletedItemRef&&e.seletedItemRef.ref instanceof HTMLElement&&e.seletedItemRef.ref.click()}},this.handleForceClose=function(){e.setState({forceSubMenuOpen:!1})},this.tryToOpenSubMenu=function(t){e.state.selectedItem&&e.state.selectedItem.type===e.getSubMenuType()&&(t.preventDefault(),e.setState({forceSubMenuOpen:!0}))},this.selectChildren=function(t){var n=e.state.selectedItem,o=[],r=function t(n){n&&([l.a,e.getSubMenuType()].indexOf(n.type)<0?a.a.Children.forEach(n.props.children,t):n.props.divider||o.push(n))};a.a.Children.forEach(e.props.children,r);var i=o.indexOf(n);i<0?e.setState({selectedItem:t?o[o.length-1]:o[0],forceSubMenuOpen:!1}):t?e.setState({selectedItem:o[i-1<0?o.length-1:i-1],forceSubMenuOpen:!1}):e.setState({selectedItem:o[i+1<o.length?i+1:0],forceSubMenuOpen:!1})},this.onChildMouseMove=function(t){e.state.selectedItem!==t&&e.setState({selectedItem:t,forceSubMenuOpen:!1})},this.onChildMouseLeave=function(){e.setState({selectedItem:null,forceSubMenuOpen:!1})},this.renderChildren=function(t){return a.a.Children.map(t,function(t){var n={};return a.a.isValidElement(t)?[l.a,e.getSubMenuType()].indexOf(t.type)<0?(n.children=e.renderChildren(t.props.children),a.a.cloneElement(t,n)):(n.onMouseLeave=e.onChildMouseLeave.bind(e),t.type===e.getSubMenuType()&&(n.forceOpen=e.state.forceSubMenuOpen&&e.state.selectedItem===t,n.forceClose=e.handleForceClose,n.parentKeyNavigationHandler=e.handleKeyNavigation),t.props.divider||e.state.selectedItem!==t?(n.onMouseMove=function(){return e.onChildMouseMove(t)},a.a.cloneElement(t,n)):(n.selected=!0,n.ref=function(t){e.seletedItemRef=t},a.a.cloneElement(t,n))):t})}};t.a=f},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),c=n(2),l=n.n(c),f=n(5),d=n.n(f),p=n(3),h=n.n(p),b=n(4),m=n(1),v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},y=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),g=function(e){function t(){var e,n,o,u;r(this,t);for(var a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];return n=o=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),o.handleClick=function(e){e.preventDefault(),o.props.disabled||o.props.divider||(Object(m.a)(o.props.onClick,e,h()({},o.props.data,m.e.data),m.e.target),o.props.preventClose||Object(b.c)())},u=n,i(o,u)}return u(t,e),y(t,[{key:"render",value:function(){var e,t=this,n=this.props,r=n.disabled,i=n.divider,u=n.children,a=n.attributes,c=n.selected,l=d()(m.c.menuItem,a&&a.className,(e={},o(e,m.c.menuItemDisabled,r),o(e,m.c.menuItemDivider,i),o(e,m.c.menuItemSelected,c),e));return s.a.createElement("div",v({},a,{className:l,role:"menuitem",tabIndex:"-1","aria-disabled":r?"true":"false","aria-orientation":i?"horizontal":null,ref:function(e){t.ref=e},onMouseMove:this.props.onMouseMove,onMouseLeave:this.props.onMouseLeave,onTouchEnd:this.handleClick,onClick:this.handleClick}),i?null:u)}}]),t}(a.Component);g.propTypes={children:l.a.node,attributes:l.a.object,data:l.a.object,disabled:l.a.bool,divider:l.a.bool,preventClose:l.a.bool,onClick:l.a.func,selected:l.a.bool,onMouseMove:l.a.func,onMouseLeave:l.a.func},g.defaultProps={disabled:!1,data:{},divider:!1,attributes:{},preventClose:!1,onClick:function(){return null},children:null,selected:!1,onMouseMove:function(){return null},onMouseLeave:function(){return null}},t.a=g},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),c=n(2),l=n.n(c),f=n(5),d=n.n(f),p=n(3),h=n.n(p),b=n(7),m=n(1),v=n(6),y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},g=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),O=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getMenuPosition=function(){var e=window,t=e.innerWidth,o=e.innerHeight,r=n.subMenu.getBoundingClientRect(),i={};return r.bottom>o?i.bottom=0:i.top=0,r.right<t?i.left="100%":i.right="100%",i},n.getRTLMenuPosition=function(){var e=window,t=e.innerHeight,o=n.subMenu.getBoundingClientRect(),r={};return o.bottom>t?r.bottom=0:r.top=0,o.left<0?r.left="100%":r.right="100%",r},n.hideMenu=function(){n.props.forceOpen&&n.props.forceClose(),n.setState({visible:!1,selectedItem:null})},n.handleClick=function(e){e.preventDefault()},n.handleMouseEnter=function(){n.closetimer&&clearTimeout(n.closetimer),n.props.disabled||n.state.visible||(n.opentimer=setTimeout(function(){return n.setState({visible:!0,selectedItem:null})},n.props.hoverDelay))},n.handleMouseLeave=function(){n.opentimer&&clearTimeout(n.opentimer),n.state.visible&&(n.closetimer=setTimeout(function(){return n.setState({visible:!1,selectedItem:null})},n.props.hoverDelay))},n.menuRef=function(e){n.menu=e},n.subMenuRef=function(e){n.subMenu=e},n.registerHandlers=function(){document.removeEventListener("keydown",n.props.parentKeyNavigationHandler),document.addEventListener("keydown",n.handleKeyNavigation)},n.unregisterHandlers=function(){document.removeEventListener("keydown",n.handleKeyNavigation),document.addEventListener("keydown",n.props.parentKeyNavigationHandler)},n.state=h()({},n.state,{visible:!1}),n}return u(t,e),g(t,[{key:"componentDidMount",value:function(){this.listenId=v.a.register(function(){},this.hideMenu)}},{key:"getSubMenuType",value:function(){return t}},{key:"shouldComponentUpdate",value:function(e,t){return this.isVisibilityChange=!(this.state.visible===t.visible&&this.props.forceOpen===e.forceOpen||this.state.visible&&e.forceOpen||this.props.forceOpen&&t.visible),!0}},{key:"componentDidUpdate",value:function(){var e=this;if(this.isVisibilityChange)if(this.props.forceOpen||this.state.visible){var t=window.requestAnimationFrame||setTimeout;t(function(){var t=e.props.rtl?e.getRTLMenuPosition():e.getMenuPosition();e.subMenu.style.removeProperty("top"),e.subMenu.style.removeProperty("bottom"),e.subMenu.style.removeProperty("left"),e.subMenu.style.removeProperty("right"),Object(m.d)(t,"top")&&(e.subMenu.style.top=t.top),Object(m.d)(t,"left")&&(e.subMenu.style.left=t.left),Object(m.d)(t,"bottom")&&(e.subMenu.style.bottom=t.bottom),Object(m.d)(t,"right")&&(e.subMenu.style.right=t.right),e.subMenu.classList.add(m.c.menuVisible),e.registerHandlers(),e.setState({selectedItem:null})})}else{var n=function t(){e.subMenu.removeEventListener("transitionend",t),e.subMenu.style.removeProperty("bottom"),e.subMenu.style.removeProperty("right"),e.subMenu.style.top=0,e.subMenu.style.left="100%",e.unregisterHandlers()};this.subMenu.addEventListener("transitionend",n),this.subMenu.classList.remove(m.c.menuVisible)}}},{key:"componentWillUnmount",value:function(){this.listenId&&v.a.unregister(this.listenId),this.opentimer&&clearTimeout(this.opentimer),this.closetimer&&clearTimeout(this.closetimer),this.unregisterHandlers()}},{key:"render",value:function(){var e,t=this.props,n=t.children,r=t.disabled,i=t.title,u=t.selected,a=this.state.visible,c={ref:this.menuRef,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,className:d()(m.c.menuItem,m.c.subMenu),style:{position:"relative"}},l={className:d()(m.c.menuItem,(e={},o(e,m.c.menuItemDisabled,r),o(e,m.c.menuItemActive,a),o(e,m.c.menuItemSelected,u),e)),onMouseMove:this.props.onMouseMove,onMouseOut:this.props.onMouseOut,onClick:this.handleClick},f={ref:this.subMenuRef,style:{position:"absolute",transition:"opacity 1ms",top:0,left:"100%"},className:d()(m.c.menu,this.props.className)};return s.a.createElement("nav",y({},c,{role:"menuitem",tabIndex:"-1","aria-haspopup":"true"}),s.a.createElement("div",l,i),s.a.createElement("nav",y({},f,{role:"menu",tabIndex:"-1"}),this.renderChildren(n)))}}]),t}(b.a);O.propTypes={children:l.a.node.isRequired,title:l.a.node.isRequired,className:l.a.string,disabled:l.a.bool,hoverDelay:l.a.number,rtl:l.a.bool,selected:l.a.bool,onMouseMove:l.a.func,onMouseOut:l.a.func,forceOpen:l.a.bool,forceClose:l.a.func,parentKeyNavigationHandler:l.a.func},O.defaultProps={disabled:!1,hoverDelay:500,className:"",rtl:!1,selected:!1,onMouseMove:function(){return null},onMouseOut:function(){return null},forceOpen:!1,forceClose:function(){return null},parentKeyNavigationHandler:function(){return null}},t.a=O},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(0),a=n.n(u),s=n(2),c=n.n(s),l=n(5),f=n.n(l),d=n(3),p=n.n(d),h=n(4),b=n(1),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),v=function(e){function t(){var e,n,i,u;o(this,t);for(var a=arguments.length,s=Array(a),c=0;c<a;c++)s[c]=arguments[c];return n=i=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),i.touchHandled=!1,i.handleMouseDown=function(e){i.props.holdToDisplay>=0&&0===e.button&&(e.persist(),e.stopPropagation(),i.mouseDownTimeoutId=setTimeout(function(){return i.handleContextClick(e)},i.props.holdToDisplay)),Object(b.a)(i.props.attributes.onMouseDown,e)},i.handleMouseUp=function(e){0===e.button&&clearTimeout(i.mouseDownTimeoutId),Object(b.a)(i.props.attributes.onMouseUp,e)},i.handleMouseOut=function(e){0===e.button&&clearTimeout(i.mouseDownTimeoutId),Object(b.a)(i.props.attributes.onMouseOut,e)},i.handleTouchstart=function(e){i.touchHandled=!1,i.props.holdToDisplay>=0&&(e.persist(),e.stopPropagation(),i.touchstartTimeoutId=setTimeout(function(){i.handleContextClick(e),i.touchHandled=!0},i.props.holdToDisplay)),Object(b.a)(i.props.attributes.onTouchStart,e)},i.handleTouchEnd=function(e){i.touchHandled&&e.preventDefault(),clearTimeout(i.touchstartTimeoutId),Object(b.a)(i.props.attributes.onTouchEnd,e)},i.handleContextMenu=function(e){i.handleContextClick(e),Object(b.a)(i.props.attributes.onContextMenu,e)},i.handleContextClick=function(e){if(!i.props.disable){e.preventDefault(),e.stopPropagation();var t=e.clientX||e.touches&&e.touches[0].pageX,n=e.clientY||e.touches&&e.touches[0].pageY;Object(h.c)();var o=Object(b.a)(i.props.collect,i.props),r={position:{x:t,y:n},target:i.elem,id:i.props.id,data:o};o&&"function"==typeof o.then?o.then(function(e){r.data=e,Object(h.d)(r)}):Object(h.d)(r)}},i.elemRef=function(e){i.elem=e},u=n,r(i,u)}return i(t,e),m(t,[{key:"render",value:function(){var e=this.props,t=e.renderTag,n=e.attributes,o=e.children,r=p()({},n,{className:f()(b.c.menuWrapper,n.className),onContextMenu:this.handleContextMenu,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchstart,onTouchEnd:this.handleTouchEnd,onMouseOut:this.handleMouseOut,ref:this.elemRef});return a.a.createElement(t,r,o)}}]),t}(u.Component);v.propTypes={id:c.a.string.isRequired,children:c.a.node.isRequired,attributes:c.a.object,collect:c.a.func,disable:c.a.bool,holdToDisplay:c.a.number,renderTag:c.a.oneOfType([c.a.node,c.a.func])},v.defaultProps={attributes:{},collect:function(){return null},disable:!1,holdToDisplay:1e3,renderTag:"div"},t.a=v},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(12);n.d(t,"ContextMenu",function(){return o.a});var r=n(10);n.d(t,"ContextMenuTrigger",function(){return r.a});var i=n(8);n.d(t,"MenuItem",function(){return i.a});var u=n(9);n.d(t,"SubMenu",function(){return u.a});var a=n(17);n.d(t,"connectMenu",function(){return a.a});var s=n(4);n.d(t,"hideMenu",function(){return s.c}),n.d(t,"showMenu",function(){return s.d})},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),c=n(2),l=n.n(c),f=n(5),d=n.n(f),p=n(3),h=n.n(p),b=n(6),m=n(7),v=n(9),y=n(4),g=n(1),O=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),w=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.registerHandlers=function(){document.addEventListener("mousedown",n.handleOutsideClick),document.addEventListener("ontouchstart",n.handleOutsideClick),document.addEventListener("scroll",n.handleHide),document.addEventListener("contextmenu",n.handleHide),document.addEventListener("keydown",n.handleKeyNavigation),window.addEventListener("resize",n.handleHide)},n.unregisterHandlers=function(){document.removeEventListener("mousedown",n.handleOutsideClick),document.removeEventListener("ontouchstart",n.handleOutsideClick),document.removeEventListener("scroll",n.handleHide),document.removeEventListener("contextmenu",n.handleHide),document.removeEventListener("keydown",n.handleKeyNavigation),window.removeEventListener("resize",n.handleHide)},n.handleShow=function(e){if(e.detail.id===n.props.id&&!n.state.isVisible){var t=e.detail.position,o=t.x,r=t.y;n.setState({isVisible:!0,x:o,y:r}),n.registerHandlers(),Object(g.a)(n.props.onShow,e)}},n.handleHide=function(e){!n.state.isVisible||e.detail&&e.detail.id&&e.detail.id!==n.props.id||(n.unregisterHandlers(),n.setState({isVisible:!1,selectedItem:null,forceSubMenuOpen:!1}),Object(g.a)(n.props.onHide,e))},n.handleOutsideClick=function(e){n.menu.contains(e.target)||Object(y.c)()},n.handleMouseLeave=function(e){e.preventDefault(),Object(g.a)(n.props.onMouseLeave,e,h()({},n.props.data,g.e.data),g.e.target),n.props.hideOnLeave&&Object(y.c)()},n.handleContextMenu=function(e){e.preventDefault(),n.handleHide(e)},n.hideMenu=function(e){27===e.keyCode&&Object(y.c)()},n.getMenuPosition=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o={top:t,left:e};if(!n.menu)return o;var r=window,i=r.innerWidth,u=r.innerHeight,a=n.menu.getBoundingClientRect();return t+a.height>u&&(o.top-=a.height),e+a.width>i&&(o.left-=a.width),o.top<0&&(o.top=a.height<u?(u-a.height)/2:0),o.left<0&&(o.left=a.width<i?(i-a.width)/2:0),o},n.menuRef=function(e){n.menu=e},n.state=h()({},n.state,{x:0,y:0,isVisible:!1}),n}return u(t,e),O(t,[{key:"getSubMenuType",value:function(){return v.a}},{key:"componentDidMount",value:function(){this.listenId=b.a.register(this.handleShow,this.handleHide)}},{key:"componentDidUpdate",value:function(){var e=this;if(this.state.isVisible){var t=window.requestAnimationFrame||setTimeout;t(function(){var n=e.state,o=n.x,r=n.y,i=e.getMenuPosition(o,r),u=i.top,a=i.left;t(function(){e.menu&&(e.menu.style.top=u+"px",e.menu.style.left=a+"px",e.menu.style.opacity=1,e.menu.style.pointerEvents="auto")})})}else{if(!this.menu)return;this.menu.style.opacity=0,this.menu.style.pointerEvents="none"}}},{key:"componentWillUnmount",value:function(){this.listenId&&b.a.unregister(this.listenId),this.unregisterHandlers()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,r=this.state.isVisible,i={position:"fixed",opacity:0,pointerEvents:"none"},u=d()(g.c.menu,n,o({},g.c.menuVisible,r));return s.a.createElement("nav",{role:"menu",tabIndex:"-1",ref:this.menuRef,style:i,className:u,onContextMenu:this.handleContextMenu,onMouseLeave:this.handleMouseLeave},this.renderChildren(t))}}]),t}(m.a);w.propTypes={id:l.a.string.isRequired,children:l.a.node.isRequired,data:l.a.object,className:l.a.string,hideOnLeave:l.a.bool,onHide:l.a.func,onMouseLeave:l.a.func,onShow:l.a.func},w.defaultProps={className:"",data:{},hideOnLeave:!1,onHide:function(){return null},onMouseLeave:function(){return null},onShow:function(){return null}},t.a=w},function(e,t,n){"use strict";var o=n(14),r=n(15),i=n(16);e.exports=function(){function e(e,t,n,o,u,a){a!==i&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";function o(e){return function(){return e}}var r=function(){};r.thatReturns=o,r.thatReturnsFalse=o(!1),r.thatReturnsTrue=o(!0),r.thatReturnsNull=o(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";function o(e,t,n,o,i,u,a,s){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,i,u,a,s],f=0;c=new Error(t.replace(/%s/g,function(){return l[f++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(e){};e.exports=o},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(0),a=n.n(u),s=n(10),c=n(6),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(Object.keys(s.a.propTypes)),["children"]);t.a=function(e){return function(t){return function(n){function u(t){o(this,u);var n=r(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,t));return n.handleShow=function(t){if(t.detail.id===e){var o=t.detail.data,r={};for(var i in o)d.includes(i)||(r[i]=o[i]);n.setState({trigger:r})}},n.handleHide=function(){n.setState({trigger:null})},n.state={trigger:null},n}return i(u,n),f(u,[{key:"componentDidMount",value:function(){this.listenId=c.a.register(this.handleShow,this.handleHide)}},{key:"componentWillUnmount",value:function(){this.listenId&&c.a.unregister(this.listenId)}},{key:"render",value:function(){return a.a.createElement(t,l({},this.props,{id:e,trigger:this.state.trigger}))}}]),u}(u.Component)}}}])});