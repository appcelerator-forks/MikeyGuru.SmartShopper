function StartTheScanner(){var e=Titanium.UI.createWindow({title:"Scanner",backgroundColor:"#fff"});e.orientationModes=[Titanium.UI.PORTRAIT];var t=Ti.UI.createSwitch({titleOn:"Shopping Mode Enabled",titleOff:"Shopping Mode Disabled",value:!1,width:"auto",height:"auto",top:60,right:10});scanditsdk=require("com.mirasense.scanditsdk"),picker=scanditsdk.createView({width:"100%",height:"100%"}),picker.init("7cOhKjRx4CfTuA2q3y+MwAhFkJcba5dH6pEtm+71wHg",0),picker.showSearchBar(!0),picker.showToolBar(!0),picker.drawViewfinderTextHook(!1),picker.setSuccessCallback(function(e){var i=e.barcode;if(t.value===!0){var a=Titanium.Database.open("products.db");a.execute("UPDATE products SET cart=? WHERE barcode=?",0,e.barcode),a.close();var o=Ti.UI.createNotification({message:"Item removed from Shopping List"});o.duration=Ti.UI.NOTIFICATION_DURATION_SHORT,o.show()}if(t.value===!1){var n=Titanium.Network.createHTTPClient({autoEncodeUrl:!1,onload:function(){jsonObject=JSON.parse(this.responseText);var e=jsonObject.total_results_count;if(0===e){var t=Ti.UI.createAlertDialog({cancel:1,buttonNames:["Yes","No"],message:"Item not found. Would you like to add it manually?",title:"Add Item",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER});t.addEventListener("click",function(e){if(0===e.index){var t=Titanium.UI.createWindow({title:"Add Item",barcode:i,url:"manual.js",backgroundColor:"white"});t.open()}}),t.show()}var a=jsonObject.results[0].name,o=jsonObject.results[0].upc,n=jsonObject.results[0].category,d=jsonObject.results[0].brand,r=jsonObject.results[0].images[0],c=Ti.UI.createNotification({message:""+a+" added to Shopping List"});c.duration=Ti.UI.NOTIFICATION_DURATION_LONG,c.show();var l=Titanium.Database.open("products.db");l.execute('INSERT INTO products (barcode, name, note, brand, image) VALUES("'+o+'","'+a+'","'+n+'","'+d+'","'+r+'")'),l.close(),Ti.API.info("Received text: "+this.responseText)},onerror:function(e){Ti.API.debug(e.error),alert("error")},timeout:1e4});n.autoEncodeUrl=!0,n.open("GET",'https://api.semantics3.com/test/v1/products?q={"upc":"'+e.barcode+'"}'),n.setRequestHeader("api_key","SEM34364EE9873A128C31FA0C056ECFE442A"),n.send()}}),e.add(picker),e.addEventListener("blur",function(){picker.stopScanning()}),e.addEventListener("focus",function(){picker.startScanning()}),e.addEventListener("open",function(){var t,i,a,o;t=e.activity.actionBar,t&&(t.setTitle("Scanner"),e.getActivity().invalidateOptionsMenu(),t.setDisplayHomeAsUp(!0),t.onHomeIconItemSelected=function(){e.close()},o=e.activity,o.onCreateOptionsMenu=function(e){i=e.menu,a=i.add({title:"No Barcode",icon:"images/nobarcode.png",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS}),a.addEventListener("click",function(){var e=Titanium.UI.createWindow({title:"Add Item",url:"noBarcodeManual.js",backgroundColor:"white"});e.open()})})}),e.add(t),t.addEventListener("change",function(){if(t.value===!0){var e=Ti.UI.createNotification({message:"When items are scanned they will be removed from your shopping list"});e.duration=Ti.UI.NOTIFICATION_DURATION_LONG,e.show()}if(t.value===!1){var e=Ti.UI.createNotification({message:"When items are scanned they will be added to your shopping list"});e.duration=Ti.UI.NOTIFICATION_DURATION_LONG,e.show()}Ti.API.info("Switch value: "+t.value)}),e.open()}exports.StartTheScanner=StartTheScanner;