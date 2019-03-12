$(document).ready(function(){

  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);

})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: "Who married Lyanna Stark and Rhaegar Targaryen?",
    q2: "Who was Lyanna Mormont’s mother?",
    q3: "Which of the following is TRUE?",
    q4: "How did Wun-Wun die?",
    q5: "Who was Cersei Lannister intended to marry?",
    q6: "Where is Melisandre from?",
    q7: "Which Dragon was called 'The Black Dread'?",
    q8: "Who took in Daenarys and Viserys after they fled Dragonstone?"
  },
  options: {
    q1: ["Archmaester Ebrose", "Maester Maynard", "Maester Helliweg", "Maester Lewin"],
    q2: ["Dania Mormont","Annalys Mormont","Thalina Mormont","Maege Mormont"],
    q3: ["Bran Stark is a Greenseer but not a warg", "Bran Stark is a warg but not a Greenseer", "Bran Stark is both a warg AND a Greenseer", "Bran Stark is neither a warg or a Greenseer"],
    q4: ["Shot in the back with a ballista bolt","Shot through the eye by Ramsey Bolton","Left behind at Hardhome","He is still alive"],
    q5: ["Rhaegar Targaryen","Petyr Baelish","Stannis Baratheon","Oberyn Martell"],
    q6: ["Volantis", "Braavos", "Naath", "Asshai"],
    q7: ["Drogon","Balerion","Meraxes","Vhagar"],
    q8: ["Lord Varys","Pyat Pree", "Illyrio Mopatis", "Xaro Xhoan Daxos"]
  },
  answers: {
    q1: 'Maester Maynard',
    q2: 'Maege Mormont',
    q3: 'Bran Stark is both a warg AND a Greenseer',
    q4: 'Shot through the eye by Ramsey Bolton',
    q5: 'Rhaegar Targaryen',
    q6: 'Asshai',
    q7: 'Balerion',
    q8: 'Illyrio Mopatis'
  },
  // trivia methods
  // method to initialize game
  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game section
    $('#game').show();

    //  empty last results
    $('#results').html('');

    // show timer
    $('#timer').text(trivia.timer);

    // remove start button
    $('#start').hide();

    $('#remaining-time').show();

    // ask first question
    trivia.nextQuestion();

  },
  // method to loop through and display questions and options
  nextQuestion : function(){

    // set timer to 20 seconds each question
    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<div class="row answers "><div class="option align-self-center grey darken-1 z-depth-2" id="answers">'+key+'</div></div>'));
    })

  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet <Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){

      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3 class="text-center">Thank you for playing!</h3>'+
        '<h3 class="text-center">Correct: '+ trivia.correct +
        ' Incorrect: '+ trivia.incorrect + ' Unaswered: '+ trivia.unanswered + '</h3>' +
        '<h3 class="text-center">Please play again!</h3>');

      // hide game sction
      $('#game').hide();

      // show start button to begin a new game
      $('#start').show();
    }

  },
  // method to evaluate the option clicked
  guessChecker : function() {

    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }

  },
  // method to remove previous question results and options
  guessResult : function(){

    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $('.answers').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();

  }

}
