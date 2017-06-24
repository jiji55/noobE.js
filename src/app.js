// have to start somewhere..
/*
* TODO
* - insert images
* - controls?
* - docs?
*/

class App {

	constructor( width, height ){
		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild( canvas );
		this.context = canvas.getContext( "2d" );
	}

	// ?
	add_images( image_source ){
		this.img = new Image();
		this.img.src = image_source;
	}

	draw_image( image, x, y ){
		//this.context.drawImage( image, x, y ) }; ?
	}

}