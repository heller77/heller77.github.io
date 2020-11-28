// ページの読み込みを待つ
window.addEventListener('load', init);

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
    camera.position.set(0, 0, +1000);
    console.log("na");


    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("./images/earthmap1k.jpg")
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);

    // 3D空間にメッシュを追加
    scene.add(mesh);
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }
}