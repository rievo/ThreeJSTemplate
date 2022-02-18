import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const clock = new THREE.Clock()



let scene = undefined;
let controls = undefined;
let renderer = undefined;
let camera = undefined
let sphere = undefined;

function prepareScene() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    controls = new OrbitControls(camera, canvas)
}

function prepareWindow() {
    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    })

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setClearColor(0xcedbf0);
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

}

function addElementsToScene() {

    // Objects
    const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

    // Materials

    const material = new THREE.MeshLambertMaterial({
        color: 0x00afaf,
        emissive: 0x7a7a7a,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide
    })

    // Mesh
    sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

}

function addLights() {
    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

}


const myAnimations = (elapsedTime) => {
    sphere.rotation.z = .9 * elapsedTime
    sphere.rotation.y = .9 * elapsedTime
    sphere.rotation.x = .9 * elapsedTime
}

const animate = () => {

    const elapsedTime = clock.getElapsedTime()
    // Update Orbital Controls
    controls.update()

    myAnimations(elapsedTime)
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}


function startEverything() {
    prepareWindow()
    prepareScene()
    addElementsToScene()
    addLights()

    animate()
}

startEverything()