// have to start somewhere..
/*
* TODO
* - insert images
* - controls?
*/

class App {

	constructor( width, height ){
		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild( this.canvas );
		this.context = this.canvas.getContext( "2d" );
	}

	load_images( images ){
		//convert single img to array
		if ( images.length === "undefined" ){
			images = [images];
		}

		var count = images.length;

		var whenCompleted = function ( images, i ){
			count--;
			console.log(count);
			if ( count == 0 ){
				console.log("All done");
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

		var img = new Image();
		img.addEventListener( "load", whenLoaded );
		img.src = images[i];
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
}