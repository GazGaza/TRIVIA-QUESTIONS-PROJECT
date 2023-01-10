const choosedCtgryText = document.getElementById("choosedCtgry");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const categoryArr = ["Video Games","Mathematics","Politics", "Musics", "Sports", "History"];
choosedCtgryText.innerHTML = categoryArr[0];
let num = 0;
localStorage.setItem("number","0");

rightBtn.addEventListener('click', () =>{
    if(num != 5){
        num++;
        choosedCtgryText.innerHTML = categoryArr[num];
        localStorage.setItem("number",num);
        console.log(localStorage.getItem("number"));
    }
    
});

leftBtn.addEventListener('click', () =>{
    if(num != 0){
        num--;
        choosedCtgryText.innerHTML = categoryArr[num];
        localStorage.setItem("number",num);
    }
});


