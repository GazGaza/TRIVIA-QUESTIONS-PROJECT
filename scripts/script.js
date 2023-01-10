const questionText = document.getElementById("questionText");
const categoryText = document.getElementById("categoryText");
const endBtn = document.getElementById("endBtn");
const nextBtn = document.getElementById("nextBtn");
let questionCounter = document.getElementById("questCounter").innerHTML;
let bar = document.getElementById("bar");
let tenQuestionArr;
let playerScore = 0;
let timeLeft = 30;
let sworiPas;

function setCategoryNum(){
  let result = 0;
  switch(parseInt(localStorage.getItem("number"))){
    case 0:
      result = 15;
      break;
    case 1:
      result = 19;
      break;
    case 2:
      result = 24;
      break;
    case 3:
      result = 12;
      break;   
    case 4:
      result = 21;
      break;      
    case 5:
      result = 23;
      break;  
  }
  return result;
}
fetch(`https://opentdb.com/api.php?amount=10&category=${setCategoryNum()}&type=multiple`)
.then(fetched => fetched.json(fetched))
.then(parsed => {
    tenQuestionArr = parsed.results;
    console.dir(tenQuestionArr);
    newQuestion();
})
.catch(fetchError => console.log(fetchError));


function printAnswers(){
  let radioBtns = document.getElementsByClassName("big");
  let correctAnswerNumber = randNumb(0,3);
  sworiPas = radioBtns[correctAnswerNumber];

  //swori pasuxis gamotana ekranze labelis damatebit
  let sworiTeqsti = document.createElement("label");
  sworiTeqsti.innerHTML = tenQuestionArr[questionCounter - 1].correct_answer;
  radioBtns[correctAnswerNumber].parentNode.appendChild(sworiTeqsti);
  // clearValue(radioBtns[correctAnswerNumber]);
  radioBtns[correctAnswerNumber].value = sworiTeqsti.innerHTML;

  //araswori pasuxebis gamotana ekranze 
  printWrongAnswers();
}

//kitxvis da pasuxebis gamotana ekranze
function newQuestion(){
  printAnswers();
  questionText.innerHTML = tenQuestionArr[questionCounter - 1].question;
  categoryText.innerHTML = `Category : ${tenQuestionArr[questionCounter - 1].category}`;
}

function randNumb(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//next gilakze dacheris shemdeg gamoidzaxeba NextButton funqcia romelic amowmebs swors pasuxs da tvirtavs axal pasuxs
//aseve monishnul gilaks mounishnavze abrunebs da motamashis qulas ertit zrdis romelic kitxvebis  
//amowurvis shemdeg chndeba ekranze da timers sawyis droze abrunebs
nextBtn.addEventListener("click",()=>{
  let radios = document.getElementsByName("answers");
  let uncheckedArr = [];
  
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked == false){
      uncheckedArr.push(radios[i]);
    }
  }

  if(uncheckedArr.length == 3){
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
    const parent = label.parentNode;
    parent.removeChild(label);
  });


  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      if(radios[i].value == tenQuestionArr[questionCounter - 1].correct_answer){
        playerScore++; 
        console.log("swori pasuxebis raodenoba", playerScore);
      }
      radios[i].checked = false;
    }
    timeLeft = 30;
  }

  questionCounter = parseInt(questionCounter)+1;
  document.getElementById("questCounter").innerHTML = questionCounter;
  newQuestion();
    if(questionCounter >= 10){
      gameOver();
    }
  }
})

function printWrongAnswers(){
  let wrongAnswerInputs = document.getElementsByClassName("big");
  let wrongAnswersList = tenQuestionArr[questionCounter - 1].incorrect_answers;
  let newArr = [];
  for(let i = 0; i < wrongAnswerInputs.length; i++){
    if(wrongAnswerInputs[i] != sworiPas){
      newArr.push(wrongAnswerInputs[i]);
    }
  }
  for(let i = 0; i < newArr.length; i++){
    let arasworiTeqsti = document.createElement("label");
    arasworiTeqsti.innerHTML = wrongAnswersList[i];
    newArr[i].parentNode.appendChild(arasworiTeqsti);
    newArr[i].value = arasworiTeqsti.innerHTML;
    }
}

endBtn.addEventListener("click",()=>{
  gameOver();
})
function gameOver(){
  document.getElementById("gameplay").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("resultText").innerHTML = `"You Answered ${playerScore} Questions Correctly"`;
}

let timer = setInterval(() => {
  timeLeft--;
  bar.style.width = timeLeft / 30 * 70 + "%";
  if (timeLeft === 0) {
    gameOver();
  }
}, 1000);
