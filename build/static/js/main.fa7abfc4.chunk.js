(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),i=t.n(o),c=t(2),u=function(e){return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{onChange:function(n){e.setNewFilter(n.target.value)}}))},l=function(e){if(null===e.newNotification)return r.a.createElement("div",null);var n="green";e.newNotification.includes("has already been removed from")&&(n="red"),e.newNotification.includes("validation failed")&&(n="red");var t={color:n,backgroundColor:"lightgray",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.a.createElement("div",{style:t},e.newNotification)},s=t(3),m=t.n(s),f="/api/persons",d=function(){return m.a.get(f).then(function(e){return e.data})},w=function(e){return m.a.post(f,e).then(function(e){return e.data}).catch(function(e){return e.response.data})},N=function(e){var n=f+"/".concat(e);return m.a.delete(n).then(function(e){return e.data})},b=function(e,n){var t=f+"/".concat(e);return m.a.put(t,n).then(function(e){return e.data})},v=function(e){var n=e.person,t=e.persons,a=e.setPersons,o=e.setNewNotifcation;return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(n.name,"?"))&&N(n.id).then(function(e){o("".concat(n.name," deleted")),setTimeout(function(){o(null)},5e3),function(){var e=t.filter(function(e){return e.id!==n.id});a(e)}()})}}," delete "))},h=function(e){var n=e.newFilter,t=e.persons,a=e.setPersons,o=t.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())}),i=(0===n.length?t:o).map(function(n){return r.a.createElement(v,{key:n.name,person:n,setPersons:a,persons:e.persons,setNewNotifcation:e.setNewNotifcation})});return r.a.createElement("div",null,i)},p=function(e){var n=e.persons,t=e.setPersons,a=e.setNewName,o=e.setNewNumber,i=e.setNewNotifcation,c=function(){setTimeout(function(){i(null)},5e3),a(""),o("")};return r.a.createElement("form",{onSubmit:function(a){if(a.preventDefault(),function(){var t=e.newName;return n.some(function(e){return e.name.toLowerCase()===t.toLowerCase()})}()){if(window.confirm("".concat(e.newName," already exists in th phonebook. Replace the old number with a new one?"))){var r=(l=e.newName,n.find(function(e){return e.name.toLowerCase()===l.toLowerCase()}).id),o={name:e.newName,number:e.newNumber};b(r,o).then(function(e){return t(function(e){return n.filter(function(n){return e.id!==n.id}).concat(e)}(e))}).then(function(){i("Updated ".concat(e.newName)),c()}).catch(function(a){var r;i("Information of ".concat(e.newName," has already been removed from the server")),t((r=e.newName,n.filter(function(e){return r!==e.name}))),c()})}}else if(e.newName.length>0&&e.newNumber.length>0){var u={name:e.newName,number:e.newNumber};w(u).then(function(a){a.error?i("".concat(a.error)):(t(n.concat(a)),i("Added ".concat(e.newName)))}),c()}else alert("Please enter a name and number");var l}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:function(e){a(e.target.value)}})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:function(e){o(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=Object(a.useState)([]),t=Object(c.a)(n,2),o=t[0],i=t[1],s=Object(a.useState)(""),m=Object(c.a)(s,2),f=m[0],w=m[1],N=Object(a.useState)(""),b=Object(c.a)(N,2),v=b[0],E=b[1],g=Object(a.useState)(""),j=Object(c.a)(g,2),C=j[0],O=j[1],y=Object(a.useState)(null),P=Object(c.a)(y,2),S=P[0],k=P[1];return Object(a.useEffect)(function(){d().then(function(e){return i(e)})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(l,{newNotification:S}),r.a.createElement(u,{setNewFilter:O}),r.a.createElement("h2",null,"add a new"),r.a.createElement(p,{persons:o,setPersons:i,newName:f,setNewName:w,newNumber:v,setNewNumber:E,newNotification:S,setNewNotifcation:k}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(h,{newFilter:C,persons:o,setPersons:i,setNewNotifcation:k}))};i.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.fa7abfc4.chunk.js.map