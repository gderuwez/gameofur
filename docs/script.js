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
const boardPosition = [324, 252, 180, 108];
const boardOffPosition = [612, 540];
const boardCenterPosition = [108, 180, 252, 324, 396, 468, 540, 612];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const quarterRose = () => {
  ctx.beginPath();
  ctx.moveTo(16, 36)
  ctx.lineTo(0, 24);
  ctx.lineTo(24, 24);
  ctx.lineTo(24, 0);
  ctx.lineTo(36, 16);
  ctx.stroke();
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
const table = () => {
  const tileXposition = [72, 144, 216, 288, 504, 576];
  const tileYposition = [72, 144, 216];
  const middleXposition = [360, 432];
  const middleYposition = [144];

  tileXposition.forEach(x => {
    tileYposition.forEach(y => {
      ctx.strokeRect(x, y, 72, 72);
    })
  })

  middleXposition.forEach(x => {
    middleYposition.forEach(y => {
      ctx.strokeRect(x, y, 72, 72);
    })
  })
}
const completeBoard = () => {
  table();
  rose(72, 72);
  rose(72, 216);
  rose(288, 144);
  rose(504, 72);
  rose(504, 216);
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
    bigcircle('white', piece.x, piece.y, 'black');
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
            choices.push({[pieceNum] : [nOrigin, origin]});
          }
        }
        if(origin === 0 && args[1][next].place === 0) {
          break;
        }
      }
      choices.forEach(choice => {
        let button = document.createElement("BUTTON");
        let text = document.createTextNode("move piece " + (parseInt(Object.keys(choice)) + 1) + " to tile n° " + choice[Object.keys(choice)][0]);
        button.appendChild(text);

        let valueFunction = "choosing(" + Object.keys(choice) + ", " + choice[Object.keys(choice)][0] + ", " + choice[Object.keys(choice)][1] + ", " + args[0].name + ", " + args[1].name + ", " + args[3].name + ", " + args[2].id + ", " + args[4].id + ", " + args[5].name +")"
        button.setAttribute("onclick", valueFunction);
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

const choosing = (...args) => {
  choices = [];

  args[4][args[0]].place = args[1];

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
    args[5].occupied.push(args[1]);
    xCoord = boardOffPosition[(args[1] - 13)];
  }
  else {
    xCoord = boardCenterPosition[(args[1] - 5)];
    console.log(boardCenter.occupied);
    boardCenter.occupied.forEach((tile, index) => {
      if(tile === args[2]) {
        boardCenter.occupied.splice(index, 1);
      }
      if(tile === args[1]) {
        console.log("on occupied square");
        args[8].forEach((item) => {
          if(item.place === args[1]) {
            item.place = 0;
            item.x = item.initalX;
            item.y = item.initialY;
            console.log("piece was knocked back to 0");
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
    yCoord = 180;
  }
  else if (args[4].name === 'pieces') {
    yCoord = 252;
  }
  else {
    yCoord = 108;
  }

  args[4][args[0]].x = xCoord;
  args[4][args[0]].y = yCoord;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualBoard();

  document.getElementById("choices").innerHTML = "";
  document.getElementById("diceResult").innerHTML = "";
  document.getElementById("displayResult").innerHTML = "";
}
