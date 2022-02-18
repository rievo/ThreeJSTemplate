uniform float time;
uniform float vertexSize;
uniform sampler2D texture1;

varying vec2 v_uv;  
varying vec3 vPosition;

float PI = 3.14159265;

void main() {
     v_uv = uv;
     vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
     gl_PointSize = vertexSize * (1./- mvPosition.z);
     gl_Position = projectionMatrix * mvPosition;
}