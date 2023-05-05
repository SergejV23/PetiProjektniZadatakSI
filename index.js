const firebaseConfig = {
    apiKey: "AIzaSyBM6xx36rkieJWh_x3hH_U0SU-tPUbs13g",
    authDomain: "imguploadsv.firebaseapp.com",
    projectId: "imguploadsv",
    storageBucket: "imguploadsv.appspot.com",
    messagingSenderId: "451852259206",
    appId: "1:451852259206:web:3200089841eaf8a4fe2607",
    measurementId: "G-74DKR35SFK"
  };

firebase.initializeApp(firebaseConfig);



var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress =  document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
 function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}


function uploadImage(){

    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);


    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error: ", error);
    },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);

            if(url != ""){
                img.setAttribute("src",url);
                img.style.display="block";
            }


        })


    })
    
    
}