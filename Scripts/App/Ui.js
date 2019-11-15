var Ui = (function () {

    //function centerToMouse(element) {
    //    var x = parseFloat(element.clientWidth) / 2;
    //    var y = parseFloat(element.clientHeight) / 2;
    //    var offsetx = Global.MouseScreen.x - x;
    //    var offsety = Global.MouseScreen.y - y;

    //   element.style.left = offsetx + "px";
    //   element.style.top = offsety + "px";
       
    //}

    //function createDragAndDropElement(objectList, parent) {

    //    var element = parent.children[0];

    //    for (var i = parent.children.length - 1; i > 0; i--) {
    //        $(parent.children[i]).remove();
    //    }

    //    $(parent.children[0]).remove();

    //    //$(parent.children[0]).find(".droplist-details-popup p").text("ehjbaberiakasjd")
    //    var p;
    //    objectList.each(function (id, object) {

    //        var newchild = $(element).clone(true, true);

    //        var infobox = newchild.find(".droplist-details-popup");
    //        p = infobox.find("p");


    //        //p[0].remove();

    //        var priceid = -1;

    //        switch (object.modelData.type) {
    //            case "Window":
    //                id = 4;
    //                break;
    //            case "Door":
    //                id = 5;
    //                break;
    //            default:
    //        }

    //        var objdata;
    //        if (object.modelData.type == "Gate") {

    //            var id2 = 0;
    //            if (object.modelData.name.contains("Turner")) {
    //                id = 6;
    //            }
    //            else if (object.modelData.name.contains("Vikport")) {
    //                id = 8;

    //                if (object.modelData.name.contains("40x40")) {
    //                    id2 = 2;
    //                }
    //            }
    //            else if (object.modelData.name.contains("Slagport")) {
    //                id = 7;
    //            }

    //            objdata = getPriceObject(id, id2);
    //            var price = Builder_BjornMamman.building.price.roundAndApplyDiscount(objdata.price).roundedAndDiscounted;
    //            newchild.find("strong").text(price + " kr")

    //        }
    //        else {
    //            objdata = Global.items.findPriceObject(id, object.modelData.name);
    //            var price = Builder_BjornMamman.building.price.roundAndApplyDiscount(objdata.price).roundedAndDiscounted;
    //            newchild.find("strong").text(  price + " kr")
    //        }
    //       // p.text( Configurator.Lang.contains("sv") ? objdata.info : objdata.infoFin)
    //       p.text(objdata.info);
    //        var select = newchild.find("select");
    //        select.addClass(".gate-" + id);

    //        if (select) select.addClass(object.modelData.name);
    //        select.children().remove();

    //        object.object.children.each(function (id, obj) {
    //            var parent = obj.parent;
    //            if (obj.name.indexOf("Frame") > -1) {

    //                if (parent.name === "Slagport") {
    //                    var angles = ["10°", "18°"]
    //                    for (var i = 0; i < 2; i++) {
    //                        var option = document.createElement("option");
    //                        option.innerText = obj.name.split(" ")[1] + " " + angles[i];
    //                        option.className = "frame"
    //                        //option.id = "" + object.name + "_" + id; //Gets the object name and its child id
    //                        select[0].appendChild(option);

    //                    }
    //                }
    //                else {
    //                    var option = document.createElement("option");
    //                    option.innerText = obj.name.split(" ")[1];
    //                    option.className = "frame"
    //                    //option.id = "" + object.name + "_" + id; //Gets the object name and its child id
    //                    select[0].appendChild(option);
    //                }


    //                //$(list).find("restrict").text("Minsta bredd: " + parseFloat(dims[0]) / 10)
    //            }
    //        })

    //        if (select[0]) newchild.find(".restrict")[0].innerHTML = "min bredd " + Math.round(parseFloat(select[0].children[0].innerText.split("x")[0]) + 200) / 1000 + " m" + "<br> min höjd " + Math.round(parseFloat(select[0].children[0].innerText.split("x")[1]) + 0.200) / 1000 + " m";
    //        var name = object.modelData.name;

    //        name = name.replace("openable", "öppningsbar");
    //        name = name.replace("solid", "fast");
    //        newchild[0].innerHTML = newchild[0].innerHTML.replace("Rubrik", name);

    //        if (object.modelData.icon) {

    //            var imgElement = newchild.find(".draganddrop-image").css({ "background-image": "url('" + Configurator.Path + object.modelData.icon + "')" })
    //            imgElement[0].id = object.modelData.name;
    //        }

    //        parent.appendChild(newchild[0]);

    //    })
    //}

    //function positionDraggedItem(object, pos, rot, force) { //Use force when positioned through code and not user interaction

    //    if (Global.intersects[0] && Math.abs(Global.intersects[0].face.normal.y) > 0.5) return;

    //    if (Global.intersects && Global.intersects[0] || force) {
    //        var item = object || dragAndDrop.draggedObject;
    //        var size = new THREE.Vector3(item.userData.width * item.scale.x / 1000, item.userData.height * item.scale.y / 1000, 0);

    //        var oldPos = item.position.clone();
    //        var oldRotation = item.rotation.y;

    //        if (pos && rot) {

    //            item.rotation.set(0, rot.y || rot._y, 0);

    //            item.position.set(pos.x, pos.y, pos.z);
    //            item.visible = true;

    //            var box = new THREE.Box3().setFromObject(item);
    //            Builder_BjornMamman.building.addons.push(item);
    //            Builder_BjornMamman.building.occupied[Builder_BjornMamman.building.addons.indexOf(item)] = box;

    //        }
    //        else {
    //            var gridsize = 0.1;

    //            var positionInfo = Builder_BjornMamman.building.collisionObject.getPositionOnLine(Global.intersects[0], item);

    //            if (!positionInfo) {
    //                return;
    //            }


    //            pos = positionInfo.position;

    //            var roty = positionInfo.rotation;

    //            roty += Math.PI;

    //            item.rotation.set(0, roty, 0);

    //            item.position.set(pos.x, pos.y, pos.z);

    //            var box = new THREE.Box3().setFromObject(item);

    //            for (var bounds in Builder_BjornMamman.building.occupied) {

    //                if (box.intersectsBox(Builder_BjornMamman.building.occupied[bounds]) && Builder_BjornMamman.building.addons[bounds] != item) {
    //                    item.position.set(oldPos.x, oldPos.y, oldPos.z);
    //                    item.rotation.set(0, oldRotation, 0);
    //                    return;
    //                }
    //            }

    //            // Builder_BjornMamman.building.occupied[Builder_BjornMamman.building.addons.indexOf(item)] = box;

    //            item.visible = true;

    //            hasBeenPlaced = true;
    //        }


    //        Builder_BjornMamman.building.updateHole(item);

    //    }
    //}

    //var initConfigurator = function () {

    //    var startClick = null;

    //    var mylatesttap;
    //    function doubletap() {

    //        var now = new Date().getTime();
    //        var timesince = now - mylatesttap;

    //        if ((timesince < 600) && (timesince > 0)) {

    //            rayCastToMouse(Global.MouseClip.x, Global.MouseClip.y, true);

    //            if (Global.intersects[0]) {
    //                Builder_BjornMamman.building.deleteAddon(getFirstParent(Global.intersects[0].object))
    //                //Builder_BjornMamman.building.price.getTotal();
    //                doPrice = true;
    //            }
                

    //            doRender = true;
    //            mylatesttap = new Date().getTime();
    //            return true;
    //        } else {

    //        }

    //        mylatesttap = new Date().getTime();
    //        return false;
    //    }

    //    var rayCastToMouse = function (wx, wy, addons, obj) {

    //        var intersects;

    //        if (Global.camera) {
    //            raycaster.setFromCamera(new THREE.Vector2(wx, wy), Global.camera);
    //            raycaster.near = 0.5;
    //            raycaster.far = 2000;

    //            if (addons) {

    //                if (obj) {
    //                    intersects = raycaster.intersectObjects([obj], true);
    //                }
    //                else {

    //                    intersects = raycaster.intersectObjects(Builder_BjornMamman.building.addons.concat(Builder_BjornMamman.building.collisionObject.total), true);

    //                    if (intersects.length > 0) {

    //                        if (intersects.length > 1) {

    //                            var d = intersects[0].point.distanceTo(intersects[1].point);

    //                            if (d < 0.25) {

    //                                if (intersects[0].object.name === "") {
    //                                    intersects = [intersects[1]]
    //                                }
    //                                else if (intersects[1].object.name !== "") {
    //                                    intersects = [intersects[0]]
    //                                }

    //                            }
    //                            else {
    //                                intersects = [];
    //                            }

    //                        }
    //                        else if (intersects[0] && intersects[0].object.name !== "") {
    //                            intersects = [intersects[0]]
    //                        }
    //                        else {
    //                            intersects = []
    //                        }

    //                        //var campos = Global.camera.position;
    //                        //var parent = getFirstParent(intersects[0].object);
    //                        //var camforward = Global.camera.getWorldDirection();

    //                        //var rotation = parent.quaternion;

    //                        //var forward = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation).normalize();

    //                        //if (forward.dot(camforward) > 0) { //Camera is on opposite side
    //                        //    intersects = [];
    //                        //}
    //                    }
    //                }
    //            }
    //            else {
    //                intersects = raycaster.intersectObjects(Builder_BjornMamman.building.collisionObject.getAsArray());

    //                if (intersects[0]) {

    //                    var n = intersects[0].face.normal;

    //                }
    //            }

    //            Global.currentHit = intersects;

    //            Global.MouseWorld = intersects[0] ? intersects[0].point : null;
    //            Global.intersects = intersects;
    //        }

    //    }

    //    function onMove(event) {

    //        if (dragAndDrop.draggedObject && isDragging) {

    //            var ev = event;
    //            ev.preventDefault();

    //            var pos;

    //            if (ev.targetTouches && ev.targetTouches[0]) {
    //                pos = new THREE.Vector2(ev.targetTouches[0].clientX, ev.targetTouches[0].clientY);
    //            }
    //            else {
    //                pos = new THREE.Vector2(ev.clientX, ev.clientY);
    //            }

    //            setMousePos(pos.x, pos.y);
    //            rayCastToMouse(Global.MouseClip.x, Global.MouseClip.y);

    //            if (dragAndDrop.uiTarget) {
    //                centerToMouse(dragAndDrop.uiTarget);

    //                if (Global.currentHit && Global.currentHit.length > 0) {
    //                    dragAndDrop.uiTarget.style.opacity = 0.1;
    //                }
    //                else {
    //                    dragAndDrop.uiTarget.style.opacity = 0.9;
    //                }

    //            }

    //            if (dragAndDrop.draggedObject !== null) {

    //                positionDraggedItem();

    //            }


    //        }
    //        else if (Builder_BjornMamman.building.target && isDragging) {

    //            var ev = event;
    //            var pos;

    //            if (ev.targetTouches && ev.targetTouches[0]) {
    //                pos = new THREE.Vector2(ev.targetTouches[0].clientX, ev.targetTouches[0].clientY);
    //            }
    //            else {
    //                pos = new THREE.Vector2(ev.clientX, ev.clientY);
    //            }

    //            setMousePos(pos.x, pos.y)
    //            rayCastToMouse(Global.MouseClip.x, Global.MouseClip.y);

    //            if (Builder_BjornMamman.building.target) {
    //                positionDraggedItem(Builder_BjornMamman.building.target)
    //            }
    //        }
    //    }

    //    var mouseDisabled = false;

    //    function clickStart(ev) {
    //        var elem = ev.target;
    //        if (ev.target.tagName !== "CANVAS") {

    //            if (elem.classList.contains("draganddrop-image")) {

    //                isDragging = true;
    //                var ev = ev.originalEvent || ev;
    //                var id = ev.target.id;
    //                dragAndDrop.uiTarget = document.createElement("div");    // ev.targetTouches[0].target.cloneNode();
    //                dragAndDrop.uiTarget.id = "clone " + id;


    //                var object = Global.items.findBy({ name: ev.target.id });
    //                var data = object.modelData;

    //                if (!data) {
    //                    console.error("Item has no data");
    //                }

    //                var parent = $(ev.target).parent().find("select");
    //                var value = parent.val(); //Value is additional dimensions or properties, in case of gate it is the frame size and gate scale

    //                var success = Builder_BjornMamman.initAddon(object, value);

    //                if (!success) return;

                   
    //                dragAndDrop.uiTarget.style.backgroundImage = ev.target.style.backgroundImage;
    //                dragAndDrop.uiTarget.style.width = ev.target.clientWidth + "px";
    //                dragAndDrop.uiTarget.style.height = ev.target.clientHeight + "px";
    //                $(dragAndDrop.uiTarget).addClass("dragged");
    //                $("#main-configurator").append(dragAndDrop.uiTarget);

    //                var clientX = ev.touches && ev.touches.length > 0 ? ev.touches[0].clientX : ev.clientX;
    //                var clientY = ev.touches && ev.touches.length > 0 ? ev.touches[0].clientY : ev.clientY;

    //                setMousePos(clientX, clientY)
    //                centerToMouse(dragAndDrop.uiTarget);
    //                dragAndDrop.uiTarget.style.display = "block";
    //            }
    //            return;
    //        }
    //        if (doubletap()) return;

    //        if (ev && ev.touches) {
    //            var touch = ev.touches[0];
    //            setMousePos(touch.clientX, touch.clientY);
    //        }
    //        else {
    //            setMousePos(ev.clientX, ev.clientY)
    //        }


    //        rayCastToMouse(Global.MouseClip.x, Global.MouseClip.y, true);

    //        if (!Global.currentHit[0]) return;

    //        Builder_BjornMamman.building.selectAddon(Global.currentHit[0].object);

    //        Global.controls.enabled = false;
    //        isDragging = true;
    //    }

    //    function clickEnd(event) {

    //        if (dragAndDrop.uiTarget !== null || Builder_BjornMamman.building.target) {
    //            isDragging = false;
    //            Global.controls.enabled = true;
    //            //Add the dragged item if valid placement

    //            var id = Builder_BjornMamman.building.addons.indexOf(dragAndDrop.draggedObject)

    //            if (id === -1) {
    //                id = Builder_BjornMamman.building.addons.indexOf(Builder_BjornMamman.building.target);
    //            }

    //            var object = Builder_BjornMamman.building.addons[id] || dragAndDrop.draggedObject;
    //            var box = new THREE.Box3().setFromObject(object.userData.bounds)

    //            if (id > -1) {
    //                Builder_BjornMamman.building.occupied[id] = box;
    //            }

    //            if (raycaster.intersectObjects(Builder_BjornMamman.building.collisionObject.getAsArray()).length > 0 && dragAndDrop.draggedObject.visible) {


    //                if (Builder_BjornMamman.building.addons.indexOf(dragAndDrop.draggedObject) < 0) {
    //                    Builder_BjornMamman.building.addons.push(dragAndDrop.draggedObject);
    //                    id = Builder_BjornMamman.building.addons.length - 1;
    //                }

    //                Builder_BjornMamman.building.occupied[id] = box;

    //                Builder_BjornMamman.building.deselectAddon();

    //            }
    //            else if (Builder_BjornMamman.building.addons.indexOf(dragAndDrop.draggedObject) < 0) {

    //                Builder_BjornMamman.building.deleteAddon(dragAndDrop.draggedObject);

    //            }
    //            else {
    //                Builder_BjornMamman.building.occupied[id] = box;
    //                Builder_BjornMamman.building.deselectAddon();
    //            }

    //            doPrice = true;

    //            $(dragAndDrop.uiTarget).remove();
    //            dragAndDrop.uiTarget = null;
    //            dragAndDrop.draggedObject = null;

    //            doRender = true;
    //        }
    //    }

    //}
    
 



    return {
     
    }

}())
