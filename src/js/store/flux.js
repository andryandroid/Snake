const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			direction: 4,
			snake: [[0,0]],
			xFood: 0,
			yFood: 0,
			gameOver: false,
			text:"",
			score:0
		},
		actions: {

            moveSnake: (coord) => {
				setStore({ snake: coord })
			},
            moveXFood: (coord) => {
				setStore({ xFood: coord })
			},
            moveYFood: (coord) => {
				setStore({ yFood: coord })
			},
			changeDirection: (newDirection) => {
				setStore({ direction: newDirection })
			},
			endGame: () => {
				setStore({ gameOver: true })
			},
			changeText: () => {
				setStore({ text: "GAME OVER" })
			},
			
			increaseScore: (newScore) => {
				setStore({ score: newScore })
			}
		}
	};
};

export default getState;


