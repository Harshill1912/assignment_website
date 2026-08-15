export interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulseOffset: number;
  label?: string;
  dataPoint?: string;
}

// 1. Molecular Network Drawer
export function drawMolecularNetwork(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: ParticleNode[],
  mouse: { x: number; y: number },
  time: number,
  isMobile: boolean = false
) {
  ctx.clearRect(0, 0, width, height);

  const maxDist = isMobile ? 90 : 140;

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.4;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated signal pulse along connection
        if ((i + j) % 3 === 0) {
          const t = ((time * 0.001 * 0.8) + (i * 0.1)) % 1;
          const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
          const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;

          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 1.5})`;
          ctx.fill();
        }
      }
    }
  }

  // Update & draw nodes
  nodes.forEach((node, i) => {
    // Mouse magnetic effect
    if (mouse.x > 0 && mouse.y > 0) {
      const mdx = mouse.x - node.x;
      const mdy = mouse.y - node.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      const mouseRadius = isMobile ? 100 : 160;

      if (mdist < mouseRadius) {
        const force = (1 - mdist / mouseRadius) * 0.8;
        node.vx += (mdx / mdist) * force * 0.15;
        node.vy += (mdy / mdist) * force * 0.15;
      }
    }

    // Velocity decay & friction
    node.vx *= 0.98;
    node.vy *= 0.98;

    // Movement
    node.x += node.vx;
    node.y += node.vy;

    // Boundary bounces
    if (node.x < 20 || node.x > width - 20) node.vx *= -1;
    if (node.y < 20 || node.y > height - 20) node.vy *= -1;

    // Pulsing radius
    const pulse = Math.sin(time * 0.002 + node.pulseOffset) * 0.8;
    node.radius = Math.max(2, node.baseRadius + pulse);

    // Draw node outer halo glow
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = node.color.replace('rgb', 'rgba').replace(')', ', 0.12)');
    ctx.fill();

    // Draw node core
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();

    // Draw node inner ring
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Optional telemetry label on key nodes
    if (!isMobile && node.label && i % 4 === 0) {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.fillText(node.label, node.x + 10, node.y + 3);
    }
  });
}

// 2. DNA Double Helix Drawer
export function drawDnaHelix(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  rotationAngle: number = 0
) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const numPairs = 28;
  const spacing = height / (numPairs + 2);
  const amplitude = Math.min(120, width * 0.3);

  const baseColors = ['#00F2FE', '#10B981', '#A3E635', '#38BDF8'];

  for (let i = 0; i < numPairs; i++) {
    const y = (i + 1) * spacing;
    const phase = i * 0.25 + time * 0.0015 + rotationAngle;

    const x1 = cx + Math.sin(phase) * amplitude;
    const x2 = cx - Math.sin(phase) * amplitude;

    const z1 = Math.cos(phase);
    const z2 = -Math.cos(phase);

    const scale1 = 0.7 + (z1 + 1) * 0.25;
    const scale2 = 0.7 + (z2 + 1) * 0.25;

    // Draw hydrogen bond pair bridge
    const colorIndex = i % baseColors.length;
    const bridgeAlpha = 0.2 + ((z1 + 1) / 2) * 0.6;
    
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${bridgeAlpha * 0.35})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Midpoint hydrogen bond node
    const midX = (x1 + x2) / 2;
    ctx.beginPath();
    ctx.arc(midX, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = baseColors[colorIndex];
    ctx.fill();

    // Strand 1 node
    ctx.beginPath();
    ctx.arc(x1, y, 6 * scale1, 0, Math.PI * 2);
    ctx.fillStyle = '#00F2FE';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Strand 2 node
    ctx.beginPath();
    ctx.arc(x2, y, 6 * scale2, 0, Math.PI * 2);
    ctx.fillStyle = '#10B981';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// 3. Cellular Signal Drawer
export function drawCellularSignal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  mouse: { x: number; y: number }
) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const numRings = 5;

  // Concentric cellular membranes
  for (let r = 1; r <= numRings; r++) {
    const baseR = r * 45;
    const wave = Math.sin(time * 0.002 + r * 0.8) * 8;
    const currentR = baseR + wave;
    const alpha = 0.6 - (r * 0.08);

    ctx.beginPath();
    ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Receptor proteins on membrane
    const receptors = r * 6;
    for (let k = 0; k < receptors; k++) {
      const angle = (k / receptors) * Math.PI * 2 + (time * 0.0005 * (r % 2 === 0 ? 1 : -1));
      const rx = cx + Math.cos(angle) * currentR;
      const ry = cy + Math.sin(angle) * currentR;

      ctx.beginPath();
      ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = r % 2 === 0 ? '#10B981' : '#A3E635';
      ctx.fill();
    }
  }

  // Nucleus core
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
  ctx.fill();
  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Mouse targeted signaling beam
  if (mouse.x > 0 && mouse.y > 0) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
    ctx.fill();
  }
}
