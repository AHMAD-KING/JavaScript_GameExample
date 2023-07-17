
let fs = require("fs");

function game() {
  let arrayWord;
  let word;
  let spaces;
  
  let data = fs.readFileSync("words.txt", "utf-8");
  arrayWord = data.split("\n");

  let random = getRandomInteger(arrayWord.length);
  word = arrayWord[random].trim();
  
  let compare = [];
  let inputs = [];
  let correct = [];
  let wrong = [];
  let countWrong = 0;
  let countRight = 0;
  
  spaces = "_ ".repeat(word.length);
  console.log(`A random word has been chosen, it consists of ${word.length} letters.`);
  console.log(spaces);
  for (let i = 0; i < word.length; i++) {
    compare.push(word[i].toLowerCase());
  }
  
  
  let readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.on("line", userInput => {
    if (userInput === "exit" || userInput === "-1") {
      readline.close();
      return;
    }
    if (userInput.length > 1 ) {
      console.log("Invalid input, please try again!");
      
    } else if (inputs.includes(userInput)) {
      console.log("Letter already used, try again!");
      
    } else if (compare.includes(userInput)) {
      correct.push(userInput);
      compare = compare.filter(char => char !== userInput);
      countRight++;
      
    } else {
      wrong.push(userInput);
      countWrong++;
      
    }
    console.log(correct);
      console.log(wrong);
    if (countWrong === 6) {
      console.log("You have lost.");
      readline.question("Would you like to start again or exit (y/n)? ", answer => {
        if (answer == "y") {
            
          game();
        } else {
          readline.close();
        }
      });
    }
  
    if (compare.length === 0) {
      console.log("You have won.");
      readline.question("Would you like to start again or exit (y/n)? ", answer => {
        if (answer.toLowerCase() === "y") {
          game();
        } else {
          readline.close();
        }
      });
    }
  
    inputs.push(userInput);
    
  });
  
  readline.on("close", () => {
    console.log("Exiting the game.");
    process.exit(0);
  });
}

function getRandomInteger(max) {
  return Math.floor(max * Math.random());
}

game();

  