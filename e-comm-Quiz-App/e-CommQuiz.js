const questions = [
    
    {
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
            'They need to know web development,the platform itself, and the liquid template language',
            'All the above'
        ],
        correct: 'All the above'
    }

]

var quizState = {
    qCount: 2,
    questionCount: 1,
    quizLength: 3,
    rightCount: 0,
    wrongCount: 0
}

var quizContents = {
// qArray stands for question array, and will hold each question in the object array questions -- is populated by quizContents.getQuestions() meth
    qArray: [],
// answerArray holds the array of answers in each question object, and is populated by the quizContents.getAnswers() meth     
    answerArray: [],
// like the above correctAnswers is an array of correct prop in questions array object populated w/ quizContents.getCorrectAnswers()   
    correctAnswers: [],
/* About these arrays?
        The above arrays are accessed via javaScript and used to populate the web page various dynamic elements of the webpage/ quizApp
    This is done through manipulating the DOM, and event handlers.
    Also these arrays are used for:
    - conditional test such as comparing the users answers with the correct answers stored
    - comparing the current textContent of each element in order to swap or make changes etc. 

*/

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


//--------------------------------------------  end of object

/*getFirstQ: This function is called in the start event-- 
its job is to add the first question into the html from the quizContents.qArray prop using the DOM API 
once the click event attached to the start button/variable is fired*/
var getFirstQ = function(qArray){
    var questionAsked = document.getElementById('questionAsked');
    return questionAsked.innerHTML = qArray[0];
}

// ABOUT: getFirstAn() fucntion-- purpose? To get ONLY the first array of answers, and assign them in order to each label html element 
    //to match the first question-  CAN I DO THE SAME THING WITH LESS CODE USING LIBERATED FUNCTION?
// hOW IT WORKS:
/* 1. accepts quizContents.answerArray as an argument, 2. gets all spans in the HTML file, and stores in the variable allSpans
3. loops through the allSpan 'array' because it allSpans on the html file have been stored to this variable so it is treated like an array
    4. assigns the current iterated span ex. i = 0 the value of the [0] index answerArray first iterated element which is '0  */ 
var getFirstAn = function(anArray){
    var allSpans = document.querySelectorAll('span');
    for(var i = 0; i < allSpans.length; i++){
        allSpans[i].innerHTML = anArray[0][i];
    }
}

/*getSelectedAnswer() function:
This function loops through the input ele
1. to test for the input type = 'radio, and then
2. test whether any of those radios "checked" properties return true
3. if true, than get the span ele which holds the current, 'answer Option'adjacent to the current checked radio button 
4. get it how? by passing the current radio.value-- the stored value in this 'value' property is an exact match to the adjacent span id value 
5. next store that value into a variable, and call the testSelectedAnswer() and pass it the selectedAnswer variable
6. lastly load the next set of answers and question 
*/
function getSelectedAnswer(){
    //console.log('The cArray called in the getSelectedAnswer function =>: ', cArray );
    var radios = document.getElementsByTagName('input');
    var selectedAnswer;
    for(var i = 0; i < radios.length; i++){
        if(radios[i].type = 'radio'){
            if(radios[i].checked){// console.log returning the radio value is true
                selectedAnswer = document.getElementById(radios[i].value).innerHTML;
                radios[i].checked = false;
            } 
            //getNextQ(anArray, count);// still need to reset questionCount once it hits 3 or do something
        }
    }
     
    return  selectedAnswer ;
}

/* testSelectedAnswer function:
****This function will called before the getNextAnswers() in the getSelectedAnswer() function which--
What it does?
1.A function that is passed as an argument (selectedAnswer) calculated in the getSelectedAnswer() -the value of the checked radio button
2. loops through the the correctanswerArray and, 
3. tests the value of that checked radio box with the correct[i](the corresponding correct answer) in the correctAnswer array
4. lastly, if answer is correct we increment ex.correct++ else we increment wrong++
5. why? we will use it in displaying the finalResults       
*/

//var TestResultsArray = new Array(2);

function testSelectedAnswer(userAnswer, cArray){
    var wrong;
    var right;
    console.log('USERANSWER TEST', userAnswer);
    console.log('cArray includes test:', cArray.includes(userAnswer))
    var index = cArray.indexOf(userAnswer);
    if( index >= 0 || cArray.includes(userAnswer)){
        right = quizState.rightCount++; // what will happen if I put this function in the loop above
        console.log('RIGHT!!!!',index, '<= indexof USERANSWER TEST and useranswer =>',    userAnswer,     'correct answer array', cArray)
        
        //TestResultsArray[0] = right; 
    } else {    
         console.log(cArray.indexOf(userAnswer), '<= indexof USERANSWER TEST and useranswer =>', userAnswer)
         wrong = quizState.wrongCount++;
         index++
        //TestResultsArray[1] = wrong;
    }
    console.log('WRONG COUNT: ', quizState.wrongCount, 'RIGHT COUNTS: ', quizState.rightCount, 'correct answer array', cArray);
    }




var getNextQ = function (qArray, count) {
    var questionAsked = document.getElementById('questionAsked');
    var currentQ = questionAsked.innerHTML
    if (currentQ === qArray[0]) {
        questionAsked.innerHTML = qArray[count];
    } else {
        questionAsked.innerHTML = qArray[count];
    }
}
// getNextAns- gets every answer array after the first, and populates each span-- 
//idea: use the count as a way to test if first question etc.
var getNextAns = function(anArray, count){
    var allSpans = document.querySelectorAll('span');
    //WRITE A CONDITIONAL UP HERE THAT RESETS IF NO MORE QUESTIONS ARE AVAILA
    /*if(count === 3){
        return true;
    };*/
    for(var i = 0; i < allSpans.length; i++){
        var firstAnswers = allSpans[i].innerHTML = anArray[0][i];
        var nextAnswers = allSpans[i].innerHTML = anArray[count][i];
        if(nextAnswers === firstAnswers){
            allSpans[i].innerHTML = anArray[count][i];
        } else {
            allSpans[i].innerHTML = anArray[count][i];
        }
    }
    ;
}

var compareResults = ()=>{// trying to get score
   var right = quizState.rightCount;
   var wrong = quizState.wrongCount;
 if(right > wrong){
    // passed  
    return results = true;
} else {
    //failed
    return results = false;  
 }
 return false;
};


function retrieveQuizQnA(qArray,anArray, count){
    var right = quizState.rightCount;
    var wrong = quizState.wrongCount;
    var fScore = document.getElementById('fScore'); 
    var pScore = document.getElementById('pScore');    
    if(count === 3 && compareResults() === true){
        swapActiveClass('transitionContainer', 'passedPage')
        pScore.innerHTML = `Your final score ${right} of ${quizState.quizLength} correct`;
        count = 1;
    } else if(count === 3 && compareResults() === false){
        swapActiveClass('transitionContainer', 'failedPage');
        fScore.innerHTML = `Your final score ${right} of ${quizState.quizLength} correct`;
        count = 1;
    } else {
        getNextQ(qArray, count);
        getNextAns(anArray, count);
    }
};
/*  The arguments in this function must be the exact id of the elements you want to remove and add active class to 
    i.e. the argument passed into the function will be represented by the params in the getElement by id, and the variable  name 
    acting as a reference

*///what if I passed a function into here 
function swapActiveClass(deActivate_E_Id, reActivate_E_Id) {
    //Getting both containers id to manipulate with DOM api  
    deActivate_E_Id = document.getElementById(deActivate_E_Id);
    reActivate_E_Id = document.getElementById(reActivate_E_Id);
console.log("reActivate_E_Id test",  reActivate_E_Id )
console.log("deActivate_E_Id test", deActivate_E_Id )
    //Here I am calling the .replace() method for both containers, to switch the classes they are in
    deActivate_E_Id.classList.replace('active', 'hide');
    // the hide class has- display: none; -and the- active- display: block;
    reActivate_E_Id.classList.replace('hide', 'active');
}

/*var showResultsPage = function(){
    var questionContainer = document.getElementById('transitionContainer'); 
    questionContainer.classList.replace('active', 'hide');
    var resultsPage = document.getElementById('resultsPage');
    resultsPage.classList.replace('hide', 'active');
    //if(quizState.wrongCount >){

  //  }
}*/
 

window.onload = function() {
    //This meth populates the quizContents.correctAnswers prop to be used in the rest of the code 
    quizContents.getCorrectAnswer(questions);
    console.log(quizContents.correctAnswers, '<= THE correct answer meth results')
    //This meth populates the quizContents.answersArray prop to be used in the rest of the code 
    quizContents.getAnswers(questions);
    //This meth populates the quizContents.qArray prop to be used in the rest of the code
    quizContents.getQuestions(questions);
    // This initiates the html element with the name 'startBtn' to the start varaible 
    var start = document.getElementById('startBtn');
    // This adds an eventListener to the start variable
    start.addEventListener('click', () => {
   //     var startQuiz = domMethods.getStartQuiz('startQuiz');
   //     var transitionContainer = domMethods.getTransitionContainer('transitionContainer');
        console.log('fired');
        swapActiveClass('startQuiz', 'transitionContainer');
        //swapActiveClass(startQuiz, transitionContainer);
        getFirstQ(quizContents.qArray);
        getFirstAn(quizContents.answerArray); 

    })
    
    var Next = document.getElementById('Next');
    Next.addEventListener('click', () => {
        //count is a reference to quizState.questionCount, default = 1 and its purpose it to track where we are in the test
        var count = quizState.questionCount++;
        // qCount keeps track of the present question that the user is on and displays it, it's default = 2, because 1 is hardcoded in html
        var qCount = quizState.qCount++;
        // this accesses the html tag that displays the current question count to the user and displays the qCount
        document.getElementById('questionCount').innerHTML = 'Question ' + qCount + '  of 3';
        // this is the function that gets the current selected radio input and the value of the span
        var selectedAnswer = getSelectedAnswer();
        // this test the user answer with the correctArray by looping through it using .includes method
        testSelectedAnswer(selectedAnswer, quizContents.correctAnswers, count);
        // this retrieves the next set of questions and answers
        retrieveQuizQnA(quizContents.qArray ,quizContents.answerArray, count);
        console.log('MAIN TEST!!!! rightCount: ', quizState.rightCount);
        console.log('MAIN TEST!!!! wrongCount: ', quizState.wrongCount);
        //console.log('TestResultsArray TEST: ', TestResultsArray);

        //checkAnswer();
    })

    var reTest = document.getElementById('retestBtn');
    reTest.addEventListener('click', () => {
        document.location.reload()
        // add code here to redirect to the quiz start
    })

    var tryAgain = document.getElementById('tryAgainBtn');
    tryAgain.addEventListener('click', () => {
        document.location.reload()

    })
//Last addEventListener to retest button
}
/* How can I compare the test scores to determine whether a person failed or passed?
    - a f
*/ 
// ONCE ALL 3 QUESTIONS ARE ANSWERED AND THE NEX BTN IS HIT, A RESULTS PAGE NEEDS TO POP UP REVEALING THE TEST SCORES, AND A BTN TO TRY AGAIN AND RESET THE QUIZ

