// have to start somewhere to learn..
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

// namespace
var noobe = {};

noobe.Container = function(){
	this.contents = {};

	// is different methods for arrays and single images even needed?
	this.add = function( imgObject ){	
		console.log( imgObject );
		for ( var key in imgObject ) {
			this.contents.push( imgArray[i] );
		} 
	}
}

noobe.App = function( width, height ){
	this.loadedImages = {};
	this.canvas = document.createElement( 'canvas' );
	this.canvas.width = width;
	this.canvas.height = height;
	document.body.appendChild( this.canvas );
	this.context = this.canvas.getContext( "2d" );
	}

	this.render = function( Container ){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height );

		for ( var i = 0; i < Container.contents.length; i++ ) {
			// this.drawImage( Container.contents[i], Container.contents[i].x, Container.contents[i].x, )
			this.context.drawImage( Container.contents[i], i*50, i*50 )
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
	this.load_images = function( images, startLoop ){
		var count = Object.keys(images).length;
		var whenCompleted = function ( images, i ){
			count--;
			console.log(count);
			if ( count == 0 ){
				startLoop();
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

		this.loadedImages.key = new Image();
		this.loadedImages.key.addEventListener( "load", whenLoaded );
		this.loadedImages.key.src = images[key];
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
