const welcomeScreen = document.getElementById("welcomeScreen")
const quizArea = document.getElementById("quizArea")
const resultScreen = document.getElementById("resultScreen");
const timerText = document.getElementById("timer");
let isFifty = true;



const levels = [
    '₹ 1000000',
    '₹ 500000',
    '₹ 250000',
    '₹ 125000',
    '₹ 64000',
    '₹ 32000',
    '₹ 16000',
    '₹ 8000',
    '₹ 4000',
    '₹ 2000',
    '₹ 1000',
    '₹ 500',
    '₹ 300',
    '₹ 200',
    '₹ 100',
]

const questions = [
// Q1.
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlan Nehru", "Mahatma Gandhi", "Subhas Changra Bose", "Chandra Sekhar Azad"],
        answer: 1
    },
    // Q2.
    {
        question:"What is the capitat of France?",
        options: ["Berlin","Madrid","Paris","Lisbon"],
        answer:2
    },
    // Q3
    {
        question:"Which planet is known as the Red Planet?",
        options:["Earth","Mars","Jupiter","Saturn"],
        answer:1
    },
    // Q4
    {
        question:"Which is the largest mammal?",
        options:["Elephant","Blue Whale","Giraffe","Polar Bear"],
        answer:1
    },
    // Q5
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlan Nehru", "Mahatma Gandhi", "Subhas Changra Bose", "Chandra Sekhar Azad"],
        answer: 1
    },
    //Q6
    {
        question:"What is the capitat of France?",
        options: ["Berlin","Madrid","Paris","Lisbon"],
        answer:2
    },
    //Q7
    {
        question:"Which planet is known as the Red Planet?",
        options:["Earth","Mars","Jupiter","Saturn"],
        answer:1
    },
    //Q8
    {
        question:"Which is the largest mammal?",
        options:["Elephant","Blue Whale","Giraffe","Polar Bear"],
        answer:1
    },
    //Q9
    {
        question:"What is the capitat of France?",
        options: ["Berlin","Madrid","Paris","Lisbon"],
        answer:2
    },
    //Q10
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlan Nehru", "Mahatma Gandhi", "Subhas Changra Bose", "Chandra Sekhar Azad"],
        answer: 1
    },
    // Q11
    {
        question:"What is the capitat of France?",
        options: ["Berlin","Madrid","Paris","Lisbon"],
        answer:2
    },
    //Q12
    {
        question:"Which planet is known as the Red Planet?",
        options:["Earth","Mars","Jupiter","Saturn"],
        answer:1
    },
    //Q13
    {
        question: "Who is known as the Father of the Nation in India?",
        options: ["Jawaharlan Nehru", "Mahatma Gandhi", "Subhas Changra Bose", "Chandra Sekhar Azad"],
        answer: 1
    },
    //Q14
    {
        question:"What is the capitat of France?",
        options: ["Berlin","Madrid","Paris","Lisbon"],
        answer:2
    },
    //Q15
    {
        question:"Which planet is known as the Red Planet?",
        options:["Earth","Mars","Jupiter","Saturn"],
        answer:1
    }

]

let currentLevelIndex = levels.length - 1;
let currentQuestionIndex = 0;
let winningAmount = "₹ 0";
let timeInterval=30;
let interval;

function startGame(){
    const username = document.getElementById("username").value;
    const error = document.getElementById("usernameError");
    if(username.trim() === ""){
        error.innerHTML = "Please enter username";
        return;
    }
    error.innerHTML = "";
    welcomeScreen.classList.add("hide");
    quizArea.classList.remove("hide");
    loadLevels();
    loadQuestions();
}

function loadLevels(){
    const levelList = document.getElementById("levelList");
    levelList.innerHTML="";
    levels.forEach((level,index)=>{
        // console.log("level = ",level);
        // console.log("index = ",index);
        const levelDiv = document.createElement("li");
        levelDiv.classList.add("level")
        console.log("index = ",index, "  levels.length - index = ",levels.length-index," and level = ",level);
        levelDiv.innerHTML = `
            <span class="levelNumber">${levels.length - index}</span>
            <span class="levelAmount">${level}</span>
        `;
        if(currentLevelIndex===index){
            levelDiv.classList.add("active")
        }
        levelList.appendChild(levelDiv);

    })
}



function loadQuestions(){
    const questionStatement = document.getElementById("questionStatement");
    const answers = document.getElementById("answers");
    answers.innerHTML="";
    const currentQuestion = questions[currentQuestionIndex];

    questionStatement.innerHTML = currentQuestion.question;
    currentQuestion.options.forEach((option,index)=>{
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.innerHTML = option;
        answerDiv.setAttribute("onclick",`checkAnswer(${index})`)
        answers.appendChild(answerDiv);
    })

    timeInterval = 30;
    interval = setInterval(timer,1000);
}

function timer(){
    if(timeInterval==0){
        clearInterval(interval);
        manageResult();
    }
    console.log(timeInterval);
    timerText.innerHTML = timeInterval;
    timeInterval--;
}

function checkAnswer(option){
    const currentQuestion = questions[currentQuestionIndex];
    const priceMoney = document.getElementById("priceMoney");
    const message = document.getElementById("message");
    if(option !== currentQuestion.answer){
        manageResult()
    }

    currentQuestionIndex++;
    winningAmount=levels[currentLevelIndex];
    currentLevelIndex--;
    clearInterval(interval);

    if(currentLevelIndex<0){
        manageResult(true)
    }


    loadQuestions();
    loadLevels();
}

function manageResult(userWon = false){
    const priceMoney = document.getElementById("priceMoney");
    const message = document.getElementById("message");
    
    if(userWon){
        priceMoney.innerHTML = `You won: ${levels[0]}`;
        message.innerHTML = "Congratulations!"
        quizArea.classList.add("hide");
        resultScreen.classList.remove("hide");
        return;
    }

    priceMoney.innerHTML = `You won: ${winningAmount}`;
    quizArea.classList.add("hide");
    resultScreen.classList.remove("hide");

    
}

function fiftyFifty(){
    if (!isFifty) return;
    isFifty = false;

    const currentQuestion = questions[currentQuestionIndex];
    const wrongAnswers = [];
    currentQuestion.options.forEach((option, index) => {
        if (index !== currentQuestion.answer) wrongAnswers.push(index);
    });

    const shuffled = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
    const answers = document.getElementById("answers").children;
    let count = 0;

    for (const answer of answers) {
        if (shuffled.includes(count)) {
            // answer.style.display = "none";
            answer.innerHTML="";
        }
        count++;
    }

    document.getElementById("fiftyFiftyButton").disabled = true;


}