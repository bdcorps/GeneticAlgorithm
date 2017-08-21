function Population(p, n, m) {

    this.targetPhrase = p;
    this.numPop = n;
    this.mutationRate = m;
    this.targetReached = false;

    this.populationPool = []
    this.matingPool = []
    this.countGenerations = 0;
    this.bestDNA;

    for (var i = 0; i < this.numPop; i++) {
        this.populationPool[i] = new DNA(this.targetPhrase.length);
    }


    this.calculateFitness = function() {

        for (var i = 0; i < this.populationPool.length; i++) {
            this.populationPool[i].calculateFitness(this.targetPhrase);
        }
    }

    this.calculateFitness();

    this.naturalSelection = function() {
        this.matingPool= [];
        //find maxFitness in the population pool
        var maxFitness = 0;
        for (var i = 0; i < this.populationPool.length; i++) {
            if (this.populationPool[i].fitness > maxFitness) {
                maxFitness = this.populationPool[i].fitness;
            }
        }

        //build a matingPool with more of the DNAs with higher probability
        for (var i = 0; i < this.populationPool.length; i++) {
            var fitness = map(this.populationPool[i].fitness, 0, maxFitness, 0, 1);
            var n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
            for (var j = 0; j < n; j++) { // and pick two random numbers
                this.matingPool.push(this.populationPool[i]);
            }
        }


    }

    this.generateNew = function() {
        for (var i = 0; i < this.populationPool.length; i++) {
            var DNA_1 = this.matingPool[floor(random(this.matingPool.length))];
            var DNA_2 = this.matingPool[floor(random(this.matingPool.length))];

            var DNA_new = DNA_1.crossover(DNA_2);
            DNA_new.mutate(this.mutationRate);
            //replace old generation
            this.populationPool[i] = DNA_new;
        }
        this.countGenerations += 1;
    }

    this.evaluateGeneration = function() {
        var bestFitness = 0;
        var bestIndex = 0;

        for (var i = 0; i < this.populationPool.length; i++) {
            var dna = this.populationPool[i];
            if (dna.fitness > bestFitness) {
                bestFitness = dna.fitness;
                bestIndex = i;
            }

           
        } if (bestFitness === 1) {
              this.targetReached = true;
            }

        this.bestDNA = this.populationPool[bestIndex];
    }

    this.hasTargetReached = function() {
        return this.targetReached;
    }

    // Compute average fitness for the population
    this.getAverageFitness = function() {
        var total = 0;
        for (var i = 0; i < this.populationPool.length; i++) {
            total += this.populationPool[i].fitness;
        }
        return total / (this.populationPool.length);
    }

    this.allPhrases = function() {
        var everything = "";

        var displayLimit = min(this.populationPool.length, 50);


        for (var i = 0; i < displayLimit; i++) {
            everything += this.populationPool[i].getGene() + "<br>";
        }
        return everything;
    }


    this.getBest = function() {
        return this.bestDNA.genes.join("");
    }

    this.getGenerations = function() {
        return this.countGenerations;
    }
}