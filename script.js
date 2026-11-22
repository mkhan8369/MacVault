var data=[
{c:"COMMERCE 1BA3",t:"Week 1–6 Study Notes",k:"Notes",r:5,by:"A. student"},
{c:"COMMERCE 1BA3",t:"Midterm Practice Questions",k:"Practice",r:4,by:"M. student"},
{c:"ECON 1B03",t:"Supply and Demand Summary",k:"Notes",r:4,by:"S. student"},
{c:"ECON 1B03",t:"Formula Cheat Sheet",k:"Cheat sheets",r:3,by:"H. student"},
{c:"COMMERCE 2FA3",t:"Accounting Cycle Practice Set",k:"Practice",r:5,by:"Q. student"},
{c:"COMMERCE 2FA3",t:"Final Exam Review Guide",k:"Cheat sheets",r:2,by:"D. student"}];
var cats=["All","Notes","Practice","Cheat sheets"],cat="All",cr=10,own={},extra=0;
var q=document.getElementById("q"),list=document.getElementById("list"),chips=document.getElementById("chips");
function stars(n){return "★★★★★".slice(0,n)+"☆☆☆☆☆".slice(0,5-n)}
function draw(){
 chips.innerHTML="";
 cats.forEach(function(c){var b=document.createElement("button");b.type="button";b.className="chip"+(c===cat?" on":"");b.textContent=c;b.onclick=function(){cat=c;draw()};chips.appendChild(b)});
 var s=q.value.toLowerCase().trim();
 var rows=data.filter(function(d){return (cat==="All"||d.k===cat)&&(!s||(d.c+" "+d.t).toLowerCase().indexOf(s)>-1)}).sort(function(a,b){return b.r-a.r});
 list.innerHTML=rows.length?"":"<p class=note>No matches yet. Be the first to upload for this course!</p>";
 rows.forEach(function(d){
  var id=d.c+d.t,cost=d.r,el=document.createElement("div");el.className="res";
  el.innerHTML="<div><b>"+d.t+"</b><small>"+d.c+" · "+d.k+" · by "+d.by+"</small></div><div><span class=stars>"+stars(d.r)+"</span></div>";
  var b=document.createElement("button");b.type="button";b.className="mini";
  if(own[id]){b.textContent="Unlocked ✓";b.disabled=true}else{b.textContent="Unlock · "+cost+" credits";b.onclick=function(){if(cr>=cost){cr-=cost;own[id]=1;sync();draw()}else{b.textContent="Need more credits, upload one!"}}}
  el.appendChild(b);list.appendChild(el)});
}
function sync(){document.getElementById("cr").textContent=cr}
document.getElementById("up").onclick=function(){extra++;cr+=3;sync();data.push({c:q.value.trim().toUpperCase()||"COMMERCE 1BA3",t:"Your uploaded resource #"+extra,k:cat==="All"?"Notes":cat,r:3,by:"you"});draw()};
q.oninput=draw;draw();
var CAT=[["COMMERCE 1AA3","Introductory Financial Accounting",1,"F","acct",[]],["COMMERCE 1BA3","Organizational Behaviour",1,"F","hr",[]],["COMMERCE 1E03","Business Environment and Organization",1,"F","strat",[]],["ECON 1B03","Introductory Microeconomics",1,"F","econ",[]],["COMMERCE 1DA3","Business Data Analytics",1,"W","data",[]],["COMMERCE 1MA3","Introduction to Marketing",1,"W","mkt",[]],["MATH 1MM3","Applied Calculus",1,"W","math",[]],["ECON 1BB3","Introductory Macroeconomics",1,"W","econ",["ECON 1B03"]],["COMMERCE 2AB3","Managerial Accounting I",2,"","acct",["COMMERCE 1AA3"]],["COMMERCE 2FA3","Introduction to Finance",2,"","fin",["COMMERCE 1AA3","ECON 1BB3"]],["COMMERCE 2FB3","Managerial Finance",2,"","fin",["COMMERCE 2FA3"]],["COMMERCE 2DA3","Decision Making with Analytics",2,"","data",["COMMERCE 1DA3"]],["COMMERCE 2BC3","Human Resource Management and Labour Relations",2,"","hr",["COMMERCE 1BA3"]],["COMMERCE 2NG3","Negotiations",2,"","hr",["COMMERCE 1BA3"]],["COMMERCE 3AB3","Intermediate Financial Accounting I",3,"","acct",["COMMERCE 2AB3","COMMERCE 1AA3"]],["COMMERCE 3MC3","Applied Marketing Management",3,"","mkt",["COMMERCE 1MA3"]],["COMMERCE 3KD3","Database Design Management and Applications",3,"","data",["COMMERCE 2DA3","COMMERCE 1DA3"]],["COMMERCE 4SA3","International Business",4,"","strat",["COMMERCE 1E03"]],["COMMERCE 4PA3","Business Policy: Strategic Management",4,"","strat",["COMMERCE 1E03"]]];
var F1=["COMMERCE 1AA3","COMMERCE 1BA3","COMMERCE 1E03","ECON 1B03"],W1=["COMMERCE 1DA3","COMMERCE 1MA3","MATH 1MM3","ECON 1BB3"];
var PROF={a:{s:"F",c:F1,d:[]},b:{s:"W",c:W1,d:F1}};
var taken=[],done=[],sem="F",linked=false,psel=document.getElementById("psel"),pstat=document.getElementById("pstat"),pbtn=document.getElementById("pbtn");
function info(c){for(var i=0;i<CAT.length;i++)if(CAT[i][0]===c)return CAT[i];return null}
function plan(){
 var tk=document.getElementById("taken"),box=document.getElementById("sugg");tk.innerHTML="";box.innerHTML="";
 if(!linked)return;
 taken.forEach(function(c){var b=document.createElement("span");b.className="chip on";b.textContent=c;tk.appendChild(b)});
 var known=taken.map(info).filter(Boolean),maxL=1,areas={};
 known.forEach(function(k){if(k[2]>maxL)maxL=k[2];areas[k[4]]=1});
 var out=[];
 CAT.forEach(function(c){
  var have=taken.concat(done),nxt=sem==="F"?"W":"F";
  if(have.indexOf(c[0])>-1)return;
  if(c[3]&&c[3]!==nxt)return;
  if(c[2]>maxL+1||c[2]<maxL)return;
  var fm=c[5].filter(function(x){return have.indexOf(x)>-1});
  if(c[5].length&&!fm.length)return;
  var sc=fm.length*3+(areas[c[4]]?2:0)+(c[2]===maxL?6:0);
  var why=fm.length?"Builds on "+fm.join(", "):(areas[c[4]]?"Same area as your courses":"Common course at this level");
  out.push({c:c,sc:sc,why:why});
 });
 out.sort(function(a,b){return b.sc-a.sc||a.c[2]-b.c[2]});
 out=out.slice(0,5);
 if(!out.length)box.innerHTML="<p class=note>No suggestions in our sample list for this student.</p>";
 out.forEach(function(o){
  var el=document.createElement("div");el.className="res";
  el.innerHTML="<div><b>"+o.c[0]+": "+o.c[1]+"</b><small class=why>"+o.why+(o.c[3]?"":" \u00b7 term varies, check Mosaic")+"</small></div>";
  var b=document.createElement("button");b.type="button";b.className="mini";b.textContent="View resources";
  b.onclick=function(){q.value=o.c[0];cat="All";draw();document.getElementById("demo").scrollIntoView()};
  el.appendChild(b);box.appendChild(el)});
}
function loadProfile(){
 var p=PROF[psel.value];taken=p.c.slice();done=p.d.slice();sem=p.s;
 pstat.textContent="Connected to Mosaic. Found "+taken.length+" enrolled courses this "+(sem==="F"?"Fall":"Winter")+" term. Suggested for next term ("+(sem==="F"?"Winter":"Fall")+"):";
 plan();
}
pbtn.onclick=function(){
 if(linked)return;pbtn.textContent="Connecting to Mosaic...";pbtn.disabled=true;
 setTimeout(function(){linked=true;pbtn.textContent="Connected \u2713";loadProfile()},700);
};
psel.onchange=function(){if(linked)loadProfile()};
