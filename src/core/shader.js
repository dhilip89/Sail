/**
 * Created by eason on 1/20/18.
 */
import {Vector,Matrix} from '../utils/matrix';
import {PluginParams} from '../shader/generator'
import c from '../shader/const/shader.const'
import filter from '../shader/filter/shader.filter'
import main from '../shader/main/shader.main'
import material from '../shader/material/shader.material'
import shape from '../shader/shape/shader.shape'
import light from '../shader/light/shader.light'
import texture from '../shader/texture/shader.texture'
import trace from '../shader/trace/shader.trace'
import util from '../shader/util/shader.util'

class Shader{
    constructor(pluginsList){
        this.pluginsList = pluginsList;
        this.glslv = "300 es";

        this.uniform = {};
        this.texture = {};
    }

    uniformstr(){
        let result = "";
        for(let entry of Object.entries(this.uniform)){
            result += `uniform ${entry[1].type} ${entry[0]};\n`;
        }
        for(let entry of Object.entries(this.texture)){
            result += `uniform sampler2D ${entry[0]};\n`;
        }
        return result;
    }
}

class TraceShader extends Shader{
    constructor(pluginsList = {shape:[],texture:[],material:[],trace:"pathtrace"}){
        super(pluginsList);

        this.uniform = {
            n:{type:'int',value:0},
            ln:{type:'int',value:0},
            tn:{type:'int',value:0},
            textureWeight:{type:'float',value:0},
            timeSinceStart:{type:'float',value:0},
            matrix:{type:'mat4',value:Matrix.I(4)},
            eye:{type:'vec3',value:Vector.Zero(3)},
        };
        this.texture = {
            cache:{unit:0,value:null},
            objects:{unit:1,value:null},
            texParams:{unit:2,value:null},
            lights:{unit:3,value:null}
        };
    }

    combinefs(){
        return `#version ${this.glslv}\n`
            + `precision highp float;
               precision highp int;\n`
            + this.uniformstr()
            + c.generate()
            + util.generate(
                new PluginParams("random"),
                new PluginParams("sampler"),
                new PluginParams("texhelper"),
                new PluginParams("utility")
            )
            + texture.generate(...this.pluginsList.texture)
            + material.generate(...this.pluginsList.material)
            + shape.generate(...this.pluginsList.shape)
            + light.generate(...this.pluginsList.light)
            + trace.generate(this.pluginsList.trace)
            + main.generate(new PluginParams("fstrace"))
    }

    combinevs(){
        return `#version ${this.glslv}\n`
            + `precision highp float;
               precision highp int;\n`
            + this.uniformstr()
            + util.generate(new PluginParams("utility"))
            + main.generate(new PluginParams("vstrace"))
    }
}


class RenderShader extends Shader{
    constructor(pluginsList={filter:"gamma"}){
        super(pluginsList);

        this.texture = {
            colorMap:{unit:0,value:null},
            normalMap:{unit:1,value:null},
            positionMap:{unit:2,value:null}
        };
    }

    combinefs(){
        return `#version ${this.glslv}\n`
            + `precision highp float;\n`
            + this.uniformstr()
            + filter.generate(this.pluginsList.filter)
            + main.generate(new PluginParams("fsrender"))
    }

    combinevs(){
        return `#version ${this.glslv}\n`
            + this.uniformstr()
            + main.generate(new PluginParams("vsrender"))
    }
}

class LineShader extends Shader{
    constructor(pluginsList={}){
        super(pluginsList);

        this.uniform = {
            cubeMin:{type:"vec3",value:Vector.Zero(3)},
            cubeMax:{type:"vec3",value:Vector.Zero(3)},
            modelviewProjection:{type:"mat4",value:Matrix.I(4)}
        }
    }

    combinefs(){
        return `#version ${this.glslv}\n`
            + `precision highp float;\n`
            + main.generate(new PluginParams("fsline"));
    }

    combinevs(){
        return `#version ${this.glslv}\n`
            + this.uniformstr()
            + main.generate(new PluginParams("vsline"))
    }
}

export {TraceShader,RenderShader,LineShader}