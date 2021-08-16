import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import {GLTFExporter} from 'https://unpkg.com/three@0.127.0/examples/jsm/exporters/GLTFExporter.js'


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
THREE.Cache.enabled = false
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)

var s0 = "[ids="
var s1 = "[idb="
var s4 = '"'
var s5 = '"'
var s2 = ']'



const btn2 = document.getElementById('btnAdd')
btn2.addEventListener('click', count)
function count(){
    var s3 = i.toString();
    var etikete = s1.concat(s4);
    console.log(s3)
    etikete = etikete.concat(s3)
    console.log(etikete)
    etikete = etikete.concat(s5)
    console.log(etikete)
    etikete = etikete.concat(s2)
    console.log(etikete)
    var element = document.querySelector(etikete);
    element.addEventListener('click', bang)

 }

btn2.addEventListener('click', count2)
function count2(){
    
    var s3 = i.toString();
    var etikete = s0.concat(s4);
    console.log(s3)
    etikete = etikete.concat(s3)
    console.log(etikete)
    etikete = etikete.concat(s5)
    console.log(etikete)
    etikete = etikete.concat(s2)
    console.log(etikete)
    var element = document.querySelector(etikete);
    element.addEventListener('change', bang)
 }

function bang() {
    var pos = 0.0;
    var ini = []
    function delscene(){
        //try{
            //renderer.dispose();
            //renderer.renderLists.dispose();
            //loader.dispose();
            //controls.dispose();
            //light.dispose();
            //glb.scene.dispose();
            //BufferGeometry.dispose();
            //THREE.Cache.remove(BufferGeometry);
            //WebGLRenderTarget.dispose();
            //THREE.Cache.remove(light);
            //THREE.Cache.remove(scene);
            //THREE.Cache.remove(loader);
            //THREE.Cache.remove(renderer.renderLists);
            //THREE.Cache.remove(renderer);
            //THREE.Cache.remove(controls);
        //    THREE.Cache.clear();
            //THREE.Cache.clear(WebGL1Renderer);
        //    console.log("clear cache");
        //}catch{console.log("issue")}
        scene.traverse(object => {
            if (!object.isMesh) return
            
            console.log('dispose geometry!')
            object.geometry.dispose()
        
            //if (object.material.isMaterial) {
            //    cleanMaterial(object.material)
            //} else {
                // an array of materials
            //    for (const material of object.material) cleanMaterial(material)
            //}
        })
        while(scene.children.length > 0){ 
            THREE.Cache.remove(scene.children[0]);
            scene.remove(scene.children[0]); 
        }
        //const cleanMaterial = material => {
        //    console.log('dispose material!')
        //    material.dispose()
        
            // dispose textures
        //    for (const key of Object.keys(material)) {
        //        const value = material[key]
        //        if (value && typeof value === 'object' && 'minFilter' in value) {
        //            console.log('dispose texture!')
        //            value.dispose()
        //        }
        //    }
        //}
    }
    delscene()
    let h = 0
    let hh = 0
    var b = arr.length;
    var pp = {};
    
    var ard = {};
    var arl = {};

    for (let a = 0; a < b; a++) {
        //console.log("arr["+a+"] - ind: " + arr[a].ind + ", ProductId: " +arr[a].ProductId + ", Name: " + arr[a].Name + ", Height: " + arr[a].Height +", File: " + arr[a].File)
        var loader = new GLTFLoader();
        let pos0 = parseFloat(arr[0].Height);
        pos = pos + parseFloat(arr[a].Height);
        ini.push(pos)
        console.log("aaa pos: " + pos + " pos0: " + pos0 + " in: " + ini[a]);

        loader.load(arr[a].File, function(glb){
            console.log(glb);
            var str = glb.scene;
            ard[a]=glb.scene;
            ard[a].scale.set(0.005,0.005,0.005); 
            console.log("pos: " + ini[a] + " pos0: " + pos0);
            ard[a].position.set(0, - ini[a], 0);
            scene.add(ard[a]);
            console.log(ard);

        })

            //function(xhr){
            //    console.log((xhr.loaded/xhr.total*100)+"% loaded")
            //}, function(error){
            //    console.log('an error occured');
        
        //}
        //)

        //let sModelName = "resources/" + oResource.model3D + ".gltf";
        //loader.load( sModeName, function (gltf) {
            // the same code as in your original post
        //}, undefined, function (error) {
        //    console.error(error);
        //})
    }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(2,2,2)
        scene.add(light)
        

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

    animate()

    

}

camera.position.set(0,0,1);
    //loader.load('models/example.glb', function(glb){
    //    console.log(glb)
    //    const root = glb.scene;
    //    root.scale.set(0.005,0.005,0.005)
    //    scene.add(root);
    //    }, function(xhr){
    //        console.log((xhr.loaded/xhr.total*100)+"% loaded")
    //    }, function(error){
    //        console.log('an error occured');
    //})
    
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
    


