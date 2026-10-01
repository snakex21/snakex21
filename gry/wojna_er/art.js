// Original canvas artwork. No downloaded sprites, fonts, textures or rendering dependencies.
// Decorative variation is deterministic and never consumes the combat RNG.
const BATTLE_PALETTES = [
    {sky:['#406e7d','#b1c9bd','#efcc96'],ridge:'#647f79',land:'#687e58',dirt:'#647258',path:'#baa581',ink:'#344b46'},
    {sky:['#344765','#8292ad','#d6b5a0'],ridge:'#657b83',land:'#536b58',dirt:'#43564d',path:'#aa9b83',ink:'#253e43'},
    {sky:['#546b76','#b0b3a4','#dfc69c'],ridge:'#748080',land:'#737966',dirt:'#4e5b54',path:'#a69980',ink:'#33484c'},
    {sky:['#101d3d','#354163','#998392'],ridge:'#3f536d',land:'#3d5063',dirt:'#24394c',path:'#788293',ink:'#10273e'}
];
function artPoly(c, points, fill, stroke='#20343c', width=2) {
    c.beginPath();c.moveTo(points[0][0],points[0][1]);
    for(let i=1;i<points.length;i++)c.lineTo(points[i][0],points[i][1]);
    c.closePath();c.fillStyle=fill;c.fill();
    if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
}
function artLine(c, points, color, width=3) {
    c.beginPath();c.moveTo(points[0][0],points[0][1]);
    for(let i=1;i<points.length;i++)c.lineTo(points[i][0],points[i][1]);
    c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();
}
function artOval(c,x,y,rx,ry,color,stroke) {
    c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();
    if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}
}
function drawBattlefieldArt(c, era, elapsed) {
    const p=BATTLE_PALETTES[era];
    const sky=c.createLinearGradient(0,0,0,GROUND_Y);
    p.sky.forEach((color,i)=>sky.addColorStop(i/2,color));c.fillStyle=sky;c.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    artOval(c,900,105,45,45,era===3?'#d5d8e5':'#f2d6a3');
    if(era===3){for(let i=0;i<40;i++){c.fillStyle=i%3?'#b4d3e9':'#f3d5bf';c.fillRect((i*173+37)%1200,(i*71+20)%250,2,2);}}
    else {c.globalAlpha=.16;for(let i=0;i<7;i++){const x=((i*213+elapsed/1700)%1450)-120;artOval(c,x,90+i%3*39,95,12,'#fff5dd');}c.globalAlpha=1;}
    artPoly(c,[[0,345],[0,252],[120,208],[260,265],[380,175],[570,286],[730,213],[850,278],[1040,181],[1200,251],[1200,400]],p.ridge,null);
    c.globalAlpha=.35;
    artPoly(c,[[0,395],[0,323],[190,280],[340,339],[515,271],[680,348],[890,306],[1090,331],[1200,285],[1200,450]],p.ink,null);
    c.globalAlpha=1;
    // Era landmarks stay behind the combat line and never obscure units.
    for(let i=0;i<8;i++) {
        const x=140+i*137, y=361+(i%3)*13;
        c.save();c.translate(x,y);c.globalAlpha=.48;
        if(era===0){artLine(c,[[0,5],[0,-52]],p.ink,7);artPoly(c,[[-34,-28],[0,-93],[36,-28]],p.ink,null);artPoly(c,[[-27,-52],[0,-111],[29,-52]],p.ridge,null);}
        if(era===1){c.fillStyle=p.ink;c.fillRect(-15,-45,30,63);for(let j=0;j<3;j++)c.fillRect(-17+j*13,-53,8,16);c.fillStyle=p.sky[0];c.fillRect(-3,-27,6,13);}
        if(era===2){c.fillStyle=p.ink;c.fillRect(-21,-39,42,56);c.fillRect(-17,-72,9,37);artPoly(c,[[-21,-39],[4,-62],[4,-39],[21,-54],[21,-39]],p.ink,null);}
        if(era===3){artPoly(c,[[-16,12],[-8,-72],[5,-100],[19,12]],p.ink,null);artLine(c,[[0,-66],[5,-37],[6,-6]],'#80bec4',2);}
        c.restore();
    }
    artPoly(c,[[0,427],[160,409],[360,432],[650,416],[890,430],[1080,402],[1200,423],[1200,600],[0,600]],p.land,null);
    c.fillStyle=p.dirt;c.fillRect(0,GROUND_Y,GAME_WIDTH,GAME_HEIGHT-GROUND_Y);
    artPoly(c,[[0,448],[1200,448],[1200,485],[950,483],[770,470],[490,490],[220,472],[0,489]],p.path,null);
    artLine(c,[[0,449],[1200,449]],'#dec9a2',2);
    for(let i=0;i<65;i++){
        const x=(i*193+53)%1200,y=486+(i*31)%100;
        if(i%3===0){artPoly(c,[[x-7,y],[x-3,y-5],[x+7,y-3],[x+10,y+2]],p.ink,null);}
        else {artLine(c,[[x-4,y],[x-5,y-7],[x,y],[x+5,y-9]],p.land,2);}
    }
    // A quiet central marker makes the front line easy to judge.
    c.globalAlpha=.35;artLine(c,[[600,436],[600,460]],'#f5e4ba',2);c.globalAlpha=1;
}
function drawBaseArt(c, team, era, hp, turret) {
    const friendly=team==='player', banner=friendly?'#75d6df':'#ef977b';
    c.save();c.translate(friendly?48:1152,GROUND_Y);c.scale(friendly?1:-1,1);
    artOval(c,0,4,64,12,'#172d3955');
    if(era===0){
        artPoly(c,[[-47,0],[-55,-47],[-25,-103],[15,-114],[51,-64],[50,0]],'#776f5f');
        artPoly(c,[[-25,-103],[15,-114],[34,-74],[-12,-55],[-55,-47]],'#9b937b');
        artOval(c,14,-28,23,33,'#263b3b');artPoly(c,[[-39,0],[-43,-40],[-24,-67],[-10,-53],[-13,0]],'#626352',null);
        artLine(c,[[-22,-68],[-8,-86],[7,-81]],'#c8ba91',3);
    } else if(era===1){
        c.fillStyle='#77838a';c.fillRect(-45,-104,89,104);
        c.fillStyle='#9da5a4';c.fillRect(-48,-126,24,126);c.fillRect(22,-126,25,126);
        for(let i=0;i<3;i++){c.fillRect(-49+i*10,-139,6,15);c.fillRect(21+i*10,-139,6,15);}
        artPoly(c,[[-22,0],[-22,-50],[-10,-62],[7,-62],[19,-50],[19,0]],'#273c42');
        for(let y=-99;y<-10;y+=24)artLine(c,[[-42,y],[42,y]],'#576a72',1);
        c.fillStyle='#354b54';c.fillRect(-40,-109,9,16);c.fillRect(30,-109,9,16);
    } else if(era===2){
        artPoly(c,[[-52,0],[-52,-68],[-30,-96],[29,-96],[51,-64],[51,0]],'#647375');
        artPoly(c,[[-52,-68],[-30,-96],[29,-96],[51,-64]],'#9a9e8a');
        c.fillStyle='#263d44';c.fillRect(-25,-55,50,20);c.fillRect(7,-29,24,29);
        for(let i=0;i<4;i++)artLine(c,[[-47+i*24,-8],[-29+i*24,-8]],'#a8aa92',10);
        artLine(c,[[-29,-99],[-29,-158]],'#3a5056',3);artLine(c,[[-43,-141],[-14,-141]],'#8ba5ac',2);
    } else {
        artPoly(c,[[-48,0],[-36,-85],[-18,-137],[22,-137],[42,-80],[55,0]],'#273d53','#88adba');
        artPoly(c,[[-18,-137],[22,-137],[8,-163],[-7,-163]],'#bdd9dc');
        artPoly(c,[[-22,-82],[24,-82],[33,-19],[-32,-19]],'#172d43','#63849f');
        artLine(c,[[-16,-72],[15,-72],[23,-29],[-24,-29],[-16,-72]],banner,4);
        artOval(c,0,-102,10,16,'#a7ffff');
    }
    // Team color is carried by a flag and light, alongside distinct silhouettes.
    artLine(c,[[51,-5],[51,-118]],'#394c50',3);
    artPoly(c,[[51,-118],[84,-110],[51,-99]],banner,'#31484d',1);
    artLine(c,[[-38,2],[44,2]],banner,4);
    if(hp<.6){artLine(c,[[-18,-68],[-8,-54],[-18,-43],[-5,-32]],'#192f35',3);}
    if(hp<.3){artOval(c,-22,-137,12,16,'#49545399');artOval(c,-13,-161,18,12,'#53626a66');}
    if(turret){
        c.fillStyle='#3a535d';c.fillRect(-17,-143,35,18);artLine(c,[[0,-141],[0,-164],[31,-164]],'#bdc8be',7);
        for(let i=0;i<turret;i++)artOval(c,-10+i*10,-137,2,2,banner);
    }
    c.restore();
}
function drawUnitArt(c,u) {
    if(u.hp<=0)return;
    const friendly=u.team==='player', team=friendly?'#68cbd8':'#ef937a', dark='#21343c', skin='#ddb48d';
    const id=u.def.id, walk=u.state==='walk'?Math.sin(u.walkFrame)*4:0, swing=Math.sin(Math.max(0,u.attackAnim)*Math.PI);
    const tall=['dino','mech'].includes(id)?82:['tank','catapult','hover','drone'].includes(id)?61:62;
    c.save();c.translate(u.x,u.y);artOval(c,0,2,['dino','tank','hover','catapult'].includes(id)?29:15,5,'#142c3d44');
    c.scale(friendly?1:-1,1);c.lineJoin='round';
    const body=u.hitFlash>0?'#f2ead3':u.def.color;
    function human(y=0, armor=false) {
        artLine(c,[[-5,-20+y],[-6-walk,-9+y],[-8-walk,0+y]],dark,5);
        artLine(c,[[5,-20+y],[6+walk,-9+y],[8+walk,0+y]],dark,5);
        artPoly(c,[[-10,-40+y],[8,-40+y],[11,-18+y],[-10,-18+y]],body);
        artPoly(c,[[-8,-38+y],[1,-35+y],[-3,-20+y],[-10,-20+y]],team,null);
        artOval(c,0,-49+y,8,9,skin,dark);
        if(armor){artPoly(c,[[-9,-49+y],[-9,-57+y],[3,-62+y],[10,-53+y],[10,-48+y]],body);artLine(c,[[2,-51+y],[9,-51+y]],dark,2);}
        else {artPoly(c,[[-8,-51+y],[-7,-58+y],[4,-60+y],[9,-53+y]],dark,null);}
        artOval(c,5,-48+y,1.1,1.3,dark);
    }
    if(id==='dino') {
        artPoly(c,[[-18,-20],[-44,-39],[-26,-19],[7,-13],[21,-28],[35,-28],[40,-40],[23,-49],[11,-32]],'#6b8763');
        artOval(c,-5,-26,25,16,'#849772',dark);artLine(c,[[-13,-18],[-17-walk,-3],[-8-walk,-1]],dark,6);artLine(c,[[11,-20],[14+walk,-4],[23+walk,-2]],dark,6);
        artOval(c,30,-39,2,2,'#f2d898');artPoly(c,[[-15,-42],[2,-47],[14,-41],[10,-29],[-14,-30]],team);
        artLine(c,[[-3,-49],[-5,-33],[9,-31]],dark,5);artOval(c,-3,-58,7,8,skin,dark);artPoly(c,[[-11,-55],[-10,-63],[1,-68],[6,-59]],'#765a43');
        artLine(c,[[0,-50],[13,-54],[26+8*swing,-68]],'#9b7b54',5);artPoly(c,[[22+8*swing,-74],[33+8*swing,-72],[32+8*swing,-61],[23+8*swing,-64]],'#b4aa8b');
    } else if(id==='catapult') {
        artLine(c,[[-26,-10],[21,-10]],'#795e44',11);artPoly(c,[[-17,-12],[0,-43],[17,-12]],'#a58b61');
        artLine(c,[[-17,-19],[16+8*swing,-59+22*swing]],'#c0a779',6);artOval(c,17+8*swing,-62+22*swing,9,6,'#6d7271',dark);
        for(const x of [-21,20]){artOval(c,x,-8,10,10,'#564b40',dark);artLine(c,[[x,-15],[x,-1]],'#b39c70',2);artLine(c,[[x-7,-8],[x+7,-8]],'#b39c70',2);}
        artPoly(c,[[-7,-32],[6,-32],[6,-20],[-7,-20]],team);
    } else if(id==='tank') {
        artOval(c,0,-11,34,12,dark);for(let i=0;i<5;i++)artOval(c,-23+i*11,-11,7,7,'#7d877d',dark);
        artPoly(c,[[-34,-19],[-25,-35],[23,-35],[33,-19]],body);artPoly(c,[[-16,-35],[-9,-49],[14,-49],[23,-35]],'#768675');
        artLine(c,[[13,-42],[43-6*swing,-43]],'#a2afa0',7);artPoly(c,[[-23,-30],[-5,-30],[-1,-21],[-25,-21]],team,null);
        artLine(c,[[-6,-51],[-10,-69]],dark,2);
    } else if(id==='mech') {
        artLine(c,[[-13,-33],[-18-walk,-15],[-16-walk,-3]],'#7393a0',11);artLine(c,[[12,-33],[18+walk,-17],[22+walk,-3]],'#7393a0',11);
        artPoly(c,[[-24,-67],[18,-67],[27,-46],[13,-28],[-16,-28],[-27,-46]],body);
        artPoly(c,[[-12,-61],[9,-61],[13,-48],[-14,-48]],'#193746','#a4e7ec');artLine(c,[[-7,-55],[8,-55]],team,3);
        artLine(c,[[-23,-54],[-34,-41],[-27,-26]],'#9bb5bb',10);artLine(c,[[23,-53],[33+12*swing,-45],[35+16*swing,-28]],'#9bb5bb',11);
        artOval(c,2,-38,5,5,team);
    } else if(id==='hover') {
        const bob=Math.sin(u.walkFrame)*2;
        artOval(c,0,-7+bob,28,4,'#71dceb66');artPoly(c,[[-34,-17+bob],[-20,-35+bob],[23,-35+bob],[36,-19+bob],[18,-12+bob],[-22,-12+bob]],body);
        artPoly(c,[[-17,-36+bob],[-8,-52+bob],[14,-52+bob],[24,-36+bob]],'#ccd6d7');artLine(c,[[14,-44+bob],[45-6*swing,-44+bob]],team,5);
        artLine(c,[[-23,-20+bob],[23,-20+bob]],team,3);
    } else if(id==='drone') {
        const bob=Math.sin(u.walkFrame)*3;
        artPoly(c,[[-25,-38+bob],[-10,-48+bob],[10,-48+bob],[26,-37+bob],[8,-32+bob],[-9,-32+bob]],body);
        artLine(c,[[-20,-39+bob],[-32,-53+bob],[-42,-53+bob]],dark,4);artLine(c,[[19,-39+bob],[31,-53+bob],[41,-53+bob]],dark,4);
        artOval(c,-32,-54+bob,14,3,team);artOval(c,31,-54+bob,14,3,team);artOval(c,4,-40+bob,5,5,team,dark);artLine(c,[[6,-33+bob],[20,-29+bob]],'#afc5d3',4);
    } else {
        human(0,['knight','marine'].includes(id));
        if(['clubman','knight'].includes(id)) {
            artLine(c,[[7,-35],[18,-28],[26+9*swing,-49+10*swing]],skin,5);
            if(id==='clubman')artPoly(c,[[20+9*swing,-61+10*swing],[29+9*swing,-64+10*swing],[34+9*swing,-49+10*swing],[26+9*swing,-43+10*swing]],'#a68b5e');
            else {artLine(c,[[26+9*swing,-49+10*swing],[30+9*swing,-72+10*swing]],'#e0ded0',4);artLine(c,[[20+9*swing,-49+10*swing],[32+9*swing,-47+10*swing]],'#cfb26b',3);}
            artPoly(c,[[-20,-39],[-5,-37],[-6,-18],[-14,-11],[-22,-23]],id==='clubman'?'#9b8060':'#8d9b9e');artLine(c,[[-14,-35],[-13,-20]],team,4);
        } else if(id==='archer') {
            artLine(c,[[3,-35],[20,-32]],skin,5);c.beginPath();c.arc(13,-33,20,-1.1,1.1);c.strokeStyle='#bca073';c.lineWidth=3;c.stroke();artLine(c,[[22,-51],[22-8*swing,-33],[22,-15]],'#e6dec8',1);artLine(c,[[1,-33],[36,-33]],'#d9c6a0',2);
            artPoly(c,[[-10,-54],[0,-69],[12,-52]],'#697e51');
        } else if(id==='slinger') {
            artLine(c,[[1,-34],[14,-39],[19+9*swing,-53]],skin,4);artLine(c,[[19+9*swing,-53],[31+6*swing,-67],[36+6*swing,-56],[19+9*swing,-53]],'#ede0b6',1.5);artOval(c,34+6*swing,-62,3,4,'#7d8985');
        } else {
            const sniper=id==='sniper';
            if(sniper)artPoly(c,[[-14,-40],[-13,-59],[0,-66],[12,-54],[8,-38]],'#607553');
            artLine(c,[[0,-33],[17,-29]],skin,5);artLine(c,[[10,-31],[sniper?48:35,-31]],'#a2aaa2',4);artLine(c,[[9,-33],[27,-33]],dark,7);artLine(c,[[13,-30],[10,-22]],dark,4);
            if(sniper){artLine(c,[[19,-38],[30,-38]],'#182f35',3);artLine(c,[[39,-30],[45,-18]],dark,2);}
            if(swing>.65)artPoly(c,[[sniper?49:36,-34],[sniper?59:46,-31],[sniper?49:36,-28]],'#ffe5a0',null);
        }
    }
    c.restore();
    if(u.hp<u.maxHp || u.state==='attack') {
        c.fillStyle='#192c39cc';c.fillRect(u.x-17,u.y-tall-7,34,4);
        c.fillStyle=team;c.fillRect(u.x-17,u.y-tall-7,34*Math.max(0,u.hp/u.maxHp),4);
    }
}
function drawShotArt(c,p) {
    const id=p.def?.id, team=p.team==='player'?'#8ce6e8':'#ffc09a';
    if(['marine','sniper','tank','mech','hover','drone'].includes(id))artLine(c,[[p.x-p.vx*1.7,p.y-p.vy*1.7],[p.x,p.y]],id==='hover'||id==='drone'?team:'#fbe2a4',id==='tank'?4:2);
    else if(id==='archer'){artLine(c,[[p.x-p.vx*1.6,p.y-p.vy*1.6],[p.x,p.y]],'#544b3d',2);artOval(c,p.x,p.y,2,2,'#e8d5a5');}
    else {artOval(c,p.x+2,p.y+3,id==='catapult'?6:3,id==='catapult'?6:3,'#20363d33');artOval(c,p.x,p.y,id==='catapult'?6:3,id==='catapult'?6:3,'#c1bca8','#596966');}
}
function drawImpactArt(c,p) {
    const age=1-p.life/p.maxLife;c.save();c.globalAlpha=p.life/p.maxLife;
    if(p.text==='impact') {
        for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const near=3+age*7,far=near+4;artLine(c,[[p.x+Math.cos(a)*near,p.y+Math.sin(a)*near],[p.x+Math.cos(a)*far,p.y+Math.sin(a)*far]],i%2?'#ffe5af':'#f3a779',2);}
    } else {c.font='bold 12px system-ui';c.textAlign='center';c.fillStyle='#ffe6a2';c.fillText(p.text,p.x,p.y);}
    c.restore();
}
