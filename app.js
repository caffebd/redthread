     maximumContextScore = 0;
     maximumBeliefsScore = 0;
     maximumBehavioursScore = 0;
     maximumRoleScore = 0;
     maximumCultureScore = 0;
     maximumPurposeScore = 0;
     maximumResourcesScore = 0;

     currentQuestionNumber = 0;

     mySelections = [];
     maximumSelection = 1;
     selected = 0;

     screenType = 'full';

     questionSet = '';

     function preparePopulate(theSet, screen) {

         if (!quiz.contextDone) {
             quiz.contextScore = 0;
             resetCircle('contextCircle', '');
             resetCircle('contextCircle', 'Med');
             resetCircle('contextCircle', 'Tab');
             resetCircle('contextCircle', 'Mob');
         }
         if (!quiz.beliefsDone) {
             quiz.beliefsScore = 0;
             resetCircle('beliefsCircle', '');
             resetCircle('beliefsCircle', 'Med');
             resetCircle('beliefsCircle', 'Tab');
             resetCircle('beliefsCircle', 'Mob');
         }
         if (!quiz.behavioursDone) {
             quiz.behavioursScore = 0;
             resetCircle('behavioursCircle', '');
             resetCircle('behavioursCircle', 'Med');
             resetCircle('behavioursCircle', 'Tab');
             resetCircle('behavioursCircle', 'Mob');
         }
         if (!quiz.roleDone) {
             quiz.roleScore = 0;            
             resetCircle('roleCircle', '');
             resetCircle('roleCircle', 'Med');
             resetCircle('roleCircle', 'Tab');
             resetCircle('roleCircle', 'Mob');
         }
         if (!quiz.cultureDone) {
             quiz.cultureScore = 0;
             resetCircle('cultureCircle', '');
             resetCircle('cultureCircle', 'Med');
             resetCircle('cultureCircle', 'Tab');
             resetCircle('cultureCircle', 'Mob');
         }
         if (!quiz.purposeDone) {
             quiz.purposeScore = 0;
             resetCircle('purposeCircle', '');
             resetCircle('purposeCircle', 'Med');
             resetCircle('purposeCircle', 'Tab');
             resetCircle('purposeCircle', 'Mob');
         }
         if (!quiz.resourcesDone) {
             quiz.resourcesScore = 0;
             resetCircle('resourcesCircle', '');
             resetCircle('resourcesCircle', 'Med');
             resetCircle('resourcesCircle', 'Tab');
             resetCircle('resourcesCircle', 'Mob');
         }




         screenType = screen;
         currentQuestionNumber = 1;



         var selectedArea = '';
         questionSet = theSet;
         switch (questionSet) {
             case 'contextCircle':
                 quiz.questionIndex = 0;
                 selectedArea = "Understanding your context";
                 if (quiz.contextDone) {
                     quiz.contextDone = false;
                     quiz.areasComplete--;
                     quiz.contextScore = 0;
                     showAllScores();
                 }
                 break;
             case 'beliefsCircle':
                 quiz.questionIndex = 3;
                 selectedArea = "Understanding your Beliefs";
                 if (quiz.beliefsDone) {
                     quiz.beliefsDone = false;
                     quiz.areasComplete--;
                     quiz.beliefsScore = 0;
                     showAllScores();
                 }
                 break;
             case 'behavioursCircle':
                 quiz.questionIndex = 6;
                 selectedArea = "Understanding your behaviours";
                 if (quiz.behavioursDone) {
                     quiz.behavioursDone = false;
                     quiz.areasComplete--;
                     quiz.behavioursScore = 0;
                     showAllScores();
                 }
                 break;
             case 'roleCircle':
                 quiz.questionIndex = 9;
                 selectedArea = "Choosing your role?";
                 if (quiz.roleDone) {
                     quiz.roleDone = false;
                     quiz.areasComplete--;
                     quiz.roleScore = 0;
                     showAllScores();
                 }
                 break;
             case 'cultureCircle':
                 quiz.questionIndex = 12;
                 selectedArea = "Shaping culture";
                 if (quiz.cultureDone) {
                     quiz.cultureDone = false;
                     quiz.areasComplete--;
                     quiz.cultureScore = 0;
                     showAllScores();
                 }
                 break;
             case 'purposeCircle':
                 quiz.questionIndex = 15;
                 selectedArea = "Enabling Purpose and Direction";
                 if (quiz.purposeDone) {
                     quiz.purposeDone = false;
                     quiz.areasComplete--;
                     quiz.purposeScore = 0;
                     showAllScores();

                 }
                 break;
             case 'resourcesCircle':
                 quiz.questionIndex = 18;
                 selectedArea = "Allocating Resources";
                 if (quiz.resourcesDone) {
                     quiz.resourcesDone = false;
                     quiz.areasComplete--;
                     quiz.resourcesScore = 0;
                     showAllScores();
                 }
                 break;
         }

         quizAreaLabel = document.getElementById("quizArea");
         quizAreaLabel.innerHTML = selectedArea;

         populate();
     }

     function populate() {





         if (quiz.sectionEnd() != '') {
             showAllScores();

         } else {
             // show question

             /* var hideEnd = document.getElementById("endSection");
              hideEnd.style.display = 'none';*/

             var showQuiz = document.getElementById("quiz");
             showQuiz.style.display = 'inline';

             // setup submit button
             guess("submit");



             var element = document.getElementById("question");
             element.innerHTML = quiz.getQuestionIndex().text;
             maximumSelection = quiz.getQuestionIndex().max;
             mySelections.length = 0;

             for (var i = 0; i < 7; i++) {
                 var elementBtn = document.getElementById("btn" + i);
                 elementBtn.className = 'buttonNormal';
                 elementBtn.style.display = 'none';

             }

             selected = 0;

             // show options
             var choices = quiz.getQuestionIndex().choices;
             for (var i = 0; i < choices.length; i++) {
                 var element = document.getElementById("choice" + i);
                 var elementBtn = document.getElementById("btn" + i);
                 elementBtn.style.display = 'inline';
                 element.innerHTML = choices[i];
                 //guess("btn" + i, choices[i]);
                 buttonSelect("btn" + i, choices[i]);
             }


             if (screenType != 'full') {

                 window.scrollTo(0, 0);
             }
             showProgress();
         }
     };

     function guess(id) {
         var button = document.getElementById(id);
         button.onclick = function () {

             for (var i = 0; i < mySelections.length; i++) {
                 var end = false;
                 if (i == mySelections.length - 1) {
                     end = true;
                 }
                 quiz.guess(mySelections[i], end);

             }

             // quiz.guess(mySelections);



             populate();

         }
     };

     function buttonSelect(id, guess) {

         var button = document.getElementById(id);
         button.onclick = function (e) {

             if (maximumSelection == 1) {

                 for (var i = 0; i < 7; i++) {
                     var elementBtn = document.getElementById("btn" + i);
                     elementBtn.className = 'buttonNormal';
                     mySelections.length = 0;
                 }

                 this.className = 'buttonSelect';
                 mySelections.push(guess);

             } else {


                 if (selected < maximumSelection && this.className == 'buttonNormal') {
                     this.className = 'buttonSelect';
                     mySelections.push(guess);
                     selected++;

                 } else if (this.className == 'buttonSelect') {

                     this.className = 'buttonNormal';
                     var index = mySelections.indexOf(guess);
                     mySelections.splice(index, 1);
                     selected--;
                 }

             }

             console.log(mySelections);

         }


     };


     function showProgress() {
         // var currentQuestionNumber = quiz.questionIndex + 1;
         var element = document.getElementById("progress");
         element.innerHTML = "Question " + currentQuestionNumber + " of 3";
         currentQuestionNumber++;
     };

     function loadCanvas(id, myHeight) {
         var canvas = document.createElement('canvas');
         div = document.getElementById(id);
         canvas.id = "CursorLayer";
         canvas.width = 600;
         canvas.height = myHeight;
         canvas.style.zIndex = 0;
         canvas.style.position = "absolute";
         canvas.style.border = "1px solid";
         div.appendChild(canvas)
     };

     function showCircle(percent, circleToChange, append) {

         console.log('show circle '+circleToChange+append);

         var rounded = Math.round(percent);
         var showCircleId = document.getElementById(circleToChange + append);

        // console.log("/" + circleToChange + "/Layer-" + rounded + ".svg");
         
         

         showCircleId.src = circleToChange + "/Layer-" + rounded + ".svg";


     };

     function resetCircle(circleToChange, append) {


         var restCircleId = document.getElementById(circleToChange + append);

         //console.log(circleToChange + "/Layer.svg");

         restCircleId.src = circleToChange + "/Layer.svg";


     };



     function showAllScores() {


            if (!quiz.contextDone) {
             quiz.contextScore = 0;
             resetCircle('contextCircle', '');
             resetCircle('contextCircle', 'Med');
             resetCircle('contextCircle', 'Tab');
             resetCircle('contextCircle', 'Mob');
         }else{
         showCircle((quiz.contextScore / maximumContextScore) * 100, 'contextCircle', '');
         showCircle((quiz.contextScore / maximumContextScore) * 100, 'contextCircle', 'Med');
         showCircle((quiz.contextScore / maximumContextScore) * 100, 'contextCircle', 'Tab');
         showCircle((quiz.contextScore / maximumContextScore) * 100, 'contextCircle', 'Mob');
         }
         
            if (!quiz.beliefsDone) {
             quiz.beliefsScore = 0;
             resetCircle('beliefsCircle', '');
             resetCircle('beliefsCircle', 'Med');
             resetCircle('beliefsCircle', 'Tab');
             resetCircle('beliefsCircle', 'Mob');
         }else{

         showCircle((quiz.beliefsScore / maximumBeliefsScore) * 100, 'beliefsCircle', '');
         showCircle((quiz.beliefsScore / maximumBeliefsScore) * 100, 'beliefsCircle', 'Med');
         showCircle((quiz.beliefsScore / maximumBeliefsScore) * 100, 'beliefsCircle', 'Tab');
         showCircle((quiz.beliefsScore / maximumBeliefsScore) * 100, 'beliefsCircle', 'Mob');
         }
             
            if (!quiz.behavioursDone) {
             quiz.behavioursScore = 0;
             resetCircle('behavioursCircle', '');
             resetCircle('behavioursCircle', 'Med');
             resetCircle('behavioursCircle', 'Tab');
             resetCircle('behavioursCircle', 'Mob');
         } else{   
         
         showCircle((quiz.behavioursScore / maximumBehavioursScore) * 100, 'behavioursCircle', '');
         showCircle((quiz.behavioursScore / maximumBehavioursScore) * 100, 'behavioursCircle', 'Med');
         showCircle((quiz.behavioursScore / maximumBehavioursScore) * 100, 'behavioursCircle', 'Tab');
         showCircle((quiz.behavioursScore / maximumBehavioursScore) * 100, 'behavioursCircle', 'Mob');
             
         }

            if (!quiz.roleDone) {
             quiz.roleScore = 0;            
             resetCircle('roleCircle', '');
             resetCircle('roleCircle', 'Med');
             resetCircle('roleCircle', 'Tab');
             resetCircle('roleCircle', 'Mob');
         }else{

         showCircle((quiz.roleScore / maximumRoleScore) * 100, 'roleCircle', '');
         showCircle((quiz.roleScore / maximumRoleScore) * 100, 'roleCircle', 'Med');
         showCircle((quiz.roleScore / maximumRoleScore) * 100, 'roleCircle', 'Tab');
         showCircle((quiz.roleScore / maximumRoleScore) * 100, 'roleCircle', 'Mob');
             
         }

         if (!quiz.cultureDone) {
             quiz.cultureScore = 0;
             resetCircle('cultureCircle', '');
             resetCircle('cultureCircle', 'Med');
             resetCircle('cultureCircle', 'Tab');
             resetCircle('cultureCircle', 'Mob');
         }else{
         showCircle((quiz.cultureScore / maximumCultureScore) * 100, 'cultureCircle', '');
         showCircle((quiz.cultureScore / maximumCultureScore) * 100, 'cultureCircle', 'Med');
         showCircle((quiz.cultureScore / maximumCultureScore) * 100, 'cultureCircle', 'Tab');
         showCircle((quiz.cultureScore / maximumCultureScore) * 100, 'cultureCircle', 'Mob');
         }
         
         
        if (!quiz.purposeDone) {
             quiz.purposeScore = 0;
             resetCircle('purposeCircle', '');
             resetCircle('purposeCircle', 'Med');
             resetCircle('purposeCircle', 'Tab');
             resetCircle('purposeCircle', 'Mob');
         }else{
         showCircle((quiz.purposeScore / maximumPurposeScore) * 100, 'purposeCircle', '');
         showCircle((quiz.purposeScore / maximumPurposeScore) * 100, 'purposeCircle', 'Med');
         showCircle((quiz.purposeScore / maximumPurposeScore) * 100, 'purposeCircle', 'Tab');
         showCircle((quiz.purposeScore / maximumPurposeScore) * 100, 'purposeCircle', 'Mob');
             
         }
         if (!quiz.resourcesDone) {
             quiz.resourcesScore = 0;
             resetCircle('resourcesCircle', '');
             resetCircle('resourcesCircle', 'Med');
             resetCircle('resourcesCircle', 'Tab');
             resetCircle('resourcesCircle', 'Mob');
         }else{
         showCircle((quiz.resourcesScore / maximumResourcesScore) * 100, 'resourcesCircle', '');
         showCircle((quiz.resourcesScore / maximumResourcesScore) * 100, 'resourcesCircle', 'Med');
         showCircle((quiz.resourcesScore / maximumResourcesScore) * 100, 'resourcesCircle', 'Tab');
         showCircle((quiz.resourcesScore / maximumResourcesScore) * 100, 'resourcesCircle', 'Mob');
         }

     };


     function showSectionScores(section, sectionMax, mySection) {

         function continueQuiz(id) {

             var button = document.getElementById(id);
             button.onclick = function () {

                 quiz.questionIndex += 0.5;
                 populate();
             }
         };


         var gameOverHTML = "<h1>Section Result</h1>";
         gameOverHTML += "<h2 id='score'> Your score: " + section + " / " + sectionMax + " </h2>";
         gameOverHTML += "<button id='continue' class='buttonNormal'>NEXT</button>";
         gameOverHTML += "<div id ='forCanvas'></div>";

         var hideQuiz = document.getElementById("quiz");
         hideQuiz.style.display = 'none';

         var element = document.getElementById("endSection");
         element.innerHTML = gameOverHTML;

         element.style.display = 'inline';

         continueQuiz('continue');

         loadCanvas("forCanvas", 200);

         var ctx = document.querySelector("canvas").getContext("2d"),
             pst = 0,
             dlt = 2;

         ctx.fillStyle = "#28f";

         showCircle((quiz.contextScore / maximumContextScore) * 100, mySection);


     };



     function closeModal() {


         $("#contextSection").collapse('hide');

     };

     // create questions
     var questions = [

//context
    new Question("How often do you undertake a PEST analysis?", ["Rarely", "Annually", "Six Monthly", "Quaterly"], [10, 25, 60, 90], 90, "context", 1),
    new Question("How well do you understand the economic system of which your business is a part?", ["Very well", "Quite well", "A little", "Not at all"], [90, 50, 15, 0], 90, "context", 1),
    new Question("Where do you feel most comfortable operating?", ["When we agree what to do and are sure what’s going to happen", "Where we disagree what to do, but are fairly sure what’s going to happen", "Where we agree what to do, but are unsure about what’s going to happen", "Where we don’t agree what to do and are not sure what’s going to happen", "Where so many things are in flux its hard just to make sense of the environment."], [15, 25, 25, 75, 100], 100, "context", 1),


    //beliefs
    new Question("How often do you review the assumptions that underpin your business model?", ["Very often", "Often", "Sometimes", "Hardly ever"], [100, 60, 25, 10], 100, "beliefs", 1),
    new Question("How do you make sense of your environment? (select all that apply)", ["By benchmarking", "By using my own internal values", "By considering the various systems at play"], [50, 75, 90], 215, "beliefs", 3),
    new Question("How would you describe your culture?", ["Friendly and affiliative often", "Non-hierarchical", "Customer and market focussed", "Very hierarchical"], [60, 85, 50, 10], 85, "beliefs", 1),


    //behaviours
    new Question("How do you make decisions?", ["Sense, categorise, respond", "Sense, analyse, respond", "Experiment, sense, respond", "Act, sense, respond."], [25, 50, 90, 60], 90, "behaviours", 1),
    new Question("Which of the following biases are you aware of and factor into your decision making / behaviour? (select all that apply)", ["It benefits the proposer", "You’ve fallen in love with your own idea", "Groupthink", "It sounds like a past success", "You didn't look at more than two great ideas", "The proposers have been successful in the past", "Its carrying on with something you’ve already started."], [14, 14, 14, 14, 14, 14, 14], 98, "behaviours", 7),
    new Question("Which of the following are differentiators of Frontier Leaders? (select all that apply)", ["Vision as clarity of purpose", "Delegating space", "Co-creating vision and strategy", "Being true to the organisation’s values and self", "Task and people are important", "Consistent and careful behaviour", "Monitoring performance"], [10, 25, 25, 5, 5, 25, 0], 95, "behaviours", 7),

    // role
    new Question("Are you the ultimate decision maker?", ["Completely", "Partially with a few others", "Not at all", "It’s not about being in charge"], [0, 40, 25, 80], 80, "role", 1),
    new Question("Do you consider yourself a custodian of the business and its culture or not?", ["Yes definitely", "Not really considered it", "Not at all"], [100, 25, 0], 100, "role", 1),
    new Question("Which of the following describes you best as a leader?", ["Opportunist – play to win", "Diplomat – glue the organisation together", "Expert – rationally drive efficiency", "Achiever – High support, high challenge to deliver", "Individualist – Challenges the whole organisation and what it is doing", "Strategist – Build genuinely shared visions to transform", "Alchemist – Reinvent organisations and communities"], [10, 20, 30, 50, 75, 90, 100], 100, "role", 1),


    //culture

    new Question("In shaping the culture of the organisation do you do any of the following? (select all that apply)", ["Commission cultural surveys", "Conduct staff surveys to understand the culture", "Develop an organisational development strategy to change your culture", "Talk about the culture you want and would like to see", "Praise the culture you have"], [10, 5, 40, 25, 20], 100, "culture", 5),
    new Question("Do you have organisational values?", ["Yes we regularly discuss what they mean for us an organisation", "Yes, we always use them to make decisions", "Yes, we seek feedback on how well leaders live them", "Yes, but they’re not used", "Yes but no one really knows what they are"], [90, 60, 40, 0, 0], 90, "culture", 1),

    new Question("What element of your culture is the strongest? (select all that apply)", ["Your alignment behind your mission", "The consistency with which you do things", "The engagement of the whole organisation in what you are doing", "Your adaptability in the face of market challenges", "All of the above"], [50, 50, 50, 50, 100], 100, "culture", 1),

    //purpose

    new Question("Does your organisation have a compelling, stretching and credible vision of the future?", ["No", "We have a vision, but no one knows what it really means", "We have a vision, but it isn’t inspiring", "We have a vision, but it is only focussed on financial targets", "We have a vision and it lives and breathes in all we do"], [0, 0, 15, 30, 100], 100, "purpose", 1),
    new Question("Who created your organisation’s vision?", ["No one – we don’t have one", "It was created by senior management and launched in the business", "We were all consulted, but senior management created it", "It was genuinely co-created by everyone"], [0, 10, 50, 100], 100, "purpose", 1),
    new Question("Who in your organisation truly gets your organisations ‘reason to be’?", ["Just the CEO", "The senior team", "The managers", "Everyone"], [0, 10, 30, 100], 100, "purpose", 1),

    //resources

    new Question("How far down the organisation do you delegate authority and decision making?", ["To the front line", "Each layer of management has its own sign off levels", "Some", "Decisions tend to get made only by senior management", "The Board make all the decisions", "The CEO/MD makes all the decisions"], [90, 25, 25, 10, 0, 0], 90, "resources", 1),
    new Question("Who are the most important people in your organisation?", ["Everyone – we are all equally important", "Senior management", "Our customers", "The people who deliver our goods / services"], [100, 0, 60, 50], 100, "resources", 1),
    new Question("Who do you think of as your team?", ["The people who report to you", "The people you work with most", "Your Peers", "Your function", "Your division", "The whole organisation"], [40, 60, 50, 75, 85, 100], 100, "resources", 1)


];



     // create quiz
     var quiz = new Quiz(questions);

     // display quiz
     populate();
