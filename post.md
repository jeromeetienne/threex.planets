how to make the earth in webgl ?
================================

So today we gonna learn how to display the earth in webgl.

First let me show you the demo we gonna do

### Let's start with the stars

We will see how to render the galaxy starfield.
The star field as you see it in the demo is a "environment 
sphere". aka it is a large sphere, we are in the center and we see 
what is inside.

```javascript
// create the geometry sphere
var geometry	= new THREE.SphereGeometry(90, 32, 32)
// create the material, using a texture of startfield
// - NOTE the ```THREE.BackSide``` to show the interior of the sphere
var material	= new THREE.MeshBasicMaterial({
	map	: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
	side	: THREE.BackSide
})
// create the mesh based on geometry and material
var mesh	= new THREE.Mesh(geometry, material)
```

### to render cloud

we build ```canvasCloud``` and use it as texture. 
It is based on 2 jpg images:
one for the color
and the other for the transparency.
It is because [jpg](http://en.wikipedia.org/wiki/JPEG) doesn't handle an alpha channel.
So you need to make the code to build the texture based on those images.

```javascript
var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
var material	= new THREE.MeshPhongMaterial({
	map		: new THREE.Texture(canvasCloud),
	side		: THREE.DoubleSide,
	transparent	: true,
	opacity		: 0.8,
})
var mesh	= new THREE.Mesh(geometry, material)
```

Notice the parameters of the material.
We set ```transparent``` to warn three.js.
we set ```side``` to ```DoubleSide``` thus both sides will be visible. 
this avoid artefacts on the edge of the earth.
and finnaly we set ```opacity``` to make them more translucide.

now that we got the cloud mesh, we need to animate it thus they looks more realistic.
For example at every frame you do this

```javascript
updateFcts.push(function(delta, now){
	mesh.rotation.y += 1/8 * delta;		
})
```


### to render the earth itself

* TODO show only map, then add bumpMap, then add specular

```
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= new THREE.MeshPhongMaterial({
	map		: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),

	bumpMap		: THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
	bumpScale	: 0.05,

	specularMap	: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
	specular	: new THREE.Color('grey'),
})
var mesh	= new THREE.Mesh(geometry, material)
```

### Conclusion

After that, we add a atmosphere shader to reproduce the halo created by the atmosphere,
a moon and some shadow casting. and you got the following.




