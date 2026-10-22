

export default function SystemFrame({ eyebrow, children }) {
  return (
    <div className="sw-frame">
      <span className="sw-corner tl" />
      <span className="sw-corner tr" />
      <span className="sw-corner bl" />
      <span className="sw-corner br" />
      <div className="sw-header">
        <span className="sw-dot" />
        <span className="sw-eyebrow">{eyebrow}</span>
      </div>
      <div className="sw-body">{children}</div>
    </div>
  );
}