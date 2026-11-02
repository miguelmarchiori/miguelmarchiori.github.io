import './GlassSurface.css';

export default function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  backgroundOpacity = 0,
  saturation = 1,
  className = '',
  style = {}
}) {
  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation
  };

  return (
    <div className={`glass-surface glass-surface--fallback ${className}`} style={containerStyle}>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
