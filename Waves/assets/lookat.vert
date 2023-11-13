#version 300 es

layout(location = 0) in vec3 inPosition;  //  ok

uniform vec4 color;       //  ok
uniform mat4 modelMatrix; //  ok
uniform mat4 viewMatrix;  //  ok
uniform mat4 projMatrix;  //  ok

out vec4 fragColor;       //  ok

void main() {
  vec4 posEyeSpace = viewMatrix * modelMatrix * vec4(inPosition, 1);

  float i = 1.0 - (-posEyeSpace.z / 10.0);
  fragColor = vec4(i, i, i, 1) * color;

  gl_Position = projMatrix * posEyeSpace;
}