/**
 * Created by eason on 17-4-12.
 */
import {Renderer} from './src/core/renderer'
import {Scene} from './src/scene/scene'
import {Cube,Sphere,Rectangle,Cone,Cylinder,Disk,Hyperboloid,Paraboloid} from './src/scene/geometry'
import {Camera} from './src/scene/camera'
import {Matte,Mirror,Metal,Transmission} from './src/scene/material'
import {Color,Checkerboard,CornellBox} from './src/scene/texture'
import {Control} from './src/utils/control'
import {Matrix,Vector} from './src/utils/matrix';

window.Sail = {
    Renderer:Renderer,
    Scene:Scene,
    Cube:Cube,
    Sphere:Sphere,
    Rectangle:Rectangle,
    Cone:Cone,
    Cylinder:Cylinder,
    Disk:Disk,
    Hyperboloid:Hyperboloid,
    Paraboloid:Paraboloid,
    Camera:Camera,
    Control:Control,
    Matte:Matte,
    Mirror:Mirror,
    Metal:Metal,
    Transmission:Transmission,
    Color:Color,
    Checkerboard:Checkerboard,
    CornellBox:CornellBox,
    Matrix:Matrix,
    Vector:Vector
};

window.$V = Matrix;
window.$M = Vector;