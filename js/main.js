// Start enchant.js
enchant();

var moveSpeed = 5;
var scene ;

var JOUEUR = 1;
var ENNEMY  = 2;

window.onload = function() {
    // Starting point
    var game = new Game(320, 440);
    game.preload('res/BG.png',
     'res/penguinSheet.png',
     'res/Ice.png',
     'res/projectile.png',
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
        var game, label, bg, penguin, iceGroup;
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

        this.addChild(bg);
        this.addChild(iceGroup);
        this.addChild(penguin);
        this.addChild(label);
        this.addChild(penguin.projectileGroup);


        this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
        this.addEventListener(Event.ENTER_FRAME,this.update);

        // Instance variables
        this.generateIceTimer = 0;
        this.scoreTimer = 0;
        this.score = 0;

        this.bgm = game.assets['res/bgm.mp3']; // Add this line

        // Start BGM
        this.bgm.play();
    },

    handleTouchControl: function (evt) {
        this.penguin.x = evt.x;
        this.penguin.y = evt.y;
        this.penguin.shoot();
    },

    update: function(evt) {

        // Check if it's time to create a new set of obstacles
        var delta = 2.0;
        this.generateIceTimer += evt.elapsed * 0.001;
        if(this.generateIceTimer >= delta)
        {
            var ice;
            this.generateIceTimer -= delta;
            ice = new Ice();
            this.iceGroup.addChild(ice);
        }

        var game;
        game = Game.instance;

        // Check collision
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];

            //a rempacer par replaceChild
            this.removeChild(ice.projectileGroup);
            this.addChild(ice.projectileGroup);

            if(ice.intersect(this.penguin)){  
                game.assets['res/Hit.mp3'].play();                    
                this.iceGroup.removeChild(ice);
                this.bgm.stop();
                game.replaceScene(new SceneGameOver(this.score));        
                break;
            }

            for (var k = ice.projectileGroup.childNodes.length - 1; k >= 0; k--){
                var iceProjectile;
                iceProjectile = ice.projectileGroup.childNodes[k];
                if(iceProjectile.intersect(this.penguin)){
                    game.assets['res/Hit.mp3'].play();                    
                    this.iceGroup.removeChild(ice);
                    this.bgm.stop();
                    game.replaceScene(new SceneGameOver(this.score));        
                    break;
                }
            }

            for (var j = this.penguin.projectileGroup.childNodes.length - 1; j >= 0; j--){
               var projectile;
               projectile = this.penguin.projectileGroup.childNodes[j];
               if(projectile.intersect(ice)){
                this.setScore(this.score + 1);
                this.iceGroup.removeChild(ice);
                this.penguin.projectileGroup.removeChild(projectile);
            }
        }

    }
        // Loop BGM
        if( this.bgm.currentTime >= this.bgm.duration ){
            this.bgm.play();
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
        var shootDuration;
        var shootPossible = true;
        // Call superclass constructor
        Sprite.apply(this,[30, 43]);
        this.image = Game.instance.assets['res/penguinSheet.png'];        
        this.animationDuration = 0;
        this.shootDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
        this.addEventListener(Event.ENTER_FRAME, this.canShoot);

        projectileGroup = new Group();
        this.projectileGroup = projectileGroup;

        // Key Binding
        // Access to the game singleton instance
        var game = Game.instance;
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
        game.keybind(32 , 'a');
    },

    updateAnimation: function (evt) {        
        this.animationDuration += evt.elapsed * 0.001;       
        if(this.animationDuration >= 0.25)
        {
            this.frame = (this.frame + 1) % 2;
            this.animationDuration -= 0.25;
        }
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

        //shoot
        if(game.input.a && this.shootPossible==true){
          this.shoot();
      }       
  },

  canShoot: function(evt) {
    var delta=0.15;
    this.shootDuration = this.shootDuration +evt.elapsed * 0.001;       
    if(this.shootDuration >= delta) {
        this.shootPossible = true;
    }
    else{
     this.shootPossible = false;
 }
},

shoot: function(){
    var p = new Projectile(this.x, this.y, JOUEUR);
    this.projectileGroup.addChild(p);
    this.shootDuration = 0 ;
}


});

 /**
 * Ice Cube
 */
 var Ice = Class.create(Sprite, {
    /**
     * The obstacle that the penguin must avoid
     */
     initialize: function() {
        // Call superclass constructor
        Sprite.apply(this,[48, 49]);

        var projectileGroup;
        projectileGroup = new Group();
        this.projectileGroup = projectileGroup;
        this.animationDuration = 0;
        this.delta=0.2;

        this.image  = Game.instance.assets['res/Ice.png'];      
        this.rotationSpeed = 0;
        this.setLane();
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },

    setLane: function() {
        var game, distance;
        game = Game.instance;        

        this.x = this.width/2 + Math.floor(Math.random()*(game.width-40));
        this.y = -this.height;    
        //console.log(this.x);   
    },

    update: function(evt) { 
        var ySpeed, game;

        game = Game.instance;
        ySpeed = moveSpeed*20;

        this.y += ySpeed * evt.elapsed * 0.001;

        if(this.y > game.height)
        {
            this.parentNode.removeChild(this);          
        }
        this.shoot(evt);
    },

    shoot: function(evt) {

        this.animationDuration += evt.elapsed * 0.001;       
        if(this.animationDuration >=  this.delta)
        {
            var p = new Projectile(this.x, this.y, ENNEMY);
            this.projectileGroup.addChild(p);
            this.delta = (Math.random() * 1.3) + 0.7; 
            this.animationDuration = 0;
        }
    }
});

var Projectile = enchant.Class.create(enchant.Sprite, {

    initialize: function(x,y, faction)
    {
        var vitesse = 7;
        var game = Game.instance;
        this.camp = faction;
        Sprite.apply(this,[8, 16]);
        this.image = Game.instance.assets['res/projectile.png']; // set image
        //this.scale(0.3,0.3);

        if(this.camp == 1){//joueur
            this.y = y-this.height/2;
            this.x = x+15-(this.width)/2;
        }
        else if(this.camp == 2){
         this.y = y+30; 
         this.x = x+24-(this.width)/2;
     }

        this.frame = 15;                   // set image data
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
        if(this.camp == 1){//joueur
            this.moveBy(0, -6, 0);
            if(this.y<this.parentNode.y-50){
             this.parentNode.removeChild(this);
             //console.log('DESTROY!!')
         }
     }
     else if(this.camp == 2){
        this.moveBy(0, 6, 0);
        if(this.y>this.parentNode.height){
         this.parentNode.removeChild(this);
             //console.log('DESTROY!!')
         }
     }
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

        this.addEventListener(Event.INPUT_CHANGE, this.touchToRestart);
    },

    touchToRestart: function(evt) {
        var game = Game.instance;
        this.gom.stop();
        scene = new SceneGame();
        game.replaceScene(scene);
    }
});