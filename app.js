let numberOfAcorns = 0;
let acornCounter = document.getElementById("num-acorns");
/*Couldn't make a loop to consistently display the multiplier for each element, if I redo the upgrades system, I'll be sure to include a more consistent and expandable way to handle multipliers*/
let scoopMultiplier = document.getElementById("scoop-multiplier");
let shovelMultiplier = document.getElementById("shovel-multiplier");
let squirrelMultiplier = document.getElementById("squirrel-multiplier");
let johnnyMultiplier = document.getElementById("johnny-multiplier");
let gatherUpgrades = {
  scoop: {
    price: 100,
    quantity: 0,
    multiplier: 1,
    multiplierIncrement: 1
  },
  shovel: {
    price: 500,
    quantity: 0,
    multiplier: 0,
    multiplierIncrement: 1.5
  }
};
let autoGatherers = {
  //auto gatherers are very weak. the multiplier increases as well as the quantity, but they're still often underwhelming for the cost, the upgrade system needs a balancing and consistency overhaul, possibly with them being drawn into the html at the start of pageload to allow for faster expansion
  squirrel: {
    price: 150,
    quantity: 0,
    multiplier: 3
  },
  johnny: {
    price: 800,
    quantity: 0,
    multiplier: 25
  }
};
let upgrades = { ...autoGatherers, ...gatherUpgrades }; //used to loop through all elements, only used twice in the scope of another function but possibly useful
function gather() {
  numberOfAcorns += Math.trunc(
    //used to give second upgrade a low multiplier, but exponential gains
    Math.pow(
      gatherUpgrades.shovel.multiplierIncrement,
      gatherUpgrades.shovel.multiplier
    ) * gatherUpgrades.scoop.multiplier
  );
  draw();
}
function typeOfUpgrade(property) {
  //used to determines which Object the property came from
  return gatherUpgrades.hasOwnProperty(property)
    ? gatherUpgrades
    : autoGatherers;
}
function addUpgrade(property) {
  //no check for number of acorns, since the buttons are disabled until you can afford
  let element = typeOfUpgrade(property)[property];
  numberOfAcorns -= element.price;
  element.quantity++;
  document.getElementById(`${property}-p`).removeAttribute("hidden"); // unhides counters for upgrades you purchased for the first time
  element.multiplier++;
  element.price *= 2;
  draw();
}

function fillText(property) {
  let element = typeOfUpgrade(property)[property];
  if (numberOfAcorns >= element.price * 0.75) {
    //hides buttons until their first upgrades can almost be bought
    document.getElementById(`buy-${property}`).removeAttribute("hidden");
  }
  if (numberOfAcorns >= element.price) {
    //disables the button until it can be purchased
    document.getElementById(`${property}-button`).removeAttribute("disabled");
  } else {
    document
      .getElementById(`${property}-button`)
      .setAttribute("disabled", "disabled");
  }
  document.getElementById(
    //places price in buttons
    `${property}-button`
  ).innerText = element.price.toString();
  document.getElementById(
    `num-${property}s` //places counters for upgrades
  ).innerText = element.quantity.toString();
}
function dev() {
  //dont forget to remove this. Only serves to make testing and showing off easy
  numberOfAcorns += 25;
  draw();
}
function addAuto() {
  //with only two elements, there wasn't much need for a loop to sum up the total from all upgrades
  numberOfAcorns +=
    autoGatherers.squirrel.quantity * autoGatherers.squirrel.multiplier +
    autoGatherers.johnny.quantity * autoGatherers.johnny.multiplier;
  draw();
}
function draw() {
  //puts text where it needs to be
  acornCounter.innerText = numberOfAcorns.toString();
  shovelMultiplier.innerText = (
    Math.round(
      100 *
        Math.pow(
          gatherUpgrades.shovel.multiplierIncrement,
          gatherUpgrades.shovel.multiplier
        )
    ) / 100
  ).toString();
  scoopMultiplier.innerText = gatherUpgrades.scoop.multiplier.toString();
  squirrelMultiplier.innerText = (
    autoGatherers.squirrel.quantity * autoGatherers.squirrel.multiplier
  ).toString();
  johnnyMultiplier.innerText = (
    autoGatherers.johnny.quantity * autoGatherers.johnny.multiplier
  ).toString();

  for (const element in upgrades) {
    //loops through each element to fill in buttons, counters
    if (upgrades.hasOwnProperty(element)) {
      fillText(element);
    }
  }
}
draw();
let intervalID = window.setInterval(addAuto, 3000); //makes the passives add every 3 seconds, might change 2nd parameter into a variable to add faster acorn gains
