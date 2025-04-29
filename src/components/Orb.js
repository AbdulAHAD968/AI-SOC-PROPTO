import React, { useEffect, useRef, useState } from 'react';

const HackerDisplay = () => {
  const hackerCanvasRef = useRef(null);
  const barsCanvasRef = useRef(null);
  const consoleRef = useRef(null);
  
  const [squares, setSquares] = useState([]);
  const [barVals, setBarVals] = useState([]);
  const [focal, setFocal] = useState(0);
  const [vpx, setVpx] = useState(0);
  const [vpy, setVpy] = useState(0);
  
  // Console text data
  const commandStart = [
    'Performing DNS Lookups for', 
    'Searching ', 
    'Analyzing ', 
    'Estimating Approximate Location of ', 
    'Compressing ', 
    'Requesting Authorization From : ', 
    'wget -a -t ', 
    'tar -xzf ', 
    'Entering Location ', 
    'Compilation Started of ',
    'Downloading '
  ];
  
  const commandParts = [
    'Data Structure', 
    'http://wwjd.com?au&2', 
    'Texture', 
    'TPS Reports', 
    ' .... Searching ... ', 
    'http://zanb.se/?23&88&far=2', 
    'http://ab.ret45-33/?timing=1ww'
  ];
  
  const commandResponses = [
    'Authorizing ', 
    'Authorized...', 
    'Access Granted..', 
    'Going Deeper....', 
    'Compression Complete.', 
    'Compilation of Data Structures Complete..', 
    'Entering Security Console...', 
    'Encryption Unsuccesful Attempting Retry...', 
    'Waiting for response...', 
    '....Searching...', 
    'Calculating Space Requirements '
  ];

  class Point {
    constructor(pos, canvasWidth, canvasHeight) {
      this.x = pos.x - canvasWidth / 2 || 0;
      this.y = pos.y - canvasHeight / 2 || 0;
      this.z = pos.z || 0;

      this.cX = 0;
      this.cY = 0;
      this.cZ = 0;

      this.xPos = 0;
      this.yPos = 0;
      this.map2D(focal, vpx, vpy);
    }

    rotateZ(angleZ) {
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);
      const x1 = this.x * cosZ - this.y * sinZ;
      const y1 = this.y * cosZ + this.x * sinZ;

      this.x = x1;
      this.y = y1;
    }

    map2D(focal, vpx, vpy) {
      const scaleX = focal / (focal + this.z + this.cZ);
      const scaleY = focal / (focal + this.z + this.cZ);

      this.xPos = vpx + (this.cX + this.x) * scaleX;
      this.yPos = vpy + (this.cY + this.y) * scaleY;
    }
  }

  class Square {
    constructor(z, canvasWidth, canvasHeight) {
      this.width = canvasWidth / 2;
      if (canvasHeight < 200) {
        this.width = 200;
      }
      this.height = canvasHeight;
      z = z || 0;

      this.points = [
        new Point({
          x: (canvasWidth / 2) - this.width,
          y: (canvasHeight / 2) - this.height,
          z: z
        }, canvasWidth, canvasHeight),
        new Point({
          x: (canvasWidth / 2) + this.width,
          y: (canvasHeight / 2) - this.height,
          z: z
        }, canvasWidth, canvasHeight),
        new Point({
          x: (canvasWidth / 2) + this.width,
          y: (canvasHeight / 2) + this.height,
          z: z
        }, canvasWidth, canvasHeight),
        new Point({
          x: (canvasWidth / 2) - this.width,
          y: (canvasHeight / 2) + this.height,
          z: z
        }, canvasWidth, canvasHeight)
      ];
      this.dist = 0;
    }

    update(ctx, focal, vpx, vpy) {
      for (let p = 0; p < this.points.length; p++) {
        this.points[p].rotateZ(0.001);
        this.points[p].z -= 3;
        if (this.points[p].z < -300) {
          this.points[p].z = 2700;
        }
        this.points[p].map2D(focal, vpx, vpy);
      }
    }

    render(ctx, focal) {
      ctx.beginPath();
      ctx.moveTo(this.points[0].xPos, this.points[0].yPos);
      for (let p = 1; p < this.points.length; p++) {
        if (this.points[p].z > -(focal - 50)) {
          ctx.lineTo(this.points[p].xPos, this.points[p].yPos);
        }
      }

      ctx.closePath();
      ctx.stroke();

      this.dist = this.points[this.points.length - 1].z;
    }
  }

  const initCanvas = () => {
    const hackerCanvas = hackerCanvasRef.current;
    const barsCanvas = barsCanvasRef.current;
    const consoleElement = consoleRef.current;

    if (!hackerCanvas || !barsCanvas || !consoleElement) return;

    const hackerCtx = hackerCanvas.getContext('2d');
    const barsCtx = barsCanvas.getContext('2d');

    // Set canvas sizes
    hackerCanvas.width = (window.innerWidth / 3) * 2;
    hackerCanvas.height = window.innerHeight / 3;

    barsCanvas.width = window.innerWidth / 3;
    barsCanvas.height = hackerCanvas.height;

    // Set console styles
    consoleElement.style.height = (window.innerHeight / 3) * 2 + 'px';
    consoleElement.style.top = window.innerHeight / 3 + 'px';

    // Set initial values
    const newFocal = hackerCanvas.width / 2;
    const newVpx = hackerCanvas.width / 2;
    const newVpy = hackerCanvas.height / 2;

    setFocal(newFocal);
    setVpx(newVpx);
    setVpy(newVpy);

    // Initialize squares
    const newSquares = [];
    for (let i = 0; i < 15; i++) {
      newSquares.push(new Square(-300 + (i * 200), hackerCanvas.width, hackerCanvas.height));
    }
    setSquares(newSquares);

    // Set styles
    hackerCtx.strokeStyle = '#00FF00';
    barsCtx.strokeStyle = '#00FF00';
    barsCtx.fillStyle = '#00FF00';

    // Start animations
    render(hackerCtx, barsCtx);
    consoleOutput(consoleElement);
  };

  const render = (hackerCtx, barsCtx) => {
    if (!hackerCanvasRef.current || !barsCanvasRef.current) return;

    hackerCtx.clearRect(0, 0, hackerCanvasRef.current.width, hackerCanvasRef.current.height);

    // Sort and render squares
    const sortedSquares = [...squares].sort((a, b) => b.dist - a.dist);
    for (let i = 0, len = sortedSquares.length; i < len; i++) {
      sortedSquares[i].update(hackerCtx, focal, vpx, vpy);
      sortedSquares[i].render(hackerCtx, focal);
    }

    // Render bars
    barsCtx.clearRect(0, 0, barsCanvasRef.current.width, barsCanvasRef.current.height);
    barsCtx.beginPath();
    const y = barsCanvasRef.current.height / 6;
    barsCtx.moveTo(0, y);

    for (let i = 0; i < barsCanvasRef.current.width; i++) {
      let ran = (Math.random() * 20) - 10;
      if (Math.random() > 0.98) {
        ran = (Math.random() * 50) - 25;
      }
      barsCtx.lineTo(i, y + ran);
    }
    barsCtx.stroke();

    // Update and render bar values
    const newBarVals = [...barVals];
    for (let i = 0; i < barsCanvasRef.current.width; i += 20) {
      if (!newBarVals[i]) {
        newBarVals[i] = {
          val: Math.random() * (barsCanvasRef.current.height / 2),
          freq: 0.1,
          sineVal: Math.random() * 100
        };
      }

      newBarVals[i].sineVal += newBarVals[i].freq;
      newBarVals[i].val += Math.sin(newBarVals[i].sineVal * Math.PI / 2) * 5;
      barsCtx.fillRect(i + 5, barsCanvasRef.current.height, 15, -newBarVals[i].val);
    }
    setBarVals(newBarVals);

    requestAnimationFrame(() => render(hackerCtx, barsCtx));
  };

  const consoleOutput = (consoleElement) => {
    if (!consoleElement) return;

    const textEl = document.createElement('p');
    const isProcessing = Math.random() > 0.7; // Simulate processing state

    if (isProcessing) {
      const spanEl = document.createElement('span');
      spanEl.textContent = Math.random() + " ";
      consoleElement.appendChild(spanEl);
    } else {
      const commandType = Math.floor(Math.random() * 4);
      switch (commandType) {
        case 0:
          textEl.textContent = commandStart[Math.floor(Math.random() * commandStart.length)] + 
                              commandParts[Math.floor(Math.random() * commandParts.length)];
          break;
        case 3:
          // Simulate processing
          break;
        default:
          textEl.textContent = commandResponses[Math.floor(Math.random() * commandResponses.length)];
          break;
      }
      consoleElement.appendChild(textEl);
    }

    consoleElement.scrollTop = consoleElement.scrollHeight;

    // Clean up old nodes
    if (consoleElement.scrollHeight > window.innerHeight) {
      const removeNodes = consoleElement.querySelectorAll('*');
      for (let n = 0; n < Math.floor(removeNodes.length / 3); n++) {
        consoleElement.removeChild(removeNodes[n]);
      }
    }

    setTimeout(() => consoleOutput(consoleElement), Math.floor(Math.random() * 200));
  };

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      const hackerCanvas = hackerCanvasRef.current;
      const barsCanvas = barsCanvasRef.current;
      const consoleElement = consoleRef.current;

      if (!hackerCanvas || !barsCanvas || !consoleElement) return;

      hackerCanvas.width = (window.innerWidth / 3) * 2;
      hackerCanvas.height = window.innerHeight / 3;

      barsCanvas.width = window.innerWidth / 3;
      barsCanvas.height = hackerCanvas.height;

      consoleElement.style.height = (window.innerHeight / 3) * 2 + 'px';
      consoleElement.style.top = window.innerHeight / 3 + 'px';

      const newFocal = hackerCanvas.width / 2;
      const newVpx = hackerCanvas.width / 2;
      const newVpy = hackerCanvas.height / 2;

      setFocal(newFocal);
      setVpx(newVpx);
      setVpy(newVpy);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'Source Code Pro', monospace",
      backgroundColor: '#000',
      color: '#00FF00',
      margin: 0,
      padding: '10px',
      fontSize: '13px',
      position: 'relative',
      height: '100vh',
      width: '77vw',
      overflow: 'hidden',
      borderRadius: '10px',
    }}>
      <canvas 
        ref={hackerCanvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }} 
      />
      <canvas 
        ref={barsCanvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: '66.6%'
        }} 
      />
      <div 
        ref={consoleRef} 
        className="output-console" 
        style={{
          position: 'fixed',
          overflow: 'hidden',
          color: '#00FF00'
        }}
      />
    </div>
  );
};

export default HackerDisplay;