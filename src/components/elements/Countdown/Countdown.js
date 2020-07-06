import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './countdown.scss';

const Countdown = props =>{
  const finishedCountdownHandler = props.finishedAction ? props.finishedAction : () => {};
  const [countDown, setCountDown] = useState(null)
  const [loaded, setLoaded] = useState(null)
  const [finished, setFinished] = useState(null)


  useEffect(() => {
    const date = calculateCountdown(props.date);
    setLoaded(true)
    if (date){
      setCountDown(date);
    }

    const interval = setInterval(() => {
      const date = calculateCountdown(props.date);
      date ? setCountDown(date) : clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const finishedCountdown = () => {
    finishedCountdownHandler();
    setFinished(true);
  }


  const calculateCountdown = (endDate) => {

    const countDownDate = moment(endDate).unix() * 1000
    let diff = (Date.parse(new Date(countDownDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0){
      finishedCountdown();
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };


    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }
  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  return (
    <div className={`countDownWrapper ${loaded ? "visible" : "hidden"}`}>
      {countDown && !finished &&
        <div className="countDown">
          <div className="tempo">{countDown.days === 1 ? 'Dia' : 'Dias'}<p>{addLeadingZeros(countDown.days)}</p></div>
          <div className="tempo">Horas<p>{addLeadingZeros(countDown.hours)}</p></div>
          <div className="ponto">:</div>
          <div className="tempo">Minutos<p>{addLeadingZeros(countDown.min)}</p></div>
          <div className="ponto">:</div>
          <div className="tempo">Segundos<p>{addLeadingZeros(countDown.sec)}</p></div>
        </div>
      }
      <div className="children-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default Countdown;
