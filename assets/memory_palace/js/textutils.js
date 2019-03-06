AFRAME.registerComponent('autoscroller', {
    schema: {
        finalPosition: {type: 'vec3'},
        timeInterval: {type: 'int', default: 5000}
    },

    play: function() {
        this.finalPosition = this.data.finalPosition;
        this.timeInterval = this.data.timeInterval;
        var lerp = this.el;

        var speed = 0.005;
        var updateRate = 100;
        var timeToStop = 36000;
        var toMove = true;

        var moveInDirection = function() {
            if(toMove) {
                var lerpPosition = lerp.getAttribute('position');
                var y = lerpPosition.y;
                var newY = y + speed;
                var newLerpPos = {
                    x: lerpPosition.x,
                    y: newY,
                    z: lerpPosition.z
                };
                lerp.setAttribute('position', newLerpPos);
            }
        };

        var stopMovement = function() {
            toMove = false;
            //setTimeout(function() { toMove = true; lerp.setAttribute('position', this.finalPosition); }, this.timeInterval);
        };

        setTimeout(function() { setInterval(moveInDirection, 1000 / updateRate); }, this.timeInterval);
        setInterval(stopMovement, timeToStop);
    }
});

var findSign = function (input) {
    if(input < 0) return -1;
    else return 1;
}

AFRAME.registerComponent('3dtexteffect', {
    schema: {
        initialOffset: {type:'vec3', default: {x: 0.15, y: 1.5, z: 0.15}},
        secondaryColor: {type:'color', default: '#000'},
        multiplier: {type: 'float', default: 0.01}
    },

    init: function() {
            // get three.js object from aframe entity
            var textPosition = new THREE.Vector3();
            //textPosition.setFromMatrixPosition(this.el.object3D.matrixWorld);
            this.el.object3D.getWorldPosition(textPosition);
            var calculatedPosition = {x: this.data.initialOffset.x * this.data.multiplier * findSign(textPosition.x),
                y: this.data.initialOffset.y * this.data.multiplier,
                z: this.data.initialOffset.z * this.data.multiplier * findSign(textPosition.z)};
			
            this.copiedText = document.createElement('a-text');
			for (var i = 0; i < this.el.attributes.length; i++) {
				if(this.el.attributes[i].name != "3dtexteffect") {
					var attrib = this.el.attributes[i];
					this.copiedText.setAttribute(attrib.name, attrib.value);
				}
			}
            this.copiedText.setAttribute('position', calculatedPosition);
            this.copiedText.setAttribute('color', this.data.secondaryColor);
            this.el.appendChild(this.copiedText);
            this.textNotAdded = true;
    }
});

AFRAME.registerComponent('lookatelement', {
    schema: {
        elementToLookAt: {type: 'string', default: 'camera'},
        lookoffset: {type: 'number', default: 2.5},
    },

    init: function() {
        this.elToLookAt = document.getElementById(this.data.elementToLookAt);
    },

    tick: function() {
        this.el.object3D.lookAt(this.elToLookAt.object3D.position.x + this.data.lookoffset, 0, this.elToLookAt.object3D.position.z);
    }
});

AFRAME.registerComponent('fisheye_text', {
    schema: {
        text: {type:'string', default: '1234 5678\n90 ASDF\nGH JKL'}
    },

    init: function() {
        lineArray = this.data.text.split("\n");
        var cursor = new THREE.Vector3( 0, 0, 0 );
        for(var i = 0; i < lineArray.length; i++) {
            lineArray[i] = lineArray[i].split(" ");
        }
        for(var i = 0; i < lineArray.length; i++) {
            for(var j = 0; j < lineArray[i].length; j++) {
                var newWord = document.createElement('a-text');
                newWord.setAttribute('value', lineArray[i][j]);
                newWord.setAttribute('color', '#000');
                this.el.appendChild(newWord);
                console.log(newWord.object3D.children);
                newWord.object3D.children[0].geometry.computeBoundingBox();
                cursor += (newWord.object3D.children[0].geometry.boundingBox.max.x
                    - newWord.object3D.children[0].geometry.boundingBox.min.x)
                    * newWord.object3D.children[0].scale.x;
                newWord.setAttribute('position', {x: cursor, y: 0, z: 0});
            }
        }
        console.log(lineArray);
    }
});

AFRAME.registerComponent('zoomin', {
    init: function() {
		var main = document.querySelector('a-scene').canvas;
		var zoom = document.getElementById("zoom");
		var ctx = main.getContext("2d");
		var zoomCtx = zoom.getContext("2d");

		main.addEventListener("mousemove", function(e){
			//console.log(e);
			zoomCtx.fillStyle = "white";
			//zoomCtx.clearRect(0,0, zoom.width, zoom.height);
			//zoomCtx.fillStyle = "transparent";
			zoomCtx.fillRect(0,0, zoom.width, zoom.height);
			console.log(main);
			zoomCtx.drawImage(main, e.x, e.y, 200, 100, 0,0, 400, 200);
			zoom.style.top = e.pageY + 10 + "px"
			zoom.style.left = e.pageX + 10 + "px"
			zoom.style.display = "block";
		});

		main.addEventListener("mouseout", function(){
			zoom.style.display = "none";
		});
        // var camera = document.getElementById('camera');
        // this.el.addEventListener('mouseenter', function(e) {
            // console.log("entering");
            // camera.setAttribute('zoom', 3);
        // });
        // this.el.addEventListener('mouseleave', function(e) {
            // console.log("exit");
            // camera.setAttribute('zoom', 1);
        // });
    }
});

AFRAME.registerComponent('refraction', {
    schema: {
        enabled: {default: true},
        ratio: {type: 'number', default: 0.985 },
        reflectivity: {type: 'number', default: 0.9 }
    },
    init: function () {
        var scene = this.el.sceneEl.object3D;

        // Create refraction camera
        this.refractCamera = new THREE.CubeCamera( 0.1, 1000, 1000 );
        scene.add( this.refractCamera );
        this.refractCamera.renderTarget.mapping = THREE.CubeRefractionMapping;

        this.refractMaterial = new THREE.MeshBasicMaterial( {
            color: 0xffffdd,
            envMap: this.refractCamera.renderTarget,
            refractionRatio: this.data.ratio,
            reflectivity: this.data.reflectivity
        });

        this.originalMaterial = this.el.object3DMap.mesh.material;
    },
    update: function () {
        if (this.data.enabled) {
            this.el.object3DMap.mesh.material = this.refractMaterial;
            this.refractCamera.position = this.position;
            /*if (this.data.ratio < 0.912) { this.data.ratio = 0.912; }
            if (this.data.ratio > 1) { this.data.ratio = 1; }
            if (this.data.reflectivity < 0.6) { this.data.reflectivity = 0.6; }
            if (this.data.reflectivity > 1.2) { this.data.reflectivity = 1.2; }*/
            this.refractMaterial.refractionRatio = this.data.ratio;
            this.refractMaterial.reflectivity = this.data.reflectivity;
        } else {
            this.el.object3DMap.mesh.material = this.originalMaterial;
        }
    },
    tick: function () {
        if (!this.refractCamera) { return; }
        this.refractCamera.updateCubeMap( this.el.sceneEl.renderer, this.el.sceneEl.object3D );
        //this.refractCamera.updateProjectionMatrix();
    },
    remove: function () {
        if (!this.refractCamera) { return; }
        var scene = this.el.sceneEl.object3D;
        scene.remove( this.refractCamera );
        this.refractCamera = null;
        this.el.object3DMap.mesh.material = this.originalMaterial;
    },
    pause: function () {},
    play: function () {}
});

AFRAME.registerComponent('zoom-camera', {
    init: function () {
        this.zoomplane = document.getElementById('zoom-plane');
        this.camera = document.getElementById('camera');
        var text = document.getElementById('123');
        this.zoomCamera = new THREE.PerspectiveCamera( 80, 6, 0.5, 10000 );
        this.zoomCamera.position.x = -4;
        this.zoomCamera.position.y = -10;
        this.zoomCamera.position.z = 0;
        this.zoomCamera.lookAt(text.object3D);
        this.el.sceneEl.object3D.add(this.zoomCamera);
        this.renderTarget = new THREE.WebGLRenderTarget( 50, 50, { format: THREE.RGBFormat } );
        this.planeMaterial = new THREE.MeshBasicMaterial( {map: this.renderTarget.texture} );
        this.zoomplane.object3D.children[0].material = this.planeMaterial;
        this.renderer = new THREE.WebGLRenderer( {antialias:true} );
        this.renderer.setSize(10, 10);
        //get camera and return stuff*/
    },
    tick:function() {
        this.renderer.render( this.el.sceneEl.object3D, this.zoomCamera, this.renderTarget, true );
        //this.renderer.render(this.el.sceneEl.object3D, this.camera.object3D.children[0]);
    }
});