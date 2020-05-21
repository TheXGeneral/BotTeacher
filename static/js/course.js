function showSublist(docid){
    
    var x=document.getElementById(docid).style.display;
    if(x=="none")document.getElementById(docid).style.display="block";
    else document.getElementById(docid).style.display="none";
  }
function showContent(docid){
   document.getElementById("vid").src=docid;
}
  function addmenu(){
    var name;
    var nrtitles;
    var titles=[];
    var nrsubtitles=[];
    var subtitles=[];
    var content=[];
var cid=localStorage.getItem("CourseId");
console.log(cid);
    db.collection("courses").doc(cid).get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
let x=0;
       nrtitles=doc.data().nrtitles;
       for(var i=0;i<=nrtitles;i++){
            titles[i]=doc.data().titles[i];
            nrsubtitles[i]=doc.data().nrsubtitles[i];
            subtitles[i]=[];
            content[i]=[];
            for(var j=0;j<nrsubtitles[i];j++){
                subtitles[i][j]=doc.data().subtitles[x];
                content[i][j]=doc.data().content[x];
                x++;
            }
       }
      
       for(var i=0;i<nrtitles;i++){
        var arrow="";
        if(nrsubtitles[i]!=0){arrow=` <span style=" transform:rotate(+90deg);display: inline-block;">&#x203A;</span>`}
        var listofsubtitles="";
        for(var j=0;j<nrsubtitles[i];j++){
              listofsubtitles+=  `<span onclick="showContent('`+content[i][j] +`')">`+subtitles[i][j]+`</span><br>`;
        }
      document.getElementById("mySidenav").innerHTML+=`  <div style="padding: 7px 16px;">
      <a onclick="showSublist('`+titles[i]+`')">`+titles[i]+ arrow+` </a>
          <div id="`+titles[i]+`" style="display:none;padding-left: 15px;color:var(--second-color);font-size: 16px;">`+

             listofsubtitles+
         ` </div>
      </div>`;
    
    }
    setTimeout( showSublist(titles[0]),1000);
    showContent(content[0][0]);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
      
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
   addmenu();

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
    if(localStorage.getItem("UserId")){
        location.href="/";
    }
    else{
        location.href="/sign";  
    }
}
function gosrc(){
    if(localStorage.getItem("UserId")){
        location.href="/search";
    }
    else{
        location.href="/sign";  
    }
}