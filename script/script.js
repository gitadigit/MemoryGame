let letters = [
    {
        id: 1,
        content: 'A',
        flipped: false
    },
    {
        id: 2,
        content: 'A',
        flipped: false

    },
    {
        id: 3,
        content: 'B',
        flipped: false

    },
    {
        id: 4,
        content: 'B',
        flipped: false

    },
    {
        id: 5,
        content: 'C',
        flipped: false

    },
    {
        id: 6,
        content: 'C',
        flipped: false

    },
    {
        id: 7,
        content: 'D',
        flipped: false

    },
    {
        id: 8,
        content: 'D',
        flipped: false

    },
    {
        id: 9,
        content: 'H',
        flipped: false

    },
    {
        id: 10,
        content: 'H',
        flipped: false

    },
    {
        id: 11,
        content: 'I',
        flipped: false

    },
    {
        id: 12,
        content: 'I',
        flipped: false

    }
];
let numbers = [
    {
        id: 1,
        content: '1',
        flipped: false

    },
    {
        id: 2,
        content: '1',
        flipped: false

    },
    {
        id: 3,
        content: '2',
        flipped: false

    },
    {
        id: 4,
        content: '2',
        flipped: false

    },
    {
        id: 5,
        content: '3',
        flipped: false

    },
    {
        id: 6,
        content: '3',
        flipped: false

    },
    {
        id: 7,
        content: '4',
        flipped: false

    },
    {
        id: 8,
        content: '4',
        flipped: false

    },
    {
        id: 9,
        content: '5',
        flipped: false

    },
    {
        id: 10,
        content: '5',
        flipped: false

    },
    {
        id: 11,
        content: '6',
        flipped: false

    },
    {
        id: 12,
        content: '6',
        flipped: false

    }
];
let chars = [
    {
        id: 1,
        content: '!',
        flipped: false

    },
    {
        id: 2,
        content: '!',
        flipped: false

    },
    {
        id: 3,
        content: '@',
        flipped: false

    },
    {
        id: 4,
        content: '@',
        flipped: false

    },
    {
        id: 5,
        content: '#',
        flipped: false

    },
    {
        id: 6,
        content: '#',
        flipped: false

    },
    {
        id: 7,
        content: '$',
        flipped: false

    },
    {
        id: 8,
        content: '$',
        flipped: false

    },
    {
        id: 9,
        content: '&',
        flipped: false

    },
    {
        id: 10,
        content: '&',
        flipped: false

    },
    {
        id: 11,
        content: '*',
        flipped: false

    },
    {
        id: 12,
        content: '*',
        flipped: false

    }
];

let t;
let matchedCards = [];//מכיל את הזוגות התואמות 
let flippedCards = [];//מערך של הקלפים הנוכחיים שהמשתמש הפך -מתאפס בכל תור
const players_arr = [];//מערך של השחקנים המשתמשים במחשב זה על ידי שמירה בלוקל סטורייג עם שימוש הג'ייסון

let buttons=document.querySelectorAll(".button_type2");
for(let i=0;i<buttons.length;i++)
{ 
    buttons[i].style.color.white; 
}

//שליפת ה JSON לתוך מערך
let str2 = localStorage.getItem("players_arr");
let arr_json = JSON.parse(str2);//המרה ל JSON
    for (let i = 0; i < arr_json.length; i++)
        players_arr.push(arr_json[i]);//דחיפה את הנתון במערך

//let jsonNumbers = JSON.stringify(numbers);
document.querySelector('#enter').onclick=enter;
function enter(e) {// שנמצא בדף הביתenterכפתור ה
e.preventDefault();//שלא ישלח ישר אלא קודם יעשה את כל הפונוקציה ואז אני ישנה את href
   let names = document.querySelector("#tt").value;
   let family1 = document.querySelector("#family").value;
   let flag=false;
for (i of players_arr)
{
    if(names==i.name&&family1==i.family)
      { flag=true;
       alert("we are so happy to meet you again!")
       location.href="html/game.html"//מעביר אותי לדף הבא
      }
}
if(flag==false)
{
    alert("we are so happy to host you in our game! ");
    players_arr.push({name:names,family:family1})//דחיפה למערך הPlay
    let str= JSON.stringify(players_arr);
    localStorage.setItem("players_arr", str);
    location.href="html/game.html"//מעביר אותי לדף הבא
}
let selectedArray=[];//מערך של הסוג הנבחר 
}

// document.querySelector("#button_letters").onmouseover=function(){
//    let n= this.nextElementSibiling;
//    n.style.backgraoundColor=white;
// }

//פונקציה שבוחרת איזה סוג של משחק אתה רוצה 

function chooseType(button) {
    let id_type = button.id;
    switch (id_type) {
        case "button_chars":
            {
                selectedArray = chars.slice();//שומר את המערך כולו ולא רק ה ID
            }
            break;
        case "button_letters":
            {
                selectedArray = letters.slice();
            }
            break;
        case "button_numbers":
            {
                selectedArray = numbers.slice();
            }
            break;
        default:
            selectedArray = [];
            break;
    }
    console.log(selectedArray)
    createGameBoard(selectedArray);
    let elemntB = document.querySelector('#buttons_types');//מסיר את הכפותרי הבחירה 
    elemntB.style.display = 'none';
    Timer();
}

//ליצור את לוח המשחק 
function createGameBoard(selectedArray) {
    document.querySelector('#buttons_types')
    const gameBoard = document.querySelector('#cards_container');
    shuffleCards(selectedArray);//שליחת הכרטיסים לפונקציה שמערבבת אותם 
    selectedArray.forEach((card) => {
        const cardEl = document.createElement('div');//יצירת DIV חדש 
        cardEl.className = 'card';
        cardEl.addEventListener('click', () => flipCard(card));//ברגע שאתה לוחץ הוא מתהפך  
        card.element = cardEl;
        gameBoard.appendChild(cardEl);//מוסיף את האלמנט של הכרטיסים ומוסיך אותו להצגה גלויה כל המסך
    });
    document.querySelector('#titel_game').innerHTML="You can do it!!";
}

//בודק האם הם זוג 
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.content === card2.content) { //בודקת שהתוכן שווה 
        matchedCards.push(card1, card2);
        flippedCards = [];//רק את הזוד השווה הוא שומר במערך 
        if (matchedCards.length === selectedArray.length) { //אם שימת להתאים את כל הקלפים
            win();
        }
    } 
    else {
        setTimeout(function (){
            card1.flipped = false;
            card2.flipped = false;
            card1.element.textContent = '';//מוחק את תוכן הכרטיס 
            card2.element.textContent = '';
        }, 750)//כמה זמן הקלפים נשארים גלויים 
        flippedCards = [];//מאפסת את המערך שוב פעם 
    }
}

//פונקציה שמערבבת את המערך עפ"י מיקום
function shuffleCards(array) {//מערבב את מיקום הכרטיסים ומעתיק למערך חדש
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);//מגרילה מיקום ע"פ אינדקסים 
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];//מחליפה את האלמנטים שבתוך המערך 
    }
    return array;
}

//פונקציה שעושה הפיכה לקלף
function flipCard(card) {
    if ( matchedCards.includes(card)) {//בודק אם הקלף זוג מחזיר את הפונקציה //card.flipped ||
        return;                       //בדיקה האם הקלף הנוכחי הפוך או אמת 
    }
    card.flipped = true;
    flippedCards.push(card);
    card.element.textContent = card.content;//מכיל את תוכן הכרטיס 
    if (flippedCards.length === 2) { //בודק אם רק שני קלפים הפוכים
      setTimeout(checkMatch(), 1000); //שולח לפונקציה לבדוק התאמה 
    }
  }

//פונקציה של הודעה  כישלון 
function fail(t) {
    // clearInterval(t);//מה אני רוצה לנקות 
    let elemntF = document.getElementById('cards_container');//מסיר את כרטיסי הבחירה 
    elemntF.style.display = 'none';
    let imgF = document.getElementById('gameOverImg');
    imgF.style.display = 'block';
}

//פונקציה של הודעת ניצחון
function win(t) {
    //clearInterval(t);//מנקה את המסך 
    let elemntF = document.getElementById('cards_container');//מסיר את כרטיסי הבחירה 
    elemntF.style.display = 'none';
    let imgF = document.getElementById('winImg');
    imgF.style.display = 'block';
    document.getElementById('back').style.backgroundColor="yellow";//עיצוב הכפתור 
    document.getElementById('back').style.color="blueviolet";
}

//כתובת חזרה לדף הבית 
function backHome() {
    let backHome = document.querySelector('#back');
    backHome.addEventListener("click", function () {//מחזיר אותי לדף הקודם 
        history.back(); 
    });
}

//טיימר 
function Timer() {
    // let t;
    let second = 1;//שניות
    let minutes = 1;//דקות
    let flag = 0;//בודק מתי הטיימר מגיע ל 0
    t = setInterval(function () {
        if (second == 0) {
            if (flag == 1) {
                second = 59;
                minutes--;
                flag = 0;
            }
            else {
                flag = 1;
                second = 0;
            }
        }
        if (second <= 9) { //כל פעם הוא מעביר לעשריה אחרת 
            if (second > 0)
                second--;
            document.querySelector('#clock').innerHTML = minutes + ":0" + second;
        }
        else {
            document.querySelector('#clock').innerHTML = minutes + ":" + second;
            if (second > 0)
                second--;
        }
        if (minutes == 0 && second == 0)
            fail(t);
    }, 1000);
}
