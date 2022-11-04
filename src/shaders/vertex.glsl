varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 50.0 * (1.0 / -mvPosition.z);
    // gl_PointSize = size * 10.0;

    gl_Position = projectionMatrix * mvPosition;
}