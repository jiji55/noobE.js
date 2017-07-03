/* have to start somewhere to learn..

* TODO:
* animations
* default controls?
* organize the code better in modules / start using build tools etc
-> Sprite obj, Container?, graphics -> render method?, 
    image loader obj, input obj, misc (to be figured out later stuff)
*/

/*
Ideas for how to do animations:
-Sprite animation method?, which includes the name of the spritesheet & frame data

*/
// namespace
var noobe = {};

/*
usage:
	var testSprite = new noobe.Sprite( "128", "128_sprite", 0, 0, 0, 0, 64, 64 );
	var testSprite2 = new noobe.Sprite( "128", "128_sprite2", 64, 0, 64, 64, 64, 64 );

	_c.to_be_rendered["testSprite"] = testSprite;
	_c.to_be_rendered["testSprite2"] = testSprite2;
*/
noobe.Sprite = function(
	spritesheet_name, 
	clipx = 0, 
	clipy = 0, 
	x = 0, 
	y = 0, 
	width = 64, 
	height = 64 
	){

	this.spritesheet_name = spritesheet_name;
	this.clipx = clipx;
	this.clipy = clipy;
	this.clipWidth = width;
	this.clipHeight = height;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

noobe.Container = function(){
	// there is smarter way to do this, but I'm going with this for now to progress
	this.to_be_rendered = {};

	// is this useless ? Probably yes. I'll keep this here for now
	/*
	this.add = function( imgObject ){
		var key = imgObject.name;
		this.contents[key] = {};
		this.contents[key].name = key;
		this.contents[key]["img"] = imgObject["img"]; 

		These might not be needed? I'll keep them here for now

		// where to start image clipping
		this.contents[key].clipx = 0;
		this.contents[key].clipy = 0;
		// how much to clip (default none ofc)
		this.contents[key].clipWidth = imgObject["img"].width;
		this.contents[key].clipHeight = imgObject["img"].height;
		// where to draw on canvas
		this.contents[key].x = 0;
		this.contents[key].y = 0;
		// img width / height
		this.contents[key].width = imgObject["img"].width;
		this.contents[key].height = imgObject["img"].height;
	}
	*/
}

noobe.App = function( width, height ){
	this.loadedImages = {};
	this.canvas = document.createElement( 'canvas' );
	this.canvas.width = width;
	this.canvas.height = height;
	document.body.appendChild( this.canvas );
	this.context = this.canvas.getContext( "2d" );

	this.render = function( sprites ){
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		for ( var key in sprites ) {
			this.context.drawImage( 

			this.loadedImages[sprites[key].spritesheet_name]["img"], 					
			sprites[key].clipx,
			sprites[key].clipy,
			sprites[key].clipWidth,
			sprites[key].clipHeight,
			sprites[key].x, 
			sprites[key].y,
			sprites[key].width,
			sprites[key].height
			 )
		}
	}

	// the loop needs to start after assets have been loaded, which is why we pass it in the load method
	// only objects allowed eg.
	/*
	var images = {
			"test" : "game/assets/test.jpg",
			"test2" : "game/assets/test2.jpg"
			 };
	*/
	this.load_images = function( images, setup ){
		var count = Object.keys(images).length;
		var whenCompleted = function ( images, i ){
			count--;
			if ( count == 0 ){
				// start setting things up only after images are loaded
				setup();
			}
		}

		for ( var key in images ){
			this.loadImg( images, key, Object.keys(images).length, whenCompleted )
		}
	}

	this.loadImg = function( object, key, objectLength, whenCompleted ) {

		// (e) is the event object that gets passed down
		var whenLoaded = function(e){
			e.target.removeEventListener( "load", whenLoaded );
			whenCompleted( images, objectLength )
		}

		this.loadedImages[key] = {};
		this.loadedImages[key]["name"] = key;
		this.loadedImages[key]["img"] = new Image();
		this.loadedImages[key]["img"].addEventListener( "load", whenLoaded );
		this.loadedImages[key]["img"].src = images[key];
	}

	this.getMousePos = function( canvas, event ){
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	/*
	eg.
	_a.canvas.addEventListener( 'click', function(event){
		var mousePos = _a.getMousePos( _a.canvas, event );
		if (_a.clickInsideBox( rect, mousePos )){
			console.log("inside box");
		}
	});
	*/
	this.clickInsideBox = function( rect, mousePos ){
		if ( rect.x < mousePos.x && 
			 rect.x + rect.width > mousePos.x  && 
			 rect.y < mousePos.y &&
			 rect.y + rect.height > mousePos.y ){
			return true;
		}
		else {
			return false;
		}
	}


	/*
		usage:
		left = _a.registerInput( 65 );
		left.pressed / .released = function(){ ... };
	*/
	this.registerInput = function( key_code ){
		var input = {};
		input.keyCode = key_code;
		input.isUp = true;
		input.isDown = false;

		// these are meant to be overridden
		input.pressed = undefined;
		input.released = undefined;

		input.handleDown = function( event ) {
			if ( event.keyCode === input.keyCode ) {
				if ( input.isUp && input.pressed ) input.pressed();
				input.isDown = true;
				input.isUp = false;
			}
		}

		input.handleUp = function( event ) {
			if ( event.keyCode === input.keyCode ) {
				if ( input.isDown  && input.released ) input.released();
				input.isUp = true;
				input.isDown = false;
			}
		}

		// These need to be below above things (declarations?)
		window.addEventListener( "keydown", input.handleDown.bind( input ) );
		window.addEventListener( "keyup", input.handleUp.bind( input ) );

		// Need to return the input so that we can override undefined methods ie. .pressed / .released
		return input;
		}
	}
