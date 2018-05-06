function Quiz(questions) {
    this.contextScore = 0;
    this.beliefsScore = 0;
    this.behavioursScore = 0;
    this.roleScore = 0;
    this.cultureScore = 0;
    this.purposeScore = 0;
    this.resourcesScore = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.areasComplete=0;
    this.contextDone=false;
    this.behavioursDone=false;
    this.beliefsDone=false;
    this.roleDone=false;
    this.cultureDone=false;
    this.resourcesDone=false;
    this.purposeDone=false;



}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}


Quiz.prototype.guess = function(answer, end) {

var type = this.getQuestionIndex().questionArea();


switch(type) {
    case 'context':
        this.contextScore += this.getQuestionIndex().getValue(answer);
       // console.log ('contextScore '+this.contextScore);
        break;
    case 'beliefs':
        this.beliefsScore += this.getQuestionIndex().getValue(answer);

        break;
    case 'role':
        this.roleScore += this.getQuestionIndex().getValue(answer);
        break;
    case 'behaviours':
        this.behavioursScore += this.getQuestionIndex().getValue(answer);  
        break;
    case 'culture':
        this.cultureScore += this.getQuestionIndex().getValue(answer);
        break;
    case 'purpose':
        this.purposeScore += this.getQuestionIndex().getValue(answer);
        break;
    case 'resources':
        this.resourcesScore += this.getQuestionIndex().getValue(answer);
        break;

    default:
    
}


if (end){
    this.questionIndex++;
    if (this.questionIndex == 3 || this.questionIndex == 6 || this.questionIndex == 9
        || this.questionIndex == 12 || this.questionIndex == 15 || this.questionIndex == 18 || this.questionIndex == 21){
        this.questionIndex -= 0.5;
    }
}
}

Quiz.prototype.isEnded = function() {
    
    var ended=false;
     if(this.behavioursDone && this.beliefsDone && this.purposeDone && this.contextDone
       && this.roleDone && this.resourcesDone && this.cultureDone){
         ended=true;
     }
    
    return ended;
}

Quiz.prototype.sectionEnd = function() {

    var sectionEnd = '';

    switch (this.questionIndex){
        case 2.5:
        sectionEnd = 'context';
        this.contextDone=true;
        this.areasComplete++;  
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }  
         
        break;
        case 5.5:
        sectionEnd = 'beliefs';
        this.beliefsDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;
        case 8.5:
        sectionEnd = 'behaviours';
        this.behavioursDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;
        case 11.5:
        sectionEnd = 'role';
        this.roleDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;
        case 14.5:
        sectionEnd = 'culture';
        this.cultureDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;
        case 17.5:
        sectionEnd = 'purpose';
        this.purposeDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;
        case 20.5:
        sectionEnd = 'resources';
        this.resourcesDone=true;
        this.areasComplete++; 
        if (this.areasComplete==7){
            $('#completeModal').modal('show'); 
        }  else{
            $('#exampleModal').modal('show'); 
        }
        break;

    }

    return sectionEnd;
}
