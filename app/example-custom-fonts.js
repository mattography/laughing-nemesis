/**
 * ImglyKit
 * integration example using XHR image loading
 *
 * Copyright (c) 2013-2014 img.ly
 */

$(function () {
  var imgly
    , image = new Image()
    , renderButton = $("#renderButton");

  // Load image
  image.src = "img-1.jpg";
  image.onload = function () {

    // Initialize ImglyKit and run it with the image.
    // Don't forget to add button images in the CSS section
    // named: .imgly-controls-item-lobster and .imgly-controls-item-titillium-web
    imgly = new ImglyKit({
      container: "#container",
      additionalFonts: [
        {
          name: "Lobster",
          cssClass: "lobster"
        },
        {
          name: "Titillium Web",
          cssClass: "titillium-web"
        }
      ]
    });

    try {
      imgly.run(image);
    } catch (e) {
      if(e.name == "NoSupportError") {
        alert("Your browser does not support canvas.");
      } else if(e.name == "InvalidError") {
        alert("The given file is not an image");
      }
    }

  };

  // Listen for "Render final image" click
  renderButton.click(function (event) {
    var dataUrl;

    // dataUrl = imgly.renderToDataURL("png", function (err, dataUrl) {});
    // `dataUrl` now contains the full-sized rendered image
    // Caution: This string will probably exceed the maximum
    // dataURL size of 2M. You will not be able to set location.href
    // or an <img> tag's `src` attribute to this dataUrl.

    // dataUrl = imgly.renderToDataURL("png", { maxSize: "100x100" }, function (err, dataUrl) {});
    // `dataUrl` now contains a resized rendered image that
    // does not exceed 100x100 while keeping the ratio

    // dataUrl = imgly.renderToDataURL("png", { size: "100x100" }, function (err, dataUrl) {});
    // `dataUrl` now contains a resized rendered image with
    // a size of 100x100 pixels while _not_ keeping the ratio

    imgly.renderToDataURL("png", { size: "300x" }, function (err, dataUrl) {
      // `dataUrl` now contains a resized rendered image with
      // a width of 300 pixels while keeping the ratio

      $("<img>").attr({
        src: dataUrl
      }).appendTo($("body"));
    });

  });
});
