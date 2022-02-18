import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

export default class Sketch {
    constructor(options = {}) {
        // Canvas
        this.canvas = document.querySelector('canvas.webgl')
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.clock = new THREE.Clock()

        this.scene = undefined;
        this.controls = undefined;
        this.renderer = undefined;
        this.camera = undefined
        this.options = options;

        this.objectsInScene = {};
    }

    prepareScene = () => {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.camera.position.x = 0
        this.camera.position.y = 2
        this.camera.position.z = 3
        this.scene.add(this.camera)

        this.controls = new OrbitControls(this.camera, this.canvas)

        if (this.options.showAxis) {
            const axesHelper = new THREE.AxesHelper(1);
            this.scene.add(axesHelper);
        }
    }

    prepareWindow = () => {
        window.addEventListener('resize', () => {
            // Update sizes
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        })

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })
        this.renderer.setClearColor(0xcedbf0);
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    }

    addElementsToScene = () => {

        // Objects
        //const geometry = new THREE.BoxGeometry(1, 1, 1);
        const geometry = new THREE.PlaneGeometry(1, 1, 10, 10)
        // Materials
        /*
        const material = new THREE.MeshLambertMaterial({
            color: 0x00afaf,
            emissive: 0x7a7a7a,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        })*/

        const uniforms = {
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            vertexSize: { value: 100 }
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        // Mesh
        //const cube = new THREE.Mesh(geometry, material)
        const cube = new THREE.Points(geometry, material)
        this.scene.add(cube)

        this.objectsInScene["cube"] = cube

    }

    addLights = () => {
        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        this.scene.add(pointLight)
    }


    myAnimations = (elapsedTime) => {
        //this.objectsInScene["sphere"].rotation.x = .9 * elapsedTime
        //this.objectsInScene["cube"].rotation.y = .9 * elapsedTime
        //this.objectsInScene["sphere"].rotation.z = .9 * elapsedTime
    }

    animate = () => {

        const elapsedTime = this.clock.getElapsedTime()
        // Update Orbital Controls
        this.controls.update()

        this.myAnimations(elapsedTime)
        // Render
        this.renderer.render(this.scene, this.camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(this.animate)
    }


    startEverything = () => {
        this.prepareWindow()
        this.prepareScene()
        this.addElementsToScene()
        this.addLights()

        this.animate()
    }
}


const mySketch = new Sketch({ showAxis: true })
mySketch.startEverything()