

function LoadMesh(url, onloaded) {

    var loader = new THREE.GLTFLoader();

    loader.load(url, onloaded);

}
