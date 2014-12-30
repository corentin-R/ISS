// Start enchant.js
enchant();

var moveSpeed = 5;
var scene ;

window.onload = function() {
    // Starting point
    var game = new Game(320, 440);
    game.preload('res/BG.png',
       'res/penguinSheet.png',
       'res/Ice.png',
       'res/Hit.mp3',
       'res/bgm.mp3',
       'res/sound/Wha-Wha.ogg');
    game.fps = 60;
    game.scale = 1;
    game.onload = function() {
        // Once Game finish loading
        console.log("Hi, Ocean!");
        scene = new SceneGame();
        game.pushScene(scene);
    }
    window.scrollTo(0,0);
    game.start();   
};

/**
 * SceneGame  
 */
 var SceneGame = Class.create(Scene, {
    /**
     * The main gameplay scene.     
     */
     initialize: function() {
        var game, label, bg, penguin, iceGroup, projectileGroup;

        // Call superclass constructor
        Scene.apply(this);

        // Access to the game singleton instance
        game = Game.instance;

        label = new Label('Score: 0');
        label.x = 5;
        label.y = 5;        
        label.color = 'white';
        label.font = '16px strong';
        label.textAlign = 'left';
        label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
        this.scoreLabel = label;        

        bg = new Sprite(320,440);
        bg.image = game.assets['res/BG.png'];

        penguin = new Penguin();
        penguin.x = game.width/2 - penguin.width/2;
        penguin.y = 280;
        this.penguin = penguin;

        iceGroup = new Group();
        this.iceGroup = iceGroup;

        projectileGroup = new Group();
        this.projectileGroup = projectileGroup;

        this.addChild(bg);
        this.addChild(iceGroup);
        this.addChild(penguin);
        this.addChild(label);
        this.addChild(projectileGroup);

        game.keybind(32 , 'a');

        this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
        this.addEventListener(Event.ENTER_FRAME,this.update);
        this.addEventListener(Event.a_button, this.onenterframe);

        // Instance variables
        this.generateIceTimer = 0;
        this.scoreTimer = 0;
        this.score = 0;

        this.bgm = game.assets['res/bgm.mp3']; // Add this line

        // Start BGM
        this.bgm.play();
    },

    handleTouchControl: function (evt) {
        var laneWidth, lane;
        laneWidth = 320/3;
        lane = Math.floor(evt.x/laneWidth);
        lane = Math.max(Math.min(2,lane),0);
        this.penguin.switchToLaneNumber(lane);
    },

    update: function(evt) {
        // Score increase as time pass
        this.scoreTimer += evt.elapsed * 0.001;
        if(this.scoreTimer >= 0.5)
        {
            this.setScore(this.score + 1);
            this.scoreTimer -= 0.5;
        }

        // Check if it's time to create a new set of obstacles
        this.generateIceTimer += evt.elapsed * 0.001;
        if(this.generateIceTimer >= 2.5)
        {
            var ice;
            this.generateIceTimer -= 2.5;
            ice = new Ice(Math.floor(Math.random()*3));
            this.iceGroup.addChild(ice);
        }

        // Check collision
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];
            if(ice.intersect(this.penguin)){  
                var game;
                game = Game.instance;
                game.assets['res/Hit.mp3'].play();                    
                this.iceGroup.removeChild(ice);
                this.bgm.stop();
                game.replaceScene(new SceneGameOver(this.score));        
                break;
            }
        }

        // Loop BGM
        if( this.bgm.currentTime >= this.bgm.duration ){
            this.bgm.play();
        }
    },

    onenterframe: function() {
        var game = Game.instance;

        if(game.input.a ){
            var p = new Projectile();
            this.addChild(p);
            console.log("merrrrddeeee!");
        }

    },

    setScore: function (value) {
        this.score = value;
        this.scoreLabel.text = 'Score: ' + this.score;
    }   
});

/**
 * Penguin
 */
 var Penguin = Class.create(Sprite, {

    /**
     * The player character.     
     */
     initialize: function() {
        var projectileGroup;
        // Call superclass constructor
        Sprite.apply(this,[30, 43]);
        this.image = Game.instance.assets['res/penguinSheet.png'];        
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);

        // Key Binding
        // Access to the game singleton instance
        var game = Game.instance;
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
    },

    updateAnimation: function (evt) {        
        this.animationDuration += evt.elapsed * 0.001;       
        if(this.animationDuration >= 0.25)
        {
            this.frame = (this.frame + 1) % 2;
            this.animationDuration -= 0.25;
        }
    },

    switchToLaneNumber: function(lane){     
        var targetX = 160 - this.width/2 + (lane-1)*90;
        this.x = targetX;
    },

    onenterframe: function() {
        //04.2 Keyboard Input
        var game = Game.instance;
        if (game.input.left && !game.input.right) {
            this.tx = this.x -= moveSpeed;
        } else if (game.input.right && !game.input.left) {
            this.tx = this.x += moveSpeed;
        }

        if (game.input.up && !game.input.down) {
            this.ty = this.y -= moveSpeed;
        } else if (game.input.down && !game.input.up) {
            this.ty = this.y += moveSpeed;

        }
    }
});

 /**
 * Ice Cube
 */
 var Ice = Class.create(Sprite, {
    /**
     * The obstacle that the penguin must avoid
     */
     initialize: function(lane) {
        // Call superclass constructor
        Sprite.apply(this,[48, 49]);
        this.image  = Game.instance.assets['res/Ice.png'];      
        this.rotationSpeed = 0;
        this.setLane(lane);
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },

    setLane: function(lane) {
        var game, distance;
        game = Game.instance;        
        distance = 90;

        this.rotationSpeed = Math.random() * 100 - 50;

        this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
        this.y = -this.height;    
        this.rotation = Math.floor( Math.random() * 360 );    
    },

    update: function(evt) { 
        var ySpeed, game;

        game = Game.instance;
        ySpeed = moveSpeed*20;

        this.y += ySpeed * evt.elapsed * 0.001;
        this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
        if(this.y > game.height)
        {
            this.parentNode.removeChild(this);          
        }
    }
});

var Projectile = enchant.Class.create(enchant.Sprite, {
    initialize: function()
    {
        var game = Game.instance;
        Sprite.apply(this,[100, 100]);
        this.image = Game.instance.assets['res/Ice.png']; // set image
        this.x = 0;
        this.y = 40; 
        
        this.frame = 15;                   // set image data
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
        //this.moveBy(1, 0, 1);
    }
});

/**
 * SceneGameOver  
 */
 var SceneGameOver = Class.create(Scene, {
    initialize: function(score) {
        var gameOverLabel, scoreLabel;
        Scene.apply(this);
        this.backgroundColor = 'black';

        var game;
        game = Game.instance;
        // Background music
        this.gom = game.assets['res/sound/Wha-Wha.ogg']; // Add this line
        // Start BGM
        this.gom.play();

        gameOverLabel = new Label("GAME OVER<br>Tap to Restart");
        gameOverLabel.x = 8;
        gameOverLabel.y = 128;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '32px strong';
        gameOverLabel.textAlign = 'center';

        scoreLabel = new Label('SCORE<br>' + score);
        scoreLabel.x = 9;
        scoreLabel.y = 32;        
        scoreLabel.color = 'white';
        scoreLabel.font = '16px strong';
        scoreLabel.textAlign = 'center';

        this.addChild(gameOverLabel);
        this.addChild(scoreLabel);

        this.addEventListener(Event.TOUCH_START, this.touchToRestart);


    },

    touchToRestart: function(evt) {
        var game = Game.instance;
        this.gom.stop();
        game.replaceScene(new SceneGame());
    }
});