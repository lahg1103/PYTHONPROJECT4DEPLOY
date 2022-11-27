var currentStage;
var count = 0;
var currentTarget = "#";
//advance function
var gameScreens = ["titleScreen", "select1", "select2", "select3", "select4", "dialogue", "level", "fight"]
function advance(obj){ 
    var next = "#";
    var current = "#";
    var stg1, stg2, stg3, stg4;
    //works
    if (obj.id == "startGame") {
        next+="map";
        current += "titleScreen";
        console.log(next);
        fetch('/getMap').then(function (response) {
          return response.json();
        }).then(function (text) {
          stg1 = text.stage1;
          stg2 = text.stage2;
          stg3 = text.stage3;
          stg4 = text.stage4;
          currentStage = updateMap(stg1, stg2, stg3, stg4);
      });
    }

    //returns something
    else {
        
        switch(obj.id) {
            case "select1":
                if ($("#select1").hasClass("levelSelect")) 
                {
                    $("#fight").addClass("stage1D");
                    next+="level";
                    if (count == 0) {
                        game.init();
                        game.mu.idle();
                    }
                    count++;
                }
                else if ($("#select1").hasClass("shopSelect"))
                {
                    next+="shop";
                }
                current += "map";
                break;
            case "select2":
                if ($("#select2").hasClass("unavailableSelect"))
                    {
                        console.log("nope cute you thought tho");
                    }
                else if ($("#select2").hasClass("levelSelect"))
                    {
                        $("#level").removeClass("stg1bg");
                        $("#level").addClass("stg2bg");
                        console.log("i dont know why this does not work");
                        next += "level";
                        if (count == 0) {
                            game.init();
                        }
                        count++;
                        current += "map";
                    }
                else if ($("#select2").hasClass("shopSelect"))
                    {
                        next += "shop";
                        current += "map";
                    }
                    
                break;
            case "select3":
                if ($("#select3").hasClass("unavailableSelect"))
                    {
                        console.log("nope cute you thought tho");
                    }
                else if ($("#select3").hasClass("levelSelect"))
                    {
                        next += "fight";
                        if (count == 0) {
                            game.init();
                        }
                        count++;
                        current += "map";
                    }
                else if ($("#select3").hasClass("shopSelect"))
                    {
                        next += "shop";
                        current += "map";
                    }
                
                break;
            case "select4":
                if ($("#select4").hasClass("unavailableSelect"))
                {
                    console.log("nope cute you thought tho");
                }
            else if ($("#select4").hasClass("levelSelect"))
                {
                    next += "fight";
                    if (count == 0) {
                        game.init();
                    }
                    count++;
                    current += "map";
                }
            
                break;
            case "Bandit0":
                currentTarget = "#" + obj.id;
                current += "level";
                next += "fight";
                $("#sHP").text('hp: ' + carlosmaxHP);
                $("#hpbarMU").val(carlosmaxHP);
                $("#hpbarE").val(targetmaxHP);
                break;
            case "Bandit1":
                currentTarget = "#" + obj.id;
                current += "level";
                next += "fight";
                $("#sHP").text('hp: ' + carlosmaxHP);
                $("#hpbarMU").val(carlosmaxHP);
                $("#hpbarE").val(targetmaxHP);
                break;
            case "Bandit2":
                currentTarget = "#" + obj.id;
                current += "level";
                next += "fight";
                $("#sHP").text('hp: ' + carlosmaxHP);
                $("#hpbarMU").val(carlosmaxHP);
                $("#hpbarE").val(targetmaxHP);
                break;
            case "Bandit3":
                currentTarget = "#" + obj.id;
                current += "level";
                next += "fight";
                $("#sHP").text('hp: ' + carlosmaxHP);
                $("#hpbarMU").val(carlosmaxHP);
                $("#hpbarE").val(targetmaxHP);
                break;
            case "Bandit4":
                currentTarget = "#" + obj.id;
                current += "level";
                next += "fight";
                $("#sHP").text('hp: ' + carlosmaxHP);
                $("#hpbarMU").val(carlosmaxHP);
                $("#hpbarE").val(targetmaxHP);
                break;
            default:
                next+="map";
        }
    }

    $(current).toggleClass("hidden");
    $(next).toggleClass("hidden");
}
//turn change
function turnChange(obj) {
    var msg;
    
    $.ajax({
        type: "POST",
        url : "/attackTurn",
        contentType: "application/json;charset=UTF-8",
        data : JSON.stringify({'choice': obj.id}),
        dataType: 'json',
        success: function(){
        },
        failure: function(){
        },
        complete: function() {
            fetch('/attackTurn').then(function(response){return response.json()}).then(function(text){
                let c = text.Carlos;
                let b0 = text.Bandit0;
                let b1 = text.Bandit1;
                let b2 = text.Bandit2;
                let b3 = text.Bandit3;
                let b4 = text.Bandit4;

                console.log(b0);
                console.log(b1);
                console.log(b2);
                console.log(b3);
                console.log(b4);
                
                if( b0 != undefined) {
                    $("#hpbarE").val(b0);
                }
                if (b1 != undefined) {
                    $("#hpbarE").val(b1);
                }
                if (b2 != undefined) {
                    $("#hpbarE").val(b2);
                }
                if( b3 != undefined) {
                    $("#hpbarE").val(b3);
                }
                if (b4 != undefined) {
                    $("#hpbarE").val(b4);
                }
                $("#sHP").text('hp: ' + c);
                $("#hpbarMU").val(c);
                console.log(text.message);
                msg = text.message;
                if (text.Carlos < 0) {
                    msg = "you lose" 
                }
                setTimeout(function(){
                    if (msg == "you lose") {
                        $("#fight").toggleClass("hidden");
                        $("#deathScreen").toggleClass("hidden");
                    }
                    else if (msg == "you win") {
                        $("#fight").toggleClass("hidden");
                        $("#level").toggleClass("hidden");
                        $(currentTarget).addClass("hidden");
                    }
                    else if (msg == "stage complete") {
                        $("#fight").toggleClass("hidden");
                        $("#endScreen").toggleClass("hidden");
                    }
                }, 1200);
                

                
            });
         }
    });

    if (obj.id == "attack") {
        console.log("attack");
        game.mu.atk();
        
        $("#mainchar").toggleClass("focusatk");
        //two hit animation
        setTimeout(function() {
            $("#mainchar").toggleClass("focusatk");
           }, 800);
        //one hit animation would be with 950 probably
        setTimeout(function(){
            game.mu.idle();
        }, 801);
    }
    else if (obj.id == "heal") {
        console.log("heal");
        game.mu.heal();
    }
    
}
function goBack(obj) {
    if (obj.id == "deathScreenreturn") {
        $("#deathScreen").toggleClass("hidden");
        $("#titleScreen").toggleClass("hidden");
    }
    if (obj.id == "shopReturn") {
        $("#shop").toggleClass("hidden");
        $("#map").toggleClass("hidden");
    }
}

//keyboard press
class Unit {
        constructor(options) {
            this.context = options.context;
            this.image = options.image; 
            this.x = options.x; 
            this.y = options.y;
            this.width = options.width; 
            this.height = options.height;
            
    		//for animation
            this.frames = options.frames; 
            this.frameIndex = options.frameIndex; 
            this.row = options.row; 
            this.ticksPerFrame = options.ticksPerFrame; 
            this.tickCount = options.tickCount;
        }
    
        update() {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.frames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        }
    
        render() {
            this.context.drawImage(
                this.image,
                this.frameIndex * this.width, // The x-axis coordinate of the top left corner
                this.row * this.height, // The y-axis coordinate of the top left corner
                this.width, // The width of the sub-rectangle
                this.height, // The height of the sub-rectangle
                this.x, // The x coordinate
                this.y,// The y coordinate
                this.width, // The width to draw the image
                this.height // The width to draw the image
            );
        }
    }
    class MainUnit extends Unit {
    
        static src = 'static/images/muspritesheet.png';
    
        constructor(x, y, context, image) {
            super({
                context: context,
                image: image,
                x: x,
                y: y,
                width: 66,
                height: 48,
                frameIndex: 0,
                row: 0,
                tickCount: 0,
                ticksPerFrame: 10,
                frames: 4
            });
        }
    
        atk() {
    		console.log("hewwo");
            this.frames = 4;
            this.frameIndex = 0;
            this.row = 1;
            this.ticksPerFrame = 8;
        }
    
    	idle() {
    		console.log("not hewwo");
    		this.frames = 4;
    		this.frameIndex = 0;
    		this.row = 0;
    		this.ticksPerFrame = 10;
    	}
    }
    class enemy extends Unit {
    
        static src = 'static/images/enemyspritesheetFlip.png';
    
        constructor(x, y, context, image) {
            super({
                context: context,
                image: image,
                x: x,
                y: y,
                width: 66,
                height: 48,
                frameIndex: 0,
                row: 0,
                tickCount: 0,
                ticksPerFrame: 10,
                frames: 4
            });
        }
    
        atk() {
    		
            this.frames = 4;
            this.frameIndex = 0;
            this.row = 1;
            this.ticksPerFrame = 8;
        }
    
    	idle() {
    		
    		this.frames = 4;
    		this.frameIndex = 0;
    		this.row = 0;
    		this.ticksPerFrame = 10;
    	}
    }

    var carlosmaxHP, targetmaxHP;
    fetch('/getHP').then(function(response){return response.json()}).then(function(text){
        carlosmaxHP = text.Carlos;
        targetmaxHP = text.target;});
    const game = {
                    isRunning: true,
                    
                    
                    init() {
                        
        				//background
                        game.enemycanv = document.getElementById('enemychar');
                        game.enemyctx = game.enemycanv.getContext('2d');
        
                        //dynamic sprites
                        game.maincanvas = document.getElementById('mainchar');
                        game.mainctx = game.maincanvas.getContext('2d');
                        
        				
                        game.loader = loader;
                        game.loader.init();
                        
        
                        if ($("#opponent").hasClass("focus")) {
                            if ($("#opponent").hasClass("flipH"))
                            {
                                console.log("already flipped genius");
                            }
                            else {
                            $("#opponent").toggleClass("flipH");
                            $("#target").toggleClass("flipH");
                            }
                        }
                        
                        
                        this.mu = new MainUnit(0, 0, game.mainctx, loader.images.mu);
                        this.enemee = new enemy(0,0, game.enemyctx, loader.images.enemee);
        
                        // Start game
                        game.drawingLoop();
                    },
        
                    drawingLoop() {
                        // Clear canvas
        				game.mainctx.clearRect(0, 0, 66,55);
        				game.enemyctx.clearRect(0,0,66,55);
                
                        // Draw and update frame index
                        game.mu.render();
                        game.mu.update();
                        
                        game.enemee.render();
                        game.enemee.update();

        
                        if (game.isRunning) {
                            requestAnimationFrame(game.drawingLoop);
        				}
                    },
                };
        
                const loader = {
                    count: 0,
                    images: {},
        
                    add(title, src) {
                        const image = new Image();
                        image.src = src;
                        this.images[title] = image;
                        this.count++;
                    },
        
                    init() {
                        loader.add('mu', MainUnit.src);
                        loader.add('enemee', enemy.src);
                    }
                };


//update map
function updateMap(s1, s2, s3, s4) {
    let r;
    if (s1 == true) {
        r= 1;
        $("#select1").addClass("levelSelect");
        $("#select2").addClass("unavailableSelect ");
        $("#select3").addClass("unavailableSelect ");
        $("#select4").addClass("unavailableSelect ");
      }
      else if (s2 == true) {
        console.log("works!")
        r= 2;
        $("#select1").removeClass("levelSelect");
        $("#select1").addClass("shopSelect");
        $("select2").removeClass("unavailableSelect ");
        $("#select2").addClass("levelSelect");
        $("#select3").addClass("unavailableSelect ");
        $("#select4").addClass("unavailableSelect ");
      }
      else if (s3 == true) {
        r= 3;
        $("#select1").addClass("shopSelect");
        $("select2").removeClass("levelSelect ");
        $("#select2").addClass("shopSelect");
        $("select3").removeClass("unavailableSelect ");
        $("#select3").addClass("levelSelect");
        $("#select4").addClass("unavailableSelect ");
      }
      else if (s4 == true) {
        r = 4;
        $("#select1").addClass("shopSelect");
        $("#select2").addClass("shopSelect");
        $("select3").removeClass("levelSelect ");
        $("#select3").addClass("shopSelect");
        $("select4").removeClass("unavailableSelect ");
        $("#select4").addClass("levelSelect");
      }
      return r;
}