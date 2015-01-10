

// Start enchant.js
enchant();

var moveSpeed = 5;
var scene ;

var playerSheetPath = 'res/playerSheet.png';
var enemy1SheetPath = 'res/enemy1Sheet.png';
var enemy2SheetPath = 'res/enemy2Sheet.png';
var enemy3SheetPath = 'res/enemy3Sheet.png';
var enemy4SheetPath = 'res/enemy4Sheet.png';
var projectileSheetPath = 'res/projectile.png';
var starSheetPath = 'res/star.png';
var explosionSheetPath = 'res/explosionSheet.png';

var FCIPath ='res/logo-furious-cat-interactive.png'

var bgmPath = 'res/commandoSteve.ogg';
var hitPath = 'res/hit2.ogg';
var gameOverPath = 'res/gameOver.ogg';
var shootPath = 'res/shoot.mp3';

var JOUEUR = 1;
var ENNEMY  = 2;
window.mobilecheck = function() {
	var check = false
	(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b})(navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile');
	return check;
}


window.onload = function() {

        //source du code pour la taille de la fenêtre: http://java.scripts-fr.com/scripts.php?js=23
        var larg = (window.innerWidth);
        var haut = (window.innerHeight);

        console.log("Cette fenêtre fait " + larg + " de large et "+haut+" de haut"); 
        var hauteurBase = 620;
        var largeurBase = 400;

        // Starting point

        var scale;

        if(haut/larg>4/3){
        	scale = haut/hauteurBase; 
        	largeurBase=larg/scale;            
        }
        else{
        	scale = haut/hauteurBase; 
        	largeurBase=larg/scale;  
        }
        var game = new Game(largeurBase, hauteurBase);

        if(window.mobileCheck){
        	game.preload(
        		playerSheetPath,
        		enemy1SheetPath,
        		enemy2SheetPath,
        		enemy3SheetPath,
        		enemy4SheetPath,
        		projectileSheetPath,
        		starSheetPath);
        }
        else{
        	game.preload(
        		playerSheetPath,
        		enemy1SheetPath,
        		enemy2SheetPath,
        		enemy3SheetPath,
        		enemy4SheetPath,
        		projectileSheetPath,
        		starSheetPath,
        		'res/Hit.mp3',
        		bgmPath,
        		gameOverPath,
        		hitPath,
        		shootPath,
        		explosionSheetPath,
        		FCIPath);
        }

        game.fps = 60;
        game.scale=scale;
        game.onload = function() {
                // Once Game finish loading
                scene = new SceneMenu(); //Bootspash();
                game.pushScene(scene);
                //scene.moveTo(50, 100); 
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
                game.x=50;//larg/2-game.width/2;
                game.y=100;//   haut/2-game.height/2;

                this.backgroundColor = 'black';

                label = new Label('Score: 0');
                label.x = 5;
                label.y = 5;        
                label.color = 'white';
                label.font = '23px myFirstFont';
                label.textAlign = 'left';
                label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
                this.scoreLabel = label;        

                shooting = new Label('Shooting: 0');
                shooting.x = game.width-shooting.width-7;
                shooting.y = 5;        
                shooting.color = 'white';
                shooting.font = '23px myFirstFont';
                shooting.textAlign = 'right';
                shooting._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
                this.shooting = shooting;   

                penguin = new Penguin();
                penguin.x = game.width/2 - penguin.width/2;
                penguin.y = 2*game.height/3 - penguin.height/2;
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

                this.addEventListener('touchmove',this.handleTouchControl);
                this.addEventListener(Event.ENTER_FRAME,this.update);
                //this.addEventListener(Event.TOUCH_START,game.pause());

                // Instance variables
                this.generateIceTimer = 0;
                this.generateStars = 0;
                this.score = 0;
                this.shoot = 0;
                this.vitesseEnnemy = 7;
                this.vitesseProjCarre = 16;
                this.deltaShoot = 1.6;
                this.deltaAppartion = 2.0;
                this.deltaAppartionStar = 0.8;

                if(!window.mobileCheck){
	                // Start BGM
	                this.bgm = game.assets[bgmPath];
	                this.bgm.play();
	            }
	        },

	        handleTouchControl: function (evt) {
	        	this.penguin.x = evt.x-this.penguin.width/2;
	        	this.penguin.y = evt.y-this.penguin.height/2;
	        	if(this.penguin.shootPossible==true){
	        		this.penguin.shoot();
	        	}
	        },

	        update: function(evt) {

	        	this.generateIceTimer += evt.elapsed * 0.001;
	        	this.generateStars += evt.elapsed * 0.001;
	        	if(this.generateStars>= this.deltaAppartionStar)
	        	{
	        		star = new Star();
	        		this.starGroup.addChild(star);
	        		this.generateStars=0;
	        		if(this.score>=15 && this.score<30){
	        			this.deltaAppartionStar = 0.6;
	        		}
	        		else if(this.score>=30){
	        			this.deltaAppartionStar = 0.4;
	        		}

	        	}
	        	if(this.generateIceTimer >= this.deltaAppartion)
	        	{
	        		var ice;
	        		this.generateIceTimer = 0;

	        		if(this.deltaShoot>0.12)
	        			this.deltaShoot -= 0.025;

	        		if(this.score<15){
	        			ice = new Ice(4,1, this.deltaShoot, this.vitesseProjCarre);
	        		}
	        		else if(this.score>=15 && this.score<30){
	        			if(this.deltaAppartion>0.6)
	        				this.deltaAppartion -= 0.029;
	        			ice = new Ice(5,Math.floor(Math.random()*2)+1, this.deltaShoot, this.vitesseProjCarre);
	        		}
	        		else if(this.score>=30 && this.score<45){
	        			if(this.deltaAppartion>0.6)
	        				this.deltaAppartion -= 0.029;
	        			if(this.vitesseEnnemy<16)
	        				this.vitesseEnnemy+=0.1;
	        			ice = new Ice(this.vitesseEnnemy,Math.floor(Math.random()*3)+1, this.deltaShoot, this.vitesseProjCarre); 
	        		}
	        		else if(this.score>=45 && this.score<55){
	        			if(this.deltaAppartion>0.6)
	        				this.deltaAppartion -= 0.03;

	        			if(this.vitesseEnnemy<16)
	        				this.vitesseEnnemy+=0.1;

	        			ice = new Ice(this.vitesseEnnemy,Math.floor(Math.random()*4)+1, this.deltaShoot, this.vitesseProjCarre); 
	        		}
	        		else{
	        			if(this.deltaAppartion>0.6)
	        				this.deltaAppartion -= 0.025;

	        			if(this.vitesseEnnemy<11)
	        				this.vitesseEnnemy+=0.15;

	        			if(this.vitesseProjCarre<128)
	        				this.vitesseProjCarre += 0.8;
	        			ice = new Ice(this.vitesseEnnemy,Math.floor(Math.random()*4)+1, this.deltaShoot, this.vitesseProjCarre);
	        		}

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
                    		if(projectile.intersect(ice) && ice.y>-1*ice.height/3 && ice.actuallyDestoyed==false){
                    			ice.destroyed1(projectile);
                    		}
                    	}
                    }
             if(!window.mobileCheck){
	           // Loop BGM
	           if( this.bgm.currentTime >= this.bgm.duration ){
	           	this.bgm.play();
	           }
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
        Sprite.apply(this,[51, 70]);
        this.image = Game.instance.assets[playerSheetPath];        
        this.animationDuration = 0;
        this.shootDuration = 0;
        //this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
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
            if (game.input.left && !game.input.right && this.x>0) {
            	this.tx = this.x -= moveSpeed;
            } else if (game.input.right && !game.input.left && this.x+this.width<game.width) {
            	this.tx = this.x += moveSpeed;
            }

            if (game.input.up && !game.input.down && this.y>0) {
            	this.ty = this.y -= moveSpeed;
            } else if (game.input.down && !game.input.up && this.y+this.height<game.height) {
            	this.ty = this.y += moveSpeed;
            }

            //shoot
            if(game.input.a && this.shootPossible==true){
            	this.shoot();
            }       
        },

        canShoot: function(evt) {
        	var delta=0.22;
        	this.shootDuration = this.shootDuration +evt.elapsed * 0.001;       
        	if(this.shootDuration >= delta) {
        		this.shootPossible = true;
        	}
        	else{
        		this.shootPossible = false;
        	}
        },

        shoot: function(){
        	var p = new Projectile(this.x, this.y, this.width, JOUEUR);
        	this.projectileGroup.addChild(p);
        	this.shootDuration = 0 ;
        	this.parentNode.shoot++;
        	this.parentNode.setShoot(this.parentNode.shoot);
        	 if(!window.mobileCheck){
        		Game.instance.assets[shootPath].play();
        	}
        },

        destroyed: function(proj) {
        	var game = Game.instance;
        	explo = new Explostion(this.x, this.y, JOUEUR, this.width);
        	this.parentNode.addChild(explo);
        	proj.parentNode.removeChild(proj);
        	 if(!window.mobileCheck){
        		game.assets[hitPath].play();
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
     initialize: function(vitesse, type, deltaShoot, vitesseProjoCarre) {

     	this.animationDuration = 0;
     	this.delta=0.1;
     	this.deltaBase = deltaShoot;
     	this.vitesseProjCarre = vitesseProjoCarre;
     	this.actuallyDestoyed = false;

     	switch(type){
     		case 1:
     		Sprite.apply(this,[60, 56]);
     		this.image  = Game.instance.assets[enemy1SheetPath];
     		break;
     		case 2:
     		Sprite.apply(this,[85, 67]);
     		this.image  = Game.instance.assets[enemy2SheetPath];                
     		break;
     		case 3:
     		Sprite.apply(this,[104, 78]);
     		this.image  = Game.instance.assets[enemy3SheetPath];
     		break;
     		case 4:
     		Sprite.apply(this,[72, 68]);
     		this.image  = Game.instance.assets[enemy4SheetPath];
     		break;
     		default:
     		Sprite.apply(this,[85, 67]);
     		this.image  = Game.instance.assets[enemy2SheetPath];
     		break;
     	} 

     	this.typee = type;
     	this.vitesse=vitesse;

     	this.rotationSpeed = 0;
     	this.setLane();
     	this.addEventListener(Event.ENTER_FRAME, this.update);
     	this.cpt=0;
     	this.dir=this.angleX=Math.random()*2-1;
     },

     setLane: function() {
     	var game, distance;
     	game = Game.instance;        

     	this.x =  Math.floor(Math.random()*(game.width-this.width));
     	this.y = -this.height/1.75;    
     },

     update: function(evt) { 
     	if(this.actuallyDestoyed)
     		this.parentNode.removeChild(this);
     	else{
     		var ySpeed, game;

     		game = Game.instance;
     		ySpeed = this.vitesse*20;
     		this.y += ySpeed * evt.elapsed * 0.001;

     		if(this.typee==4){
     			if(this.dir>0){
     				this.x -=1.5;
     			}
     			else{
     				this.x +=1.5;
     			}

     			this.cpt++;
     			if(this.cpt==100 || this.x<-10 || this.x+this.height>game.width+10){
     				this.dir=-this.dir;
     				this.cpt=0;
     			}
     		}

     		if(this.y > game.height)
     		{
     			this.parentNode.removeChild(this);  
            //console.log('dcfnv')        
        }
        this.shoot(evt);
    }
},

shoot: function(evt) {

	this.animationDuration += evt.elapsed * 0.001;       
	if(this.animationDuration >=  this.delta)
	{
		var p = new Projectile(this.x, this.y, this.width, ENNEMY, this.vitesseProjCarre, this.typee);
		this.parentNode.parentNode.projectilesGroup.addChild(p);
		this.delta = (Math.random() * this.deltaBase*1.5) + this.deltaBase/1.5; 
		this.animationDuration = 0;
	}
},
destroyed1: function(proj) {
	var game = Game.instance;
	this.parentNode.parentNode.setScore(this.parentNode.parentNode.score + 1);
	this.parentNode.parentNode.penguin.projectileGroup.removeChild(proj);
	 if(!window.mobileCheck){
		game.assets[hitPath].play();
	}
	explo = new Explostion(this.x, this.y, ENNEMY, this.width);
	this.parentNode.parentNode.addChild(explo);
	this.actuallyDestoyed = true;
}
});

var Projectile = enchant.Class.create(enchant.Sprite, {

    /**type:
        1- sur les cotés angle fixe
        2- tout droit
        3- angle random
        **/
        initialize: function(x,y, parentWidth, faction, vitesse, type)
        {
        //this.vitesse = vitesse;
        var game = Game.instance;
        this.camp = faction;
        Sprite.apply(this,[12, 12]);
        this.image = Game.instance.assets[ projectileSheetPath]; // set image
        
        this.y = y+5; 
        this.x = x+parentWidth/2-(this.width)/2;

         //console.log(vitesse);

         if(this.camp == 2){

         //console.log(type)
         switch(type){
         	case 1:
                this.angleX=Math.floor(Math.random()*2);//Math.random()*4-2;
                if(this.angleX==0)
                	this.angleX=-1;
                this.angleY=Math.sqrt(vitesse-Math.pow(this.angleX,2));
                break;
                case 2:
                this.angleX=0
                this.angleY=Math.sqrt(vitesse);
                break;
                case 3:
                this.angleX=Math.random()*4-2;
                this.angleY=Math.sqrt(vitesse-Math.pow(this.angleX,2));
                break;
                case 4:
                this.angleX=Math.random()*2-1;
                this.angleY=Math.sqrt(vitesse-Math.pow(this.angleX,2));
                break;
                default:
                this.angleX=0
                this.angleY=Math.sqrt(vitesse);
                break;

            }    
        }
        this.frame = 15;                   // set image data
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
        if(this.camp == 1){//joueur
        	this.moveBy(0, -6, 0);
        	if(this.y<this.parentNode.parentNode.y-50){
        		this.parentNode.removeChild(this);
        	}
        }
        else if(this.camp == 2){
        	this.y+=this.angleY;
        	this.x+=this.angleX;
        	if(this.y>this.parentNode.parentNode.height){
        		this.parentNode.removeChild(this);   
        //           
    }
}
}
});

var Explostion = enchant.Class.create(enchant.Sprite, {

	initialize: function(x,y, faction, tailleParent) {
		var game = Game.instance;
		Sprite.apply(this,[60, 60]);
        this.image = Game.instance.assets[explosionSheetPath]; // set image        
        this.y = y;
        var scalle=tailleParent/this.width;
        this.x = x+tailleParent/2-(this.width/2);
        this.scale(scalle,scalle);
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
    				if(!window.mobileCheck){
    					this.parentNode.bgm.stop();
    				}
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
        this.vitesse = Math.random()*4+9;
        this.frame = 15;                   // set image data
        var scalee = Math.random()*0.55+0.10;
        this.scale(scalee,scalee);
        this.addEventListener(Event.ENTER_FRAME,this.update);
    },

    update: function(evt) {
    	this.moveBy(0, this.vitesse, 0);
    	if(this.y>this.parentNode.parentNode.height){
    		this.parentNode.removeChild(this);
           //console.log('sta DESTROY')
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

 		 if(!window.mobileCheck){
	        // Background music
	        this.gom = game.assets[gameOverPath]; // Add this line
	        // Start BGM
	        this.gom.play();
	    }

        gameOverLabel = new Label("GAME OVER<br>Tap to Restart");
        gameOverLabel.x = game.width/2-gameOverLabel.width/2;
        gameOverLabel.y = game.height/3-70;
        gameOverLabel.color = 'white';
        gameOverLabel.font = '34px myFirstFont';
        gameOverLabel.textAlign = 'center';

        scoreLabel = new Label('SCORE: ' + score);
        scoreLabel.x = game.width/2-scoreLabel.width/2;
        scoreLabel.y = game.height/2;        
        scoreLabel.color = 'white';
        scoreLabel.font = '28px myFirstFont';
        scoreLabel.textAlign = 'center';

        shootLabel = new Label('SHOOTING: ' + shoot);
        shootLabel.x = game.width/2-shootLabel.width/2;
        shootLabel.y = game.height/2+2*20;        
        shootLabel.color = 'white';
        shootLabel.font = '28px myFirstFont';
        shootLabel.textAlign = 'center';

        var nombre = score/shoot*100;
        arrondi = nombre*100;          // 556.845
        arrondi = Math.round(arrondi); // 556
        arrondi = arrondi/100;         // 5.56
        if(shoot==0)
        	arrondi=0;
        ratioLabel = new Label('RATIO: ' +arrondi + '%');
        ratioLabel.x = game.width/2-ratioLabel.width/2;
        ratioLabel.y = game.height/2+4*20;        
        ratioLabel.color = 'white';
        ratioLabel.font = '28px myFirstFont';
        ratioLabel.textAlign = 'center';

        this.addChild(gameOverLabel);
        this.addChild(scoreLabel);
        this.addChild(shootLabel);
        this.addChild(ratioLabel);

        this.addEventListener(Event.TOUCH_START, this.touchToRestart);
        this.addEventListener(Event.A_BUTTON_DOWN, this.touchToRestart);
    },

    touchToRestart: function(evt) {
    	var game = Game.instance; 
    	if(!window.mobileCheck){
    		this.gom.stop();
    	}
    	scene = new SceneGame();
    	game.replaceScene(scene);
    }
});


/**
 * SceneMenu  
 */
 var SceneMenu = Class.create(Scene, {
 	initialize: function() {
 		var titreLabel, creditLabel;
 		Scene.apply(this);
 		this.backgroundColor = 'black';

 		var game;
 		game = Game.instance;
 
        titreLabel = new Label("INTERGALACTIC <br>SPACE <br>SHOOTER");
       titreLabel.x = game.width/2-titreLabel.width/1.8;
       titreLabel.y = game.height/5-70;
       titreLabel.color = 'white';
       titreLabel.font = '34px myFirstFont';
       titreLabel.textAlign = 'center';

       var tapLabel = new Label('Tap to play');
       tapLabel.x = game.width/2-tapLabel.width/2;
       tapLabel.y = game.height/2.5;        
       tapLabel.color = 'white';
       tapLabel.font = '30px myFirstFont';
       tapLabel.textAlign = 'center';

       creditLabel = new Label('Furious Cat Interactive 2015');
       creditLabel .font = '20px myFirstFont';
       creditLabel .x = game.width/2-creditLabel.width/2;
       creditLabel .y = game.height-3*15-10;    
       creditLabel .color = 'white';
       creditLabel .textAlign = 'center';

       var penguin = new Penguin();
       penguin.x = game.width/2 - penguin.width/2;
       penguin.y = 2*game.height/3 - penguin.height/2;
       
       var groupStar = new Group();
       this.groupStar = groupStar;
       this.generateStars =0;
       this.deltaAppartionStar = 0.2;

       this.addChild(this.groupStar);
       this.addChild(titreLabel);
       this.addChild(tapLabel);
       this.addChild(creditLabel);
       this.addChild(penguin);

       this.addEventListener(Event.TOUCH_START, this.touchToRestart);
       this.addEventListener(Event.A_BUTTON_DOWN, this.touchToRestart);
       this.addEventListener(Event.ENTER_FRAME, this.update);
   },

   update: function(evt){
   	this.generateStars += evt.elapsed * 0.001;
   	if(this.generateStars>= this.deltaAppartionStar)
   	{
   		star = new Star();
   		this.groupStar.addChild(star);
   		this.generateStars=0;   
   	}
   },

   touchToRestart: function(evt) {
   	var game = Game.instance;
        scene = new SceneGame();
        game.replaceScene(scene);
    }
});



/**
 * Bootspash 
 */
 var Bootspash = Class.create(Scene, {
 	initialize: function() {

 		Scene.apply(this);
 		this.backgroundColor = 'black';

 		var game;
 		game = Game.instance;

 		this.cat = Class.create(Sprite, {

 			initialize: function() {
 				var projectileGroup;
 				var shootDuration;
 				var shootPossible = true;
        // Call superclass constructor
        Sprite.apply(this,[1214, 1147]);
        this.image = Game.instance.assets[FCIPath];
        var scale =0.66*(game.width/this.width);
        this.scale(scale,scale);
    }
});

 		this.addChild(this.cat);

 		this.addEventListener(Event.TOUCH_START, this.touchToRestart);
 		this.addEventListener(Event.A_BUTTON_DOWN, this.touchToRestart);
 		this.addEventListener(Event.ENTER_FRAME, this.update);
 	},

 	update: function(evt){
 		this.generateStars += evt.elapsed * 0.001;
 		if(this.generateStars>= this.deltaAppartionStar)
 		{
 			star = new Star();
 			this.groupStar.addChild(star);
 			this.generateStars=0;   
 		}
 	},

 	touchToRestart: function(evt) {
 		var game = Game.instance;
        scene = new SceneMenu();
        game.replaceScene(scene);
    }
});

