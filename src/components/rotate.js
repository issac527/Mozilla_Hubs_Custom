AFRAME.registerComponent("rotate", {
  schema: {
    // Spoke 속성
    speed: { type: "number", default: 10 }
  },
  tick(_time, dt) {
    const obj = this.el.object3D;
    // 회전을 위한 코드도 onUpdate의 코드와 거의 동일해야 함
    // dt가 밀리초 단위이므로 초로 변환
    obj.rotation.y += (dt / 1000) * THREE.Math.degToRad(this.data.speed);
    // Hubs에는 회전이 각 프레임에 적용되도록 매트릭스 업데이트에 대한 최적화가 있음
    // 수동으로 이 플래그를 설정, 그렇지 않으면 움직이지 않음
    obj.matrixNeedsUpdate = true;
  }
});
