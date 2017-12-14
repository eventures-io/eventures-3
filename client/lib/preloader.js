(function (window, document) {

  var loadedImageCount, imageCount;
  var container = document.querySelector('.img-load-container');
  var loadBarInner = document.querySelector('.load-bar-inner');
  var progressCount = document.querySelector('.progress-count');

  var imgLoad = imagesLoaded(container);
  imgLoad.on('progress', onProgress);
  imgLoad.on('always', onAlways);
  imageCount = imgLoad.images.length;
  loadedImageCount = 0;

  // console.log('images to load: ' + imageCount);

  function updateProgress(value) {
    console.log('updating progress: ' + value);
    loadBarInner.style.width = value;
    setTimeout(function () {
      progressCount.innerHTML = value;
    }, 500);
  }

// triggered after each item is loaded
  function onProgress(imgLoad, image) {
    //console.log('image loaded ok: ' + image.isLoaded);
    loadedImageCount++;
    updateProgress(loadedImageCount * (100 / imageCount) + '%');
  }

// hide status when done
  function onAlways() {
    //console.log('all images loaded');
    setTimeout(function () {
      reveal();
    }, 700);
  }

  function reveal() {

    var loaderWrap = document.querySelector('.loader-wrap');
    var shape = loaderWrap.querySelector('svg.shape');
    var path = shape.querySelector('path');
    loaderWrap.classList.add('up');

    anime({
      targets: loaderWrap,
      duration: 300,
      easing: 'easeInOutSine',
      translateY: '-200vh'
    });

    anime({
      targets: shape,
      scaleY: [
        {value:[0.8,1.8],duration: 550,easing: 'easeInQuad'},
        {value:1,duration: 550,easing: 'easeOutQuad'}
      ]
    });

    anime({
      targets: path,
      duration: 800,
      easing: 'easeOutQuad',
      d: path.getAttribute('pathdata:id')
    });
  };

})(window, document);
