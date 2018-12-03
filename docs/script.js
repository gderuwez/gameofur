class Piece {
  constructor(x, y) {
    this.place = 0;
    this.x = x;
    this.y = y;
    this.initalX = x;
    this.initialY = y;
  }
}
class Board {
  constructor(name) {
    this.occupied = [];
    this.first = true;
    this.name = name;
  }
}
//player 1 specific
let boardWhite = new Board('boardWhite');
let boardOffWhite = new Board('boardOffWhite');
let pieces = [new Piece(144, 422), new Piece(216, 422), new Piece(288, 422), new Piece(360, 422), new Piece(432, 422), new Piece(504, 422), new Piece(576, 422)];
pieces.name = 'pieces';
//player 2 specific
let boardBlack = new Board('boardBlack');
let boardOffBlack = new Board('boardOffBlack');
let piecesBlack = [new Piece(144, 350), new Piece(216, 350), new Piece(288, 350), new Piece(360, 350), new Piece(432, 350), new Piece(504, 350), new Piece(576, 350)];
piecesBlack.name = 'piecesBlack';
//common for each
let boardCenter = new Board('boardCenter');
//canvas function
const boardPosition = [300, 216, 132, 48];
const boardOffPosition = [636, 552, 468];
const boardCenterPosition = [48, 132, 216, 300, 384, 468, 552, 636];
//canvas display
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const quarterRose = () => {
  ctx.beginPath();
  ctx.moveTo(16, 36)
  ctx.lineTo(0, 22.5);
  ctx.lineTo(24, 24);
  ctx.lineTo(22.5, 0);
  ctx.lineTo(36, 16);
  ctx.stroke();
  ctx.fillStyle= "red";
  ctx.beginPath();
  ctx.moveTo(36, 35);
  ctx.lineTo(22.5, 35);
  ctx.lineTo(12, 28);
  ctx.lineTo(26, 28.5);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(36, 36);
  ctx.lineTo(28, 24.5);
  ctx.lineTo(27.5, 12);
  ctx.lineTo(34, 22);
  ctx.closePath();
  ctx.fillStyle = "#2c3790";
  ctx.fill();
}
const rose = (x, y) => {
  ctx.save(); //initial state 00
  ctx.translate(x, y) // move to x and y
  quarterRose();
  ctx.translate(72, 72); // move further
  ctx.rotate((Math.PI / 180) * 180);
  quarterRose();
  ctx.restore(); //return to 00
  ctx.save(); // save at 00
  ctx.translate(x, (y+72));
  ctx.rotate((Math.PI / 180) * -90);
  quarterRose();
  ctx.restore();// return to 00
  ctx.save(); //save 00
  ctx.translate((x+72), y);
  ctx.rotate((Math.PI / 180) * 90);
  quarterRose();
  ctx.restore(); //restore 00
  ctx.save(); //return at 00
}
const redcircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, 7);
  ctx.fillStyle= "red";
  ctx.fill();
}
const squigglySquare = (x, y, z) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  for(let i = 1; i < 8; i++) {
    if(i % 2 !== 0) {
      ctx.lineTo((x+z), (y + (i * z)));
    }
    else {
      ctx.lineTo(x, (y + (i * z)));
    }
  }
  x = x + z;
  y = y + (7*z);
  for(let i = 1; i < 8; i++) {
    if(i % 2 !== 0) {
      ctx.lineTo((x + (i * z)), (y - z));
    }
    else {
      ctx.lineTo((x + (i * z)), y);
    }
  }
  x = x + (7*z);
  y = y - z;
  for(let i = 1; i < 8; i++) {
    if(i % 2 !== 0) {
      ctx.lineTo((x-z), (y - (i * z)));
    }
    else {
      ctx.lineTo(x, (y - (i * z)));
    }
  }
  x = x - z;
  y = y - (7*z);
  for(let i = 1; i < 8; i++) {
    if(i % 2 !== 0) {
      ctx.lineTo((x - (i * z)), (y + z));
    }
    else {
      ctx.lineTo((x - (i * z)), y);
    }
  }
  ctx.stroke();
}
const fiver = (x, y) => {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, 7);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#24aae7";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 7);
  ctx.fill();
  ctx.fillStyle = "black";
}
const fiveTile = (x, y) => {
  fiver(x, y);
  fiver((x-22), (y-22));
  fiver((x+22), (y+22));
  fiver((x+22), (y-22));
  fiver((x-22), (y+22));
}
const smallblue = (x, y) => {
  ctx.fillStyle = "#24aae7";
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, 7);
  ctx.fill();
  ctx.fillStyle = "black";
}
const smallfive = (x, y) => {
  smallblue(x, y);
  smallblue((x-5.5), (y-5.5));
  smallblue((x+5.5), (y+5.5));
  smallblue((x+5.5), (y-5.5));
  smallblue((x-5.5), (y+5.5));
}
const squaredsquare = (x, y) => {
  ctx.beginPath();
  ctx.strokeRect(x, y, 15, 15);
  ctx.strokeRect((x+18), y, 15, 15);
  ctx.strokeRect(x, (y +18), 15, 15);
  ctx.strokeRect((x+18), (y +18), 15, 15);
  smallblue((x+7.5), (y+7.5));
  smallblue((x+7.5), (y+25.5));
  smallblue((x+25.5), (y+25.5));

  ctx.strokeRect((x+37), (y), 15, 15);
  ctx.strokeRect((x+55), (y), 15, 15);
  ctx.strokeRect((x+37), (y+18), 15, 15);
  ctx.strokeRect((x+55), (y+18), 15, 15);
  smallblue((x+7.5 + 55), (y+7.5));
  smallblue((x+7.5 + 55), (y+25.5));
  smallblue((x+7.5 + 37), (y+25.5));

  ctx.strokeRect((x+37), (y +37), 15, 15);
  ctx.strokeRect((x+55), (y +37), 15, 15);
  ctx.strokeRect((x+37), (y+18 +37), 15, 15);
  ctx.strokeRect((x+55), (y+18 +37), 15, 15);
  smallblue((x+7.5 + 55), (y+7.5 +37));
  smallblue((x+7.5 + 55), (y+25.5 + 37));
  smallblue((x+7.5 + 37), (y+7.5 + 37));

  ctx.strokeRect(x, (y +37), 15, 15);
  ctx.strokeRect((x+18), (y+37), 15, 15);
  ctx.strokeRect(x, (y +18 +37), 15, 15);
  ctx.strokeRect((x+18), (y +18 +37), 15, 15);
  smallblue((x+7.5), (y+7.5 +37));
  smallblue((x+7.5 +18), (y+7.5 +37));
  smallblue((x+7.5), (y+7.5 +37 +18));
}
const foureyes = (x, y) => {
  ctx.beginPath();
  ctx.moveTo((x+12), y);
  ctx.quadraticCurveTo((x-11), (y+18), (x+12), (y+34));
  ctx.quadraticCurveTo((x+35), (y+18), (x+12), y);
  ctx.moveTo((x+12), (y+8));
  ctx.quadraticCurveTo((x-3), (y+18), (x+12), (y+27));
  ctx.quadraticCurveTo((x+27), (y+18), (x+12), (y+8));
  ctx.fillStyle= "white";
  ctx.fill();
  ctx.stroke();
}
const eyes = (x, y) => {
  ctx.beginPath();
  ctx.fillStyle="black";
  ctx.fillRect(x, y, 72, 35);
  ctx.fillRect(x, (y+36), 72, 36);
  ctx.fillStyle="white";
  ctx.fillRect(x, y, 24, 34);
  ctx.fillRect(x, (y+37), 24, 35);
  ctx.fillRect((x+35), y, 1, 72);
  //horizontal inner white lines
  ctx.fillRect((x+25), y, 9, 6);
  ctx.fillRect((x+37), y, 35, 6);
  ctx.fillRect((x+25), (y+7), 47, 1);
  ctx.fillRect((x+25), (y+9), 9, 3);
  ctx.fillRect((x+37), (y+9), 35, 3);
  ctx.fillRect((x+25), (y+13), 47, 1);
  ctx.fillRect((x+25), (y+15), 9, 4);
  ctx.fillRect((x+37), (y+15), 35, 4);
  ctx.fillRect((x+25), (y+20), 47, 1);
  ctx.fillRect((x+25), (y+22), 9, 3);
  ctx.fillRect((x+37), (y+22), 35, 3);
  ctx.fillRect((x+25), (y+26), 47, 1);
  ctx.fillRect((x+25), (y+28), 9, 6);
  ctx.fillRect((x+37), (y+28), 35, 6);
  //horizontal white line bottom
  ctx.fillRect((x+25), (y+37), 9, 6);
  ctx.fillRect((x+37), (y+37), 35, 6);
  ctx.fillRect((x+25), (y+44), 47, 1);
  ctx.fillRect((x+25), (y+46), 9, 3);
  ctx.fillRect((x+37), (y+46), 35, 3);
  ctx.fillRect((x+25), (y+50), 47, 1);
  ctx.fillRect((x+25), (y+52), 9, 4);
  ctx.fillRect((x+37), (y+52), 35, 4);
  ctx.fillRect((x+25), (y+57), 47, 1);
  ctx.fillRect((x+25), (y+59), 9, 3);
  ctx.fillRect((x+37), (y+59), 35, 3);
  ctx.fillRect((x+25), (y+63), 47, 1);
  ctx.fillRect((x+25), (y+65), 9, 7);
  ctx.fillRect((x+37), (y+65), 35, 7);
  ctx.fillRect((x+64), (y+37), 8, 34);
  ctx.fillRect((x+64), (y), 8, 34);
  // eyes proper
  foureyes(x, y);
  foureyes(x, (y+37));
  foureyes((x+48), y);
  foureyes((x+48), (y+37));
  ctx.beginPath()
  ctx.fillStyle = "#2c3790";
  ctx.arc((x+12),(y+18), 3, 0, 7);
  ctx.arc((x+12),(y+54), 3, 0, 7);
  ctx.fill();
  ctx.beginPath();
  ctx.arc((x+60),(y+18), 3, 0, 7);
  ctx.arc((x+60),(y+54), 3, 0, 7);
  ctx.fill();
  ctx.fillStyle="black";
}
const table = () => {
  const tileXposition = [12, 96, 180, 264, 516, 600];
  const tileYposition = [12, 96, 180];
  const middleXposition = [348, 432];
  const middleYposition = [96];

  ctx.fillStyle = "#2c3790";
  ctx.fillRect(0, 0, 348, 264);
  ctx.fillRect(348, 84, 156, 96);
  ctx.fillRect(504, 0,  180, 264);

  ctx.fillStyle = "white";

  tileXposition.forEach(x => {
    tileYposition.forEach(y => {
      ctx.fillRect(x, y, 72, 72);
    })
  })

  middleXposition.forEach(x => {
    middleYposition.forEach(y => {
      ctx.fillRect(x, y, 72, 72);
    })
  })
}
const foursqui = (x, y, z) => {
  squigglySquare(x, y, z);
  squigglySquare((x+36.7), y, z);
  squigglySquare((x+36.7), (y+37.3), z);
  squigglySquare(x, (y+37.3), z);
  smallfive((x+17.15), (y+13));
  smallfive((x+53.85), (y+13));
  smallfive((x+53.85), (y+50.3));
  smallfive((x+17.15), (y+50.3));
  ctx.beginPath();
  ctx.moveTo((x+36), (y-4));
  ctx.lineTo((x+36), (y+68));
  ctx.moveTo((x),(y+32));
  ctx.lineTo((x+72), (y+32));
  ctx.stroke();
}
const completeBoard = () => {
  table();
  //rose tiles
  rose(12, 12);
  redcircle(48, 48);
  rose(12, 180);
  redcircle(48, 216);
  rose(264, 96);
  redcircle(300, 132);
  rose(516, 12);
  redcircle(552, 48);
  rose(516, 180);
  redcircle(552, 216);
  // five tiles
  fiveTile(216, 48);
  fiveTile(132, 132);
  fiveTile(384, 132);
  fiveTile(636, 132);
  fiveTile(216, 216);
  // squiggly square big
  squigglySquare(604, 24, 8);
  squigglySquare(604, 192, 8);
  // squiggly in bigger squiggly
  squigglySquare(620, 36, 4);
  squigglySquare(620, 204, 4);
  //small five dots in small squiggly
  smallfive(636, 48);
  smallfive(636, 216);
  //four squiggly and blue dots
  foursqui(432, 100, 4.3);
  foursqui(180, 100, 4.3);
  //squaredsquares
  squaredsquare(13, 97);
  //eyes
  eyes(96, 12);
  eyes(96, 180);
  eyes(264, 180);
  eyes(516, 96);
  ctx.save();
  ctx.rotate((Math.PI / 180) * 180);
  eyes(-336, -84);
  ctx.restore();
}
const smallcircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 7);
  ctx.fill();
}
const bigcircle = (color1, x, y, color2) => {
  ctx.save(); //save at 00
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 7);
  ctx.stroke();
  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 7);
  ctx.fill();
  ctx.fillStyle = color2;
  smallcircle((x+10), (y+10));
  smallcircle((x+10), (y - 10));
  smallcircle((x - 10), (y+10));
  smallcircle((x-10), (y-10));
  ctx.restore();
}
const actualBoard = () => {
  completeBoard();
  // black pieces
  piecesBlack.forEach(piece => {
    bigcircle('black', piece.x, piece.y, 'white');
  })

  // white pieces
  pieces.forEach(piece => {
    bigcircle('lightgrey', piece.x, piece.y, 'black');
  })
}
// actual functions
let choices = [];
//before any dice roll
actualBoard();
//boardChoice, pieceColor, buttonColor, board2
const diceroll = (...args) => {
  if(choices.length === 0) {
    let result = [];
    let display = 0;
    for(let i = 0; i <= 3; i++) {
      let roll = Math.floor(Math.random() * 5);
      switch (roll) {
        case 0:
        case 1:
        case 2:
          result.push(0);
          break;
        case 3:
        case 4:
          result.push(1);
          break;
        default:
          result.push(25);
      }
    }
    result.forEach(item => {
      display += item;
      //display = 3;
    })

    document.getElementById("diceResult").innerHTML = result;
    document.getElementById("displayResult").innerHTML = display;

    if(display !== 0) {
      for(let i = 0; i < args[1].length; i++) {
        let exceptCurrent = args[1].slice();
        exceptCurrent.splice(i, 1);
        let next = i + 1;

        let origin = args[1][i].place;
        let pieceNum = i;
        let nOrigin = origin + display;

        function test(currentValue) {
          return currentValue.place !== nOrigin;
        }

        if(nOrigin <= 15) {
          if( exceptCurrent.every(test) ) {
            if(nOrigin === 8 & boardCenter.occupied.find(item => {return item === 8}) === 8) {
              nOrigin ++;
            }
            choices.push({[pieceNum] : [nOrigin, origin]});
          }
        }
        if(origin === 0 && args[1][next].place === 0) {
          break;
        }
      }
      console.log(boardOffPosition.occupied);
      choices.forEach(choice => {
        let button = document.createElement("BUTTON");
        let text = document.createTextNode("move piece " + (parseInt(Object.keys(choice)) + 1) + " to tile n° " + choice[Object.keys(choice)][0]);
        button.appendChild(text);

        let valueFunction = "choosing(" + Object.keys(choice) + ", " + choice[Object.keys(choice)][0] + ", " + choice[Object.keys(choice)][1] + ", " + args[0].name + ", " + args[1].name + ", " + args[3].name + ", " + args[2].id + ", " + args[4].id + ", " + args[5].name +")";
        let valueFunction2 = "hovering("+choice[Object.keys(choice)][0] +", " + args[1].name + ", " + Object.keys(choice) + ")";
        let valueFunction3 = "unhovering()";
        button.setAttribute("onclick", valueFunction);
        button.setAttribute("onmouseover", valueFunction2);
        button.setAttribute("onmouseleave", valueFunction3)
        document.getElementById("choices").appendChild(button);
      })
    }
    else {
      document.getElementById(args[2].id).removeAttribute("disabled");
      document.getElementById(args[4].id).setAttribute("disabled", "");
    }
  }
  else {
    alert("make a choice first");
  }
}
//end of diceroll
var timer;

const choosing = (...args) => {
  choices = [];
  ctx.strokeStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualBoard();
  if(args[1] !== 15) {args[4][args[0]].place = args[1];}
  else {
    args[4][args[0]].place = 32;
  }


  switch (args[2]) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      args[3].occupied.forEach((tile, index) => {
        if (tile === args[2]) {
          args[3].occupied.splice(index, 1);
        }
      })
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      boardCenter.occupied.forEach((tile, index) => {
        if (tile === args[2]) {
          boardCenter.occupied.splice(index, 1);
        }
      })
      break;
    case 13:
    case 14:
      args[5].occupied.forEach((tile, index) => {
        if (tile === args[2]) {
          args[5].occupied.splice(index, 1);
        }
      })
      break;
    default:
      alert("something went wrong in the origin switch");
  }

  let xCoord;
  let yCoord;

  if(args[1] === 1 || args[1] === 2 || args[1] === 3 || args[1] === 4) {
    args[3].occupied.push(args[1]);
    xCoord = boardPosition[(args[1] - 1)];
  }
  else if(args[1] === 13 || args[1] === 14 || args[1] === 15) {
    if(args[1] !== 15) {args[5].occupied.push(args[1]); }
    xCoord = boardOffPosition[(args[1] - 13)];
  }
  else {
    xCoord = boardCenterPosition[(args[1] - 5)];
    boardCenter.occupied.forEach((tile, index) => {
      if(tile === args[2]) {
        boardCenter.occupied.splice(index, 1);
      }
      if(tile === args[1]) {
        if (tile === 8) {
          args[1] = 9;
          xCoord = boardCenterPosition[(args[1] - 5)];
        }
        args[8].forEach((item) => {
          if(item.place === args[1]) {
            item.place = 0;
            item.x = item.initalX;
            item.y = item.initialY;
          }
        })
      }
    })
    boardCenter.occupied.push(args[1]);
  }

  if(args[1] === 14 || args[1] === 4 || args[1] === 8) {
    alert("play again");
  }
  else if(args[1] === 15) {
    alert("piece is home");
    args[6].removeAttribute("disabled");
    args[7].setAttribute("disabled", "");
  }
  else {
    args[6].removeAttribute("disabled", false);
    args[7].setAttribute("disabled", "");
  }

  if(args[1] > 4 && args[1] < 13) {
    yCoord = 132;
  }
  else if (args[4].name === 'pieces') {
    yCoord = 216;
  }
  else {
    yCoord = 48;
  }

  document.getElementById("choices").innerHTML = "";
  document.getElementById("diceResult").innerHTML = "";
  document.getElementById("displayResult").innerHTML = "";

  //pure left
  function loop() {
    if(args[4][args[0]].x !== xCoord) {
      args[4][args[0]].x --;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualBoard();
    }
    else {
      clearInterval(timer);
      if(xCoord === 468) {args[4][args[0]].x = 100000;}
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualBoard();
    }
  }
  //pure right
  function loopRight() {
    if(args[4][args[0]].x !== xCoord) {
      args[4][args[0]].x ++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualBoard();
    }
    else {
      clearInterval(timer);
    }
  }
  function fourToCenter() {
    if (args[4][args[0]].x !== 48 && args[4][args[0]].y !== 132) {
      args[4][args[0]].x --;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualBoard();
    }
    else {
      if (args[4].name === "piecesBlack") {
        if (args[4][args[0]].y !== yCoord) {
          args[4][args[0]].y ++;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else if(args[4][args[0]].x !== xCoord){
          args[4][args[0]].x ++;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else {
          clearInterval(timer);
        }
      }
      else {
        if (args[4][args[0]].y !== yCoord) {
          args[4][args[0]].y --;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else if(args[4][args[0]].x !== xCoord){
          args[4][args[0]].x ++;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else {
          clearInterval(timer);
        }
      }
    }
  }
  function centerToOuter() {
    if (args[4][args[0]].x !== 636 && args[4][args[0]].y === 132) {
      args[4][args[0]].x ++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualBoard();
    }
    else {
      if (args[4].name === "piecesBlack") {
        if (args[4][args[0]].y !== yCoord) {
          args[4][args[0]].y --;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else if(args[4][args[0]].x !== xCoord){
          args[4][args[0]].x --;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else {
          clearInterval(timer);
        }
      }
      else {
        if (args[4][args[0]].y !== yCoord) {
          args[4][args[0]].y ++;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else if(args[4][args[0]].x !== xCoord){
          args[4][args[0]].x --;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          actualBoard();
        }
        else {
          clearInterval(timer);
        }
      }
    }
  }

  //if pieces are on outer boards and stay on it
  if(args[4][args[0]].y === 216 && yCoord === 216) {
    timer = setInterval(loop,1);
  }
  else if (args[4][args[0]].y === 48 && yCoord === 48) {
    timer = setInterval(loop,1);
  }
  //if pieces are on center board and stay on it
  else if(args[4][args[0]].y === 132 && yCoord === 132) {
    timer = setInterval(loopRight,1);
  }
  //if piece move to center board
  else if(args[4][args[0]].y !== 132 && yCoord === 132) {
    timer = setInterval(fourToCenter);
  }
  //if pieces are on center board and move to outer board
  else if (args[4][args[0]].y === 132 && yCoord !== 132) {
    timer = setInterval(centerToOuter, 1);
  }
  //initial animation
    //white
  else if(args[4][args[0]].y === 422) {
    args[4][args[0]].y = 216;
    args[4][args[0]].x = 384;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualBoard();
    timer = setInterval(loop, 1);
  }
    //black
  else if(args[4][args[0]].y === 350) {
    args[4][args[0]].y = 48;
    args[4][args[0]].x = 384;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualBoard();
    timer = setInterval(loop,1);
  }

}

const hovering = (destination, color, pieceIndex) => {
  let xOrigin = color[pieceIndex].x;
  let yOrigin = color[pieceIndex].y;
  let xDest;
  let yDest;

  if(color.name === "pieces") {
    switch (destination) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 13:
      case 14:
      case 15:
        yDest = 216;
        break;
      default:
        yDest = 132;
    }
  }
  else {
    switch (destination) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 13:
      case 14:
      case 15:
        yDest = 48;
        break;
      default:
        yDest = 132;
    }
  }

  switch (destination) {
    case 1:
      xDest = 300;
      break;
    case 8:
      let test = boardCenter.occupied.find(item => {
        return item === 8;
      })
      if(test === 8) {
        xDest = 384;
      }
      else {
        xDest = 300;
      }
      break;
    case 2:
    case 7:
      xDest = 216;
      break;
    case 3:
    case 6:
      xDest = 132;
      break;
    case 4:
    case 5:
      xDest = 48;
      break;
    case 9:
      xDest = 384;
      break;
    case 10:
    case 15:
      xDest = 468;
      break;
    case 11:
    case 14:
      xDest = 552;
      break;
    case 12:
    case 13:
      xDest = 636;
      break;
    default:
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualBoard();
  ctx.beginPath();
  ctx.arc(xOrigin, yOrigin, 31, 0, 7);
  ctx.arc(xOrigin, yOrigin, 32, 0, 7);
  ctx.arc(xOrigin, yOrigin, 33, 0, 7);
  ctx.strokeStyle = "green";
  ctx.stroke();
  if (color.name === "pieces") {
    bigcircle("rgba(192, 192, 192, 0.8)", xDest, yDest, "rgba(0, 0, 0, 0.8)");
  }
  else {
    bigcircle("rgba(0, 0, 0, 0.8)", xDest, yDest, "rgba(255, 255, 255, 0.8)");
  }
}

const unhovering = () => {
  ctx.strokeStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualBoard();
}
