

// ページの読み込みを待つ
window.addEventListener('load', init);

function loadFile(url, data) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);

    request.send(null);

    // リクエストが完了したとき
    if (request.readyState == 4) {
        // Http status 200 (成功)
        if (request.status == 200) {
            return request.responseText;
        } else { // 失敗
            console.log("error");
            return null;
        }
    }
}
function get_shader(name) {
    var input_message = document.getElementById(name).value;
    return input_message;
}
function init() {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1400);


    //<--
    // 球体を作成
    const geometry = new THREE.PlaneGeometry(950, 900);
    const material = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: get_shader("vertex"),
        fragmentShader: get_shader("fragment")
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);
    //-->w



    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        mesh.rotation.y += 0.03;
        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }
}

document.getElementById("runButton").onclick = function () {
    console.log("button");
    init();
};