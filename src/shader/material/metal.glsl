#include "bsdfs.glsl"

void metal_attr(float matIndex,out Ward w){
    w.ax = readFloat(texParams,vec2(1.0,matIndex),TEX_PARAMS_LENGTH);
    w.ay = readFloat(texParams,vec2(2.0,matIndex),TEX_PARAMS_LENGTH);
    w.invax2 = readFloat(texParams,vec2(3.0,matIndex),TEX_PARAMS_LENGTH);
    w.invay2 = readFloat(texParams,vec2(4.0,matIndex),TEX_PARAMS_LENGTH);
    w.const2 = readFloat(texParams,vec2(5.0,matIndex),TEX_PARAMS_LENGTH);
}

vec3 metal(Intersect ins,vec3 wo,out vec3 wi){
    vec3 f;
    float pdf;

    Ward ward_brdf;
    metal_attr(ins.matIndex,ward_brdf);
    ward_brdf.rs = ins.sc;

    f = ward_sample_f(ward_brdf,ins.seed,wi,wo,pdf);

    return f/pdf;
}

vec3 metal_f(Intersect ins,vec3 wo,vec3 wi){
    Ward ward_brdf;
    metal_attr(ins.matIndex,ward_brdf);
    ward_brdf.rs = ins.sc;

    return ward_f(ward_brdf,wi,wo);
}