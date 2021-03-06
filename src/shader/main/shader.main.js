/**
 * Created by eason on 1/20/18.
 */
import {Generator,Plugin} from '../generator';
import fsrender from './fsrender.glsl';
import vsrender from './vsrender.glsl';
import fstrace from './fstrace.glsl';
import vstrace from './vstrace.glsl';
import fsline from './fsline.glsl';
import vsline from './vsline.glsl';

let plugins = {
    "fsrender":new Plugin("fsrender",fsrender),
    "vsrender":new Plugin("vsrender",vsrender),
    "fstrace":new Plugin("fstrace",fstrace),
    "vstrace":new Plugin("vstrace",vstrace),
    "fsline":new Plugin("fsline",fsline),
    "vsline":new Plugin("vsline",vsline)
};

export default new Generator("main",[""],[""],plugins);