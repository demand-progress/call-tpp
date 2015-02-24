$(document).ready(function() {
  circle = {
      path: { radius: 125, center: [150, 35], angle: "180deg"},
      targets: ".circle",
      rotationMode: "rotate",
      align: "center",
      css: "visibility: visible; position: relative; top: 0px; width: 300px; height: 300px;",
      // showPath: {thickness: 1, color: "white"},
    };
    cssWarp(circle);
});