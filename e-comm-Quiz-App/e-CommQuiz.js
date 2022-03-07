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


//--------------------------------------------  end of object
function swapActiveClass() {
    //Getting both containers id to manipulate with DOM api  
    var startQuiz = document.getElementById('startQuiz');
    var questionContainer = document.getElementById('transitionContainer');

    //Here I am calling the .replace() method for both containers, to switch the classes they are in
    startQuiz.classList.replace('active', 'hide');
    // the hide class has- display: none; -and the- active- display: block;
    questionContainer.classList.replace('hide', 'active');
}

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
var getSelectedAnswer = function( qArray, anArray, cArray, count){
var radios = document.getElementsByTagName('input');
var selectedAnswer;
for(var i = 0; i < radios.length; i++){
    if(radios[i].type = 'radio'){
        if(!radios[i].checked){// console.log returning the radio value is true
            console.log('no checked radio value');
        } else {
            selectedAnswer = document.getElementById(radios[i].value).innerHTML;
            console.log('Radio value: ',radios[i].value, 'Span value is: ', selectedAnswer );
            testSelectedAnswer(selectedAnswer.innerHTML, cArray);
            retrieveQuizQnA(qArray,anArray, count); 
            radios[i].checked = false;
            //getNextQ(anArray, count);// still need to reset questionCount once it hits 3 or do something
    }
}
}
return true;
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

var testSelectedAnswer =  function(userAnswer, cArray){
    wrong = quizState.wrongCount;
    correct = quizState.wrongCount;
    console.log(cArray);//BUG TO FIX-SAYS CaRRAY NOT ITERABLE
    //correctAnswers Array IS ONLY SHOWING UP IN THE QUIZCONTNENTS OBJ METHOD, BUT NO WHERE ELSE, IT SHOWS UP EMPTY
    /*for(var c of cArray ){
        console.log('CORRECT ANSWER LOOP: ', a);
        if(userAnswer === c){
            correct++
        }else{
            wrong++
        }
    }*/
}
var ans = document.getElementById('a0').innerHTML;
console.log(testSelectedAnswer(ans), 'This is the get correct answer TEST FUNCTION')

var getNextQ = function (qArray, count) {
    var questionAsked = document.getElementById('questionAsked');
    var currentQ = questionAsked.innerHTML
    if (currentQ === qArray[0]) {
        questionAsked.innerHTML = qArray[count];
    } else if(count >= 2){
        count = 1;        
        // add switchClassesFunction here
    }
}
// getNextAns- gets every answer array after the first, and populates each span-- 
//idea: use the count as a way to test if first question etc.
var getNextAns = function(anArray, count){
    var allSpans = document.querySelectorAll('span');
    for(var i = 0; i < allSpans.length; i++){
        var firstAnswers = allSpans[i].innerHTML = anArray[0][i];
// I am using the variable count value to test for and set the next array of questions why?
    // this way if I added more questions to the test I would only have to change the quizState.questionCount in the quizState obj.        
    var nextAnswers = allSpans[i].innerHTML = anArray[count][i];
    if(nextAnswers === firstAnswers){
        allSpans[i].innerHTML = anArray[count][i];
        } else {
        allSpans[i].innerHTML = anArray[count][i];
        }
    }
}

var retrieveQuizQnA = function(qArray,anArray, count){
    getNextQ(qArray, count);
    getNextAns(anArray, count);
    return true;
}

window.onload = init;

function init() {
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
        console.log('fired');
        swapActiveClass();
        getFirstQ(quizContents.qArray);
        getFirstAn(quizContents.answerArray); 
    })

    var Next = document.getElementById('Next');
    Next.addEventListener('click', () => {
        var count = quizState.questionCount++;
        getSelectedAnswer(quizContents.qArray ,quizContents.answerArray, quizContents.correctAnswers, count);
        console.log('Next btn CALLED');
        console.log('test-3 Question Cnt: ', quizState.questionCount);
        //checkAnswer();
        console.log('QUIZ RIGHT COUNT IS: ', quizState.rightCount, 'QUIZ WRONG COUNT IS: ', quizState.wrongCount );

    })

}
//STEPS TO MAKE GETAN FUNCTION WORKING:
    //CONSIDER: the current quizContents.answerArray consist of 3 arrays in a main array with 4 elements in each
        /* How to identify the current anArray that: 
        1. I want to loop through -- i could use the question/count property
        2. and assign each element [i] in the current iteration to a <label>
        3. next determine whether I will use the id of each <label> or just a queryselectorAll()
        4. how can I use oppertunities to practice async programming, and firstclass functions
          */
// ONCE ALL 3 QUESTIONS ARE ANSWERED AND THE NEX BTN IS HIT, A RESULTS PAGE NEEDS TO POP UP REVEALING THE TEST SCORES, AND A BTN TO TRY AGAIN AND RESET THE QUIZ





/*
LEFT OFF: 3/3/22-- FINISHED THE GET FIRST ANSWERS FUNCTION
    NEXT: 1. BUILD THE GET NEXT ANSWERS FUNCTION
                s1. copy as much from the first getAnswer func as possible
                s2. we will figure this out when we get here--DONE
          CREATE A ENDOFTESTFUNC TO DETERMINE WHEN:
                s1. all test q's have been asked - 
                if(quizState.quizlength === count){
                    call function that:
                    1. switches the active class to display:none
                    2. switches the endOfQuiz class from- display:none to block
                    3. on this page user score is inserted in to the html and displayed
                        ex.  
                }  
                s2.      
          2. CREATE A FUCNTION THAT COMPARES THE SELECTED ANSWER WITH THE CORRECT ANSWER
          3. CALCULATES THE RIGHT OR THE WRONG ANSWERS
          4. CREATE A FUCNTION THAT YOU PASS THE RIGHT OR WRONG INFO TO AND DISPLAYS IT
          5. CREATE THE LAST PAGE, RESULTS PAGE       


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