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