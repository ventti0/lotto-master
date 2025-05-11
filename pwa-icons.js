// PWA 아이콘 생성을 위한 스크립트
// 이 파일은 Canvas API를 사용하여 로또 테마의 아이콘을 생성합니다

// 이 스크립트를 Node.js로 실행하려면:
// 1. npm install canvas fs
// 2. node pwa-icons.js

// ES Module 형식 (package.json의 "type": "module"과 호환)
import { createCanvas } from 'canvas';
import fs from 'fs';

function createLottoIcon(size) {
  // 캔버스 생성
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // 배경
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#4f46e5');  // 인디고
  gradient.addColorStop(1, '#9333ea');  // 퍼플
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // 로또 공 그리기
  const ballSize = size * 0.6;
  const ballX = size/2;
  const ballY = size/2;
  
  // 로또 공 그라데이션
  const ballGradient = ctx.createLinearGradient(
    ballX - ballSize/2, 
    ballY - ballSize/2,
    ballX + ballSize/2,
    ballY + ballSize/2
  );
  ballGradient.addColorStop(0, '#fde047');  // 밝은 노랑
  ballGradient.addColorStop(1, '#eab308');  // 진한 노랑
  
  // 로또 공 그리기
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize/2, 0, Math.PI * 2);
  ctx.fillStyle = ballGradient;
  ctx.fill();
  
  // 행운의 숫자 7 넣기
  ctx.font = `bold ${size * 0.3}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('7', size/2, size/2);
  
  // 하이라이트
  ctx.beginPath();
  ctx.arc(ballX - ballSize/4, ballY - ballSize/4, ballSize/8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fill();
  
  return canvas.toBuffer();
}

// 아이콘 생성 및 저장
try {
  // 192x192 아이콘 생성
  const icon192 = createLottoIcon(192);
  fs.writeFileSync('public/pwa-192x192.png', icon192);
  console.log('Created 192x192 icon');

  // 512x512 아이콘 생성
  const icon512 = createLottoIcon(512);
  fs.writeFileSync('public/pwa-512x512.png', icon512);
  console.log('Created 512x512 icon');
  
  // Apple Touch Icon (180x180)
  const iconApple = createLottoIcon(180);
  fs.writeFileSync('public/apple-touch-icon.png', iconApple);
  console.log('Created Apple touch icon');
  
} catch (error) {
  console.error('Error creating icons:', error);
}
