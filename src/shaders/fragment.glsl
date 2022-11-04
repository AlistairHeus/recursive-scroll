// uniform float time;
// uniform float progress;
// uniform float speed;
// uniform float dir;
// uniform sampler2D uTexture;
// uniform vec4 resolution;
// varying vec2 vUv;
// varying vec3 vPosition;
// float PI = 3.14159265;


// void main(){

//   // gl_FragColor = vec4(vUv,1.0,1.);

//   float force = pow(length(vUv.x) + 0.5, abs(speed*0.01));
//   vec2 newUV = vUv* cos(1.-force)

//    gl_FragColor = 0.8*texture2D(uTexture,vUv+ vec2(0., -0.03));
// }

uniform float time;
uniform float progress;
uniform float speed;
uniform float dir;
uniform sampler2D uTexture;
uniform sampler2D uDisp;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;



float PI = 3.14159265;
void main(){
 vec4 d =texture2D(
    uDisp,
    (vUv - vec2(0.5))*(1. + speed ) + vec2(0.5)
    );
    float force = pow(length(vUv.x) + 0.5, abs(speed));
    vec2 newuv = vUv*cos(1.-force);

    gl_FragColor = (0.1 + 2.*speed)*texture2D(uTexture,newuv + d.xy*0.2 + vec2(0.,-0.03));
   
   
    gl_FragColor = 0.8*texture2D(uTexture,newuv + d.xy*0.02 + vec2(0.,-0.03));
}