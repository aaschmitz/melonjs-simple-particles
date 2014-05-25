game.PlayScreen = me.ScreenObject.extend({
    /**
     * action to perform on state change
     */
    onResetEvent : function() {
        // clear the background    
        me.game.world.addChild(new me.ImageLayer("background", 0, 0, "grid", 1));

        // create a area with the viewport dimensions and register on the 'pointerdown' event
        me.input.registerPointerEvent('pointerdown', me.game.viewport, this.onPointerDown.bind(this), true);
    },
    
    /**
     * action to perform pressing the mouse button
     */
    onPointerDown : function() {
       game.startEmitter(me.input.mouse.pos.x, me.input.mouse.pos.y, 10);           
    },

    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
        // release the registered object/region on the 'pointerdown' event
        me.input.releasePointerEvent('pointerdown', me.game.viewport);  
    }
});
