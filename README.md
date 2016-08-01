threex.planets.js 
=================

It is a three.js extension to display planets
based on the data from  
* [planetpixelemporium](http://planetpixelemporium.com/planets.html) (Sun*, Earth DEM, Uranus)  
* [USGS](http://astrogeology.usgs.gov/solar-system) (Mercury DEM, Moon*, Mars)
* [NASA/JHUAPL/Carnegie Institution of Washington](http://messenger.jhuapl.edu/Explore/Images.html#global-mosaics) (Mercury Map*)
* [NASA/JHUAPL/SWRI](http://pluto.jhuapl.edu/Multimedia/Science-Photos/image.php?gallery_id=2&image_id=252) (Pluto*)
* [NASA/JPL/Space Science Institute](http://photojournal.jpl.nasa.gov/catalog/PIA11142) (Saturn Rings*)
* [NASA/JPL](http://voyager.jpl.nasa.gov/gallery/uranus.html) (Uranus Rings*)
* [NASA/JPL-Caltech](http://maps.jpl.nasa.gov/) (Stars)
* [NASA Visible Earth](http://visibleearth.nasa.gov/view_cat.php?categoryID=1484) (Earth, Earth Clouds*)
* [ESO](http://www.eso.org/public/usa/images/eso0127a/) (Solar Corona*)
* [Björn Jónsson](http://bjj.mmedia.is/data/planetary_maps.html) (Venus*, Saturn, Neptune)
* [GSFC](http://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=12021) (Jupiter)
\* Hand adapted by ofrohn, also Jupiter & Neptune ring maps

Here is some demos to show off

* [earth demo](http://jeromeetienne.github.io/threex.planets/examples/earth.html)
and check its 
[source](https://github.com/jeromeetienne/threex.planets/blob/master/examples/earth.html).
It display a nice earth with cloud and even the moon.
* [select demo](http://jeromeetienne.github.io/threex.planets/examples/select.html)
and check its 
[source](https://github.com/jeromeetienne/threex.planets/blob/master/examples/select.html).
Display all the planets available
* [atmospherematerial demo](http://jeromeetienne.github.io/threex.planets/examples/atmospherematerial.html)
and check its 
[source](https://github.com/jeromeetienne/threex.planets/blob/master/examples/atmospherematerial.html). a simple demo to show ```THREEx.createAtmosphereMaterial()```
* [basic demo](http://jeromeetienne.github.io/threex.planets/examples/basic.html)
and check its 
[source](https://github.com/jeromeetienne/threex.planets/blob/master/examples/basic.html).
Good for educational purpose

## How To install it

You can install it manually or with
[bower](http://bower.io/).
for the manual version, first include ```threex.planets.js``` with the usual

```html
<script src='threex.planets.js'></script>
```

or with
[bower](http://bower.io/) 
you type the following to install the package.

```bash
bower install -s threex.planets=https://github.com/jeromeetienne/threex.planets/archive/master.zip
```

then you add that in your html

```html
<script src="bower_components/threex.planets/threex.planets.js"></script>
```


## Usage

to create uranus with its ring

```javascript
var mesh	= THREEx.Planets.createUranus()
scene.add(mesh)
var mesh	= THREEx.Planets.createUranusRing()
scene.add(mesh)
```

to create the earth plus the clouds moving around

```javascript
var mesh	= THREEx.Planets.createEarth()
scene.add(mesh)
var mesh	= THREEx.Planets.createEarthCloud()
scene.add(mesh)
updateFcts.push(function(delta, now){
	mesh.rotation.y += 1/8 * delta;		
})
```

## API

Here is the list of all the functions.
They all return a ```THREE.Object3d```. 
You can tune it to fit your need

* ```THREEx.Planets.createSun()``` return the mesh of the Sun
* ```THREEx.Planets.createMercury()``` return the mesh of Mercury
* ```THREEx.Planets.createVenus()``` return the mesh of Venus
* ```THREEx.Planets.createMoon()``` return the mesh of the Moon
* ```THREEx.Planets.createEarth()``` return the mesh of the Earth
* ```THREEx.Planets.createEarthCloud()``` return the mesh of the Earth Cloud
* ```THREEx.Planets.createMars()``` return the mesh of Mars
* ```THREEx.Planets.createJupiter()``` return the mesh of Jupiter
* ```THREEx.Planets.createSaturn()``` return the mesh of Saturn
* ```THREEx.Planets.createSaturnRing()``` return the mesh of Saturn's ring
* ```THREEx.Planets.createUranus()``` return the mesh of Uranus
* ```THREEx.Planets.createUranusRing()``` return the mesh of Uranus's ring
* ```THREEx.Planets.createNeptune()``` return the mesh of Neptune
* ```THREEx.Planets.createPluto()``` return the mesh of Pluto
* ```THREEx.Planets.createStarfield()``` return the mesh of a starfield environmental sphere
	
	