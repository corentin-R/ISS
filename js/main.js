// Start enchant.js
enchant();

var moveSpeed = 5;
var scene ;

var playerSheetPath = 'res/playerSheet.png';
var enemy1SheetPath = 'res/enemy1Sheet.png';
var projectileSheetPath = 'res/projectile.png';
var starSheetPath = 'res/star.png';
var explosionSheetPath = 'res/explosionSheet.png';

var bgmPath = 'res/commandoSteve.ogg';
var hitPath = 'res/hit2.ogg';
var gameOverPath = 'res/gameOver.ogg';

var JOUEUR = 1;
var ENNEMY  = 2;

window.onload = function() {
    // Starting point
    var game = new Game(350, 500);
    game.preload('res/BG.png',
     playerSheetPath,
     enemy1SheetPath,
     projectileSheetPath,
     starSheetPath,
     'res/Hit.mp3',
     bgmPath,
     gameOverPath,
     hitPath,
     explosionSheetPath);

    game.fps = 60;
    game.scale = 1;
    game.onload = function() {
        // Once Game finish loading
        console.log("Hi, Space!");
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

        this.backgroundColor = 'black';

        label = new Label('Score: 0');
        label.x = 5;
        label.y = 5;        
        label.color = 'white';
        label.font = '16px strong';
        label.textAlign = 'left';
        label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
        this.scoreLabel = label;        

        shooting = new Label('Shooting: 0');
        shooting.x = game.width-shooting.width-7;
        shooting.y = 5;        
        shooting.color = 'white';
        shooting.font = '16px strong';
        shooting.textAlign = 'right';
        shooting._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
        this.shooting = shooting;   

        penguin = new Penguin();
        penguin.x = game.width/2 - penguin.width/2;
        penguin.y = 280;
        this.penguin = penguin;

        iceGroup = new Group();
        this.iceGroup = iceGroup;

        projectilesGroup = new Group();
        this.projectilesGroup = projectilesGroup;

        starGroup = new Group();
        this.starGroup = starGroup;

        //attention à l'ordre!!!!
        this.addChild(this.starGroup);
        this.addChild(projectilesGroup);
        this.addChild(iceGroup);        
        this.addChild(penguin);
        this.addChild(penguin.projectileGroup);        
        this.addChild(label);
        this.addChild(shooting);

        this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
        this.addEventListener(Event.ENTER_FRAME,this.update);

        // Instance variables
        this.generateIceTimer = 0;
        this.generateStars = 0;
        this.score = 0;
        this.shoot = 0;

        // Start BGM
        this.bgm = game.assets[bgmPath];
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
        this.generateStars += evt.elapsed * 0.001;
        if(this.generateStars>= 0.5)
        {
            star = new Star();
            this.starGroup.addChild(star);
            this.generateStars=0;
        }
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

        for (var k = this.projectilesGroup.childNodes.length - 1; k >= 0; k--){
            var iceProjectile;
            iceProjectile = this.projectilesGroup.childNodes[k];
            if(iceProjectile.intersect(this.penguin)){
                this.penguin.destroyed(iceProjectile);      
                break;
            }
        }
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];

            if(ice.intersect(this.penguin)){  
             this.penguin.destroyed(ice, JOUEUR);
             break;
         }

         for (var j = this.penguin.projectileGroup.childNodes.length - 1; j >= 0; j--){
           var projectile;
           projectile = this.penguin.projectileGroup.childNodes[j];
           if(projectile.intersect(ice)){
            ice.destroyed(projectile);
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
} ,  
setShoot: function (value) {
    this.shoot = value;
    this.shooting.text = 'Shooting: ' + this.shoot;
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
        Sprite.apply(this,[60, 83]);
        this.image = Game.instance.assets[playerSheetPath];        
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
    this.parentNode.shoot++;
    this.parentNode.setShoot(this.parentNode.shoot);
},

destroyed: function(proj) {
    var game = Game.instance;
    this.parentNode.projectilesGroup.removeChild(proj);
    game.assets[hitPath].play();
    explo = new Explostion(this.x, this.y, JOUEUR);
    this.parentNode.addChild(explo);
    this.parentNode.removeChild(this);
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
        Sprite.apply(this,[60, 56]);


        this.animationDuration = 0;
        this.delta=0.2;

        this.image  = Game.instance.assets[enemy1SheetPath];      
        this.rotationSpeed = 0;
        this.setLane();
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },

    setLane: function() {
        var game, distance;
        game = Game.instance;        

        this.x = this.width/2 + Math.floor(Math.random()*(game.width))-this.width;
        this.y = -this.height;    
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
            this.parentNode.parentNode.projectilesGroup.addChild(p);
            this.delta = (Math.random() * 1.3) + 0.7; 
            this.animationDuration = 0;
        }
    },
    destroyed: function(proj) {
        var game = Game.instance;
        this.parentNode.parentNode.setScore(this.parentNode.parentNode.score + 1);
        this.parentNode.parentNode.penguin.projectileGroup.removeChild(proj);
        game.assets[hitPath].play();
        explo = new Explostion(this.x, this.y, ENNEMY);
        this.parentNode.parentNode.addChild(explo);
        this.parentNode.parentNode.iceGroup.removeChild(this);
    }
});

var Projectile = enchant.Class.create(enchant.Sprite, {

    initialize: function(x,y, faction)
    {
        var vitesse = 7;
        var game = Game.instance;
        this.camp = faction;
        Sprite.apply(this,[12, 12]);
        this.image = Game.instance.assets[ projectileSheetPath]; // set image
        
        if(this.camp == 1){//joueur
            this.y = y-this.height/2;
            this.x = x+30-(this.width)/2;
        }
        else if(this.camp == 2){
         this.y = y+30; 
         this.x = x+30-(this.width)/2;
           this.angleX=Math.floor(Math.random()*2);//Math.random()*4-2;
           if(this.angleX==0)
            this.angleX=-1;
        this.angleY=Math.sqrt(16-Math.pow(this.angleX,2));
    }

        this.frame = 15;                   // set image data
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
        if(this.camp == 1){//joueur
            this.moveBy(0, -6, 0);
            if(this.y<this.parentNode.y-50){
             this.parentNode.removeChild(this);
             console.log('DESTROY!!')
         }
     }
     else if(this.camp == 2){
        this.y+=this.angleY;
        this.x+=this.angleX;
        if(this.y>this.parentNode.height){
         this.parentNode.removeChild(this);             
     }
 }
}
});

var Explostion = enchant.Class.create(enchant.Sprite, {

    initialize: function(x,y, faction) {
        var game = Game.instance;
        Sprite.apply(this,[60, 60]);
        this.image = Game.instance.assets[explosionSheetPath]; // set image        
        this.y = y;
        this.x = x;
        this.cpt=0;   
        this.faction=faction;              
        this.addEventListener(Event.ENTER_FRAME,this.update);
        this.animationDuration=0
    },

    update: function(evt) {
        this.animationDuration += evt.elapsed * 0.001;       
        if(this.animationDuration >= 0.06)
        {
            this.frame = (this.frame + 1);
            this.animationDuration =0;
            this.cpt +=1;
            if(this.cpt==5)
            {
                if(this.faction==JOUEUR){
                    var game = Game.instance;
                    this.parentNode.bgm.stop();
                    game.replaceScene(new SceneGameOver(this.parentNode.score,this.parentNode.shoot));   
                }
                this.parentNode.removeChild(this);
            }
        }
    }
});


var Star = enchant.Class.create(enchant.Sprite, {

    initialize: function(x,y, faction) {
        var game = Game.instance;
        Sprite.apply(this,[32, 32]);
        this.image = Game.instance.assets[starSheetPath]; // set image        
        this.y = 0;
        this.x = Math.random()*game.width-this.width;
        this.vitesse = Math.random()*2+7;
        this.frame = 15;                   // set image data
        var scalee = Math.random()*0.45+0.10;
        this.scale(scalee,scalee);
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
        this.moveBy(0, this.vitesse, 0);
        if(this.y>this.parentNode.height){
         this.parentNode.removeChild(this);
         console.log('sta DESTROY')
     }
 }

});
/**
 * SceneGameOver  
 */
 var SceneGameOver = Class.create(Scene, {
    initialize: function(score, shoot) {
        var gameOverLabel, scoreLabel;
        Scene.apply(this);
        this.backgroundColor = 'black';

        var game;
        game = Game.instance;
        // Background music
        this.gom = game.assets[gameOverPath]; // Add this line
        // Start BGM
        this.gom.play();

        gameOverLabel = new Label("GAME OVER<br>Move to Restart");
        gameOverLabel.x = game.width/2-gameOverLabel.width/2;
        gameOverLabel.y = game.height/3-70;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '32px strong';
        gameOverLabel.textAlign = 'center';

        scoreLabel = new Label('SCORE: ' + score);
        scoreLabel.x = game.width/2-scoreLabel.width/2;
        scoreLabel.y = game.height/2;        
        scoreLabel.color = 'white';
        scoreLabel.font = '24px strong';
        scoreLabel.textAlign = 'center';

        shootLabel = new Label('SHOOTING: ' + shoot);
        shootLabel.x = game.width/2-shootLabel.width/2;
        shootLabel.y = game.height/2+2*20;        
        shootLabel.color = 'white';
        shootLabel.font = '24px strong';
        shootLabel.textAlign = 'center';


        var nombre = score/shoot*100;
        arrondi = nombre*100;          // 556.845
        arrondi = Math.round(arrondi); // 556
        arrondi = arrondi/100;         // 5.56
        ratioLabel = new Label('RATIO: ' +arrondi + '%');
        ratioLabel.x = game.width/2-ratioLabel.width/2;
        ratioLabel.y = game.height/2+4*20;        
        ratioLabel.color = 'white';
        ratioLabel.font = '24px strong';
        ratioLabel.textAlign = 'center';

        this.addChild(gameOverLabel);
        this.addChild(scoreLabel);
        this.addChild(shootLabel);
        this.addChild(ratioLabel);

        this.addEventListener(Event.INPUT_CHANGE, this.touchToRestart);
},

touchToRestart: function(evt) {
    var game = Game.instance;
    this.gom.stop();
    scene = new SceneGame();
    game.replaceScene(scene);
}
});