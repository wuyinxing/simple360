window.onload = function() {
	document.getElementById('go').addEventListener('click', loadPredefinedPanorama, false);
	document.getElementById('pano').addEventListener('change', upload, false);
	document.addEventListener('keydown', handleKeyup, false);
};

var PSV;

function handleKeyup(e) { 
	var code = (e.keyCode ? e.keyCode : e.which);
	console.log(code);
	if (code >= 49 && code<=57)
		PSV.changeSphere(code -49);
	if (code == 13) {
        PSV.addMarker(document.getElementById('linkName').value);
		e.preventDefault();
	}	
}
// Load the predefined panorama
function loadPredefinedPanorama(evt) {
	evt.preventDefault();

	// Loader
	var loader = document.createElement('div');
	loader.className = 'loader';

	// Panorama display
	var div = document.getElementById('container');
	div.style.height = '30px';

	var PSV = new PhotoSphereViewer({
		// Path to the panorama
		panorama: 'examples/sun.jpg',

		// Container
		container: div,

		// Deactivate the animation
		time_anim: false,

		// Display the navigation bar
		navbar: true,

		// Resize the panorama
		size: {
			width: '100%',
			height: '500px'
		},

		// HTML loader
		loading_html: loader
	});
}

// Load a panorama stored on the user's computer
function upload() {
	// Retrieve the chosen file and create the FileReader object
	
	var file = document.getElementById('pano').files[0];
	var reader = new FileReader();

	reader.onload = function() {
		
		if(!PSV){
			PSV = new PhotoSphereViewer({
				// Panorama, given in base 64
				panorama: reader.result,

				// Container
				container: 'your-pano',

				// Deactivate the animation
				time_anim: false,

				// Display the navigation bar
				navbar: true,

				// Resize the panorama
				size: {
					width: '100%',
					height: '500px'
				},

				// No XMP data
				usexmpdata: false
			});
		}
		else{
			console.log("extra Sphere")
			PSV.newSphere(reader.result);
		}
	};

	reader.readAsDataURL(file);
	document.getElementById('pano').files = [];
}
