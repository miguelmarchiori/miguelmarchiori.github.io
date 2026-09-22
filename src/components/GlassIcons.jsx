import './GlassIcons.css';

const gradientMapping = {
  red: 'linear-gradient(135deg, #90b9e8, #5d94d5)',
  darkred: 'linear-gradient(135deg, #9bbfe8, #6c9ed6)',
  crimson: 'linear-gradient(135deg, #b0cceb, #7ba8dc)'
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
