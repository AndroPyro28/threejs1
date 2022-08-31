import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Mesh } from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#app') as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// const gridHelper = new THREE.GridHelper(30, 10);
// scene.add(gridHelper);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 25, 0);

scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper);

const sunGeometry = new THREE.SphereGeometry(5,10,10,5);
const sunMaterial = new THREE.MeshStandardMaterial({
    color: "yellow", wireframe:false, normalMap: new THREE.TextureLoader().load('/images/sun.png')
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 35, -50);
scene.add(sun);

const planeGeometry = new THREE.PlaneGeometry(100,100);
const planeTexture = new THREE.TextureLoader().load('/images/land.jpg')

const planeMaterial = new THREE.MeshStandardMaterial({color:"green", side: THREE.DoubleSide, normalMap:planeTexture});
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * - 0.5;

scene.add(plane);

const mountainGeometry = new THREE.ConeGeometry( 5, 8, 10 );
const mountainMaterial = new THREE.MeshStandardMaterial({normalMap: new THREE.TextureLoader().load('/images/mountain.png')} );
const mountain = new THREE.Mesh( mountainGeometry, mountainMaterial );

mountain.position.set(-10, 4, 0)
scene.add( mountain );

const cylinderGeometry = new THREE.CylinderGeometry(3, 5,5,10);
const cylinderMaterial = new THREE.MeshStandardMaterial( {color: 'blue'} );
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set(10, 2, 0)

scene.add( cylinder );
scene.background = new THREE.TextureLoader().load('/images/cloud.jpg')
const animate = (time: number) => {
    sun.rotation.x = time / 1000;
    sun.rotation.y = time / 1000;
    sun.rotation.z = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const addStart = () => {
    const geometry = new THREE.SphereGeometry(0.25, 10, 10, 1);
    const material = new THREE.MeshStandardMaterial({ color: 'white', wireframe:true });
    const spehere = new Mesh(geometry, material);

    const [x, y, z] = [
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100), 
        THREE.MathUtils.randFloatSpread(100)
    ]
    spehere.position.set(x, y, z)
    scene.add(spehere)
}

for(let i = 0; i < 200; i++) {
    addStart();
}
