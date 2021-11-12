function magnify(imgID, zoom): void {
  let img: HTMLElement;
  let glass;
  let width;
  let height;
  let bw: number;
  img = (document.getElementById(imgID) as HTMLElement);

  /* Create magnifier glass: */
  glass = document.createElement('DIV');
  glass.setAttribute('class', 'img-magnifier-glass');

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = 'url(\'' + img.style.backgroundImage + '\')';
  glass.style.backgroundRepeat = 'no-repeat';
  const glassWidth = (parseInt(img.style.width, 10) * zoom);
  const glassHeight = (parseInt(img.style.height, 10) * zoom);
  glass.style.backgroundSize = glassWidth + 'px ' + glassHeight + 'px';
  bw = 3;
  width = glass.offsetWidth / 2;
  height = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener('mousemove', moveMagnifier);
  img.addEventListener('mousemove', moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier);
  img.addEventListener('touchmove', moveMagnifier);

  function moveMagnifier(e): void {
    let pos;
    let x;
    let y;
    const imgWidth = parseInt(img.style.width, 10);
    const imgHeight = parseInt(img.style.height, 10);
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > imgWidth - (width / zoom)) {
      x = imgHeight - (width / zoom);
    }
    if (x < width / zoom) {
      x = width / zoom;
    }
    if (y > imgHeight - (height / zoom)) {
      y = imgHeight - (height / zoom);
    }
    if (y < height / zoom) {
      y = height / zoom;
    }
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - width) + 'px';
    glass.style.top = (y - height) + 'px';
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = '-' + ((x * zoom) - width + bw) + 'px -' + ((y * zoom) - height + bw) + 'px';
  }

  function getCursorPos(e): { x: number; y: number } {
    let a: DOMRect;
    let x = 0;
    let y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x, y };
  }
}
