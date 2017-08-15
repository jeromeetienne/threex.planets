var THREEx = THREEx || {};

THREEx.Planets = {};

THREEx.Planets.baseURL = "../images/";
// Proportional scaling of planetary spheres
THREEx.Planets.scale = 1.0;

// maps from http://planetpixelemporium.com/ and others (see readme)

THREEx.Planets.params = {
  // texture map, bump map, cloud map, arbitrary radius, axis tilt in degrees, rotation period in days, 
  // rotation: axis pole long/lat in eclipic coordinate in degrees, angular velocity in degrees/day
  // ring: texture map, outer radius rel. to planet, opacity
  "sol": {map: "sunmap.jpg", radius: 1.2, tilt: 7.25, rot: 1.0438, rotation:[286.13, 63.87, 14.1844],
          corona: {map: "solarcorona.jpg", radius:5.1} },
  "mer": {map: "mercurymap.jpg", bump:"mercurybump.jpg", radius: 0.3, tilt: 0, rot: 58.646, rotation:[318.2274, 82.9623, 6.1385]},
  "ven": {map: "venusmap.jpg", radius: 0.4, tilt: 177.3, rot: -4.05, rotation:[30.1871, 88.761, -1.481]},
  "ter": {map: "earthmap.jpg", bump:"earthbump.jpg", clouds:"earthclouds.png", radius: 0.4, tilt: 23.45, rot: 0.9973, rotation:[90, 66.5607, 360.9856]},
    "lun": {map: "moonmap.jpg", bump:"moonbump.jpg", radius: 0.25, tilt: 1.54, rot: 27.3217, rotation:[264.6051, 89.9784, 13.1763]},
  "mar": {map: "marsmap.jpg", bump:"marsbump.jpg", clouds:"marsclouds.png", radius: 0.35, tilt: 25.19, rot: 1.026, rotation:[352.9076, 63.2821, 350.8919] },
    "phob": {map: "phobosmap.jpg", bump: "phobosbump.jpg", radius: 0.05, tilt: 0.009, rot: 0.3189, rotation:[352.9259, 63.2928, 1128.8445]},
    "deim": {map: "deimosmap.jpg", radius: 0.04, tilt: 0.889, rot: 1.2624, rotation:[352.801, 64.1656, 285.1618]},
  "vest": {map: "vestamap.jpg", bump: "vestabump.jpg", radius: 0.1, tilt: 29.0, rot: 0.223, rotation:[330.8257, 57.7239, 1617.3329]},
  "cer": {map: "ceresmap.jpg", radius: 0.16, tilt: 4.0, rot: 0.378, rotation:[331.5058, 77.8769, 952.1532]},
  "jup": {map: "jupitermap.jpg", radius: 1.2, tilt: 3.12, rot: 0.414, rotation:[247.8167, 87.7835, 870.5360],
          ring: {map: "jupiterrings.png", radius: 2.7, opacity: 0.5} },
    "io": {map: "iomap.jpg", radius: 0.25, tilt: 0.0, rot: 1.7691, rotation:[247.7063, 87.7869, 203.4889]},
    "euro": {map: "europamap.jpg", radius: 0.25, tilt: 0.016, rot: 3.5512, rotation:[247.93, 87.8008, 101.3747]},
    "gany": {map: "ganymedemap.jpg", radius: 0.3, tilt: 0.068, rot: 7.1546, rotation:[248.6707, 87.8748, 50.3176]},
    "call": {map: "callistomap.jpg", radius: 0.3, tilt: 0.356, rot: 16.689, rotation:[252.4849, 88.191, 21.5710]},
  "sat": {map: "saturnmap.jpg", radius: 1.2, tilt: 26.73, rot: 0.444, rotation:[79.5275, 61.9478, 810.7939], 
          ring: {map: "saturnrings.png", radius: 2.6, opacity: 1.0} },
    "mima": {map: "mimasmap.jpg", radius: 0.1, tilt: 0.002, rot: 0.942, rotation:[79.5174, 61.9296, 381.9945]},
    "ence": {map: "enceladusmap.jpg", radius: 0.1, tilt: 0.002, rot: 1.37, rotation:[79.5174, 61.9296, 262.7318]},
    "teth": {map: "tethysmap.jpg", radius: 0.15, tilt: 0.001, rot: 1.888, rotation:[79.5174, 61.9296, 190.6979]},
    "dion": {map: "dionemap.jpg", radius: 0.15, tilt: 0.005, rot: 2.737, rotation:[79.5174, 61.9296, 131.5349]},
    "rhea": {map: "rheamap.jpg", radius: 0.2, tilt: 0.036, rot: 4.518, rotation:[79.507, 61.9729, 79.690]},
    "tita": {map: "titanclouds.jpg", radius: 0.35, tilt: 0.629, rot: 15.95, rotation:[79.1738, 61.946, 22.577]},
    "hype": {map: "hyperionmap.jpg", radius: 0.08, tilt: 0.564, rot: 21.28, rotation:[79.3687, 61.9625, 16.917]},
    "iape": {map: "iapetusmap.jpg", radius: 0.15, tilt: 15.21, rot: 79.33, rotation:[49.608, 72.7238, 4.5379]},
    "phoe": {map: "phoebemap.jpg", radius: 0.08, tilt: 26.723, rot: 0.4, rotation:[60.8478, 64.3305, 931.639]},
  "ura": {map: "uranusmap.jpg", radius: 1.0, tilt: 97.86, rot: 0.718, rotation:[77.6467, -7.7218, 501.1601], 
          ring: {map: "uranusrings.png", radius: 2.0, opacity: 0.5} },
    "arie": {map: "arielmap.jpg", radius: 0.15, tilt: 0.0, rot: -2.520, rotation:[77.7555, -7.8066, -142.8357]},
    "umbr": {map: "umbrielmap.jpg", radius: 0.15, tilt: 0.0, rot: -4.144, rotation:[77.7555, -7.8066, -86.8689]},
    "titan": {map: "titaniamap.jpg", radius: 0.2, tilt: 0.0, rot: -8.706, rotation:[77.7555, -7.8066, -41.3514]},
    "ober": {map: "oberonmap.jpg", radius: 0.2, tilt: 0.0, rot: -13.46, rotation:[77.7555, -7.8066, -26.7394]},
    "mira": {map: "mirandamap.jpg", radius: 0.1, tilt: 0.0, rot: -1.413, rotation:[77.7538, -7.8265, -254.6906]},
  "nep": {map: "neptunemap.jpg", radius: 1.0, tilt: 29.56, rot: 0.671,  rotation:[319.2351, 61.9736, 536.3128],
          ring: {map: "neptunerings.png", radius: 2.5, opacity: 0.8} },
    "trit": {map: "tritonmap.jpg", radius: 0.2, tilt: 0.01, rot: -5.877, rotation:[317.3413, 59.8764, -61.2573]},
    "prot": {map: "proteusmap.jpg", radius: 0.1, tilt: 0.974, rot: 1.122, rotation:[318.631, 61.4993, 320.7654]},
  "plu": {map: "plutomap.jpg", radius: 0.2, tilt: 122.53, rot: 6.387, rotation:[133.6817, -10.9977, 56.3625]},
    "cha": {map: "charonmap.jpg", radius: 0.1, tilt: 0.0, rot: 6.387, rotation:[133.6817, -10.9977, 56.3625]}
};


// Friendly names 
var substitutes = {
  "Sun": "sol",
  "Mercury": "mer",
  "Venus": "ven",
  "Earth": "ter",
  "Moon": "lun",
  "Mars": "mar",
  "Phobos": "phob",
  "Deimos": "deim",
  "Vesta": "vest",
  "Ceres": "cer",
  "Jupiter": "jup",
  "Io": "io",
  "Europa": "euro",
  "Ganymede": "gany",
  "Callisto": "call",
  "Saturn": "sat",
  "Mimas": "mima",
  "Enceladus": "ence",
  "Tethys": "teth",
  "Dione": "dion",
  "Rhea": "rhea",
  "Titan": "tita",
  "Iapetus": "iape",
  "Phoebe": "phoe",
  "Uranus": "ura",
  "Ariel": "arie",
  "Umbriel": "umbr",
  "Titania": "titan",
  "Oberon": "ober",
  "Miranda": "mira",  
  "Neptune": "nep",
  "Triton": "trit",
  "Pluto": "plu",
  "Charon": "cha",
};

THREEx.Planets.createSun = function() { return THREEx.Planets.create("sol"); };
THREEx.Planets.createMercury = function() { return THREEx.Planets.create("mer"); };
THREEx.Planets.createVenus = function() { return THREEx.Planets.create("ven"); };
THREEx.Planets.createEarth = function() { return THREEx.Planets.create("ter", true); };
THREEx.Planets.createMoon = function() { return THREEx.Planets.create("lun"); };
THREEx.Planets.createMars = function() { return THREEx.Planets.create("mar"); };
THREEx.Planets.createJupiter = function() { return THREEx.Planets.create("jup"); };
THREEx.Planets.createJupiterRing = function() { return THREEx.Planets.createRing("jup"); };
THREEx.Planets.createSaturn = function() { return THREEx.Planets.create("sat", true); };
THREEx.Planets.createSaturnRing = function() { return THREEx.Planets.createRing("sat"); };
THREEx.Planets.createUranus = function() { return THREEx.Planets.create("ura", true); };
THREEx.Planets.createUranusRing = function() { return THREEx.Planets.createRing("ura"); };
THREEx.Planets.createNeptune = function() { return THREEx.Planets.create("nepe"); };
THREEx.Planets.createNeptuneRing = function() { return THREEx.Planets.createRing("nep"); };
THREEx.Planets.createPluto = function() { return THREEx.Planets.create("plu"); };

THREEx.Planets.createStarfield = function() {
  var loader = new THREE.TextureLoader();
  var texture = loader.load(THREEx.Planets.baseURL + "tycho-skymap.jpg");
  var material = new THREE.MeshBasicMaterial({
    map  : texture,
    side  : THREE.BackSide
  })
  var geometry = new THREE.SphereGeometry(100000, 32, 32)
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
  
  var geometry = new THREE.SphereGeometry(p.radius * THREEx.Planets.scale, 32, 32);
  
  arg.map = loader.load(THREEx.Planets.baseURL + p.map);

  if (p.hasOwnProperty("bump")) {
    arg.bumpMap = loader.load(THREEx.Planets.baseURL + p.bump);  
    arg.bumpScale = 0.001;
  }  
  if (p.hasOwnProperty("spec")) {
    arg.specularMap = loader.load(THREEx.Planets.baseURL + p.spec);  
  }
  
  if (body === "sol") { //ommmmmmm
    var material = new THREE.MeshBasicMaterial(arg);
  } else {
    var material = new THREE.MeshPhongMaterial(arg);
    arg.specular = new THREE.Color( 0x333333 );
    arg.shininess = 0.1;
  }
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
  mesh.rotateY(THREE.Math.degToRad(p.rotation[0]-180));    
  mesh.rotateZ(THREE.Math.degToRad(90-p.rotation[1]));  
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
  
  var geometry = new THREEx.Planets.RingGeometry(p.radius * THREEx.Planets.scale * 1.05, p.ring.radius * THREEx.Planets.scale, 64, 64);
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
    new THREE.SphereGeometry(p.radius * THREEx.Planets.scale * 1.01, 32, 32),
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
	mesh.scale.multiplyScalar(p.corona.radius * THREEx.Planets.scale);
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
