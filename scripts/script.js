const questionText = document.getElementById("questionText");
const categoryText = document.getElementById("categoryText");
let questionCounter = document.getElementById("questCounter").innerHTML;

let tenQuestionArr;

let timeLeft = 30;
let bar = document.getElementById('bar');
let timer = setInterval(() => {
    timeLeft--;
    bar.style.width = timeLeft / 30 * 150 + 'px';
    if (timeLeft === 0) {
      clearInterval(timer);
    }
    }, 1000);

fetch("https://opentdb.com/api.php?amount=10")
.then(fetched => fetched.json(fetched))
.then(parsed => {
    tenQuestionArr = parsed.results;
    console.log(tenQuestionArr);
    questionText.innerHTML = tenQuestionArr[questionCounter - 1].question;
    categoryText.innerHTML = `Category : ${tenQuestionArr[questionCounter - 1].category}`;

})
.catch(fetchError => console.log(fetchError));

function NextButton() {
    
    let radios = document.getElementsByName("answers");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          console.log(radios[i].value); 
          radios[i].checked = false;
        }
    }
    questionCounter = parseInt(questionCounter)+1;
    document.getElementById("questCounter").innerHTML = questionCounter;
    questionText.innerHTML = tenQuestionArr[questionCounter - 1].question;
    categoryText.innerHTML = `Category : ${tenQuestionArr[questionCounter - 1].category}`;

}


