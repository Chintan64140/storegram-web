'use client';

const CHART_SERIES = [
  { key: 'views', label: 'Views', color: '#22c55e' },
  { key: 'uploadedFiles', label: 'Uploaded Files', color: '#f59e0b' },
  { key: 'earnings', label: 'Earnings', color: '#38bdf8' },
];

const buildLinePoints = (data, key, width, height, padding, maxValue) => {
  if (!data.length) {
    return '';
  }

  return data.map((item, index) => {
    const x = padding + ((width - (padding * 2)) * index) / Math.max(data.length - 1, 1);
    const y = height - padding - ((Number(item[key] || 0) / maxValue) * (height - (padding * 2)));
    return `${x},${y}`;
  }).join(' ');
};

export default function PublisherLineChart({ data = [] }) {
  const width = 960;
  const height = 280;
  const padding = 28;
  const maxValue = Math.max(
    1,
    ...data.flatMap((item) => CHART_SERIES.map((series) => Number(item[series.key] || 0)))
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {CHART_SERIES.map((series) => (
          <div key={series.key} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '999px', backgroundColor: series.color, display: 'inline-block' }} />
            {series.label}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '760px' }}>
          <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '280px', display: 'block' }} role="img" aria-label="Monthly analytics chart">
            {[0, 1, 2, 3, 4].map((tick) => {
              const y = padding + ((height - (padding * 2)) * tick) / 4;
              const tickValue = ((maxValue * (4 - tick)) / 4).toFixed(maxValue > 10 ? 0 : 2);

              return (
                <g key={tick}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="4 6"
                  />
                  <text x={10} y={y + 4} fill="rgba(255,255,255,0.45)" fontSize="11">
                    {tickValue}
                  </text>
                </g>
              );
            })}

            {data.map((item, index) => {
              const x = padding + ((width - (padding * 2)) * index) / Math.max(data.length - 1, 1);
              return (
                <text
                  key={item.date || index}
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize="11"
                >
                  {item.label}
                </text>
              );
            })}

            {CHART_SERIES.map((series) => {
              const points = buildLinePoints(data, series.key, width, height, padding, maxValue);

              return (
                <g key={series.key}>
                  <polyline
                    fill="none"
                    stroke={series.color}
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points={points}
                  />
                  {data.map((item, index) => {
                    const x = padding + ((width - (padding * 2)) * index) / Math.max(data.length - 1, 1);
                    const y = height - padding - ((Number(item[series.key] || 0) / maxValue) * (height - (padding * 2)));

                    return (
                      <circle key={`${series.key}-${item.date || index}`} cx={x} cy={y} r="3.5" fill={series.color}>
                        <title>{`${series.label}: ${Number(item[series.key] || 0).toFixed(series.key === 'earnings' ? 2 : 0)} on ${item.date}`}</title>
                      </circle>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
