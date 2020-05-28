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
var position=0;
function goregis(){
    document.getElementById("regdiv").style.display="block";
    document.getElementById("logdiv").style.display="none";
document.getElementById("regi").classList.add('active');
document.getElementById("logi").classList.remove('active');
document.getElementById("log_em").value="";
document.getElementById("log_pas").value="";
position=1;
}
function golog(){
    document.getElementById("regdiv").style.display="none";
    document.getElementById("logdiv").style.display="block";
document.getElementById("regi").classList.remove('active');
document.getElementById("logi").classList.add('active');
document.getElementById("reg_em").value="";
document.getElementById("reg_pas").value="";
document.getElementById("reg_repas").value="";
document.getElementById("reg_name").value="";
document.getElementById("reg_birth").value="";
document.getElementById("selph").src="./img/avatar.png";
document.getElementById("termscheck").value="";
document.querySelector('.file-select').value="";

position=0;
}
document.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) {
                if(position==0)login();
                else regis();
    }
  });
function login(){
    document.getElementById("overlay").style.display="block";
    var lem=document.getElementById("log_em").value;
    var lpas=document.getElementById("log_pas").value;
    firebase.auth().signInWithEmailAndPassword(lem, lpas).then(cred=> {
  alert("connected");
  document.getElementById("overlay").style.display="none";
      document.getElementById("log_em").value="";
      document.getElementById("log_pas").value="";
   console.log("Login Succes");   
  localStorage.setItem("UserId",cred.user.uid);
  db.collection("users").doc(cred.user.uid).get().then(function(doc) {
    if (doc.exists) {
        localStorage.setItem("UserPhoto",doc.data().photo_id);
        localStorage.setItem("UserName",doc.data().name);
        location.href="/profile";
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});        
  }).catch(function(error) {
    document.getElementById("overlay").style.display="none";
    console.log(error);
    ShowAlert(error.toString());
  });
  }

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  document.getElementById("selph").src=URL.createObjectURL(selectedFile);
}
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function ShowAlert(txt){
    alert(txt);
}
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
function regis(){
    document.getElementById("overlay").style.display="block";
    var reg_em=document.getElementById("reg_em").value;
    var reg_pas=document.getElementById("reg_pas").value;
    var reg_repas=document.getElementById("reg_repas").value;
    var reg_name=document.getElementById("reg_name").value;
    var reg_birth=document.getElementById("reg_birth").value;
    console.log(reg_birth);
    console.log(selectedFile);
    if(reg_em==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Email field cannot be null");
    }
    else if(reg_pas==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Password field cannot be null");
    }
    else if(reg_repas==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Repeat Password field cannot be null");
    }
    else if(reg_name==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Username field cannot be null");
    }
    else if(reg_birth==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Birth date field cannot be null");
    }
     
    else if(document.getElementById("termscheck").value==false){ 
        document.getElementById("overlay").style.display="none";
        ShowAlert("Please accept terms and conditions");   
    }
    else if(reg_pas == reg_repas) {
        //signup the user
        console.log("passed pas==repas");
        auth.createUserWithEmailAndPassword(reg_em, reg_pas)
       .then( cred => {
        localStorage.setItem("UserId",cred.user.uid);
            let a=uuidv4();
            localStorage.setItem("UserPhoto",a.toString());
            localStorage.setItem("UserName",reg_name);
            console.log(a);
            const uploadTask = storageRef.child(a).put(selectedFile); //create a child directory called images, and place the file inside this directory
            uploadTask.on('state_changed', (snapshot) => {
            }, (error) => {
              // Handle unsuccessful uploads
              console.log(error);

              ShowAlert(error.toString());
              return 0; 
            }, () => {
                db.collection('users').doc(cred.user.uid).set({
                    name: reg_name ,
                    birtdate:reg_birth,
                    photo_id:a,
                    subscription:0,
                }).then(() => {
                    location.href="/profile";
                })
                .catch(function(error) {
                    document.getElementById("overlay").style.display="none";
                    console.log(error);
                  })
                alert("connected");
                document.getElementById("overlay").style.display="none";
               console.log('Added all');
            });   
        }).catch(function(error) {
            if(selectedFile==undefined){
                db.collection('users').doc(localStorage.getItem("UserId")).set({
                    name: reg_name ,
                    birtdate:reg_birth,
                    photo_id:"avatar.png",
                    subscription:0,
                    courses:["6bc17b6e-52be-4dcd-9e06-1b24160453d1"]

    
                }).then(() => {
                    localStorage.setItem("UserPhoto","avatar.png");
                     localStorage.setItem("UserName",reg_name);
                    location.href="/profile";
                })
                .catch(function(error) {
                    document.getElementById("overlay").style.display="none";
                    console.log(error);
                  })
                alert("connected");
                document.getElementById("overlay").style.display="none";
               console.log('Added all');
          
            }
            else{
            document.getElementById("overlay").style.display="none";
            console.log(error);
            ShowAlert(error.toString());}
          })
    
        }
        else {
            document.getElementById("overlay").style.display="none";
            ShowAlert("Passwords don't match");
        }
 
       
}



