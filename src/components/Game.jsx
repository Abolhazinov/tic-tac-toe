import Board from "./Board";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import "./styles/Game.css"

export default function Game() {
    const [xIsNext, setxIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [modalActive, setModalActive] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [history, setHistory] = useState([{ squares: squares, xIsNext: xIsNext }]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (history.length > 1)
            setShowButton(false);
    }, [history]);
    const compareArrays = (a, b) =>
        a.length === b.length &&
        a.every((element, index) => element === b[index]);

    function makeMove(newSquares) {
        if (history.length > 0 && history[currentStep + 1] && compareArrays(history[currentStep + 1].squares, newSquares)) {
            setSquares(newSquares);
            setxIsNext(!xIsNext);
            setCurrentStep(currentStep + 1);
            return;
        }

        setHistory([...history.slice(0, currentStep + 1), { squares: newSquares, xIsNext: !xIsNext }]);
        setCurrentStep(currentStep + 1);

        setSquares(newSquares);
        setxIsNext(!xIsNext);
    }

    function jumpTo(step) {
        setCurrentStep(step);
        setSquares(history[step].squares);
        setxIsNext(history[step].xIsNext);
    }

    function changePlayer(newNext) {
        setModalActive(false);
        setShowButton(false);
        setxIsNext(newNext);
        setHistory([{ squares: squares, xIsNext: newNext }]);
    }
    function restartGame() {
        setSquares(Array(9).fill(null));
        setxIsNext(true);
        setHistory([{ squares: squares, xIsNext: true }]);
        setCurrentStep(0);
        setShowButton(true);
    }


    return (
        <div>
            <div>{showButton && <button className='open-btn' onClick={() => { setModalActive(true); setShowButton(!showButton); }}>Choose who turns first</button>}</div>
            <div className="arena">
                <Board className="arena-item" squares={squares} history={history} xIsNext={xIsNext} makeMove={makeMove} jumpTo={jumpTo} />
                <div className="arena-item">
                    <div>
                        <button onClick={restartGame}>Restart</button>
                    </div> 
                    {history.map((_, move) => <div><button key={move} onClick={() => jumpTo(move)}>Move {move}</button></div>)}
                </div>
            </div>

            <div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <div className="modal-content">
                        <h2>Choose who turns first</h2>
                        <div className="button-container">
                            <button className="choice-button x-button" onClick={() => changePlayer(true)}>X</button>
                            <button className="choice-button o-button" onClick={() => changePlayer(false)}>O</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}