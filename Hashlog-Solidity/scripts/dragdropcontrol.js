function drag(ev) {
  //when dragging the element (ondragstart event)
  //Metemos el id del elemento draggable (la imagen por ejemplo)
  ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
  //ondragover in destination (event)
    ev.preventDefault();
}
function drop(ev) {
  //when dropping the element
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //Añadimos el elemento arrastrado como hijo del elemento que lo abarca
    ev.target.appendChild(document.getElementById(data));
}
