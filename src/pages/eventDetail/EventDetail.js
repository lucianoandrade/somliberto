import React, { useState } from "react";
import EventService from "../../service/event/event.service";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import Countdown from '../../components/elements/Countdown/Countdown';
import ShowFinishedHeader from '../../components/elements/ShowFinishedHeader/ShowFinishedHeader';
import CroppedImage from '../../components/elements/RenderCroppedImage/CroppedImage'
import "./eventDetail.scss";
import { useSelector } from "react-redux";
import moment from 'moment';
import Iframe from 'react-iframe';
import { Link } from "react-router-dom";
import ReactJWPlayer from "react-jw-player"

export default function () {

  const event = useSelector(store => store.siteInfo.current_event);
  const user = useSelector(state => state.user.data);
  const [isLiveFinished, setIsLiveFinished] = useState(false)


  const liveStarted = date => {
    const unixDate = moment(date).unix() * 1000
    let diff = (Date.parse(new Date(unixDate)) - Date.parse(new Date())) / 1000;
    if (diff > 0) {
      return false
    }else{
      return true
    }
  }

  const getIsLiveFinished = async () => {
    try {
      const response = await EventService.getIsLiveFinished(event.entity_id);
      setIsLiveFinished(response['is_finished'])
      return response['is_finished']
    } catch (error) {
      //return false
      throw new Error(error);
    }
  };
  const checkIsLiveFinished = (event) => {
     const interval = setInterval(() => {
      if (liveStarted(event.date)){
        getIsLiveFinished()
      }else{
        clearInterval(interval);
      }
    }, 30000);
  };

  const date = value => {
    return moment(value).format('DD/MM - HH:mm');
  };
  const transformEmbed = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <PageContainer>
      {event &&
        <section onLoad={checkIsLiveFinished(event)} className="container-evento">
          {user.email && liveStarted(event.date) ?
            <>
              {isLiveFinished || event.finished_live ?
                <ShowFinishedHeader event={event} />
                :
                <div className="headerPlayer">
                  <div className="player">
                    <ReactJWPlayer
                    image={event.images_dict.cover_home.url}
                    aspectRatio="currently"
                    playerId='event-player'
                    playerScript='https://cdn.jwplayer.com/libraries/nLJ43GyD.js'
                    file={event.video_player_url}
                    />
                  </div>
                </div>
              }
            </>
            :
              <div className="destaque">
                <CroppedImage
                    imageSrc={event.images_dict.cover.url}
                    cropping={event.images_dict.cover.cropping}
                    containerHeight={300}
                    classes="imgDestaque"

                    mobile={{
                      imageSrc: event.images_dict.cover.mobile_url,
                      cropping: event.images_dict.cover.mobile_cropping,
                      containerHeight: 350
                    }}
                  >
                  <div className="imgDestaque-content">
                    <h2>{event.name}</h2>
                  </div>
                </CroppedImage>
              </div>
          }
          <div className="content">
            <Link to="/" className="voltar">{"<< Voltar"}</Link>
            <h3 className="artista">{event.name}</h3>
            <p className="classificacao">{`Classificação etária: ${event.age_rating}`}</p>
            <div className="descricao" dangerouslySetInnerHTML={{__html:event.description}}>
            </div>
            <div className="date">{date(event.date)}h</div>
            <h4 className="title">{event.highlight_text}</h4>
            {event.video_url &&
              <Iframe
                className="iframe"
                title={event.name}
                src={transformEmbed(event.video_url)}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            }

          </div>
          {!user.email && !liveStarted(event.date) ?
            <>
              <div className="infoData">O show começará em</div>
              <CroppedImage
                  imageSrc={event.images_dict.countdown_image.url}
                  cropping={event.images_dict.countdown_image.cropping}
                  containerHeight={110}
                  classes="contador"
                  mobile={{
                    imageSrc: event.images_dict.countdown_image.mobile_url,
                    cropping: event.images_dict.countdown_image.mobile_cropping,
                    containerHeight: 110
                  }}
                >
                <Countdown date={event.date}/>
              </CroppedImage>
            </>
            : <div className="vazio"></div>
          }
        </section>
      }
    </PageContainer>
  );
}
