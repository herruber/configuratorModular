var rMath = (function () {

    var floatLerp = function (A, B, t) {

        return (1 - t) * A + t * B;
    };

    Array.prototype.last = function () {

        var object = this[this.length - 1];
        
        if (object) {
            return object;
        }

        return false;
    }

    var nearly = function(value, comparedTo)
    {
        var tolerance = 0.001
        var ret = true;
        if (value.x != undefined) {

            if (!compare(value.x, comparedTo.x, tolerance)) {
                ret = false;
                return ret;
            }
            if (!compare(value.y, comparedTo.y, tolerance)) {
                ret = false;
                return ret;
            }
            if (!compare(value.z, comparedTo.z, tolerance)) {
                ret = false;
                return ret;
            }

            return ret;
        }
        else {

            if (!compare(value, comparedTo, tolerance)) {
                ret = false;
                return ret;
            }
            else {
                return true;
            }
        }

        
    }

    var compare = function (value, comparedTo, tolerance) {
        if (Math.abs(value - comparedTo) < tolerance) {
            return true;
        }
        else {
            return false;
        }
    }

    var colorLerp = function (A, B, t) {

        

        if (A.r) {
            var retcol = new THREE.Color();
            retcol.r = (1 - t) * A.r + t * B.r;
            retcol.g = (1 - t) * A.g + t * B.g;
            retcol.b = (1 - t) * A.b + t * B.b;
            retcol.a = (1 - t) * A.a + t * B.a;

            return retcol;
        }
        else if (A.x) {
            var retcol = new THREE.Color();
            retcol.r = (1 - t) * A.x + t * B.x;
            retcol.g = (1 - t) * A.y + t * B.y;
            retcol.b = (1 - t) * A.z + t * B.z;
            retcol.a = (1 - t) * A.w + t * B.w;

            return retcol;
        }
    };

    function rgbToHex(r, g, b) {
        return "0x" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    var projectToSphere = function(point, radius)
    {
        var length = point.length()

        var projectedPoint = point.clone().multiplyScalar((radius / length));

        return projectedPoint;
    }

    var rel = function (array) { //Remove last
        return array.splice(array.length - 1, 1)
    }

    var generateUVs = function(geometry, channel, shape)
    {
        if (!channel) {
            channel = 0;
        }

        var min = geometry.boundingBox.min;
        var max = geometry.boundingBox.max;
        var distances = new THREE.Vector3().subVectors(max, min);
        var uvs = []

        var longestline = getLongestLine(shape);

        //Use geometry.facevertexuvs
        var squarePoints = []
        for (var f = 0; f < geometry.faces.length; f++) {
            var cface = geometry.faces[f];

            var cnormal = cface.normal;
            var offset = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, -1), cnormal); //Add this offset to all other points, that will make z to always face the camera.
            offset = offset.normalize();
            var uvoffset = new THREE.Vector2(offset.x, offset.z);

            var uvplane = new THREE.Vector2();

            var v1 = geometry.vertices[cface.a];
            var v2 = geometry.vertices[cface.b];
            var v3 = geometry.vertices[cface.c];

            var vertices = [v1, v2, v3];
            var uvs = []
            for (var v = 0; v < vertices.length; v++) {
                var cvert = vertices[v].clone();


                    cvert.x *= Math.abs(uvoffset.x) / distances.x;
                    cvert.y *= Math.abs(uvoffset.y) / distances.y;

                uvs.push(new THREE.Vector2(cvert.x, cvert.y))
            }

            geometry.faceVertexUvs[channel][f] = uvs;
        }
        
    }

    var getShapeLength = function(shape)
    {
        var cpoints = shape.getPoints();
        var length = 0;

        for (var p = 0; p < cpoints.length; p++) {

            if (p + 1 >= cpoints.length) {
                length += cpoints[p].distanceTo(cpoints[0])
            }
            else {
                length += cpoints[p].distanceTo(cpoints[p + 1])
            }          
        }
        return length;
    }

    var getLongestLine = function(shape)
    {
        var cpoints = shape.getPoints();
        var length = 0;

        var clength = cpoints[1].distanceTo(cpoints[0]);

        for (var p = 0; p < cpoints.length; p++) {

            if (p + 1 >= cpoints.length) {
                clength += cpoints[p].distanceTo(cpoints[0])
            }
            else {
                clength += cpoints[p].distanceTo(cpoints[p + 1])
            }

            if (clength > length) {
                length = clength;
            }
        }
        return length;
    }


    var AgreaterThanB = function(vec1, vec2)
    {
        if (vec1.x > vec2.x || vec1.y > vec2.y || vec1.z > vec2.z) {
            return true;
        }

        return false;
    }


    var min = function (list) {

        var x = list[0].x;
        var y = list[0].y;
        var z = list[0].z;

        if (list && list.length > 0) {

            for (var i = 0; i < list.length; i++) {
                var item = list[i];

                if (item.x < x) {
                    x = item.x
                }
                if (item.y < y) {
                    y = item.y
                }
                if (item.z < z) {
                    z = item.z
                }
            }

        }


        return new THREE.Vector3(x, y, z);

    }

    var max = function (list) {

        if (list && list.length > 0) {

            var x = list[0].x;
            var y = list[0].y;
            var z = list[0].z;

            for (var i = 0; i < list.length; i++) {
                var item = list[i];

                if (item.x > x) {
                    x = item.x
                }
                if (item.y > y) {
                    y = item.y
                }
                if (item.z > z) {
                    z = item.z
                }
            }

            return new THREE.Vector3(x, y, z);
        }
    }

    var computeWorldBox = function(item) //Takes an array of points, ex vertices
    {
        var box = new THREE.Box3().setFromObject(item);
        var position = new THREE.Vector3();

        var parent = item.parent;
        while (true) {

            if (parent.parent && parent.parent.type != "Scene") {

                position.add(parent.position)
                parent = parent.parent;
            }
            else {
                break;
            }
        }

        var boxpos = box.getCenter().add(position);
        var min = boxpos.add(box.min.clone());
        var max = boxpos.add(box.max.clone());

        box = new THREE.Box3(min, max)

        return box;
    }

    var getWorldPosition = function(object)
    {
        
        var position = object.position.clone();
        
        while(true)
        {
            
            if (object.parent && object.parent.type != "Scene") {                
                position.add(object.parent.position.clone())
                object = object.parent;
            }
            else {
                break;
            }
        }

        return position;
       
    }

    var degToRad = function(deg)
    {
        return deg * Math.PI / 180;
    }

    var radToDeg = function(rad, round)
    {
        var angle = 180 * rad / Math.PI;

        if (round) {
            return Math.round(angle);
        }
        else {
            return angle;
        }
    }

    var pointLerp = function(start, end, alpha)
    {

        var endf = end.clone().sub(start).multiplyScalar(alpha);
        return start.clone().add(endf);
    }

    Number.prototype.clamp = function (min, max) {
       
        return Math.min(Math.max(this, min), max);
       
    };

    Array.prototype.reorder = function (from, fill) { //Reorder an array from to end, eg 4 becomes 3 if 3 is removed, value to fill with

        for (var i = from; i < this.length - 1; i++) {

            if (this[i + 1] == fill) {
                break;
            }

            this[i] = this[i + 1];
        }

    }

    Array.prototype.remove = function (object) {

        for (var i = 0; i < this.length; i++) {

            if (this[i] === object) {
                this.splice(i, 1);
                break;
            }
        }
    }

    var randomPoint = function (min, max) {

        var x = floatLerp(min.x, max.x, Math.random());
        var y = floatLerp(min.y, max.y, Math.random());
        var z = floatLerp(min.z, max.z, Math.random());

        return new THREE.Vector3(x, y, z);
    }

    var toWorldNormal = function (object, normal) {
        object.updateMatrix();
        object.updateMatrixWorld();
        var normalMatrix = new THREE.Matrix3().getNormalMatrix(object.matrixWorld);
        
        return normal.clone().applyMatrix3(normalMatrix).normalize();
    }

    var nearestPowerOfTwo = function (size) {

        size = Math.round(Math.log2(size));
        size = Math.pow(2, size);

        return size;
    }

    var localTriToWorld = function (face, object) {

        var a = object.localToWorld(object.geometry.vertices[face.a].clone());
        var b = object.localToWorld(object.geometry.vertices[face.b].clone());
        var c = object.localToWorld(object.geometry.vertices[face.c].clone());

        var triangle = new THREE.Triangle(a, b, c);
        return triangle;

    }


    return {
        floatLerp: floatLerp,
        colorLerp: colorLerp,
        hexToRgb: hexToRgb,
        rgbToHex: rgbToHex,
        projectToSphere: projectToSphere,
        rel: rel,
        generateUVs: generateUVs,
        getShapeLength: getShapeLength,
        getLongestLine: getLongestLine,
        min: min,
        max: max,
        nearly: nearly,
        AgreaterThanB: AgreaterThanB,
        computeWorldBox: computeWorldBox,
        getWorldPosition: getWorldPosition,
        degToRad: degToRad,
        radToDeg: radToDeg,
        pointLerp: pointLerp,
        randomPoint: randomPoint,
        toWorldNormal: toWorldNormal,
        nearestPowerOfTwo: nearestPowerOfTwo,
        localTriToWorld: localTriToWorld
    }



}())
