
export default function StatBar({ icon: Icon, label, value }) {
  return (
    <div className="stat-row">
      <div className="stat-label">
        <Icon size={16} strokeWidth={1.75} />
        <span>{label}</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="stat-value">{String(value).padStart(3, "0")}</span>
    </div>
  );
}