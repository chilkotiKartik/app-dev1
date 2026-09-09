export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 14, width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card card-pad">
          <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 10 }} />
          <div className="skeleton" style={{ height: 16, width: '85%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 12, width: '60%' }} />
        </div>
      ))}
    </div>
  );
}
