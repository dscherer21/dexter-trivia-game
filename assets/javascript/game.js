$(document).ready(function() {

	//Audio Controls
	var audio = new Audio('assets/audio/dexterbloodtheme.mp3');
	//Play Audio
	$('#audioPlay').on('click', function() {
		audio.play();
	});
	//Pause Audio
	$('#audioPause').on('click', function() {
		audio.pause();
	});

	//Timer
	var index = 0;
	var countdownTimer = {
		time : 30,
	reset: function() {
			this.time = 30;
	$('.timer').html('<h3>' + this.time + ' seconds remaining</h3>');
	},
	start: function() {
		counter = setInterval(countdownTimer.count, 1000);
	},
	stop: function() {
			clearInterval(counter);
	},
	count: function() {
		countdownTimer.time--;
		console.log(countdownTimer.time);

	if (countdownTimer.time >= 0) {
		$('.timer').html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
	}
	else {
		index++;
		answerWrong();
		countdownTimer.reset();
	   if (index < questionArray.length) {
				loadQuestion(index);
			} else {
				$(".answerChoice").hide();
				showScore();
			}
	   }
   }
};

	//Questions
	var correct = 0;
	var wrong = 0;
	var q1 = {
		question : "What was the name of Dexter's biological son?",
		possibleAnswers : ['A. Dexter Junior',
					'B. Thomas(aka Tommy)',
					'C. Harrison',
					'D. Brian'],
		flags : [false, false, true, false],
		answer : 'C. Harrison'
	};

	var q2 = {
		question: "What was the first name of Dexter's mother?",
		possibleAnswers: ['A. Janice',
					'B. Laura',
					'C. Rita',
					'D. Candice'],
		flags : [false, true, false, false],
		answer : 'B. Laura'
	};

	var q3 = {
		question : "In Season 2, What was Vince Misuka's role on the Bay Harbor Butcher case?",
		possibleAnswers : ['A. Photographer',
					'B. Lead Forensics Investigator',
					'C. Blood Spatter Analyst',
					'D. Misuka was not put on the Bay Harbor Butcher case.'],
		flags : [false, true, false, false],
		answer : 'B. Lead Forensics Investigator'
	};

	var q4 = {
		question : "In Season 3, what actor played the role of the Trinity Killer?",
		possibleAnswers : ['A. John Lithgow',
					'B. Colin Hanks',
					'C. Jimmy Smitts',
					'D. Ray Stevenson'],
		flags : [true, false, false, false],
		answer : 'A. John Lithgow'
	};

	var q5 = {
		question : "In Season 1, when Deb found a still running, empty ice truck sitting on the side of the road, what did they find inside the back of the truck?",
		possibleAnswers : ['A. A body bag with the corpse of young boy inside',
					'B. A block of ice with severed, painted fingertips inside',
					'C. A dead woman nailed to a cross',
					'D. A dead man with his skin flayed off'],
		flags : [false, true, false, false],
		answer : 'B. A block of ice with severed, painted fingertips inside'
	};

	var q6 = {
		question : "What was Dexter's Brother, Brian's profession?",
		possibleAnswers : ['A. Prosthetist',
					'B. X-Ray Technician',
					'C. Medical Doctor',
					'D. Photographer'],
		flags : [true, false, false, false],
		answer : 'A. Prosthetist'
	};

	//Game Board Setup
	var questionArray = [q1, q2, q3, q4, q5, q6];

	function loadQuestion(questionSelection) {
		console.log(questionSelection);
		countdownTimer.reset();
	$(".question").html("<h3>" + questionArray[questionSelection].question + "</h3>");
	$("#buttonA").text(questionArray[questionSelection].possibleAnswers[0]).show();
	$("#buttonB").text(questionArray[questionSelection].possibleAnswers[1]).show();
	$("#buttonC").text(questionArray[questionSelection].possibleAnswers[2]).show();
	$("#buttonD").text(questionArray[questionSelection].possibleAnswers[3]).show();

	}



	function setup() {
		index = 0;
		$('.question').append('<button id="startButton" class="btn btn-warning">Start</button>');
		$('#startButton').on('click', function() {
			$(this).hide();
			countdownTimer.start();
			loadQuestion(index);
		});
	}

	function getAnswer() {

	//  After an answerChoice is chosen, load next question
		$('.answerChoice').on('click', function() {
		console.log('alert', index);
			index++;
			console.log('click', index);
			$(".question").text('');
			$("#buttonA").text('');
			$("#buttonB").text('');
			$("#buttonC").text('');
			$("#buttonD").text('');
			loadQuestion();
		})
	}
	//Correct Answer Function
	function answerCorrect() {
		correct++;
		alert("Correct!");
		console.log("correct");
	}

	//Incorrect Answer Function
	function answerWrong() {
		wrong++;
		alert("Incorrect!");
		console.log("wrong");
	}

	//Final Score Display
	function showScore() {
		$('.question').empty();
		$('.question').append("<h2><p>Correct: " + correct + "</p></h2>");
		$('.question').append("<h2><p>Incorrect: " + wrong + "</p></h2>");
		$('.question').append("<h2><p>You've made it to the end of the quiz! As long as you didn't kill anyone to get here, you won't end up on Dexter's table!</p></h2>");
    //BUG Reset button is not showing up
		$('.question').append('<button class="btn btn-primary" type="reset">Restart</button>');
		countdownTimer.stop();
		$('.timer').empty();

	}

	setup();
  //Whevever an answer button is clicked
	$('.answerChoice').on('click', function() {
	console.log($(this));
	if(this.id === 'buttonA') {
		var answerChosen = 'A';
	} else if(this.id === 'buttonB') {
		answerChosen = 'B';
	} else if (this.id === 'buttonC') {
		answerChosen = 'C';
	} else if (this.id === 'buttonD') {
		answerChosen = 'D';
	}
  //Check to see if each answer has a flag of true or false
  //if true run answerCorrect Function
  //if false run answerWrong Function
	if ((answerChosen === 'A') && (questionArray[index].flags[0] === true)) {
		answerCorrect();
	} else if (answerChosen === 'A') {
		answerWrong();
	}

	if ((answerChosen === 'B') && (questionArray[index].flags[1] === true)) {
		answerCorrect();
	} else if (answerChosen === 'B') {
		answerWrong();
	}

	if ((answerChosen === 'C') && (questionArray[index].flags[2] === true)) {
		answerCorrect();
	} else if (answerChosen === 'C') {
		answerWrong();
	}

	if ((answerChosen === 'D') && (questionArray[index].flags[3] === true)) {
		answerCorrect();
	} else if (answerChosen === 'D') {
		answerWrong();
	}

	$(".question").text('');
	$("#buttonA").text('');
	$("#buttonB").text('');
	$("#buttonC").text('');
	$("#buttonD").text('');
	index++;
	if (index < questionArray.length) {
		loadQuestion(index);
	} else {
		$(".answerChoice").hide();
		showScore();
	}
	});

})
