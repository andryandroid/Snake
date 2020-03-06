import React, { useEffect, useContext  } from 'react';
import { Context } from "../store/appContext";
import '../../styles/game.css';

export const Game = props => {
  
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.moveXFood(getRandom(0,30)*10);
    actions.moveYFood(getRandom(0,30)*10);
    actions.moveSnake([[getRandom(0,30)*10,getRandom(0,30)*10]]);
    setInterval(moving, 150);
  },[]);

  function moving() {
    var array = [...store.snake];
      
    if (store.direction===1){
      array.unshift([store.snake[0][0],store.snake[0][1]-10]);
    }
    if (store.direction===2){
      array.unshift([store.snake[0][0],store.snake[0][1]+10]);
    }
    if (store.direction===3){   
      array.unshift([store.snake[0][0]-10,store.snake[0][1]]);
    }
    if (store.direction===4){
      array.unshift([store.snake[0][0]+10,store.snake[0][1]]);
    }
    array.pop();
    actions.moveSnake(array);
    checkIfAte();
    checkIfCrashed();
  }
  
  function gameOver() {
    actions.endGame();
    actions.moveXFood(-10);
    actions.moveYFood(-10);
    actions.moveSnake([[-100,-100]]);
    actions.changeText();
  }

  function checkIfCrashed() {
    
    if (store.snake[0][0]>=300 || store.snake[0][0]<0 || store.snake[0][1]>=300 || store.snake[0][1]<0){
      gameOver();
    }
      
    var list = store.snake.slice();
    list.shift();
    var i=0;
    for (i=0;i<list.length;i++){
      if (store.snake[0][0]===list[i][0] && store.snake[0][1]===list[i][1] ){
        gameOver();
      }
    }
  }

  function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  function checkIfAte() {

    if (store.xFood===store.snake[0][0] && store.yFood===store.snake[0][1]){
      var newFood = true;
      while (newFood){
        var j = 0;
        var x = getRandom(0,30)*10;
        var y = getRandom(0,30)*10;
        for (j=0;j<store.snake.length;j++){
          if (x===store.snake[j][0] && y===store.snake[j][1] ){
            newFood = true;
          }
        }
        break;
      }
      actions.moveXFood(x);
      actions.moveYFood(y);

      var growUp = [...store.snake];
      
      if (store.direction===1){
        growUp.unshift([store.snake[0][0],store.snake[0][1]-10]);
      }
      if (store.direction===2){
        growUp.unshift([store.snake[0][0],store.snake[0][1]+10]);
      }
      if (store.direction===3){   
        growUp.unshift([store.snake[0][0]-10,store.snake[0][1]]);
      }
      if (store.direction===4){
        growUp.unshift([store.snake[0][0]+10,store.snake[0][1]]);
      }
      actions.moveSnake(growUp);
      actions.increaseScore(store.score+10);
    }
  }
  
  document.onkeydown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        actions.changeDirection(1);
        break;
      case 40:
        actions.changeDirection(2);
        break;
      case 37:
        actions.changeDirection(3);
        break;
      case 39:
        actions.changeDirection(4);
        break;
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="table">
              {!!store.snake && store.snake.map((item, i) => {
                return (
                  <div key={i}  className="snake" style={{ left: item[0] + "px" , top: item[1] + "px"}}>
                  </div>
                );
              })}
              <div className="food" style={{ left: store.xFood + "px" , top: store.yFood + "px"}}>
              </div>
              <h1>{store.text}</h1>
            </div>  
          </div>
          <div className="col">
            <h2>Score: {store.score}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Instrucciones del Juego</h3>
            <p>El objetivo es obtener puntos al aumentar de tamaño al alimentar la culebrita.</p>
            <p>Tienes que cuidarte de no estrellarte con el borde o con el cuerpo de la culebrita.</p>
            <p>Juega con las teclas de flechas del teclado.</p>
          </div>
        </div>
      </div> 
    </div>
  );
}