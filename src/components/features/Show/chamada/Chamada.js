import React, { useState } from "react";
import Botao from "../../../elements/Botao/Botao";
import moment from 'moment';
import './chamada.scss';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Countdown from '../../../elements/Countdown/Countdown'


const Chamada = props => {
   let havePrice = props.havePrice;
   let classFaixaEtaria = "faixa-etaria";
   if(havePrice) {
      classFaixaEtaria += ' mobile';
   }

   const current_event = props.currentEvent;
   const user = useSelector(state => state.user.data);
   const date = value => {
      return moment(value).format('DD/MM - HH:mm');
   };
   const [finishedCountdown, setFinishedCountdown] = useState(false)

   const countDownFinishedAction = () => {
     setFinishedCountdown(true)
   }

   return (
      <section className="boxChamada">
            <div className="content">
            { current_event &&
              <>
                <h3>{current_event.name}</h3>
                <p className="aoVivo">ao vivo</p>
                <p className="dataHora">{date(current_event.date)}h</p>
                <p className={classFaixaEtaria}>{`Classificação etária: ${current_event.age_rating}`}</p>
                {user.entity_id ?
                  <>
                    <Countdown finishedAction={countDownFinishedAction} date={current_event.date}>
                      {finishedCountdown ?
                        <Botao classes="red big"><Link to={`/eventos${current_event.url_name}`}>Assista agora</Link></Botao>
                        :
                        <Link to={`/eventos${current_event.url_name}`} className="btn red big">Ver Detalhes</Link>
                      }
                    </Countdown>
                  </>
                : <Botao classes="red big"><Link to="/cadastro">Cadastre-se</Link></Botao>}

              </>
             }
            </div>
      </section>
   );
};

export default Chamada;
