(this.webpackJsonprestro=this.webpackJsonprestro||[]).push([[0],{26:function(e,t,a){},31:function(e,t,a){e.exports=a(62)},36:function(e,t,a){},38:function(e,t,a){},56:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(27),o=a.n(r),c=(a(36),a(5)),i=a(6),l=a(7),m=a(8),u=a(9),d=a(10),h=(a(37),a(38),a(4)),g=a(28),p=a.n(g).a.create({baseURL:"https://rupesh-laravel-api.herokuapp.com",headers:{"Content-type":"application/json","Access-Control-Allow-Origin":"*"}}),f=(a(56),function(e){Object(m.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(c.a)(this,a),n=t.call(this,e);var s=localStorage.getItem("token");return n.state={restaurants:[],selected:1,items:[],error:!1,errorMsg:"",isLoggedIn:!0,token:s},n.renderRestaurant=n.renderRestaurant.bind(Object(h.a)(n)),n.renderItems=n.renderItems.bind(Object(h.a)(n)),n.changeRestaurent=n.changeRestaurent.bind(Object(h.a)(n)),n.fetchItems=n.fetchItems.bind(Object(h.a)(n)),n.fetchRestaurant=n.fetchRestaurant.bind(Object(h.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){null!=this.state.token?this.setState({isLoggedIn:!0}):this.setState({isLoggedIn:!1}),this.fetchRestaurant(this.state.selected),this.fetchItems(this.state.selected)}},{key:"fetchRestaurant",value:function(){var e=this,t={headers:{Accept:"application/json",Authorization:this.state.token}};p.get("api/restaurant",t).then((function(t){console.log(t.data),e.setState({restaurants:t.data,selected:t.data[0].id})})).catch((function(t){401==t.response.status&&e.setState({isLoggedIn:!1})}))}},{key:"fetchItems",value:function(e){var t=this,a={headers:{Accept:"application/json",Authorization:this.state.token}};p.get("api/restaurant/items/"+e,a).then((function(e){console.log(e.data),t.setState({items:e.data})})).catch((function(e){401==e.response.status&&t.setState({isLoggedIn:!1}),t.setState({error:!0,errorMsg:e.response.data.error})}))}},{key:"changeRestaurent",value:function(e){var t=e.target.id;t=t.split("_")[1],this.setState({selected:t}),this.fetchItems(t)}},{key:"renderItems",value:function(){return s.a.createElement("ul",null,this.state.items.map((function(e,t){return s.a.createElement("li",{className:"list-group-item",key:"item_"+e.id},e.name)})))}},{key:"renderRestaurant",value:function(){var e=this;return s.a.createElement("ul",null,this.state.restaurants.map((function(t,a){return s.a.createElement("li",{className:"list-group-item btn btn-default",id:"res_"+t.id,onClick:e.changeRestaurent,key:"res_"+t.id},t.name)})))}},{key:"render",value:function(){return this.state.isLoggedIn?s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-lg-12"},s.a.createElement(u.b,{className:"btn btn-primary float-right",to:"/logout"},"Logout"),s.a.createElement("h1",{className:"text-center text-warning"},"Restaurant Page"))),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"restaurant-list col-lg-3"},s.a.createElement("div",{className:"list-group"},s.a.createElement("div",{className:"card card-default"},s.a.createElement("div",{className:"card-header"},"Restaurant List"),s.a.createElement("div",{className:"card-body"},this.renderRestaurant())))),s.a.createElement("div",{className:"item-list col-lg-9"},s.a.createElement("div",{className:"list-group"},s.a.createElement("div",{className:"card card-default"},s.a.createElement("div",{className:"card-header"},"Item List"),s.a.createElement("div",{className:"card-body"},this.renderItems())))))):s.a.createElement(d.a,{to:"/"})}}]),a}(n.Component)),b=a(12),v=(a(26),function(e){Object(m.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(c.a)(this,a);return(n=t.call(this,e)).state={email:"",password:"",mobile:"",otpLogin:!1,error:!1,errorMsg:"",isLoggedIn:!1},n.onChange=n.onChange.bind(Object(h.a)(n)),n.submitForm=n.submitForm.bind(Object(h.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=(localStorage.getItem("token"),localStorage.getItem("refresh_token"));if(null!=t){var a={grant_type:"refresh_token",refresh_token:t,client_id:"3",client_secret:"dW5uxirssoaBCEt1apYIRT3WZkEHdCGexUBjJXHx",scope:""};p.post("/oauth/token",a,{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(t){console.log(t.data),localStorage.setItem("token",t.data.token_type+" "+t.data.access_token),localStorage.setItem("refresh_token",t.data.refresh_token),e.setState({isLoggedIn:!0})})).catch((function(e){console.log(e.response)}))}}},{key:"onChange",value:function(e){if(console.log(e.target.name),"mobile"==e.target.name){var t=e.target.value;if(""!=t&&(!Number(t)||t.length>10))return;this.setState(Object(b.a)({},e.target.name,t))}else this.setState(Object(b.a)({},e.target.name,e.target.value))}},{key:"submitForm",value:function(e){var t=this;e.preventDefault();var a=this.state,n=a.email,s=a.password,r=a.mobile;if(n&&s){console.log("normal");p.post("api/login",{email:n,password:s}).then((function(e){localStorage.setItem("token",e.data.success.token.token_type+" "+e.data.success.token.access_token),localStorage.setItem("refresh_token",e.data.success.token.refresh_token),localStorage.setItem("user",e.data.success.user),t.setState({isLoggedIn:!0})})).catch((function(e){t.setState({error:!0,errorMsg:e.response.data.error})}))}else if(r){console.log("mobile");p.post("api/mobileLogin",{mobile:r}).then((function(e){t.setState({otpLogin:!0})})).catch((function(e){t.setState({error:!0,errorMsg:e.response.data.error})}))}else console.log("Error")}},{key:"render",value:function(){return this.state.isLoggedIn?s.a.createElement(d.a,{to:"/restaurant"}):this.state.otpLogin?s.a.createElement(d.a,{to:{pathname:"/otp",mobile:this.state.mobile}}):s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"wrapper fadeInDown"},s.a.createElement("div",{id:"formContent"},s.a.createElement("div",{className:"fadeIn first"},s.a.createElement("h2",null,"Login")),this.state.error?s.a.createElement("div",{class:"alert alert-danger alert-dismissible fade show"},s.a.createElement("button",{type:"button",class:"close","data-dismiss":"alert"},"\xd7"),this.state.errorMsg):"",s.a.createElement("form",{onSubmit:this.submitForm},s.a.createElement("input",{type:"text",id:"email",className:"fadeIn second",name:"email",value:this.state.email,onChange:this.onChange,placeholder:"email"}),s.a.createElement("input",{type:"password",id:"password",className:"fadeIn third",name:"password",value:this.state.password,onChange:this.onChange,placeholder:"password"}),s.a.createElement("h4",{className:"text-center"},"OR"),s.a.createElement("input",{type:"text",id:"mobile",className:"fadeIn third",name:"mobile",value:this.state.mobile,onChange:this.onChange,placeholder:"mobile"}),s.a.createElement("input",{type:"submit",className:"fadeIn forth",value:"Log In"})))))}}]),a}(n.Component)),k=function(e){Object(m.a)(a,e);var t=Object(l.a)(a);function a(e){return Object(c.a)(this,a),t.call(this,e)}return Object(i.a)(a,[{key:"componentDidMount",value:function(){localStorage.removeItem("token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user")}},{key:"render",value:function(){return s.a.createElement("div",{className:"text-center"},s.a.createElement("h2",null,"You are Logged out.."),s.a.createElement(u.b,{to:"/"},"Login Back"))}}]),a}(n.Component),E=function(e){Object(m.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(c.a)(this,a);return(n=t.call(this,e)).state={mobile:"",otp:"",error:!1,errorMsg:"",isLoggedIn:!1},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){console.log(this.props),this.setState({mobile:this.props.location.mobile}),this.onChange=this.onChange.bind(this),this.submitForm=this.submitForm.bind(this)}},{key:"onChange",value:function(e){var t=e.target.value;console.log(e.target.name),""!=t&&(!Number(t)||t.length>4)||this.setState(Object(b.a)({},e.target.name,t))}},{key:"submitForm",value:function(e){var t=this;e.preventDefault();var a=this.state,n=a.mobile,s=a.otp;console.log("mobile");p.post("api/otpVerification",{mobile:n,otp:s}).then((function(e){localStorage.setItem("token",e.data.success.token.token_type+" "+e.data.success.token.access_token),localStorage.setItem("refresh_token",e.data.success.token.token_type+" "+e.data.success.token.refresh_token),localStorage.setItem("user","Bearer "+e.data.success.user),t.setState({isLoggedIn:!0})})).catch((function(e){t.setState({error:!0,errorMsg:e.response.data.error})}))}},{key:"render",value:function(){return this.state.isLoggedIn?s.a.createElement(d.a,{to:"/restaurant"}):s.a.createElement("div",null,s.a.createElement("div",{className:"wrapper fadeInDown"},s.a.createElement("div",{id:"formContent"},s.a.createElement("div",{className:"fadeIn first"},s.a.createElement("h2",null,"Verify")),this.state.error?s.a.createElement("div",{class:"alert alert-danger alert-dismissible fade show"},s.a.createElement("button",{type:"button",class:"close","data-dismiss":"alert"},"\xd7"),this.state.errorMsg):"",s.a.createElement("form",{onSubmit:this.submitForm},s.a.createElement("input",{type:"text",id:"otp",className:"fadeIn second",name:"otp",value:this.state.otp,onChange:this.onChange,placeholder:"otp"}),s.a.createElement("input",{type:"submit",className:"fadeIn fifth",value:"Log In"})))))}}]),a}(n.Component),I=function(e){Object(m.a)(a,e);var t=Object(l.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(u.a,null,s.a.createElement(d.d,null,s.a.createElement(d.b,{exact:!0,path:"/",component:v}),s.a.createElement(d.b,{exact:!0,path:"/logout",component:k}),s.a.createElement(d.b,{exact:!0,path:"/otp",component:E}),s.a.createElement(d.b,{exact:!0,path:"/restaurant",component:f}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.0e60a7d9.chunk.js.map