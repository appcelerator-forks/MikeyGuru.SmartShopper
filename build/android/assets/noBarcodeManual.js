function getImage(){Titanium.Media.showCamera({success:function(e){if(Ti.API.debug("Our type was: "+e.mediaType),e.mediaType==Ti.Media.MEDIA_TYPE_PHOTO){var t=e.media.imageAsResized(320,240),i=Ti.UI.createImageView({height:150,bottom:75,image:t}),a=(i.toImage().media,11+100*Math.random());a=Math.round(a);var o=Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,a.toString()+"temp.jpg");o.write(t),theimg=o.nativePath,Ti.API.info(theimg),win.add(i)}else alert("got the wrong type back ="+e.mediaType)},cancel:function(){},error:function(e){var t=Titanium.UI.createAlertDialog({title:"Camera"});t.setMessage(e.code==Titanium.Media.NO_CAMERA?"Please run this test on device":"Unexpected error: "+e.code),t.show()},saveToPhotoGallery:!1})}var win=Titanium.UI.currentWindow;win.orientationModes=[Titanium.UI.PORTRAIT];var nameB=Ti.UI.createTextField({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:10,left:10,width:"95%",height:50,editable:!0,hintText:"Product Name",borderColor:"black",borderWidth:2}),brandB=Ti.UI.createTextField({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:70,left:10,width:"95%",height:50,editable:!0,hintText:"Product Brand (Optional)",borderColor:"black",borderWidth:2}),noteB=Ti.UI.createTextArea({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,color:"grey",top:130,left:10,width:"95%",height:100,editable:!0,hintText:"Notes  (Optional)",borderColor:"black",borderWidth:2}),myImage=Ti.UI.createImageView({height:150,bottom:75}),imageButton=Titanium.UI.createButton({title:"Add Image",left:10,top:240,width:100,height:50,backgroundColor:"grey",color:"black"});imageButton.addEventListener("click",getImage);var addButton=Titanium.UI.createButton({title:"Add Item",right:10,bottom:5,width:150,height:50,backgroundColor:"blue"});addButton.addEventListener("click",function(){var e=Titanium.Database.open("products.db");e.execute('INSERT INTO products (name, note, brand, image) VALUES("'+nameB.value.toString()+'","'+noteB.value.toString()+'","'+brandB.value.toString()+'","'+theimg+'")'),e.close();var t=Ti.UI.createNotification({message:""+nameB.value.toString()+"added to Shopping List"});t.duration=Ti.UI.NOTIFICATION_DURATION_LONG,t.show(),Titanium.API.info("You clicked the add button"),win.close()});var cancelButton=Titanium.UI.createButton({title:"Cancel",left:10,bottom:5,width:150,height:50,backgroundColor:"red"});cancelButton.addEventListener("click",function(){win.close(),Titanium.API.info("You clicked the cancel button")}),win.add(myImage),win.add(imageButton),win.add(nameB),win.add(brandB),win.add(noteB),win.add(addButton),win.add(cancelButton),win.addEventListener("open",function(){var e=win.activity.actionBar;e&&(win.getActivity().invalidateOptionsMenu(),e.setDisplayHomeAsUp(!0),e.onHomeIconItemSelected=function(){win.close()})});