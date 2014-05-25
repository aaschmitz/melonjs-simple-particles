game.dropletParticle = me.SpriteObject.extend({              
    init: function(x, y) {
        // Class Constructor
        this.parent(x, y, me.loader.getImage("droplet"));

        // the particle update even off screen
        this.alwaysUpdate = true;

        // calculate random launch angle - in radians
        var launch = Number.prototype.degToRad(Number.prototype.random(10, 80));

        // calculate random distance from point x original
        var distance = Number.prototype.random(5, 10);

        // calculate random altitude from point y original 
        var altitude = Number.prototype.random(10, 20);
        
        // particle screen side (value negative is left, positive is right and zero is center)
        var screenSide = Number.prototype.random(-1, 1);

        // create new vector and set initial particle velocity
        this.vel = new me.Vector2d(Math.sin(launch) * distance * screenSide, -Math.cos(launch) * altitude);					

        // set the default engine gravity
        me.sys.gravity = 0.98;
    },

    update: function(dt) {		
        // check the particle position in screen limits
        if ((this.pos.y > 0) && (this.pos.y < me.game.viewport.getHeight()) && (this.pos.x > 0) && (this.pos.x < me.game.viewport.getWidth())) {
            // set particle position
            this.vel.y += me.sys.gravity;
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;			

            this.parent(dt);
            return true;
        } else {
            // particle off screen - remove the same!
            me.game.world.removeChild(this, true);

            return false;
        }
    }
});

game.startEmitter = function(x, y, count) {
    // add count particles in the game, all at once!
    for (var i = 0; i < count; i++)
        // add the particle in the game, using the mouse coordinates and game layer 5
        // use the objects pool for better performance!
        me.game.world.addChild(me.pool.pull("droplet", x, y), 5);
};
