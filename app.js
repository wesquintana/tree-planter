let numberOfAcorns = 0;
let scoopCounter = document.getElementById("num-scoops");
let shovelCounter = document.getElementById("num-shovels");
let squirrelCounter = document.getElementById("num-squirrels");
let johnnyCounter = document.getElementById("num-johnnys");
let acornCounter = document.getElementById("num-acorns");
let scoopButton = document.getElementById("scoop-button");
let shovelButton = document.getElementById("shovel-button");
let squirrelButton = document.getElementById("squirrel-button");
let johnnyButton = document.getElementById("johnny-button");
let hasAuto = false;
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
let upgrades = { ...autoGatherers, ...gatherUpgrades };
function gather() {
  numberOfAcorns += Math.trunc(
    1 *
      Math.pow(
        gatherUpgrades.shovel.multiplierIncrement,
        gatherUpgrades.shovel.multiplier
      ) *
      gatherUpgrades.scoop.multiplier
  );
  draw();
}
function addUpgrade(property) {
  let tempObj = upgrades[property];
  let originalGreaterObject = gatherUpgrades.hasOwnProperty(property)
    ? gatherUpgrades
    : autoGatherers;
  if (numberOfAcorns >= tempObj.price) {
    numberOfAcorns -= tempObj.price;
    originalGreaterObject[property].quantity++;
    originalGreaterObject[property].multiplier++;
    originalGreaterObject[property].price = Math.trunc(1.2 * tempObj.price);
    draw();
  }
}
function makeActive(property) {
  let tempObj = upgrades[property];
  if (numberOfAcorns >= tempObj.price) {
    document.getElementById(`${property}-button`).removeAttribute("disabled");
  } else {
    document
      .getElementById(`${property}-button`)
      .setAttribute("disabled", "disabled");
  }
}
function addAuto() {
  numberOfAcorns +=
    autoGatherers.squirrel.quantity * autoGatherers.squirrel.multiplier +
    autoGatherers.johnny.quantity * autoGatherers.johnny.multiplier;
  draw();
}
function draw() {
  scoopButton.innerText = gatherUpgrades.scoop.price.toString();
  shovelButton.innerText = gatherUpgrades.shovel.price.toString();
  squirrelButton.innerText = autoGatherers.squirrel.price.toString();
  johnnyButton.innerText = autoGatherers.johnny.price.toString();
  acornCounter.innerText = numberOfAcorns.toString();
  scoopCounter.innerText = gatherUpgrades.scoop.quantity.toString();
  shovelCounter.innerText = gatherUpgrades.shovel.quantity.toString();
  squirrelCounter.innerText = autoGatherers.squirrel.quantity.toString();
  johnnyCounter.innerText = autoGatherers.johnny.quantity.toString();
  for (const element in upgrades) {
    if (upgrades.hasOwnProperty(element)) {
      makeActive(element);
    }
  }
}
draw();
let intervalID = window.setInterval(addAuto, 3000);
