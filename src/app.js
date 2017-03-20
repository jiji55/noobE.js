// have to start somewhere..

class App {

	constructor(width, height){
		
		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild( canvas );
		this.context = canvas.getContext( "2d" );

	}
}