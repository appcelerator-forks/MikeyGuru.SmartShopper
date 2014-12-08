function HistoryList(){function e(){for(var e=Titanium.Database.open("products.db"),t=e.execute("SELECT * FROM products GROUP BY name"),n=[];t.isValidRow();){var o=t.fieldByName("name"),d=t.fieldByName("id"),r=t.fieldByName("image"),c=Ti.UI.createTableViewRow({title:o,hasChild:!0,id:d,url:"detail.js",height:40}),l=Ti.UI.createLabel({color:"black",font:{fontFamily:"Arial",fontWeight:"normal"},text:o,left:45,ellipsize:!0});c.add(l);var s=Ti.UI.createImageView({image:r,left:2,height:40}),u=Titanium.UI.createView({left:0,bottom:0,width:"100%",height:1,touchEnabled:!1,backgroundColor:"grey"});c.add(s),c.add(u),n.push(c),t.next()}a.setData(n),i.add(a),e.close()}function t(e){if(e.rowData.url){var t=Titanium.UI.createWindow({title:e.rowData.title,id:e.rowData.id,url:e.rowData.url,backgroundColor:"white"});t.open()}}var i=Titanium.UI.createWindow({title:"History",backgroundColor:"white"});i.orientationModes=[Titanium.UI.PORTRAIT];var a=Titanium.UI.createTableView({editable:!0});a.addEventListener("click",t),a.addEventListener("longpress",function(i){var n=Titanium.Database.open("products.db");n.execute("UPDATE products SET cart=? WHERE id=?",1,i.rowData.id),n.close();var o=Ti.UI.createNotification({message:"Item added to Shopping List"});o.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,o.show(),e(),a.removeEventListener("click",t),setTimeout(function(){a.addEventListener("click",t)},1e3)}),i.addEventListener("open",function(){var t,a,n,o,d;t=i.activity.actionBar,t&&(t.setTitle("History"),i.getActivity().invalidateOptionsMenu(),t.setDisplayHomeAsUp(!0),t.onHomeIconItemSelected=function(){i.close()},d=i.activity,d.onCreateOptionsMenu=function(t){a=t.menu,n=a.add({title:"Refresh",icon:"images/refresh57white.png",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),n.addEventListener("click",function(){e();var t=Ti.UI.createNotification({message:"Refreshed"});t.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,t.show()}),o=a.add({title:"Delete All",icon:"images/delete81.png",showAsAction:Ti.Android.SHOW_AS_ACTION_NEVER}),o.addEventListener("click",function(){var t=Ti.UI.createAlertDialog({cancel:1,buttonNames:["Confirm","Cancel"],message:"Are you sure you want to delete all items?",title:"Delete All",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER});t.addEventListener("click",function(t){if(t.index===t.source.cancel&&Ti.API.info("The cancel button was clicked"),0===t.index){var i=Titanium.Database.open("products.db");i.execute("DELETE FROM products"),i.close(),Ti.API.info("The confirm button was clicked"),e();var a=Ti.UI.createNotification({message:"ALll Items Deleted"});a.duration=Ti.UI.NOTIFICATION_DURATION_LONG,a.show()}}),t.show()})}),e()}),i.addEventListener("focus",e),i.open()}exports.HistoryList=HistoryList;