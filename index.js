/**
 * Created by eason on 17-4-12.
 */

import * as matrix from './src/utils/matrix';
import {Renderer} from './src/core/renderer';
import {Scene} from './src/scene/scene';
import {Cube,Sphere,Plane} from './src/scene/geometry';
import {Camera} from './src/scene/camera';
import {Matte,Mirror,Metal,Transmission} from './src/scene/material';
import {Color,Checkerboard,CornellBox} from './src/scene/texture';
import {Control} from './src/utils/control';

window.Sail = {
    Renderer:Renderer,
    Scene:Scene,
    Cube:Cube,
    Sphere:Sphere,
    Plane:Plane,
    Camera:Camera,
    Control:Control,
    Matte:Matte,
    Mirror:Mirror,
    Metal:Metal,
    Transmission:Transmission,
    Color:Color,
    Checkerboard:Checkerboard,
    CornellBox:CornellBox
};