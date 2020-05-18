function showSublist(docid){
    
    var x=document.getElementById(docid).style.display;
    if(x=="none")document.getElementById(docid).style.display="block";
    else document.getElementById(docid).style.display="none";
  }
function showContent(docid){
    alert(docid);
}
  function addmenu(){
      var nrtitles=4;
      var titles=["I.Introduction","B","C","D"];
      var nrsubtitles=[2,3,4,3];
      var subtitles=[["I.1.Statement","I.2.Overall"],["bc","bd","be"],["cd","ce","cf","cg"],["de","df","dg","dh"]];

      for(var i=0;i<nrtitles;i++){
          var arrow="";
          if(nrsubtitles[i]!=0){arrow=` <span style=" transform:rotate(+90deg);display: inline-block;">&#x203A;</span>`}
          var listofsubtitles="";
          for(var j=0;j<nrsubtitles[i];j++){
                listofsubtitles+=  `<span onclick="showContent('`+subtitles[i][j] +`')">`+subtitles[i][j]+`</span><br>`;
          }
        document.getElementById("mySidenav").innerHTML+=`  <div style="padding: 7px 16px;">
        <a onclick="showSublist('`+titles[i]+`')">`+titles[i]+ arrow+` </a>
            <div id="`+titles[i]+`" style="display:none;padding-left: 15px;color:var(--second-color);font-size: 16px;">`+

               listofsubtitles+
           ` </div>
        </div>`;
      }
      
  }