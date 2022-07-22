let width = 4;
let height = 4;
let container = document.getElementById('board-container');
let bgsuccess = "#cf5707", fcsuccess = "#e5ff00";
let bgnormal = "#113606", fcnormal = "#00ffff";
let time = 0, flag = false, moves = 0;
let time_interval;


function inputlengths() {
    height = parseInt(document.getElementById('getheight').value);
    width = (document.getElementById('getwidth').value);
    if (height > 9 || width > 9 || height < 2 || width < 2) {
        alert('The values of height and width should be in the range 2 to 9');
        return;
    }
    drawboard(width, height);
    shuffle();
    window.clearInterval(time_interval);
    moves = 0;
    time = 0;
    flag = false;
    //document.getElementById('num').innerText=String(width*height-1);
    adding_event_listeners_on_drawing_board();
    document.getElementById('inputlenghts').style.display = 'none';
    document.getElementById('won').style.display='none';
    document.getElementById('reset').style.display = 'block';
    document.getElementById('items').style.display='flex';
    document.getElementById('stats').style.display = 'flex';
    // document.getElementById('oldstats').style.display = 'flex';
    document.getElementById('board-container').style.display = 'flex';
}

function swaptiles(id1, id2) {
    let temp = document.getElementById(id2).className;
    document.getElementById(id2).className = document.getElementById(id1).className;
    document.getElementById(id1).className = temp;
    temp = document.getElementById(id2).innerText;
    document.getElementById(id2).innerText = document.getElementById(id1).innerText;
    document.getElementById(id1).innerText = temp;
    moves++;
    if (flag == false) {
        time_tracker();
        flag = true;
    }
}

function shuffle() {
    for (let row = 1; row <= height; row++) {
        for (let column = 1; column <= width; column++) {

            var row2 = Math.floor(Math.random() * height + 1);
            var column2 = Math.floor(Math.random() * width + 1);
            swaptiles("row" + row + "column" + column, "row" + row2 + "column" + column2);
        }
    }
}
function drawboard(width, height) {
    let id = 1;

    for (let i = 1; i <= height; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.id = "row" + (i);
        container.appendChild(row);
        for (let j = 1; j <= width; j++) {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.id = "row" + i + "column" + j;
            cell.innerHTML = String(id);
            if (i < height || j < width)
                cell.classList.add("Tile" + id);
            row.appendChild(cell);
            id++;
        }
    }
    document.getElementById('row' + height + 'column' + width).classList.add("empty");
    document.getElementById('row' + height + 'column' + width).innerText = "";
}



function adding_event_listeners_on_drawing_board() {
    //mouse click control event listener
   for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
        let id = "row" + i + "column" + j;
        document.getElementById(id).addEventListener('click', function () {
            let emptytile = (document.getElementsByClassName('empty'))[0];
            let emptyid = emptytile.id;
            let emptyrow = emptyid[3], emptycolumn = emptyid[10];
            let currentrow = (this.id)[3], currentcolumn = (this.id)[10];
            if (currentrow == emptyrow && (Math.abs(currentcolumn-emptycolumn)==1)||(currentcolumn == emptycolumn && (Math.abs(currentrow-emptyrow)==1))){
                swaptiles(id,emptyid);
            }
            ifwon(colorchanger());
            document.getElementById('moves').innerText = String(moves);
        });
    }
}
    
    //keyboard key control event listener
    document.onkeydown = function (e) {
        let emptytile = (document.getElementsByClassName('empty'))[0];
        let emptyid = emptytile.id;
        let emptyrow = emptyid[3], emptycolumn = emptyid[10];
        switch (e.code) {
            case "ArrowLeft":
                if (parseInt(emptycolumn) + 1 <= width) {
                    let swapid = "row" + emptyrow + "column" + String(parseInt(emptycolumn) + 1);
                    swaptiles(emptyid, swapid);
                    ifwon(colorchanger());
                }
                break;
            case "ArrowUp":
                if (parseInt(emptyrow) + 1 <= height) {
                    let swapid = "row" + String(parseInt(emptyrow) + 1) + "column" + emptycolumn;
                    swaptiles(emptyid, swapid);
                    ifwon(colorchanger());
                }

                break;
            case "ArrowRight":
                if (parseInt(emptycolumn) - 1 > 0) {
                    let swapid = "row" + emptyrow + "column" + String(parseInt(emptycolumn) - 1);
                    swaptiles(emptyid, swapid);
                    ifwon(colorchanger());
                }
                break;
            case "ArrowDown":
                if (parseInt(emptyrow) - 1 > 0) {
                    let swapid = "row" + String(parseInt(emptyrow) - 1) + "column" + emptycolumn;
                    swaptiles(emptyid, swapid);
                    ifwon(colorchanger());
                }
                break;
        }
        document.getElementById('moves').innerText = String(moves);
    };

}



function colorchanger() {
    let num = 1, success = 0;
    for (let i = 1; i <= height; i++) {
        for (let j = 1; j <= width; j++) {
            let text = document.getElementById('row' + i + 'column' + j).innerText;
            text = parseInt(text);
            if (text == num) {
                document.getElementById('row' + i + 'column' + j).style.backgroundColor = bgsuccess;
                document.getElementById('row' + i + 'column' + j).style.color = fcsuccess;
                success++;
            }
            else {
                document.getElementById('row' + i + 'column' + j).style.backgroundColor = bgnormal;
                document.getElementById('row' + i + 'column' + j).style.color = fcnormal;
            }
            num++;
        }
    }
    return success;
}


function time_tracker() {
    time_interval = setInterval(() => {
        time = time + 1;
        let mins = parseInt(time / 60);
        let seconds = time % 60;
        if (mins < 10) mins = "0" + String(mins);
        else mins = String(mins);
        if (seconds < 10) seconds = "0" + String(seconds);
        else seconds = String(seconds);
        document.getElementById("time").innerText = mins + " : " + seconds;
    }, 1000);
}
function reset() {
    window.clearInterval(time_interval);
    shuffle();
    colorchanger();
    document.getElementById('won').style.display='none';
    time=0;
    moves = 0;
    document.getElementById('moves').innerText = String(moves);
    flag = false;
}
function ifwon(number) {
    if (number >= width * height - 1) {
        window.clearInterval(time_interval);
        document.getElementById("won").style.display='flex';
        document.getElementById("won").innerHTML = "Congratulations! You have successfully finished this game. <br> <div>Number of moves taken : <span class='result'>" + moves + "</span></div><div>Time taken : <span class='result'>" + document.getElementById("time").innerText + "</span> mins</div>";
        document.getElementById("board-container").style.fontSize = "3rem";
        
        leaderboardupdate(parseInt(time),moves);


    }
}
function leaderboardupdate(time , moves){
    if(localStorage.getItem('itemJson')==null){
        itemJsonArrey = [];
        itemJsonArrey.push({time:time,move:moves});
        localStorage.setItem('itemJson',JSON.stringify(itemJsonArrey));
    }
    else{
        itemJsonArreyStr=localStorage.getItem('itemJson');
        itemJsonArrey=JSON.parse(itemJsonArreyStr);
        itemJsonArrey.push({time:time,move:moves});
        itemJsonArrey.sort(function(a, b) {          
            if (a.time === b.time) {
               
               return a.moves - b.moves;
            }
            return a.time > b.time ? 1 : -1;
         });
        localStorage.setItem('itemJson',JSON.stringify(itemJsonArrey));
    }
    itemJsonArreyStr=localStorage.getItem('itemJson');
    itemJsonArrey=JSON.parse(itemJsonArreyStr);
    tableBody=document.getElementById("tableBody");
    let str="";
    itemJsonArrey.forEach((element,index) => {
        console.log(element.time+" "+element.moves);
        str+=`
        <tr>
        <th scope="col">${element.time}</th>
        <th scope="col">${element.moves}</th>
      </tr>`;
    });
    tableBody.innerHTML = str;
}
