'use client';

import { useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;
const CELL = 26;

const SHAPES = {
  I: { color: '#823F8F', blocks: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  J: { color: '#373D81', blocks: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  L: { color: '#1E326E', blocks: [[2, 0], [0, 1], [1, 1], [2, 1]] },
  O: { color: '#5A468C', blocks: [[1, 0], [2, 0], [1, 1], [2, 1]] },
  S: { color: '#a05cae', blocks: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  T: { color: '#4a4a9e', blocks: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  Z: { color: '#6f2d78', blocks: [[0, 0], [1, 0], [1, 1], [2, 1]] },
};
const KEYS = Object.keys(SHAPES);

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPiece() {
  const key = KEYS[Math.floor(Math.random() * KEYS.length)];
  const shape = SHAPES[key];
  return { blocks: shape.blocks.map(([x, y]) => ({ x, y })), color: shape.color, x: 3, y: -1 };
}

function rotate(piece) {
  const cx = 1.5;
  const cy = 1.5;
  const blocks = piece.blocks
    .map(({ x, y }) => ({ x: cx + (y - cy), y: cy - (x - cx) }))
    .map(({ x, y }) => ({ x: Math.round(x), y: Math.round(y) }));
  return { ...piece, blocks };
}

function collides(board, piece, offX = 0, offY = 0, blocks = piece.blocks) {
  return blocks.some(({ x, y }) => {
    const nx = piece.x + x + offX;
    const ny = piece.y + y + offY;
    if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
    if (ny < 0) return false;
    return board[ny][nx];
  });
}

export default function TetrisGame({ onClose }) {
  const canvasRef = useRef(null);
  const boardRef = useRef(emptyBoard());
  const pieceRef = useRef(randomPiece());
  const nextRef = useRef(randomPiece());
  const dropTimerRef = useRef(0);
  const dropIntervalRef = useRef(700);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const gameOverRef = useRef(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;

    function draw() {
      ctx.fillStyle = '#0e1030';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const board = boardRef.current;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (board[y][x]) {
            drawCell(ctx, x, y, board[y][x]);
          }
        }
      }

      const piece = pieceRef.current;
      piece.blocks.forEach(({ x, y }) => {
        const px = piece.x + x;
        const py = piece.y + y;
        if (py >= 0) drawCell(ctx, px, py, piece.color);
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, ROWS * CELL);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(COLS * CELL, y * CELL);
        ctx.stroke();
      }
    }

    function drawCell(ctx, x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    }

    function lockPiece() {
      const board = boardRef.current;
      const piece = pieceRef.current;
      piece.blocks.forEach(({ x, y }) => {
        const bx = piece.x + x;
        const by = piece.y + y;
        if (by >= 0) board[by][bx] = piece.color;
      });

      let cleared = 0;
      for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(Boolean)) {
          board.splice(y, 1);
          board.unshift(Array(COLS).fill(null));
          cleared++;
          y++;
        }
      }
      if (cleared > 0) {
        setScore((s) => s + [0, 100, 300, 500, 800][cleared]);
        setLines((l) => {
          const total = l + cleared;
          dropIntervalRef.current = Math.max(120, 700 - Math.floor(total / 10) * 60);
          return total;
        });
      }

      pieceRef.current = nextRef.current;
      pieceRef.current.x = 3;
      pieceRef.current.y = -1;
      nextRef.current = randomPiece();

      if (collides(board, pieceRef.current)) {
        gameOverRef.current = true;
        setGameOver(true);
      }
    }

    function tick(time) {
      if (gameOverRef.current) return;
      if (!paused) {
        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;
        dropTimerRef.current += delta;
        if (dropTimerRef.current > dropIntervalRef.current) {
          dropTimerRef.current = 0;
          const board = boardRef.current;
          const piece = pieceRef.current;
          if (!collides(board, piece, 0, 1)) {
            piece.y += 1;
          } else {
            lockPiece();
          }
        }
        draw();
      } else {
        lastTimeRef.current = time;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function handleKey(e) {
      if (gameOverRef.current) return;
      const board = boardRef.current;
      const piece = pieceRef.current;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        setPaused((p) => !p);
        return;
      }
      if (paused) return;
      if (e.key === 'ArrowLeft' && !collides(board, piece, -1, 0)) piece.x -= 1;
      if (e.key === 'ArrowRight' && !collides(board, piece, 1, 0)) piece.x += 1;
      if (e.key === 'ArrowDown' && !collides(board, piece, 0, 1)) piece.y += 1;
      if (e.key === 'ArrowUp') {
        const rotated = rotate(piece);
        if (!collides(board, piece, 0, 0, rotated.blocks)) {
          piece.blocks = rotated.blocks;
        }
      }
      if (e.key === ' ') {
        e.preventDefault();
        while (!collides(board, piece, 0, 1)) piece.y += 1;
        lockPiece();
      }
      draw();
    }

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(rafRef.current);
    };
  }, [paused, onClose]);

  function restart() {
    boardRef.current = emptyBoard();
    pieceRef.current = randomPiece();
    nextRef.current = randomPiece();
    dropIntervalRef.current = 700;
    gameOverRef.current = false;
    setScore(0);
    setLines(0);
    setGameOver(false);
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(10, 10, 30, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'monospace',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
        <span>Puntaje: {score}</span>
        <span>Líneas: {lines}</span>
        <span style={{ opacity: 0.6 }}>← → ↓ ↑ girar · espacio caída rápida · P pausa · Esc salir</span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: '2px solid #823F8F', borderRadius: '4px', boxShadow: '0 0 40px rgba(130,63,143,0.4)' }}
      />
      {gameOver && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>Game over — puntaje final: {score}</p>
          <button
            onClick={restart}
            style={{
              padding: '8px 16px',
              background: '#823F8F',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: 8,
            }}
          >
            Jugar de nuevo
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cerrar
          </button>
        </div>
      )}
      {paused && !gameOver && <p>⏸ Pausado — presioná P para seguir</p>}
    </div>
  );
}