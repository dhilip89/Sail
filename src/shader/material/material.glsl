#include "../const/define.glsl"
#include "../const/ray.glsl"
#include "matte.glsl"
#include "reflective.glsl"

vec3 shade(Intersect ins,inout Ray ray){
    vec3 result;
    int matCategory = readInt(texParams,vec2(0.0,ins.matIndex),TEX_PARAMS_LENGTH);
    if(matCategory == MATTE){
        result = matte(ins,ray);
    }else if(matCategory == REFLECTIVE){
        result = reflective(ins,ray);
    }
    return result;
}