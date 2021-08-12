import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import {GLTFExporter} from 'https://unpkg.com/three@0.126.0/examples/jsm/exporters/GLTFExporter.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

export function DownloadMDL(){
    console.log("yes")
}



const loader = new GLTFLoader()
loader.load('models/example.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.005,0.005,0.005)
    scene.add(root);
    }, function(xhr){
        console.log((xhr.loaded/xhr.total*100)+"% loaded")
    }, function(error){
        console.log('an error occured');
})

const btn = document.getElementById('btnDWN')
btn.addEventListener('click', download)

function download() {
    const exporter = new GLTFExporter()
        exporter.parse(
            scene,
            function(result){
                saveArrayBuffer(result, 'test.glb')
            },
        {
            binary:true
        }
        )
}

function saveArrayBuffer(buffer, fileName){
    save(new Blob([buffer], {type: 'application/octet-stream'}), fileName)
}

const link = document.createElement('a')
document.body.appendChild(link)

function save(blob, fileName){
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,2)
scene.add(light)

const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}



const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)

camera.position.set(0.75,0.75,2); // Set position like this
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setClearColor( 0xffffff );
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();
