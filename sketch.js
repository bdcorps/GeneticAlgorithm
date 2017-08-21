var population;
var targetPhrase;
var numPop;
var mutationRate;

function setup() {
    //create population object with targetPhrase, mutationRate and maxPop
    //each population object will have a DNA object; it will contain the genes themselves (random strings)
    //calculate fitness
    bestPhrase = createP("Best phrase:");
    //bestPhrase.position(10,10);
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    //stats.position(10,200);
    stats.class("stats");


    targetPhrase = "The Coding Train is amazing."
    numPop = 200;
    mutationRate = 0.01;

    population = new Population(targetPhrase, numPop, mutationRate);

}

function draw() {
    //natural selection; get maxFitness, map all the fitness values to be within a range. Build a matingPool so that genes with higher Fitness value have more probability to be picked than the lower ones.
    population.naturalSelection();
    //generate new generations; pick random genes from the matingPool and crossover then mutate them; add to generation count
    population.generateNew();

    //find fitness for the new generations
    population.calculateFitness();
    //check if any fitness is 1, if yes end, if not start from step 1 again.
    population.evaluateGeneration();

    if (population.hasTargetReached()) {
        //println(millis()/1000.0);
        noLoop();
    }

    showStats();

}

function showStats() {
    var answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    var statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + numPop + "<br>";
    statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases())
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {  noLoop();
  }
  else if (keyCode === RIGHT_ARROW) {   loop();
  }
  
}