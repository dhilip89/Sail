/**
 * Created by eason on 1/20/18.
 */
import {Generator,Export,Plugin} from '../generator';
import noise from './noise.glsl';
import checkerboard from './checkerboard.glsl';
import checkerboard2 from './checkerboard2.glsl';
import bilerp from './bilerp.glsl';
import mixf from './mixf.glsl';
import scale from './scale.glsl';
import uvf from './uvf.glsl';

let plugins = {
    "checkerboard":new Plugin("checkerboard",checkerboard),
    "checkerboard2":new Plugin("checkerboard2",checkerboard2),
    "bilerp":new Plugin("bilerp",bilerp),
    "mixf":new Plugin("mixf",mixf),
    "scale":new Plugin("scale",scale),
    "uvf":new Plugin("uvf",uvf),
};

let head = `vec3 getSurfaceColor(vec3 hit,vec2 uv,float texIndex){
    int texCategory = readInt(texParams,vec2(0.0,texIndex),TEX_PARAMS_LENGTH);
    if(texCategory==UNIFORM_COLOR) return readVec3(texParams,vec2(1.0,texIndex),TEX_PARAMS_LENGTH);`
let tail = `return BLACK;}`;

let ep = new Export("getSurfaceColor",head,tail,"texCategory",function(plugin){
    return `return ${plugin.name}(hit,uv,texIndex);`
});

export default new Generator("texture",[noise],[""],plugins,ep);