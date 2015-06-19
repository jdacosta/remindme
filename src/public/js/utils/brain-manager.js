var THREE = require('three');
//var TWEEN = require('tween.js');
var _     = require('lodash');
var $     = require('jquery');


BrainManager = function () {

    // attributes
    this.requestId = undefined;
    this.currentPage = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.parent = null;
    this.geometry = null;
    this.mesh = null;
    this.length = null;
    this.distance = [];

    // elements
    this.$document = null;
    this.$brain = null;

    // initialize
    this.init();

};

BrainManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);

        // camera
        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 50000);
        this.camera.position.set(0, 0, 13000);

        // scene
        this.scene = new THREE.Scene();

        // loader
        this.loadModelBrain();

        // parent
        this.parent = new THREE.Object3D();
        this.scene.add(this.parent);

        // renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
            event.data._this.pageUpdate();
        });
        this.$document.on('STEP_UPDATED', { _this: this }, function( event ) {
            event.data._this.updateBrainColors();
        });

        this.pageUpdate();
    },

    pageUpdate: function () {
        if (/^mobile-experience/.test(app.instance.currentPage.className)) {
            this.$brain = $('.brain');
            this.$brain.append(this.renderer.domElement);

            // animate
            var _this = this;
            var animate = function () {
                _this.requestId = window.requestAnimationFrame(animate);
                _this.render();
            };
            animate();
        } else {
            if (this.requestId) {
                window.cancelAnimationFrame(this.requestId);
                this.requestId = undefined;
            }
        }
    },

    loadModelBrain: function (_this) {
        var _this = this;
        var loader = new THREE.ObjectLoader();
        loader.load('assets/data/brain.json', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    _this.createMesh(child.geometry, 20, 0, 0, 0);
                }
            });
        }, function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        }, function (xhr) {
            console.log('ERROR THREEJS : Loader error ' + xhr);
        });
    },

    createMesh: function (originalGeometry, scale, x, y, z) {
        var i,
            vertices = originalGeometry.vertices,
            origin = _.random(0, vertices.length);

        this.geometry = new THREE.Geometry();
        for (i = 0; i < vertices.length; i ++) {
            var p = vertices[i];
            this.distance[i] = {index: i, distance: vertices[origin].distanceTo(vertices[i])};
            this.geometry.vertices[i] = p.clone();
        }
        this.length = this.geometry.vertices.length;
        this.distance = _.sortBy(this.distance, 'distance');


        var colors = [];
        for(i = 0; i < this.length; i++) {
            colors[this.distance[i].index] = new THREE.Color(0xA3A2BC);
        }
        this.geometry.colors = colors;

        this.mesh = new THREE.PointCloud(this.geometry, new THREE.PointCloudMaterial({ size: 22, blending: THREE.AdditiveBlending, vertexColors: THREE.VertexColors }));
        this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
        this.parent.add(this.mesh);
    },

    updateBrainColors: function () {
        var i, colors = [];
        for(i = 0; i < this.length; i++) {
            if (app.Config.currentStep == 2 && i < 1000) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            } else if (app.Config.currentStep == 3 && i < 3000) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            } else if (app.Config.currentStep == 4 && i < 5000) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            } else if (app.Config.currentStep == 5 && i < 7000) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            } else if (app.Config.currentStep == 6 && i < 11500) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            } else if (app.Config.currentStep == 7 && i < 14000) {
                colors[this.distance[i].index] = new THREE.Color(0xCC342C);
            }
            else {
                //colors[this.distance[i].index] = new THREE.Color(0xA3A2BC);
                colors[this.distance[i].index] = new THREE.Color(0xFFFFFF);
            }
        }
        this.geometry.colors = colors;
        this.mesh.geometry.colorsNeedUpdate = true;

        /*colors[this.distance[i].index] = THREE.Tween(0xA3A2BC)
            .to({r: 0, g: 25, b: 155}, 4000)
            .easing(THREE.Easing.Quartic.In)
            .start();*/
    },

    render: function () {
        var time = Date.now() * 0.001;
        this.parent.rotation.y = time * 0.1;
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
};

module.exports = BrainManager;
