import React, { useState, useEffect } from 'react';
import { useMedia } from "../../../hooks/useMedia";


function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const CroppedImage = ({imageSrc, containerHeight, containerWidth, cropping, classes, mobile, children}) => {
  const { isSmall } = useMedia();
  const [bgSize, setBgSize] = useState(0);
  const [bgPosition, setBgPosition] = useState(0);
  const [mobileData, setMobileData] = useState(null);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      let img = new Image();
      img.onload = function() {setInitialData(this) }
      if (isSmall && mobile && mobile.imageSrc){
        img.src = mobile.imageSrc;
      }else{
        img.src = imageSrc;
      }
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  useEffect(() => {

    let img = new Image();
    img.onload = function() {setInitialData(this) }
    if (isSmall && mobile && mobile.imageSrc){
      img.src = mobile.imageSrc;
    }else{
      img.src = imageSrc;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const setInitialData = (img) =>{
    let croppingSize = cropping
    let aspectRatioBase = 1900


    if (isSmall && mobile && mobile.imageSrc){
      setMobileData(mobile)
      croppingSize = mobile.cropping
      aspectRatioBase = 375
      containerHeight = mobile.containerHeight
      containerWidth = mobile.containerWidth
    }

    console.log(croppingSize);

    const imgH = img.height
    const imgW = img.width
    const cpH = croppingSize.height
    const cpW = croppingSize.width
    let widthDiff = 0
    let heightDiff = 0

    if (!containerWidth){
      let screenWidth = window.innerWidth
      if(screenWidth < aspectRatioBase){
        widthDiff = (aspectRatioBase - screenWidth) / 2;
      }else if (screenWidth > aspectRatioBase){
        let widthPercent = screenWidth / aspectRatioBase
        let newHeight = containerHeight * widthPercent
        containerHeight = newHeight
      }

      let newWidth = screenWidth > aspectRatioBase ? screenWidth : aspectRatioBase
      containerWidth = newWidth
    }


    const bgHeightPercent = containerHeight / cpH;
    const bgHeight = bgHeightPercent * imgH + heightDiff

    const bgWidthPercent = containerWidth / cpW;
    const bgWidth = bgWidthPercent * imgW


    const bgY = croppingSize.y * bgHeightPercent
    const bgX = (croppingSize.x * bgWidthPercent) + widthDiff



    console.group("CROP");
    console.log("BGX", bgX);
    console.log("BGY", bgY);
    console.log("Container width", containerWidth);
    console.log("container height", containerHeight);
    console.log("bghe", bgHeight);
    console.log("bgw", bgWidth);
    //console.log("h:",heightPercent, "w:",widthPercent);
    console.log("imagh:", imgH, imgW);
    console.log("cropping", croppingSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bgSize = `${bgWidth}px ${bgHeight}px`
    const bgPosition = `${-bgX}px ${-bgY}px`
    setBgSize(bgSize)
    setBgPosition(bgPosition)
    console.log("BGSIZE", bgSize);
    console.log("bgPOSI", bgPosition);
    console.groupEnd();

  }


  return (
    <>
    { isSmall ?
      (<div style={
            {backgroundImage: `url(${mobileData ? mobileData.imageSrc : imageSrc})`,
              backgroundSize: `${mobileData ? bgSize : "cover"}` ,
              backgroundPosition: `${mobileData ? bgPosition: "center" }`,
             backgroundRepeat: "no-repeat"}} className={`BgImgMb ${classes}`}>
        {children}
      </div>)
      :
      (<div style={
            {backgroundImage: `url(${imageSrc})`,
             backgroundSize: bgSize,
             backgroundRepeat: "no-repeat",
             backgroundPosition: bgPosition}} className={classes}>
        {children}
      </div>)
    }
    </>
  )
}

export default CroppedImage;
