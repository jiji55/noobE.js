// have to start somewhere..
/*
* TODO
* - insert images
* - controls?
* Example usage for now:
var images = ["game/assets/test.jpg",
				"game/assets/test2.jpg"];

newApp.load_images( images, startLoop );

function startLoop() {
	newApp.draw_image( newApp.loadedImages[0], 0, 0 ); // draws test.jpg
}
*/

class App {

	constructor( width, height ){
		this.loadedImages = [];
		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild( this.canvas );
		this.context = this.canvas.getContext( "2d" );
	}

	container(){

	}

	// the loop needs to start after assets have been loaded, which is why we pass it in the load method
	load_images( images, startLoop ){
		//convert single img to array
		if ( images.length === "undefined" ){
			console.log("The method probably doesn't support single images yet")
			images = [images];
		}
		var count = images.length;
		var whenCompleted = function ( images, i ){
			count--;
			console.log(count);
			if ( count == 0 ){
				startLoop();
			}
		}

		for ( var i = 0; i < images.length; i++ ){
			this.loadImg( images, i, whenCompleted )
		}
	}

	loadImg( images, i, whenCompleted ) {

		// (e) is the event object that gets passed down
		var whenLoaded = function(e){
			e.target.removeEventListener( "load", whenLoaded );
			whenCompleted( images, i )
		}	

		this.loadedImages[i] = new Image();
		this.loadedImages[i].addEventListener( "load", whenLoaded );
		this.loadedImages[i].src = images[i];
	}

	draw_image( image, x, y ){
		this.context.drawImage( image, x, y );
	}

	getMousePos( canvas, event ){
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	clickInsideBox( rect, mousePos ){
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
	registerInput( key_code ){
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