"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon, RefreshCcwIcon } from "lucide-react";

const GameState = Object.freeze({
    START: "START",
    PAUSE: "PAUSE",
    RUNNING: "RUNNING",
    GAME_OVER: "GAME_OVER",
});

const Direction = Object.freeze({
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
});

const initSnake = [{ x: 0, y: 0 }]
const initFood = { x: 5, y: 5 }

export default function SnakeGame() {
    const [gameState, setGameState] = useState(GameState.START);
    const [snake, setSnake] = useState(initSnake)
    const [food, setFood] = useState(initFood)
    const [direction, setDirection] = useState(Direction.RIGHT)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const gameInterval = useRef(null)

    const moveSnake = useCallback(() => {
        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = newSnake[0];
            let newHead;

            switch (direction) {
                case Direction.UP:
                    newHead = { x: head.x, y: head.y - 1 };
                    break;
                case Direction.DOWN:
                    newHead = { x: head.x, y: head.y + 1 };
                    break;
                case Direction.LEFT:
                    newHead = { x: head.x - 1, y: head.y };
                    break;
                case Direction.RIGHT:
                    newHead = { x: head.x + 1, y: head.y };
                    break;
                default:
                    return newSnake;
            }

            newSnake.unshift(newHead);
            if (newHead.x === food.x && newHead.y === food.y) {
                setFood({
                    x: Math.floor(Math.random() * 10),
                    y: Math.floor(Math.random() * 10),
                });
                setScore((prevScore) => prevScore + 1);
            } else newSnake.pop();
            return newSnake;
        });
    }, [direction, food]);


    const handleKeyPress = useCallback((e) => {
        switch (e.key) {
            case "ArrowUp":
                if (direction !== Direction.DOWN) setDirection(Direction.UP);
                break
            case "ArrowDown":
                if (direction !== Direction.UP) setDirection(Direction.DOWN);
                break
            case "ArrowLeft":
                if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
                break
            case "ArrowRight":
                if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
                break
        }
    }, [direction]);

    useEffect(() => {
        if (gameState === GameState.RUNNING) {
            gameInterval.current = setInterval(moveSnake, 200);
            document.addEventListener("keydown", handleKeyPress);
        } else {
            if (gameInterval.current) clearInterval(gameInterval.current);
            document.removeEventListener("keydown", handleKeyPress);
        }

        return () => {
            if (gameInterval.current) clearInterval(gameInterval.current);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [gameState, moveSnake, handleKeyPress]);


    const startGame = () => {
        setSnake(initSnake);
        setFood(initFood);
        setScore(0);
        setDirection(Direction.RIGHT);
        setGameState(GameState.RUNNING);
    };

    const pauseGame = () => {
        setGameState(
            gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
        );
    };


    const resetGame = () => {
        setGameState(GameState.START);
        setSnake(initSnake);
        setFood(initFood);
        setScore(0);
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]">
            <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold text-[#FF00FF]">Snake Game</div>
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#00FFFF]"
                            onClick={startGame}
                        >
                            <PlayIcon className="w-6 h-6" />
                            <span className="sr-only">Start</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#00FFFF]"
                            onClick={pauseGame}
                        >
                            <PauseIcon className="w-6 h-6" />
                            <span className="sr-only">Pause/Resume</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#00FFFF]"
                            onClick={resetGame}
                        >
                            <RefreshCcwIcon className="w-6 h-6" />
                            <span className="sr-only">Reset</span>
                        </Button>
                    </div>
                </div>
                <div className="bg-[#0F0F0F] rounded-lg p-4 grid grid-cols-10 gap-1">
                    {Array.from({ length: 100 }).map((_, i) => {
                        const x = i % 10;
                        const y = Math.floor(i / 10);
                        const isSnakePart = snake.some(
                            (part) => part.x === x && part.y === y
                        );
                        const isFood = food.x === x && food.y === y;
                        return (
                            <div
                                key={i}
                                className={`w-5 h-5 rounded-sm ${isSnakePart
                                    ? "bg-[#FF00FF]"
                                    : isFood
                                        ? "bg-[#00FFFF]"
                                        : "bg-[#1E1E1E]"
                                    }`}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center justify-between mt-6 text-[#00FFFF]">
                    <div>Score: {score}</div>
                    <div>High Score: {highScore}</div>
                </div>
            </div>
        </div>
    );
}
