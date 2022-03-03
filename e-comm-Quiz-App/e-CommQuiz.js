const questions = [{
        question: 'Which of the following is not a real eCommerce platform?',
        Answers: ['Shopify', 'WooCommerce', 'ShopCommerce', 'BigCommerce'],
        correct: 'ShopCommerce'
    },

    {
        question: 'If Shopify is so good, why are Shopify developers necessary?',
        Answers: ['To save time on things like store setups and migrations',
            'To extend the limited design options and functionalities of themes with custom code',
            'To provide support with a deep understanding of how the platform works and what its limitations are',
            'All the above'
        ],
        correct: 'All the above'
    },

    {
        question: 'Which of the following is true about Shopify developers?',
        Answers: ['They are paid extremely well',
            'There is a high demand for them',
            'They need to know web development',
            'the platform itself, and the liquid template language',
            'All the above [correct]'
        ],
        correct: 'All the above'
    }
]




/* one function to handle converting the questions array of obj into  
1.an array of just the questions being asked
2.an array of the options for each question - note this will be an array within an array
which means, a. loop the 'questions array, b. access the options prop (dot note) 
c. loop each ele in options to push into new array
3. lastly i need an array of the right option, and A WAY TO TEST IT WITH THE ANSWER THAT THE USER SELECTS

solutions:  3- I can store the correct answers in a, 'Quiz State obj'
store wrong answers in the 'Quiz State obj' using a property to track the count also
1&2- I can also store the qArray, and the options in a different obj quizArrays 

Use another function to determine whether a question has already been asked how?

*/



var quizState = {
    questionCount: 1,
    quizLength: 3,
    wrongCount: 0,
    rightCount: 0
}

var quizContents = {

    qArray: [],
    answerArray: [],
    correctAnswers: [],

    /* ABOUT THE quizContent METHODS!!
            -All of the methods in this object does 1 thing only
            -Each returns an array
            -Each have the same argument passed into it, which is; the 'questions,' array 
            -They are almost identical, in its structure, but differs 
                1.in the property of each question obj in the 'questions' array that it accesses and loops through
                2. and value it returns as a result 
            The intention is to use each as a nested/ firstclass function where the return value is used to execute another function 
                */


    /* this meth gets the values from the question prop of each question obj in the questions array 
    stores it into a new array called qArray and returns qArray and it's values */
    getQuestions: function (questions) {
        for (var q of questions) {
            this.qArray.push(q.question);
        }
        return this.qArray;
    },

    // this meth gets the the Answers prop form each question obj in the questions array 
    getAnswers: function (questions) {
        for (var q of questions) {
            //important, this  is an array that contains 3 other arrays which contain 4 elements each
            console.log(this.answerArray.push(q.Answers))
        }
        return this.answerArray;
    },
    // this meth loops through the questions array retrieves the value of the correct property, and stores it into an array called correctAnswers;
    // The purpose of this array is to test the answer of the user with the correct answer-- the intent is to use it in a test
    getCorrectAnswer: function (questions) {
        for (var q of questions) {
            this.correctAnswers.push(q.correct);
        }
        return this.correctAnswers;
    }
}

function swapActiveClass() {
    //Getting both containers id to manipulate with DOM api  
    var startQuiz = document.getElementById('startQuiz');
    var questionContainer = document.getElementById('seperationContainer');

    //Here I am calling the .replace() method for both containers, to switch the classes they are in
    startQuiz.classList.replace('active', 'hide');
    // the hide class has- display: none; -and the- active- display: block;
    questionContainer.classList.replace('hide', 'active');
}

/*getFirstQ: This function is called in the start event-- 
its job is to add the first question into the html from the quizContents.qArray prop using the DOM API 
once the click event attached to the start button/variable is fired*/
var getFirstQ = function (qArray) {
    var questionAsked = document.getElementById('questionAsked');
    return questionAsked.innerHTML = qArray[0];
}

//LEFT OFF HERE!!! ON MARCH 2, 2022! IT CHANGES THE QUESTIONS AND WORKS
    // NEXT? GET THE QUESTIONS AND POPULATE ETC.
var getNextQ = function (qArray, count) {
    var questionAsked = document.getElementById('questionAsked');
    var currentQ = questionAsked.innerHTML
    if (currentQ === qArray[0]) {
        questionAsked.innerHTML = qArray[count];
    } else {
        questionAsked.innerHTML = qArray[count];
    }
}

window.onload = init;

function init() {
    //This meth populates the quizContents.correctAnswers prop to be used in the rest of the code 
    quizContents.getCorrectAnswer(questions);
    //This meth populates the quizContents.answersArray prop to be used in the rest of the code 
    quizContents.getAnswers(questions);
    //This meth populates the quizContents.qArray prop to be used in the rest of the code
    quizContents.getQuestions(questions);
    // This initiates the html element with the name 'startBtn' to the start varaible 
    var start = document.getElementById('startBtn');
    // This adds an eventListener to the start variable
    start.addEventListener('click', () => {
        console.log('fired');
        swapActiveClass();
        getFirstQ(quizContents.qArray);
    })

    var Next = document.getElementById('Next');
    Next.addEventListener('click', () => {
        var count = quizState.questionCount++;
        console.log('Next btn CALLED');
        getNextQ(quizContents.qArray, count);// still need to reset questionCount once it hits 3 or do something
        console.log('test-3 Question Cnt: ', quizState.questionCount);
        //checkAnswer();
    })

}
// ONCE ALL 3 QUESTIONS ARE ANSWERED AND THE NEX BTN IS HIT, A RESULTS PAGE NEEDS TO POP UP REVEALING THE TEST SCORES, AND A BTN TO TRY AGAIN AND RESET THE QUIZ






/*
// when I am passing a func as a param the result of the func evaluation is what is passed as an arg/value



function trackAnswer(){
    var options = document.querySelectorAll('input');
     
    for(var o of options){
        if(o.className === 'correct'){
            quizState.rightCount++
            console.log(quizState.rightCount);
        } else {
            quizState.wrongCount++
        }
    }
}

*/