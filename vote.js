module.exports = (subject,vote1,vote2,vote3) => {
  var votes = new Vote(subject,vote1,vote2,vote3);
  votes.on(eventsConfig.voteChange,showVotes);
  votes.on(eventsConfig.deviation,maxVotes)
  votes.on(eventsConfig.voteRestart,voteRestart)
  return votes;
}


var events = require('events'),
eventsConfig = require('./config').events;

class Vote extends events.EventEmitter {
  constructor(subject,votearray){ // construcor
    super();
    this.logarray = [];
    this.vote_amount = 0
    this.vote_subject = subject;
    this.voteArray = votearray;
    this.capacity = 10;
    this.restart_votes();
  }

  restart_votes(){  // restart the votes for a specific subject
    this.voteArray.forEach( (val) => {
      this.voteArray[val] = 0;
    });
    this.vote_amount = 0;
    this.emit(eventsConfig.voteRestart);
    this.emit(eventsConfig.voteChange);
  }

  get_all(){
    console.log(`subject : ${this.vote_subject}`);
    this.logarray.push(`subject : ${this.vote_subject}\n`);
    this.voteArray.forEach((val,key) =>{
      console.log(`${this.voteArray[key]} : ${this.voteArray[val]}`);
      this.logarray.push(`${this.voteArray[key]} : ${this.voteArray[val]}\n`)
    });
    console.log(`---------------------------------------------------`);
    this.logarray.push(`---------------------------------------------------\n`);
  }

  votenow(vote_name){ // function that count the votes and check if amount of vote big than the capacity
    if (this.vote_amount >= this.capacity){
      this.emit(eventsConfig.deviation);
      return;
    }
    this.voteArray[vote_name]++;
    this.vote_amount++;
    this.emit(eventsConfig.voteChange);
  }
}

function showVotes() { // call to get_all function that print to log all votes
  this.get_all();
}

function maxVotes (){ // call when the you got max votes for a specific subject
  console.log(`number of votes for subject ${this.vote_subject} utilized`);
  this.logarray.push(`number of votes for subject ${this.vote_subject} utilized\n`);
}

function voteRestart (){ // print to log thay specific vote is restart
  console.log(`the vote for subject ${this.vote_subject} is restart`);
  this.logarray.push(`the vote for subject ${this.vote_subject} is restart\n`);
}
