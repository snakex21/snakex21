window.onload = function() {
  buildGridOverlay();                      //Generates grid-overlay
  cellCreator(2, 0);
  directions();
  score(0);
  var restartButton = document.getElementById('repeat');
  if (restartButton) {
    restartButton.addEventListener('click', reset);
  }
};

function getGridElement() {
  return document.querySelector('[data-game-root] .grid');
}


/* GENERATE GRID */
function buildGridOverlay() {
  var root = document.querySelector('[data-game-root]');
  if (!root) {
    return null;
  }
  root.innerHTML = '';
  var size    = 4;
  var table   = document.createElement('DIV');

  table.className = 'grid';
  table.id = ' ';
  table.dataset.value = 0;
  
  for (var i = 0; i < size; i++) {
    var tr = document.createElement('DIV');
    table.appendChild(tr);
    tr.id = 'row_' + (i+1);
    tr.className += 'grid_row';
    
    for (var j = 0; j < size; j++) {
      var td = document.createElement('DIV');
      td.id = '' +(i+1) +(j+1);                            //ID with x y
      td.className += 'grid_cell';
      tr.appendChild(td);
    }
  root.appendChild(table);
  }

  return table;
}



/* RANDOM TILE CREATOR */
function cellCreator(c, timeOut) {
  /* do 2 times for 2 new tiles */
  for (var i = 0; i < c; i++) {
    
    var count = 0;
    /* search for an empty cell to create a tile */
    
    for (var value = 1; value < 2; value++) {
      var randomX = Math.floor((Math.random()*4)+1);
      var randomY = Math.floor((Math.random()*4)+1);
      var checker = document.getElementById('' +randomX +randomY);
      if (checker.innerHTML != '') {
        value = 0;
      } 
    }
    
    var randomValue = Math.floor((Math.random()*4) +1); //create value 1, 2, 3 or 4
    if (randomValue == 3) {randomValue=4};              //3 --> 4
    if (randomValue == 1) {randomValue=2};              //1 --> 2
    var position = document.getElementById(''+randomX +randomY);
    var tile = document.createElement('DIV');           //create div at x, y
    position.appendChild(tile);                         //tile becomes child of grid cell
    tile.id = 'tile_'+randomX +randomY;
    position.classList.add('active');

    colorSet(randomValue, tile);
    tile.classList.add('appearing');
    setTimeout(function() {
      tile.classList.remove('appearing');
    }, 220);

  }
  
  

}

/* MOVE TILES */
document.onkeydown = directions;

function directions(e) {
  e = e || window.event;
  var d = 0;
// ----- KEY UP ----- //
    if (e.keyCode == '38') {      
      var count = 2;  
      
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, -1, 0, 1, 0);
          console.info(''+x +y);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }   
      
// ----- KEY DOWN ----- //
    else if (e.keyCode == '40') { // down
      var count = -2;  
      var test  = 1;
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, 1, 0, 4, 0);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }
      
// ----- KEY LEFT ----- //      
    
    else if (e.keyCode == '37') { // left
      
      
      var count = 2;  
      var test  = 1;
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, -1, 0, 1);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }
  
// ----- KEY RIGHT ----- //
    else if (e.keyCode == '39') { // right
      
      var count = -2;  
      var noCell = 0;
      var c = 1;
      var d = 0;
      
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, 1, 0, 4, c, d);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }

}

//--------------------------------------------------------

function moveTilesMain(x, y, X, Y, xBorder, yBorder, c, d) {      
   
  var tile     = document.getElementById('tile_'+x +y);
  var checker  = document.getElementById(''+x +y);
  var xAround  = x+X;
  var yAround  = y+Y;
  
  if (xAround > 0 && xAround < 5 && yAround > 0 && yAround < 5 && checker.className == 'grid_cell active') {
    var around = document.getElementById(''+xAround +yAround);
    
    //________
      
    if (around.className == 'grid_cell active') {
      //catching
      var aroundTile = document.getElementById('tile_'+xAround +yAround);
      if (aroundTile.innerHTML == tile.innerHTML) {
        //same
        var value = tile.dataset.value*2;
        aroundTile.dataset.value = ''+value;
        aroundTile.className = 'tile '+value;
        aroundTile.innerHTML = ''+value;
        colorSet(value, aroundTile);
        checker.removeChild(tile);
        checker.className = 'grid_cell';
        around.className  = 'grid_cell active merged';
        var gridElement = getGridElement();
        if (gridElement) {
          gridElement.id = 'moved';
          gridElement.className = 'grid tile-' + value;
        }
        var grid = document.getElementById(' ');
        var scoreValue = parseInt(grid.dataset.value);
        var newScore = value + scoreValue;
        
        grid.dataset.value = newScore;
        var score = document.getElementById('value');
        
        score.innerHTML = ''+newScore;
      } 
    } else if (around.className == 'grid_cell'){
      //not catching
      around.appendChild(tile);
      around.className = 'grid_cell active';
      tile.id = 'tile_'+xAround +yAround;
      checker.className = 'grid_cell';
      var gridElement = getGridElement();
      if (gridElement) {
        gridElement.id = 'moved';
      }
    }
    
    
    //________
  }  
}


//-------------------------------------------------------


function cellReset() {
  var count = 0;
  var gridElement = getGridElement();
  if (!gridElement) {
    return;
  }
  var a = gridElement.id;
  console.log(''+a);
  
  for (var x=1; x<5; x++) {
    for (var y=1; y<5; y++) {
      
      var resetter = document.getElementById(''+x +y);
      if (resetter.innerHTML != '') {
        count++;
      }
      
      if (resetter.innerHTML == '') {
        resetter.className = 'grid_cell';
      } 
      
      if (resetter.className == 'grid_cell active merged') {
        resetter.className = 'grid_cell active'
      }
    }
  }
  if (count == 16) {
    updateStatus('lose');
  } else if (gridElement.id == 'moved'){
    cellCreator(1, 1);
  }
  gridElement.id = ' ';
}

function score() {

  var grid = getGridElement();
  if (!grid) {
    return;
  }
  var value = grid.dataset.value || 0;
  document.getElementById('value').textContent = ''+value;

}


/* ----- STYLE ----- */
function colorSet(value, tile) {
  tile.dataset.value = value;
  tile.textContent = ''+value;
  tile.className = 'tile tile-' + value;
  if (value >= 2048) {
    updateStatus('won');
  }
}

function info() {
  setTimeout(function() {
    document.getElementById('description').classList.toggle('show');
  }, 10);  
  
}

function reset() {
  var gridElement = getGridElement();
  if (!gridElement) {
    return;
  }
  for (var x = 1; x < 5; x++) {
    for (var y = 1; y < 5; y++) {
      var resetter = document.getElementById(''+x +y);
      if (resetter && resetter.classList.contains('active')) {
        var tile = document.getElementById('tile_'+x +y);
        if (tile) {
          resetter.removeChild(tile);
        }
        resetter.classList.remove('active', 'merged');
      }
    }
  }
  updateStatus();
  gridElement.dataset.value = 0;
  gridElement.id = ' ';
  score();
  cellCreator(2, 0);
}

function updateStatus(state) {
  var statusElement = document.getElementById('status');
  if (!statusElement) {
    return;
  }
  statusElement.classList.remove('lose', 'won');
  if (state) {
    statusElement.classList.add(state);
  }
}
