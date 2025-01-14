import { Vector2 } from "three";

import { type IASCIIShader } from "../../types";

import vertexShader from "./vertex-shader";

const ASCIIShader: IASCIIShader = {
  shaderID: "ASCIIPass",
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    zoom: { value: 1.0 },
    uvamount: { value: 1.0 },
    amount: { value: 1.0 },
    alpha: { value: 0.0 },
  },
  vertexShader,
  fragmentShader: /* glsl */ `#version 300 es
    precision highp float;
#define P(id,a,b,c,d,e,f,g,h) if(id==int(pos.y)){int pa=a+2*(b+2*(c+2*(d+2*(e+2*(f+2*(g+2*(h)))))));cha=floor(mod(float(pa)/pow(abs(2.0),float(pos.x)-1.0),2.0));}

    in vec2 vUv;
    out vec4 fragColor;

    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float zoom;

    uniform float uvamount;
    uniform float amount;
    uniform float alpha;

    float gray(vec3 c) { return c.x * 0.299 + c.y * 0.587 + c.z * 0.114; }

    void main(void) {
    float z = zoom;
    vec2 uv = vec2(
      floor(gl_FragCoord.x / 8.0 / z) * 8.0 * z,
      floor(gl_FragCoord.y / 12.0 / z) * 12.0 * z
    ) / resolution.xy;
    uv = mix(vUv, uv, uvamount);
    ivec2 pos = ivec2(
      mod(gl_FragCoord.x / z, 8.0),
      mod(gl_FragCoord.y / z, 12.0)
    );
    vec4 tex = texture(tDiffuse, uv);
    float cha = 0.0;
    float g = gray(tex.xyz);
         if(g < 0.125){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,0,0,0,0,0);P(9,0,0,0,0,0,0,0,0);P(8,0,0,0,0,0,0,0,0);P(7,0,0,0,0,0,0,0,0);P(6,0,0,0,0,0,0,0,0);P(5,0,0,0,0,0,0,0,0);P(4,0,0,0,0,0,0,0,0);P(3,0,0,0,0,0,0,0,0);P(2,0,0,0,0,0,0,0,0);P(1,0,0,0,0,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.25 ){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,0,0,0,0,0);P(9,0,0,0,0,0,0,0,0);P(8,0,0,0,0,0,0,0,0);P(7,0,0,0,0,0,0,0,0);P(6,0,0,0,0,0,0,0,0);P(5,0,0,0,0,0,0,0,0);P(4,0,0,0,1,1,0,0,0);P(3,0,0,0,1,1,0,0,0);P(2,0,0,0,0,0,0,0,0);P(1,0,0,0,0,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.375){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,0,0,0,0,0);P(9,0,0,0,0,0,0,0,0);P(8,0,0,0,0,0,0,0,0);P(7,0,0,0,0,0,0,0,0);P(6,0,0,0,0,0,0,0,0);P(5,0,0,0,0,0,0,0,0);P(4,0,0,0,1,1,0,0,0);P(3,0,0,0,1,1,0,0,0);P(2,0,0,0,0,1,0,0,0);P(1,0,0,0,1,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.5  ){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,0,0,0,0,0);P(9,0,0,0,0,0,0,0,0);P(8,0,0,0,0,0,0,0,0);P(7,0,0,0,0,0,0,0,0);P(6,1,1,1,1,1,1,1,0);P(5,0,0,0,0,0,0,0,0);P(4,0,0,0,0,0,0,0,0);P(3,0,0,0,0,0,0,0,0);P(2,0,0,0,0,0,0,0,0);P(1,0,0,0,0,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.625){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,0,0,0,0,0);P(9,0,0,0,1,0,0,0,0);P(8,0,0,0,1,0,0,0,0);P(7,0,0,0,1,0,0,0,0);P(6,1,1,1,1,1,1,1,0);P(5,0,0,0,1,0,0,0,0);P(4,0,0,0,1,0,0,0,0);P(3,0,0,0,1,0,0,0,0);P(2,0,0,0,0,0,0,0,0);P(1,0,0,0,0,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.75 ){P(11,0,0,0,0,0,0,0,0);P(10,0,0,0,1,0,0,0,0);P(9,1,0,0,1,0,0,1,0);P(8,0,1,0,1,0,1,0,0);P(7,0,0,1,1,1,0,0,0);P(6,0,0,0,1,0,0,0,0);P(5,0,0,1,1,1,0,0,0);P(4,0,1,0,1,0,1,0,0);P(3,1,0,0,1,0,0,1,0);P(2,0,0,0,1,0,0,0,0);P(1,0,0,0,0,0,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else if(g < 0.875){P(11,0,0,0,0,0,0,0,0);P(10,0,0,1,0,0,1,0,0);P(9,0,0,1,0,0,1,0,0);P(8,1,1,1,1,1,1,1,0);P(7,0,0,1,0,0,1,0,0);P(6,0,0,1,0,0,1,0,0);P(5,0,1,0,0,1,0,0,0);P(4,0,1,0,0,1,0,0,0);P(3,1,1,1,1,1,1,1,0);P(2,0,1,0,0,1,0,0,0);P(1,0,1,0,0,1,0,0,0);P(0,0,0,0,0,0,0,0,0);}
    else              {P(11,0,0,0,0,0,0,0,0);P(10,0,0,1,1,1,1,0,0);P(9,0,1,0,0,0,0,1,0);P(8,1,0,0,0,1,1,1,0);P(7,1,0,0,1,0,0,1,0);P(6,1,0,0,1,0,0,1,0);P(5,1,0,0,1,0,0,1,0);P(4,1,0,0,1,0,0,1,0);P(3,1,0,0,1,1,1,1,0);P(2,0,1,0,0,0,0,0,0);P(1,0,0,1,1,1,1,1,0);P(0,0,0,0,0,0,0,0,0);}
    vec3 col = tex.xyz / max(tex.x, max(tex.y, tex.z));
    vec4 charColor = vec4(cha * col, 1.0);
    fragColor = mix(tex, vec4(charColor.rgb, alpha), amount);
    fragColor.a = alpha;
  }
  `,
};

export default ASCIIShader;
