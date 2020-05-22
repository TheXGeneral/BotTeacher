function gotocourse(cid){
    console.log(cid);
    localStorage.setItem("CourseId",cid);
   location.href="/course?"+cid;
}
    function checkdata(){
    if(localStorage.getItem("UserId")){
        document.getElementById("name_profile").classList.add("dropbtn");
        document.getElementById("name_profile").innerHTML=localStorage.getItem("UserName") +`<img src="https://firebasestorage.googleapis.com/v0/b/botteacher-eaa55.appspot.com/o/` +localStorage.getItem("UserPhoto") +`?alt=media" style="padding-left:10px" id="avatar" class="avatar"> `;
        document.getElementById("name_profile").style.paddingBottom="7px";
        document.getElementById("name_profile").style.paddingTop="8px";
        document.getElementById("name_profile").onclick="";
    }
    else{
        document.getElementById("drpcont").style.display="none";
        document.getElementById("name_profile").style.paddingBottom="16px";
        document.getElementById("name_profile").style.paddingTop="16px";
        document.getElementById("name_profile").innerHTML="Login";
        document.getElementById("name_profile").setAttribute( "onClick", "javascript: f();" );
        
    }
    db.collection("users").doc(localStorage.getItem("UserId")).get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
            var cour=[];
            cour=doc.data().courses;
           
        for(var i=0;i<cour.length;i++){
            ///////////////////////////
            console.log(i);
            setcourse(i,cour[i]);
            }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


}
function setcourse(i,courseID){
    db.collection("courses").doc(courseID).get().then(function(doc2) {
        if (doc2.exists) {
            console.log("Document data:", doc2.data());
            document.getElementById("allcourses").innerHTML+=` <div class="courses-container" >
            <div class="course" style="transform: translateY(`+105*(i)+`%);left:15%;">
              <div class="course-preview">
                <h6>Course</h6>
                <h2> <img style="height:110px" src="`+doc2.data().cover+ `"></h2>
                <a href="#">`+ doc2.data().nrtitles+` Chapters <i class="fas fa-chevron-right"></i></a>
              </div>
              <div class="course-info">
                <h6 style="text-align: left;">`+ doc2.data().author+`</h6>
                <h2 style="text-align: left;">`+doc2.data().title+`</h2>
                <button class="btn" onclick="gotocourse('`+doc2.id+`')">Continue</button>
              </div>
            </div>
          </div>`;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
function f(){
    location.href='/sign'
}
    function signout(){
        localStorage.setItem("UserId","");
        localStorage.setItem("UserName","");
        localStorage.setItem("UserPhoto","");
        location.href="/";
        checkdata();

    }

function goprofile(){
    if(localStorage.getItem("UserId")){
        location.href="/profile";
    }
    else{
        location.href="/sign";  
    }
}
function goset(){
    if(localStorage.getItem("UserId")){
        location.href="/settings";
    }
    else{
        location.href="/sign";  
    }
}
function gohome(){
        location.href="/";
  
}
function gosrc(){
    if(localStorage.getItem("UserId")){
        location.href="/search";
    }
    else{
        location.href="/sign";  
    }
}