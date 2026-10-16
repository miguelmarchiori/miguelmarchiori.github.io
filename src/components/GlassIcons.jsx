import './GlassIcons.css';

const GRADIENTS = {
  blue: 'linear-gradient(135deg, #80c5ff, #2768d8)',
  purple: 'linear-gradient(135deg, #d0a3ff, #7550d8)',
  red: 'linear-gradient(135deg, #ff9baf, #df315b)',
  indigo: 'linear-gradient(135deg, #a2b1ff, #5146c8)',
  orange: 'linear-gradient(135deg, #ffd17c, #ec762e)',
  green: 'linear-gradient(135deg, #8de8b4, #219b78)',
  teal: 'linear-gradient(135deg, #7de6e8, #198ba7)',
  pink: 'linear-gradient(135deg, #ffc0e1, #cf4e9c)',
  graphite: 'linear-gradient(135deg, #858b99, #343a48)',
  silver: 'linear-gradient(135deg, #f1f5f9, #9ba8b8)'
};

const GlassIcons = ({
  items = [],
  size = 64,
  gap = 20,
  columns = 6,
  roundness = 0.28,
  tint = '#ffffff',
  tintOpacity = 0.36,
  iconColor,
  plate = 'tilt',
  tilt = 12,
  spread = 0.45,
  hover = 'press',
  labels = 'hover',
  theme = 'light',
  className = '',
  style = {}
}) => {
  const radius = Math.round(Math.max(0, Math.min(1, roundness)) * 28);
  const ink = iconColor || (theme === 'dark' ? '#f5f8ff' : '#334963');

  return (
    <div
      className={`glass-icons glass-icons--labels-${labels} ${className}`.trim()}
      style={{
        '--glass-size': `${size}px`,
        '--glass-gap': `${gap}px`,
        '--glass-columns': columns,
        '--glass-radius': `${radius}px`,
        '--glass-tint': tint,
        '--glass-tint-opacity': tintOpacity,
        '--glass-ink': ink,
        '--glass-tilt': `${tilt}deg`,
        '--glass-spread': spread,
        ...style
      }}
    >
      {items.map((item, index) => {
        const background = GRADIENTS[item.color] || item.color || GRADIENTS.blue;
        const content = (
          <>
            {plate !== 'none' && (
              <span
                className={`glass-icon-plate glass-icon-plate--${plate}`}
                style={{ background, '--item-tilt': `${tilt}deg` }}
                aria-hidden="true"
              />
            )}
            <span className="glass-icon-glass" aria-hidden="true" />
            <span className="glass-icon-face">
              <span className="glass-icon-glyph" aria-hidden="true">{item.icon}</span>
            </span>
            {labels !== 'none' && item.label && <span className="glass-icon-label">{item.label}</span>}
          </>
        );

        const common = {
          key: item.id ?? `${item.label}-${index}`,
          className: `glass-icon ${item.className || ''}`.trim(),
          'aria-label': item.label,
          onClick: item.onClick
        };

        if (item.href) {
          return (
            <a
              {...common}
              href={item.href}
              target={item.target || '_blank'}
              rel={(item.target || '_blank') === '_blank' ? 'noreferrer' : undefined}
            >
              {content}
            </a>
          );
        }

        return <button {...common} type="button">{content}</button>;
      })}
    </div>
  );
};

export default GlassIcons;
