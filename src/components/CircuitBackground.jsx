import React, { useEffect, useRef, useCallback } from 'react';

/**
 * CircuitBackground - Pixel-perfect recreation of the tech circuit background
 * 
 * Visual Specifications (extracted from reference):
 * - Background: Deep navy radial gradient (#050d18 → #0a1628 → #0f2744)
 * - Circuit pattern: Angular lines at 45°/90°, symmetric, edge-heavy
 * - Particles: Outlined triangles, solid dots, dust particles
 * - Motion: Slow ambient drift, multi-layer parallax
 */

// COLOR CONSTANTS - Exact values from reference image
const COLORS = {
  // Background gradient stops
  bgDarkest: '#050d18',
  bgDark: '#0a1628',
  bgMid: '#0d1f35',
  bgLight: '#0f2744',
  
  // Circuit pattern
  circuitLine: 'rgba(26, 74, 110, 0.22)',
  circuitNode: 'rgba(45, 106, 138, 0.35)',
  circuitGlow: 'rgba(61, 140, 181, 0.15)',
  
  // Particles
  triangleStroke: '#5ba3c0',
  triangleStrokeLight: '#7ec8e3',
  dotPrimary: '#4a7a94',
  dotSecondary: '#6ba3c0',
  dotGlow: 'rgba(91, 163, 192, 0.4)',
  dustParticle: 'rgba(91, 163, 192, 0.25)',
};

// PARTICLE CONFIGURATION

const PARTICLE_CONFIG = {
  triangles: {
    count: 7,
    sizeRange: [12, 28],
    strokeWidth: 1.5,
    opacityRange: [0.4, 0.75],
    speedRange: [0.08, 0.18],
    rotationSpeed: 0.0003,
  },
  dots: {
    count: 12,
    sizeRange: [3, 8],
    opacityRange: [0.3, 0.7],
    speedRange: [0.05, 0.12],
    glowRadius: 8,
  },
  dust: {
    count: 40,
    sizeRange: [1, 2.5],
    opacityRange: [0.1, 0.3],
    speedRange: [0.02, 0.06],
  },
};

// UTILITY FUNCTIONS
const lerp = (a, b, t) => a + (b - a) * t;
const randomRange = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(randomRange(min, max + 1));

// CIRCUIT PATTERN GENERATOR
class CircuitPattern {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.paths = [];
    this.nodes = [];
    this.generatePattern();
  }

  generatePattern() {
    const gridSize = 60;
    const cols = Math.ceil(this.width / gridSize) + 2;
    const rows = Math.ceil(this.height / gridSize) + 2;

    // Generate circuit paths
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        
        // Calculate distance from center for opacity falloff
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const distFromCenter = Math.sqrt(
          Math.pow((x - centerX) / this.width, 2) + 
          Math.pow((y - centerY) / this.height, 2)
        );
        
        // More visible at edges, fading toward center
        const edgeFactor = Math.min(1, distFromCenter * 1.8);
        
        if (Math.random() > 0.6) {
          // Horizontal lines
          if (Math.random() > 0.5) {
            this.paths.push({
              type: 'line',
              x1: x,
              y1: y,
              x2: x + gridSize * randomRange(0.5, 2),
              y2: y,
              opacity: edgeFactor * randomRange(0.15, 0.3),
            });
          }
          
          // Vertical lines
          if (Math.random() > 0.5) {
            this.paths.push({
              type: 'line',
              x1: x,
              y1: y,
              x2: x,
              y2: y + gridSize * randomRange(0.5, 2),
              opacity: edgeFactor * randomRange(0.15, 0.3),
            });
          }
          
          // 45° diagonal lines
          if (Math.random() > 0.7) {
            const diagLen = gridSize * randomRange(0.3, 1.2);
            const dir = Math.random() > 0.5 ? 1 : -1;
            this.paths.push({
              type: 'line',
              x1: x,
              y1: y,
              x2: x + diagLen,
              y2: y + diagLen * dir,
              opacity: edgeFactor * randomRange(0.12, 0.25),
            });
          }
        }
        
        // Circuit nodes (small squares/circles at intersections)
        if (Math.random() > 0.85 && edgeFactor > 0.3) {
          this.nodes.push({
            x,
            y,
            size: randomRange(2, 4),
            opacity: edgeFactor * randomRange(0.2, 0.4),
          });
        }
      }
    }

    // Add angular connector paths (hexagonal style)
    this.generateAngularPaths();
  }

  generateAngularPaths() {
    const pathCount = 25;
    
    for (let i = 0; i < pathCount; i++) {
      const startX = randomRange(0, this.width);
      const startY = randomRange(0, this.height);
      const segments = randomInt(3, 6);
      
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const distFromCenter = Math.sqrt(
        Math.pow((startX - centerX) / this.width, 2) + 
        Math.pow((startY - centerY) / this.height, 2)
      );
      const edgeFactor = Math.min(1, distFromCenter * 2);
      
      let currentX = startX;
      let currentY = startY;
      
      for (let s = 0; s < segments; s++) {
        const angle = (Math.floor(Math.random() * 8) * 45) * (Math.PI / 180);
        const length = randomRange(30, 100);
        const nextX = currentX + Math.cos(angle) * length;
        const nextY = currentY + Math.sin(angle) * length;
        
        this.paths.push({
          type: 'line',
          x1: currentX,
          y1: currentY,
          x2: nextX,
          y2: nextY,
          opacity: edgeFactor * randomRange(0.1, 0.22),
        });
        
        currentX = nextX;
        currentY = nextY;
      }
    }
  }

  draw(ctx) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw paths
    this.paths.forEach(path => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(26, 74, 110, ${path.opacity})`;
      ctx.lineWidth = 1;
      ctx.moveTo(path.x1, path.y1);
      ctx.lineTo(path.x2, path.y2);
      ctx.stroke();
    });
    
    // Draw nodes
    this.nodes.forEach(node => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(45, 106, 138, ${node.opacity})`;
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

// PARTICLE CLASSES
class Triangle {
  constructor(width, height) {
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    this.width = width;
    this.height = height;
    this.size = randomRange(...PARTICLE_CONFIG.triangles.sizeRange);
    this.x = initial ? randomRange(0, width) : randomRange(-50, width + 50);
    this.y = initial ? randomRange(0, height) : randomRange(-50, height + 50);
    this.rotation = randomRange(0, Math.PI * 2);
    this.rotationDir = Math.random() > 0.5 ? 1 : -1;
    this.opacity = randomRange(...PARTICLE_CONFIG.triangles.opacityRange);
    this.speed = randomRange(...PARTICLE_CONFIG.triangles.speedRange);
    this.vx = randomRange(-0.3, 0.3) * this.speed;
    this.vy = randomRange(-0.2, 0.1) * this.speed;
    this.strokeWidth = PARTICLE_CONFIG.triangles.strokeWidth;
    this.color = Math.random() > 0.5 ? COLORS.triangleStroke : COLORS.triangleStrokeLight;
    this.parallaxDepth = randomRange(0.8, 1.2);
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime * this.parallaxDepth;
    this.y += this.vy * deltaTime * this.parallaxDepth;
    this.rotation += PARTICLE_CONFIG.triangles.rotationSpeed * this.rotationDir * deltaTime;
    
    // Wrap around screen with padding
    const padding = 60;
    if (this.x < -padding) this.x = this.width + padding;
    if (this.x > this.width + padding) this.x = -padding;
    if (this.y < -padding) this.y = this.height + padding;
    if (this.y > this.height + padding) this.y = -padding;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw triangle outline
    ctx.beginPath();
    const h = this.size * Math.sqrt(3) / 2;
    ctx.moveTo(0, -h * 0.67);
    ctx.lineTo(-this.size / 2, h * 0.33);
    ctx.lineTo(this.size / 2, h * 0.33);
    ctx.closePath();
    
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.lineWidth = this.strokeWidth;
    ctx.stroke();
    
    // Subtle glow
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 4;
    ctx.stroke();
    
    ctx.restore();
  }
}

class Dot {
  constructor(width, height) {
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    this.width = width;
    this.height = height;
    this.size = randomRange(...PARTICLE_CONFIG.dots.sizeRange);
    this.x = initial ? randomRange(0, width) : randomRange(-30, width + 30);
    this.y = initial ? randomRange(0, height) : randomRange(-30, height + 30);
    this.opacity = randomRange(...PARTICLE_CONFIG.dots.opacityRange);
    this.speed = randomRange(...PARTICLE_CONFIG.dots.speedRange);
    this.vx = randomRange(-0.2, 0.2) * this.speed;
    this.vy = randomRange(-0.15, 0.1) * this.speed;
    this.hasGlow = Math.random() > 0.6;
    this.glowIntensity = randomRange(0.3, 0.6);
    this.color = Math.random() > 0.5 ? COLORS.dotPrimary : COLORS.dotSecondary;
    this.parallaxDepth = randomRange(0.9, 1.1);
    this.pulsePhase = randomRange(0, Math.PI * 2);
    this.pulseSpeed = randomRange(0.0005, 0.001);
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime * this.parallaxDepth;
    this.y += this.vy * deltaTime * this.parallaxDepth;
    this.pulsePhase += this.pulseSpeed * deltaTime;
    
    const padding = 40;
    if (this.x < -padding) this.x = this.width + padding;
    if (this.x > this.width + padding) this.x = -padding;
    if (this.y < -padding) this.y = this.height + padding;
    if (this.y > this.height + padding) this.y = -padding;
  }

  draw(ctx) {
    const pulseOpacity = this.opacity * (0.85 + 0.15 * Math.sin(this.pulsePhase));
    
    ctx.save();
    ctx.globalAlpha = pulseOpacity;
    
    // Glow effect for some dots
    if (this.hasGlow) {
      ctx.shadowColor = COLORS.dotGlow;
      ctx.shadowBlur = PARTICLE_CONFIG.dots.glowRadius * this.glowIntensity;
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.restore();
  }
}

class DustParticle {
  constructor(width, height) {
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    this.width = width;
    this.height = height;
    this.size = randomRange(...PARTICLE_CONFIG.dust.sizeRange);
    this.x = initial ? randomRange(0, width) : randomRange(-20, width + 20);
    this.y = initial ? randomRange(0, height) : randomRange(-20, height + 20);
    this.opacity = randomRange(...PARTICLE_CONFIG.dust.opacityRange);
    this.speed = randomRange(...PARTICLE_CONFIG.dust.speedRange);
    this.vx = randomRange(-0.15, 0.15) * this.speed;
    this.vy = randomRange(-0.1, 0.08) * this.speed;
    this.parallaxDepth = randomRange(0.5, 0.8);
    this.twinklePhase = randomRange(0, Math.PI * 2);
    this.twinkleSpeed = randomRange(0.001, 0.003);
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime * this.parallaxDepth;
    this.y += this.vy * deltaTime * this.parallaxDepth;
    this.twinklePhase += this.twinkleSpeed * deltaTime;
    
    const padding = 25;
    if (this.x < -padding) this.x = this.width + padding;
    if (this.x > this.width + padding) this.x = -padding;
    if (this.y < -padding) this.y = this.height + padding;
    if (this.y > this.height + padding) this.y = -padding;
  }

  draw(ctx) {
    const twinkle = 0.7 + 0.3 * Math.sin(this.twinklePhase);
    
    ctx.save();
    ctx.globalAlpha = this.opacity * twinkle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.dustParticle;
    ctx.fill();
    ctx.restore();
  }
}

// MAIN COMPONENT
const CircuitBackground = ({ className = '', style = {} }) => {
  const canvasRef = useRef(null);
  const circuitCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef({ triangles: [], dots: [], dust: [] });
  const circuitPatternRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = useCallback((width, height) => {
    particlesRef.current = {
      triangles: Array.from({ length: PARTICLE_CONFIG.triangles.count }, () => new Triangle(width, height)),
      dots: [],
      dust: Array.from({ length: PARTICLE_CONFIG.dust.count }, () => new DustParticle(width, height)),
    };
  }, []);

  // Draw background gradient
  const drawGradient = useCallback((ctx, width, height) => {
    // Radial gradient from center
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const maxRadius = Math.max(width, height) * 0.9;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius
    );
    
    gradient.addColorStop(0, COLORS.bgLight);
    gradient.addColorStop(0.25, COLORS.bgMid);
    gradient.addColorStop(0.5, COLORS.bgDark);
    gradient.addColorStop(1, COLORS.bgDarkest);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle vignette overlay
    const vignetteGradient = ctx.createRadialGradient(
      centerX, centerY, maxRadius * 0.3,
      centerX, centerY, maxRadius
    );
    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(1, 'rgba(5, 13, 24, 0.4)');
    
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Draw light grid pattern
  const drawGrid = useCallback((ctx, width, height) => {
    const gridSize = 60; // Medium sized grid
    // Brighter grid boxes 
    const gridColor = 'rgba(91, 163, 192, 0.16)'; 
    
    ctx.save();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1.0;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    ctx.restore();
  }, []);

  // Render circuit pattern to offscreen canvas (static, only renders once)
  const renderCircuitPattern = useCallback((width, height) => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext('2d');
    
    circuitPatternRef.current = new CircuitPattern(width, height);
    circuitPatternRef.current.draw(ctx);
    
    return offscreenCanvas;
  }, []);

  // Animation loop
  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensionsRef.current;
    
    // Calculate delta time for consistent animation speed
    const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67;
    lastTimeRef.current = timestamp;
    
    // Clear and draw background
    drawGradient(ctx, width, height);
    
    // Draw light grid pattern
    drawGrid(ctx, width, height);
    
    // Draw static circuit pattern
    if (circuitCanvasRef.current) {
      ctx.drawImage(circuitCanvasRef.current, 0, 0);
    }
    
    // Update and draw particles (back to front for proper layering)
    // Dust (furthest back)
    particlesRef.current.dust.forEach(particle => {
      particle.update(deltaTime);
      particle.draw(ctx);
    });
    
    // Triangles (front layer)
    particlesRef.current.triangles.forEach(particle => {
      particle.update(deltaTime);
      particle.draw(ctx);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [drawGradient, drawGrid]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    dimensionsRef.current = { width: rect.width, height: rect.height };
    
    // Regenerate circuit pattern and particles for new size
    circuitCanvasRef.current = renderCircuitPattern(rect.width, rect.height);
    initParticles(rect.width, rect.height);
  }, [initParticles, renderCircuitPattern]);

  useEffect(() => {
    handleResize();
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={`circuit-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};

export default CircuitBackground;
