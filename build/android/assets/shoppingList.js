function StartUp(){function e(){var e=Titanium.Database.open("products.db"),t=e.execute("SELECT * FROM products WHERE cart = 1  GROUP BY name"),i=[],o=Titanium.UI.createLabel({color:"#999",text:"No Items",font:{fontSize:20,fontFamily:"Helvetica Neue"},textAlign:"center",width:"auto"});for(t.rowCount<1&&a.add(o);t.isValidRow();){var r=t.fieldByName("name"),d=t.fieldByName("id"),c=t.fieldByName("image"),l=Titanium.UI.createView({left:0,bottom:0,width:"100%",height:1,touchEnabled:!1,backgroundColor:"grey"}),s=Ti.UI.createTableViewRow({title:r,hasChild:!0,id:d,url:"detail.js",height:"auto"}),u=Ti.UI.createLabel({color:"black",font:{fontFamily:"Arial",fontWeight:"normal"},text:r,left:80});s.add(u);var T=Ti.UI.createImageView({image:c,left:2,height:70});s.add(T),s.add(l),i.push(s),t.next(),o.text=""}n.setData(i),a.add(n),e.close()}function t(e){if(e.rowData.url){var t=Titanium.UI.createWindow({title:e.rowData.title,id:e.rowData.id,url:e.rowData.url,backgroundColor:"white"});t.open()}}function i(){for(var e=[],t=Titanium.Database.open("products.db"),i=t.execute("SELECT name FROM products WHERE cart = 1");i.isValidRow();)e.push(""+i.fieldByName("name")+"\n"),i.next();t.close;var a=Ti.Android.createIntent({action:Ti.Android.ACTION_SEND,type:"text/plain"});a.putExtra(Ti.Android.EXTRA_TEXT,""+e),a.addCategory(Ti.Android.CATEGORY_DEFAULT);var n=Ti.Android.createIntentChooser(a,"Send Message");Ti.Android.currentActivity.startActivity(n)}var a=Titanium.UI.createWindow({title:"Shopping List",backgroundColor:"white"});a.orientationModes=[Titanium.UI.PORTRAIT],Scanner=require("scanner2"),History=require("history");var n=Titanium.UI.createTableView({editable:!0});n.addEventListener("click",t),n.addEventListener("longpress",function(i){if(i.rowData.url){var a=Titanium.Database.open("products.db");a.execute("UPDATE products SET cart=? WHERE id=?",0,i.rowData.id),a.close();var o=Ti.UI.createNotification({message:"Item removed from Shopping List"});o.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,o.show(),e(),n.removeEventListener("click",t),setTimeout(function(){n.addEventListener("click",t)},1e3)}}),a.addEventListener("open",function(){var t,n,o,r,d,c,l,s,u,T;t=a.activity.actionBar,t&&(t.setTitle("Shopping List"),t.setDisplayHomeAsUp(!1),T=a.activity,T.onCreateOptionsMenu=function(t){n=t.menu,o=n.add({title:"Share",icon:"images/share21.png",showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}),o.addEventListener("click",i),r=n.add({title:"History",icon:"images/history6.png",showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}),r.addEventListener("click",function(){History.HistoryList()}),d=n.add({title:"Scanner",icon:"images/supermarket20.png",showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}),d.addEventListener("click",function(){Scanner.StartTheScanner()}),c=n.add({title:"Clear Shopping List",icon:"images/delete81red.png",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),c.addEventListener("click",function(){var t=Ti.UI.createAlertDialog({cancel:1,buttonNames:["Confirm","Cancel"],message:"Are you sure you want to clear all items?",title:"Delete All",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER});t.addEventListener("click",function(t){if(t.index===t.source.cancel&&Ti.API.info("The cancel button was clicked"),0===t.index){var i=Titanium.Database.open("products.db");i.execute("UPDATE products SET cart=? WHERE cart=?",0,1),i.close(),e();var a=Ti.UI.createNotification({message:"Shopping List cleared"});a.duration=Ti.UI.NOTIFICATION_DURATION_LONG,a.show()}}),t.show()}),l=n.add({title:"Refresh",icon:"images/refresh57white.png",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),l.addEventListener("click",function(){e();var t=Ti.UI.createNotification({message:"Shopping List Refreshed"});t.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,t.show()}),s=n.add({title:"About",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),s.addEventListener("click",function(){var e=Ti.UI.createNotification({message:"About"});e.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,e.show()}),u=n.add({title:"Help",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),u.addEventListener("click",function(){var e=Ti.UI.createNotification({message:"Help"});e.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,e.show()})},t.onHomeIconItemSelected=function(){var e=Ti.UI.createAlertDialog({message:" (c) Copyright 2014 Michael Harris. All Rights Reserved. ",ok:"Okay",title:"About"});e.show()}),e()}),a.addEventListener("focus",e),a.open()}exports.StartUp=StartUp;