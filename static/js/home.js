var canvas = document.getElementById('nokey'),
   can_w = parseInt(canvas.getAttribute('width')),
   can_h = parseInt(canvas.getAttribute('height')),
   ctx = canvas.getContext('2d');

var ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 1,
      phase: 0
   },
   R = 2,
   balls = [],
   alpha_f = 0.03,
   alpha_phase = 0,
    
// Line
   link_line_width = 0.8,
   dis_limit = 260,
   add_mouse_point = true,
   mouse_in = false,
   mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
   };

// Random speed
function getRandomSpeed(pos){
    var  min = -1,
       max = 1;
    switch(pos){
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max){
    return Math.random()*(max - min) + min;
}

// Random Ball
function getRandomBall(){
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch(pos){
        case 'top':
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}
function randomSidePos(length){
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls(){
    Array.prototype.forEach.call(balls, function(b){
       if(!b.hasOwnProperty('type')){
           ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
           ctx.beginPath();
           ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
           ctx.closePath();
           ctx.fill();
       }
    });
}

// Update balls
function updateBalls(){
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        b.x += b.vx;
        b.y += b.vy;
        
        if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h)){
           new_balls.push(b);
        }
        
        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
    });
    var x=balls.length;
    balls = new_balls.slice(0);
    for(var i = 1; i <= x-balls.length; i++){
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h)-100,
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}

// loop alpha
function loopAlphaInf(){
    
}

// Draw lines
function renderLines(){
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
           
           fraction = getDisOf(balls[i], balls[j]) / dis_limit;
            
           if(fraction < 1){
               alpha = (1 - fraction).toString();

               ctx.strokeStyle = (getComputedStyle(document.documentElement).getPropertyValue('--second-color'));
               ctx.lineWidth = link_line_width;
               
               ctx.beginPath();
               ctx.moveTo(balls[i].x, balls[i].y);
               ctx.lineTo(balls[j].x, balls[j].y);
               ctx.stroke();
               ctx.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2){
    var  delta_x = Math.abs(b1.x - b2.x),
       delta_y = Math.abs(b1.y - b2.y);
    
    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
}

// add balls if there a little balls
function addBallIfy(){
    if(balls.length < 20){
        balls.push(getRandomBall());
    }
}

// Render
function render(){
    ctx.clearRect(0, 0, can_w, can_h);
    
    renderBalls();
    
    renderLines();
    
    updateBalls();
    
    addBallIfy();
    
    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num){
    for(var i = 1; i <= num; i++){
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    
    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function(e){
    initCanvas();
});

function goMovie(){
    initCanvas();
    initBalls(90);
    window.requestAnimationFrame(render);
}
goMovie();

// Mouse effect
canvas.addEventListener('mouseenter', function(){
   
    mouse_in = true;
    balls.push(mouse_ball);
});
canvas.addEventListener('mouseleave', function(){
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        if(!b.hasOwnProperty('type')){
            new_balls.push(b);
        }
    });
    balls = new_balls.slice(0);
});
canvas.addEventListener('mousemove', function(e){
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
});
canvas.addEventListener('click', function(){
    mouse_in = true;
    balls.push({
            x:  mouse_ball.x,
            y:  mouse_ball.y,
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
});
const trickBtn = document.getElementById('trick');
const btnContainer = document.querySelector('.btn-container');
// setting it initially
btnContainer.style.flexDirection = 'row';

trickBtn.addEventListener('mouseover', (e) => {
	const currentDir = btnContainer.style.flexDirection;
	if(currentDir === 'row') {
		btnContainer.style.flexDirection = 'row-reverse';
	} else {
		btnContainer.style.flexDirection = 'row';
	}
})

function cookiesaccepted(){
    document.getElementById("cookiespopup").style.display="none";
  document.body.style.overflowY="auto";
  document.getElementById("popcont").style.display="none"; 
  localStorage.setItem("AcceptedCookie","true");
}

function gosrc(){
    var txt=document.getElementById("impsrc").value;
    localStorage.setItem("search",txt.toString());
    location.href="./search?"+txt.toString();
}


function checkdata(){
    if(localStorage.getItem("AcceptedCookie")!="true"){
        document.getElementById("cookiespopup").style.display="block";
        document.body.style.overflowY="hidden";
        document.getElementById("popcont").style.display="block"; 
    }
    if(localStorage.getItem("UserId")){
        document.getElementById("name_profile").classList.add("dropbtn");
        document.getElementById("name_profile").innerHTML=localStorage.getItem("UserName") +`<img src="https://firebasestorage.googleapis.com/v0/b/botteacher-eaa55.appspot.com/o/` +localStorage.getItem("UserPhoto") +`?alt=media" style="padding-left:10px" id="avatar" class="avatar"> `;
        document.getElementById("name_profile").style.paddingBottom="7px";
        document.getElementById("name_profile").style.paddingTop="7px";
        document.getElementById("name_profile").onclick="";
    }
    else{
        document.getElementById("drpcont").style.display="none";
        document.getElementById("name_profile").style.paddingBottom="16px";
        document.getElementById("name_profile").style.paddingTop="16px";
        document.getElementById("name_profile").innerHTML="Login";
        document.getElementById("name_profile").setAttribute( "onClick", "javascript: f();" );
        
    }

    db.collection("courses").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            document.getElementById("row").innerHTML+=`  <div class="column">
            <div class="card">
                <img style="width:100%;" src="`+doc.data().cover+`">
              <p> <b style="font-size: 18px;padding: 0;padding-left: 10px;">`+doc.data().title+`</b> <button class="btnenroll" onclick="addcourse('`+doc.id+`')">Enroll</button></p>
              <p style="padding-left: 15px;">`+doc.data().author+` <span style="float:right;padding-right:10px">4.8 <img src="https://image.flaticon.com/icons/svg/2919/2919670.svg" style="height:14px"></span></p>
              </div>
          </div>`
            console.log(doc.id, " => ", doc.data());
        });
    });




}
function f(){
    location.href='/sign'
}
    function signout(){
        localStorage.setItem("UserId","");
        localStorage.setItem("UserName","");
        localStorage.setItem("UserPhoto","");
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

    function addcourse(cid){
        console.log(cid);

        var Uid=localStorage.getItem("UserId")
        if(Uid){
        db.collection("users").doc(Uid).get().then(function(doc) {
    if (doc.exists) {
        var x=[];
        var enr=0;
        x=doc.data().courses;
        console.log(x);
        for(var i=0;i<x.length;i++){
            if(x[i]==cid)
                {
                    console.log("Already enroled");
                    alert("Already Enroled");
                    enr=1;
                }
        }
        if(enr==0){
            db.collection('users').doc(Uid)
            .update( {
                courses: firebase.firestore.FieldValue.arrayUnion( cid )
             }).then(()=>{
                 alert("Done");
             }).catch(function(error) {
                console.log(error);
            });
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        }
        else{
            location.href="/sign";
        }
    }