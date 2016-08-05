var THREEx = THREEx || {};

THREEx.Planets = {};

THREEx.Planets.baseURL = "../images/";

// maps from http://planetpixelemporium.com/ and others (see readme)

THREEx.Planets.params = {
  // texture map, bump map, cloud map, arbitrary radius, axis tilt in degrees, rotation period in days
  // ring: texture map, outer radius rel. to planet, opacity
  "sol": {map: "sunmap.jpg", radius: 1.2, tilt: 7.25, rot: 1.0438,
          corona: {map: "solarcorona.jpg", radius:5.1} },
  "mer": {map: "mercurymap.jpg", bump:"mercurybump.jpg", radius: 0.3, tilt: 0, rot: 58.646},
  "ven": {map: "venusmap.jpg", radius: 0.4, tilt: 177.3, rot: 4.05},
  "ter": {map: "earthmap.jpg", bump:"earthbump.jpg", clouds:"earthclouds.png", radius: 0.4, tilt: 23.45, rot: 0.9973},
  "lun": {map: "moonmap.jpg", bump:"moonbump.jpg", radius: 0.25, tilt: 1.54, rot: 27.3217},
  "mar": {map: "marsmap.jpg", bump:"marsbump.jpg", clouds:"marsclouds.png", radius: 0.35, tilt: 25.19, rot: 1.026},
  "ves": {map: "vestamap.jpg", bump: "vestabump.jpg", radius: 0.1, tilt: 29.0, rot: 0.223},
  "cer": {map: "ceresmap.jpg", radius: 0.16, tilt: 4.0, rot: 0.378},
  "jup": {map: "jupitermap.jpg", radius: 1.2, tilt: 3.12, rot: 0.414,
          ring: {map: "jupiterrings.png", radius: 2.7, opacity: 0.5} },
  "sat": {map: "saturnmap.jpg", radius: 1.2, tilt: 26.73, rot: 0.444, 
          ring: {map: "saturnrings.png", radius: 2.6, opacity: 1.0} },
  "ura": {map: "uranusmap.jpg", radius: 1.0, tilt: 97.86, rot: 0.718, 
          ring: {map: "uranusrings.png", radius: 2.0, opacity: 0.5} },
  "nep": {map: "neptunemap.jpg", radius: 1.0, tilt: 29.56, rot: 0.671, 
          ring: {map: "neptunerings.png", radius: 2.5, opacity: 0.8} },
  "plu": {map: "plutomap.jpg", radius: 0.2, tilt: 122.53, rot: 6.387}  
};


// Friendly names 
var substitutes = {
  "Sun": "sol",
  "Mercury": "mer",
  "Venus": "ven",
  "Earth": "ter",
  "Moon": "lun",
  "Mars": "mar",
  "Vesta": "ves",
  "Ceres": "cer",
  "Jupiter": "jup",
  "Saturn": "sat",
  "Uranus": "ura",
  "Neptune": "nep",
  "Pluto": "plu",
};

THREEx.Planets.createSun = function() { return THREEx.Planets.create("sun"); };
THREEx.Planets.createMercury = function() { return THREEx.Planets.create("mercury"); };
THREEx.Planets.createVenus = function() { return THREEx.Planets.create("venus"); };
THREEx.Planets.createEarth = function() { return THREEx.Planets.create("earth", true); };
THREEx.Planets.createMoon = function() { return THREEx.Planets.create("moon"); };
THREEx.Planets.createMars = function() { return THREEx.Planets.create("mars"); };
THREEx.Planets.createJupiter = function() { return THREEx.Planets.create("jupiter"); };
THREEx.Planets.createJupiterRing = function() { return THREEx.Planets.createRing("jupiter"); };
THREEx.Planets.createSaturn = function() { return THREEx.Planets.create("saturn", true); };
THREEx.Planets.createSaturnRing = function() { return THREEx.Planets.createRing("saturn"); };
THREEx.Planets.createUranus = function() { return THREEx.Planets.create("uranus", true); };
THREEx.Planets.createUranusRing = function() { return THREEx.Planets.createRing("uranus"); };
THREEx.Planets.createNeptune = function() { return THREEx.Planets.create("neptune"); };
THREEx.Planets.createNeptuneRing = function() { return THREEx.Planets.createRing("neptune"); };
THREEx.Planets.createPluto = function() { return THREEx.Planets.create("pluto"); };

THREEx.Planets.createStarfield = function() {
  var loader = new THREE.TextureLoader();
  var texture = loader.load(THREEx.Planets.baseURL + "tycho-skymap.jpg");
  var material = new THREE.MeshBasicMaterial({
    map  : texture,
    side  : THREE.BackSide
  })
  var geometry = new THREE.SphereGeometry(100, 32, 32)
  var mesh = new THREE.Mesh(geometry, material)
  return mesh  
}
    
// Create body, skipextras true -> don't create cloud, ring etc.
THREEx.Planets.create = function(body, skipextras) {
  if (!THREEx.Planets.params.hasOwnProperty(body)) {
    if (substitutes.hasOwnProperty(body)) body = substitutes[body];
    else {
      console.log("Object not found: " + body);
      return null;
    }
  }
  var p = THREEx.Planets.params[body], arg = {};
  var loader = new THREE.TextureLoader();
  
  var geometry = new THREE.SphereGeometry(p.radius, 32, 32);
  
  arg.map = loader.load(THREEx.Planets.baseURL + p.map);

  if (p.hasOwnProperty("bump")) {
    arg.bumpMap = loader.load(THREEx.Planets.baseURL + p.bump);  
    arg.bumpScale = 0.02;
  }  
  if (p.hasOwnProperty("spec")) {
    arg.specularMap = loader.load(THREEx.Planets.baseURL + p.spec);  
    arg.specular = new THREE.Color("#333");
  }
  
  var material = new THREE.MeshPhongMaterial(arg);
  var mesh = new THREE.Mesh(geometry, material);
  
  if (!skipextras && p.hasOwnProperty("ring")) {
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    var ring = THREEx.Planets.createRings(body);
    ring.receiveShadow = true;
    ring.castShadow = true;
    mesh.add(ring);
  };

  if (!skipextras && p.hasOwnProperty("clouds")) {
    mesh.add(THREEx.Planets.createClouds(body));
  }  

  if (!skipextras && body === "sol") {
    mesh.add(THREEx.Planets.createCorona());
  }  

  mesh.rotation.set(THREE.Math.degToRad(25), 0, THREE.Math.degToRad(p.tilt));  
  return mesh;
}
  
  
// Planetary rings 
THREEx.Planets.createRings = function(body) {
  if (!THREEx.Planets.params.hasOwnProperty(body)) {
    if (substitutes.hasOwnProperty(body)) body = substitutes[body];
    else {
      console.log("Object not found: " + body);
      return null;
    }
  }
  if (!THREEx.Planets.params[body].hasOwnProperty("ring")) {
    console.log("Rings not found: " + body);
    return null;
  }
  var p = THREEx.Planets.params[body], map = THREEx.Planets.baseURL + p.ring.map,
      loader = new THREE.TextureLoader();
  
  var geometry = new THREEx.Planets.RingGeometry(p.radius * 1.05, p.ring.radius, 64, 64);
  var material = new THREE.MeshPhongMaterial({
    map: loader.load(map),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: p.ring.opacity
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.lookAt(new THREE.Vector3(0, 1, 0));
  mesh.name = body + "rings";
  return mesh;
}

// Cloud layer from transparent png, see http://blog.thematicmapping.org/2013/09/creating-webgl-earth-with-threejs.html
THREEx.Planets.createClouds = function(body) {
  if (!THREEx.Planets.params.hasOwnProperty(body)) {
    if (substitutes.hasOwnProperty(body)) body = substitutes[body];
    else {
      console.log("Object not found: " + body);
      return null;
    }
  }
  if (!THREEx.Planets.params[body].hasOwnProperty("clouds")) {
    console.log("Clouds not found: " + body);
    return null;
  }
  var p = THREEx.Planets.params[body], map = THREEx.Planets.baseURL + p.clouds,
      loader = new THREE.TextureLoader();

  var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(p.radius * 1.01, 32, 32),
    new THREE.MeshPhongMaterial({
      map: loader.load(map),
      transparent: true
    })
  );
  mesh.name = body + "clouds";  
  return mesh;
}

// Solar corona, based on Lee Stemkoski's https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Simple-Glow.html
THREEx.Planets.createCorona = function() {
  var p = THREEx.Planets.params.sol, map = THREEx.Planets.baseURL + p.corona.map;

  var material = new THREE.SpriteMaterial({ 
    map: new THREE.TextureLoader().load(map), 
    color: 0xffff33, 
    transparent: false, 
    blending: THREE.AdditiveBlending
	});
	var mesh = new THREE.Sprite(material);
	mesh.scale.multiplyScalar(p.corona.radius);
	mesh.name = "solcorona";
  return mesh;
};



/**
 * change the original from three.js because i needed different UV
 * 
 * @author Kaleb Murphy
 * @author Olaf Frohn
 */
THREEx.Planets.RingGeometry = function (innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {

	THREE.Geometry.call( this );

	this.type = 'RingGeometry';

	this.parameters = {
		innerRadius: innerRadius,
		outerRadius: outerRadius,
		thetaSegments: thetaSegments,
		phiSegments: phiSegments,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	innerRadius = innerRadius || 0;
	outerRadius = outerRadius || 50;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 8;
	phiSegments = phiSegments !== undefined ? Math.max( 1, phiSegments ) : 8;

	var i, o, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments );

	for ( i = 0; i < phiSegments + 1; i ++ ) {

		// concentric circles inside ring

		for ( o = 0; o < thetaSegments + 1; o ++ ) {

			// number of segments per circle

			var vertex = new THREE.Vector3();
			var segment = thetaStart + o / thetaSegments * thetaLength;
			vertex.x = radius * Math.cos( segment );
			vertex.y = radius * Math.sin( segment );

			this.vertices.push( vertex );
			//uvs.push( new THREE.Vector2( ( vertex.x / outerRadius + 1 ) / 2, ( vertex.y / outerRadius + 1 ) / 2 ) );
      uvs.push( new THREE.Vector2( i/(thetaSegments-1), o/ (phiSegments-1) ) );
		}

		radius += radiusStep;

	}

	var n = new THREE.Vector3( 0, 0, 1 );

	for ( i = 0; i < phiSegments; i ++ ) {

		// concentric circles inside ring

		var thetaSegment = i * ( thetaSegments + 1 );

		for ( o = 0; o < thetaSegments ; o ++ ) {

			// number of segments per circle

			var segment = o + thetaSegment;

			var v1 = segment;
			var v2 = segment + thetaSegments + 1;
			var v3 = segment + thetaSegments + 2;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ] );

			v1 = segment;
			v2 = segment + thetaSegments + 2;
			v3 = segment + 1;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ] );

		}

	}

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREEx.Planets.RingGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREEx.Planets.RingGeometry.prototype.constructor = THREEx.Planets.RingGeometry;
