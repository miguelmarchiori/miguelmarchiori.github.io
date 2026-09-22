import './GlassIcons.css';

const gradientMapping = {
  red: 'linear-gradient(135deg, hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  darkred: 'linear-gradient(135deg, hsl(350, 74%, 38%), hsl(3, 90%, 50%))',
  crimson: 'linear-gradient(135deg, hsl(350, 84%, 42%), hsl(8, 88%, 56%))'
};

const GlassIcons = ({ items = [], className = '' }) => {
  return (
    <div className={`icon-btns ${className}`}>
      {items.map((item, index) => {
        const background = gradientMapping[item.color] || item.color || gradientMapping.red;
        const content = (
          <>
            <span className="icon-btn__back" style={{ background }} />
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">{item.icon}</span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </>
        );

        if (item.href) {
          return <a key={`${item.label}-${index}`} className="icon-btn" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>{content}</a>;
        }
        return <button key={`${item.label}-${index}`} className="icon-btn" type="button" aria-label={item.label}>{content}</button>;
      })}
    </div>
  );
};

export default GlassIcons;
