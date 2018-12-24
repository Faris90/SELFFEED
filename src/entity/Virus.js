var Cell = require('./Cell');

function Virus() {
    Cell.apply(this, Array.prototype.slice.call(arguments));
	this.color = 0;
    this.cellType = 2;
}

module.exports = Virus;
Virus.prototype = new Cell();

Virus.prototype.calcMove = function () {
    // Only for player controlled movement
}

Virus.prototype.feed = function(feeder,gameServer) {
    this.setAngle(feeder.getAngle()); // Set direction if the virus explodes
    this.mass += 14; // 7 cells to burst the virus
    gameServer.removeNode(feeder);
	
    // Check if the virus is going to explode
    if (this.mass >= gameServer.config.virusBurstMass) {
        this.mass = gameServer.config.virusStartMass; // Reset mass
        gameServer.shootVirus(this);
    }
	
}

// Main Functions

Virus.prototype.onConsume = function(consumer,gameServer) {
       var len = client.cells.length;
    for (var i = 0; i < len; i++) {
	    var cell = client.cells[i];
	    cell.position.x = Math.floor(Math.random() * (gameServer.config.borderRight - gameServer.config.borderLeft)) + gameServer.config.borderLeft
  cell.position.y = = Math.floor(Math.random() * (gameServer.config.borderBottom - gameServer.config.borderTop)) + gameServer.config.borderTop
    }
    }
    
    // Splitting
    var angle = 0; // Starting angle
    for (var k = 0; k < numSplits; k++) {
        angle += 6/numSplits; // Get directions of splitting cells
        gameServer.newCellVirused(client, consumer, angle, splitMass,150);
        consumer.mass -= splitMass;
    }
    
    for (var k = 0; k < bigSplits; k++) {
        angle = Math.random() * 6.28; // Random directions
        splitMass = consumer.mass / 4;
        gameServer.newCellVirused(client, consumer, angle, splitMass,18);
        consumer.mass -= splitMass;
    }
}

Virus.prototype.onAdd = function(gameServer) {
    gameServer.nodesVirus.push(this);
}

Virus.prototype.onRemove = function(gameServer) {
    var index = gameServer.nodesVirus.indexOf(this);
    if (index != -1) {
        gameServer.nodesVirus.splice(index, 1);
    } else {
        console.log("[Warning] Tried to remove a non existing virus!");
    }
}
