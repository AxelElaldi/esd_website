// Scene
const scene = new THREE.Scene();// Camera
// Renderer
// const renderer = new THREE.WebGLRenderer({antialias: true,  alpha: true });
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".diagram canvas"), antialias: true,  alpha: true});
const camera = new THREE.PerspectiveCamera(70, 2, 0.5, 1000);
camera.position.z = 5; // Set camera position


function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
  }
}

const noiseInput = document.getElementById('noiseInput');
const loader = new THREE.TextureLoader();
const loader_input = new THREE.TextureLoader();

// Make Canvas Responsive
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize
})

// Create sphere:
// 1st sphere
const boxGeometry = new THREE.SphereGeometry(1, 64, 64); // Define geometry
const boxMaterial = new THREE.MeshPhongMaterial();
boxMaterial.map = loader.load('texture_esd_untrained/test_'+noiseInput.value+'.png');
boxMaterial.needsUpdate = true;
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Build box
boxMesh.needsUpdate = true;
// boxMesh.rotation.set(40, 0, 40); // Set box initial rotation
scene.add(boxMesh); // Add box to canvas

// 2nd sphere
const boxGeometry_input = new THREE.SphereGeometry(1, 64, 64); // Define geometry
const boxMaterial_input = new THREE.MeshPhongMaterial();
boxMaterial_input.map = loader.load('texture/test_'+noiseInput.value+'.png');
boxMaterial_input.needsUpdate = true;
const boxMesh_input = new THREE.Mesh(boxGeometry_input, boxMaterial_input); // Build box
boxMesh_input.needsUpdate = true;
boxMesh_input.position.x = -3;
// boxMesh.rotation.set(40, 0, 40); // Set box initial rotation
scene.add(boxMesh_input); // Add box to canvas

// 3rd sphere
const boxGeometry_untrained = new THREE.SphereGeometry(1, 64, 64); // Define geometry
const boxMaterial_untrained = new THREE.MeshPhongMaterial();
boxMaterial_untrained.map = loader.load('texture_esd_untrained_reconstruction/test_'+noiseInput.value+'.png');
boxMaterial_untrained.needsUpdate = true;
const boxMesh_untrained = new THREE.Mesh(boxGeometry_untrained, boxMaterial_untrained); // Build box
boxMesh_untrained.needsUpdate = true;
boxMesh_untrained.position.x = 3;
// boxMesh.rotation.set(40, 0, 40); // Set box initial rotation
scene.add(boxMesh_untrained); // Add box to canvas

//const axesHelper = new THREE.AxesHelper( 3 );
//scene.add( axesHelper );

// Lights
const light = new THREE.AmbientLight(); // soft white light
scene.add( light );

//Trackball Controls for Camera 
const controls = new THREE.TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// 1st texture array
var arr = [];
for(var i=0;i<360;i++)
{
  arr.push(loader.load('texture_esd_untrained/test_'+i+'.png'));
}

// 2nd texture array
var arr_input = [];
for(var i=0;i<360;i++)
{
  arr_input.push(loader.load('texture/test_'+i+'.png'));
}

// 3rd texture array
var arr_untrained = [];
for(var i=0;i<360;i++)
{
  arr_untrained.push(loader.load('texture_esd_untrained_reconstruction/test_'+i+'.png'));
}


// 1st arrow
const dir = new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI));
dir.normalize();
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1.25;
const hex = 0xe29f93;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, 0.2*length, 0.5*0.2*length);
arrowHelper.needsUpdate = true;
scene.add( arrowHelper );

// 2nd arrow
const dir_input = new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI));
dir_input.normalize();
const origin_input = new THREE.Vector3( -3, 0, 0 );
const length_input = 1.25;
const hex_input = 0xe29f93;

const arrowHelper_input = new THREE.ArrowHelper( dir_input, origin_input, length_input, hex_input, 0.2*length_input, 0.5*0.2*length_input);
arrowHelper_input.needsUpdate = true;
scene.add( arrowHelper_input );

// 2nd arrow
const dir_untrained = new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI));
dir_untrained.normalize();
const origin_untrained = new THREE.Vector3( 3, 0, 0 );
const length_untrained = 1.25;
const hex_untrained = 0xe29f93;

const arrowHelper_untrained = new THREE.ArrowHelper( dir_untrained, origin_untrained, length_untrained, hex_untrained, 0.2*length_untrained, 0.5*0.2*length_untrained);
arrowHelper_untrained.needsUpdate = true;
scene.add( arrowHelper_untrained );


// Rendering Function
const rendering = function() {
    resizeCanvasToDisplaySize();
    // Rerender every time the page refreshes (pause when on another tab)
    requestAnimationFrame(rendering);
    
    // Update trackball controls
    controls.update();

    renderer.render(scene, camera);
}

function initGui() {
  noiseInput.value = 0;

  noiseInput.addEventListener('input', e => {
    boxMesh.material.map = arr[noiseInput.value];
    arrowHelper.setDirection(new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI)));
    boxMesh_input.material.map = arr_input[noiseInput.value];
    arrowHelper_input.setDirection(new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI)));
    boxMesh_untrained.material.map = arr_untrained[noiseInput.value];
    arrowHelper_untrained.setDirection(new THREE.Vector3(-Math.sin(noiseInput.value/180*Math.PI), 0, Math.cos(noiseInput.value/180*Math.PI)));
    console.log(noiseInput.value)
  });
}


initGui()
rendering();