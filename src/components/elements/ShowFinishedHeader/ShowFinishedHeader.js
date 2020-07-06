import React from 'react';
import CroppedImage from '../RenderCroppedImage/CroppedImage'

import './show_finished_header.scss';


const ShowFinishedHeader = ({event}) => {
  return (
    <CroppedImage
        imageSrc={event.images_dict.finished_cover.url}
        cropping={event.images_dict.finished_cover.cropping}
        containerHeight={600}
        classes="coverBg"
        mobile={{
          imageSrc: event.images_dict.finished_cover.mobile_url,
          cropping: event.images_dict.finished_cover.mobile_cropping,
          containerHeight: 200
        }}
        >
      <div className="coverContent">
        <div className="imageWrapper">
            <CroppedImage
                imageSrc={event.images_dict.finished_center_image.url}
                cropping={event.images_dict.finished_center_image.cropping}
                containerHeight={250}
                containerWidth={250}
                classes="imgBg"
                mobile={{
                  imageSrc: event.images_dict.finished_center_image.mobile_url,
                  cropping: event.images_dict.finished_center_image.mobile_cropping,
                  containerHeight: 80,
                  containerWidth: 80
                }}
              />
        </div>
        <h2>Obrigado pela presença!</h2>
        <h3>Esse show incrível foi feito para você.</h3>
      </div>
    </CroppedImage>
  )
}

export default ShowFinishedHeader;
