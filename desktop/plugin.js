import { PANES_AREA, STATUSBAR_AREAS, TRANSCRIPT_DIRECTIVE_AREA, host } from '@hermes/plugin-sdk';
import { useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

function TransducerDirectiveCard({ attrs }) {
  const [expanded, setExpanded] = useState(true);
  const primaryM = (attrs && attrs.primary_m) || '0.68';
  const resCm = (attrs && attrs.resolution_cm) || '5.76';
  const hInf = (attrs && attrs.h_inf) || '0.9997';

  return jsxs('div', {
    style: {
      border: '1px solid var(--ui-stroke-secondary, var(--ui-border))',
      borderRadius: '10px',
      background: 'var(--card, var(--ui-surface-2))',
      color: 'var(--foreground, var(--ui-text-primary))',
      padding: '10px 14px',
      margin: '4px 0',
      fontSize: '12px'
    },
    children: [
      jsxs('div', {
        onClick: () => setExpanded(!expanded),
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: '8px' },
        children: [
          jsxs('div', {
            style: { display: 'flex', alignItems: 'center', gap: '8px' },
            children: [
              jsx('span', { style: { fontFamily: 'var(--ui-font-mono)', color: 'var(--ui-accent)', fontWeight: 700 }, children: `🦇 ${primaryM} m` }),
              jsx('span', { style: { fontWeight: 600 }, children: 'transducer · 20kHz LFM Sonar & TRNG' })
            ]
          }),
          jsx('span', { style: { fontFamily: 'var(--ui-font-mono)', fontSize: '11px', color: 'var(--ui-text-secondary)' }, children: `ΔR=${resCm}cm · H_∞=${hInf} ${expanded ? '▲' : '▼'}` })
        ]
      }),
      expanded && jsx('div', {
        style: { marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--ui-stroke-secondary, var(--ui-border))' },
        children: jsxs('svg', {
          width: '100%',
          height: '96',
          viewBox: '0 0 500 96',
          preserveAspectRatio: 'xMidYMid meet',
          style: { display: 'block' },
          children: [
            jsx('rect', { x: 10, y: 8, width: 480, height: 64, rx: 6, fill: 'none', stroke: 'var(--ui-stroke-secondary, var(--ui-border))' }),
            jsx('polyline', { fill: 'none', stroke: 'var(--ui-accent)', strokeWidth: '2.4', points: '18,64 55,58 95,62 135,16 165,54 220,62 295,36 330,60 410,64 480,65' }),
            jsx('circle', { cx: 135, cy: 16, r: '4.2', fill: 'var(--ui-accent)' }),
            jsx('text', { x: 148, y: 22, fill: 'var(--ui-text-primary)', fontSize: '11', fontFamily: 'var(--ui-font-mono)', fontWeight: 600, children: `Operator Echo: ${primaryM}m (ToF 3.94ms) · Wall: 1.85m` }),
            jsx('text', { x: 14, y: 88, fill: 'var(--ui-text-secondary)', fontSize: '10.5', fontFamily: 'var(--ui-font-mono)', children: `R&D + PROXIMITY CLOAK (<0.8m): Doppler +24.5Hz · Cepstrum Kurtosis · H_∞=${hInf}` })
          ]
        })
      })
    ]
  });
}

export default {
  id: 'transducer',
  name: 'Velvet Ultrasonic Transducer',
  register(ctx) {
    ctx.register({
      id: 'directive',
      area: TRANSCRIPT_DIRECTIVE_AREA,
      data: {
        name: 'transducer',
        render: ({ attrs, sessionId }) => jsx(TransducerDirectiveCard, { attrs, sessionId })
      }
    });
    ctx.register({
      id: 'pane',
      area: PANES_AREA,
      title: 'Velvet Transducer',
      data: { placement: 'right', width: '300px' },
      render: () => jsx('div', { className: 'p-2 text-xs', children: '🦇 48kHz Ultrasonic Sonar, Cepstrum Vibrometer & Shot-Noise TRNG' })
    });
    ctx.register({
      id: 'chip',
      area: STATUSBAR_AREAS.right,
      order: 122,
      render: () => jsx('button', {
        type: 'button',
        className: 'px-2 text-[0.6875rem] text-(--ui-text-secondary)',
        onClick: () => host.notify({ kind: 'info', message: 'Velvet Transducer: 20kHz LFM Sonar & Hardware TRNG active' }),
        children: '∿ 20kHz · 0.68m'
      })
    });
  }
};
