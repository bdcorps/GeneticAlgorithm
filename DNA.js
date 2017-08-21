function DNA(l) {
    this.targetLength = l;
    this.fitness = 0;
    this.genes = [];

    //create gene samples with target length
    for (var i = 0; i < this.targetLength; i++) {
        this.genes[i] = buildGeneChar();
    }


    function buildGeneChar() {
        //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        var text = "";
        //left open in order to introduce more character sets if needed
        var possible = "abcdefghijklmnopqrstuvwxyz. ";
        text = possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }



    this.calculateFitness = function(targetPhrase) {
        var match = 0;
        for (var i = 0; i < targetPhrase.length; i++) {
            if (this.genes[i] == targetPhrase[i]) {
                match += 1;
            }
        }
        this.fitness = match / targetPhrase.length;
    }

    this.crossover = function(dna_b) {
        var dna_new = new DNA(this.genes.length);
        var mid = floor(random(this.genes.length));

        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                dna_new.genes[i] = this.genes[i];
            } else {
                dna_new.genes[i] = dna_b.genes[i];
            }
        }
        return dna_new;
    }

    this.mutate = function(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < mutationRate) {
                this.genes[i] = buildGeneChar();
            }
        }
    }

    // Converts character array to a String
    this.getGene = function() {
        return this.genes.join("");
    }
}