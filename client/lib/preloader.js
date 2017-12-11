(function(window,document) {

  var loadedImageCount, imageCount;
  var container = document.querySelector('.img-load-container');

  $(document).ready(function () {

    console.log("ready!");


    var imgLoad = imagesLoaded(container);
    imgLoad.on('progress', onProgress);
    imgLoad.on('always', onAlways);
    imageCount = imgLoad.images.length;
    loadedImageCount = 0;
    console.log('images to load: ' + imageCount);
  });

  function updateProgress(value) {
   console.log('updating progress: ' + value);
  }

// triggered after each item is loaded
  function onProgress(imgLoad, image) {
    // change class if the image is loaded or broken
    console.log('image loaded ok: ' + image.isLoaded);
    loadedImageCount++;
    updateProgress(loadedImageCount);
  }

// hide status when done
  function onAlways() {
    console.log('all images loaded');
    document.querySelector('.loading-pane').classList.add('hide');
    //statusElem.style.opacity = 0;
  }


})(window,document);
