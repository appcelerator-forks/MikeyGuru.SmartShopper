function getImage(){return Titanium.Media.showCamera({success:function(e){var t=(e.cropRect,e.media),i="pic1.png";Titanium.App.Properties.setString("filename",i);var a=Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,i);if(a.write(t),Ti.API.debug("Our type was: "+e.mediaType),e.mediaType==Ti.Media.MEDIA_TYPE_PHOTO&&(myImage.image=e.media,null!=Titanium.App.Properties.getString("filename")))var i=Titanium.App.Properties.getString("filename"),a=Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,i)}}),picture}var win=Titanium.UI.currentWindow;win.orientationModes=[Titanium.UI.PORTRAIT];var barcode=win.barcode,nameB=Ti.UI.createTextField({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:10,left:10,width:"95%",height:50,editable:!0,hintText:"Product Name",borderColor:"black",borderWidth:2}),brandB=Ti.UI.createTextField({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:70,left:10,width:"95%",height:50,editable:!0,hintText:"Product Brand (Optional)",borderColor:"black",borderWidth:2}),noteB=Ti.UI.createTextArea({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:130,left:10,width:"95%",height:100,editable:!0,hintText:"Notes  (Optional)",borderColor:"black",borderWidth:2}),barcodeB=Ti.UI.createTextField({color:"black",top:240,left:10,width:"auto",height:50,value:"Barcode: "+barcode,editable:!1}),picture,nameA=nameB.value.toString(),brandA=brandB.value,noteA=noteB.value,myImage=Ti.UI.createImageView({height:150,bottom:75});myImage.defaultImage="images/NoImage.png";var imageButton=Titanium.UI.createButton({title:"Add Image",right:10,top:240,width:100,height:50,backgroundColor:"grey",color:"black"});imageButton.addEventListener("click",getImage);var addButton=Titanium.UI.createButton({title:"Add Item",right:10,bottom:5,width:150,height:50,backgroundColor:"blue"});addButton.addEventListener("click",function(){var e=Titanium.Database.open("products.db");e.execute('INSERT INTO products (barcode, name, note, brand, image) VALUES("'+barcode+'","'+nameB.value.toString()+'","'+noteA+'","'+brandA+'","'+picture+'")'),e.close();var t=Ti.UI.createNotification({message:""+nameA+"added to Shopping List"});t.duration=Ti.UI.NOTIFICATION_DURATION_LONG,t.show(),Titanium.API.info("You clicked the add button"),win.close()});var cancelButton=Titanium.UI.createButton({title:"Cancel",left:10,bottom:5,width:150,height:50,backgroundColor:"red"});cancelButton.addEventListener("click",function(){win.close(),Titanium.API.info("You clicked the cancel button")}),win.add(barcodeB),win.add(imageButton),win.add(nameB),win.add(brandB),win.add(noteB),win.add(addButton),win.add(cancelButton),win.addEventListener("open",function(){var e=win.activity.actionBar;e&&(win.getActivity().invalidateOptionsMenu(),e.setDisplayHomeAsUp(!0),e.onHomeIconItemSelected=function(){win.close()})});