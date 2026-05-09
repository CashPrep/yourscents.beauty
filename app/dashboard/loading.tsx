const ROSE_BG     = 'hsl(8 56% 76% / 0.12)'
const ROSE_BORDER = 'hsl(8 56% 76% / 0.28)'
const CREAM       = 'hsl(18 50% 97%)'

function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className ?? ''}`}
      style={{ background: 'hsl(8 56% 76% / 0.14)', ...style }}
    />
  )
}

export default function DashboardLoading() {
  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      {/* Header */}
      <header
        className="border-b sticky top-0 z-40"
        style={{ background: 'hsl(18 60% 98% / 0.88)', backdropFilter: 'blur(18px)', borderColor: 'hsl(10 30% 88%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton style={{ width: 120, height: 40 }} />
            <Skeleton style={{ width: 40, height: 20, borderRadius: 999 }} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton style={{ width: 80, height: 32, borderRadius: 999 }} />
            <Skeleton style={{ width: 110, height: 32, borderRadius: 999 }} />
            <Skeleton style={{ width: 32, height: 32, borderRadius: 999 }} />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Scent card panel */}
        <div
          className="rounded-2xl p-5 flex items-center justify-between gap-4 mb-6"
          style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${ROSE_BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <Skeleton style={{ width: 36, height: 36, borderRadius: 12 }} />
            <div className="space-y-2">
              <Skeleton style={{ width: 120, height: 14 }} />
              <Skeleton style={{ width: 180, height: 11 }} />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton style={{ width: 72, height: 32, borderRadius: 999 }} />
            <Skeleton style={{ width: 96, height: 32, borderRadius: 999 }} />
          </div>
        </div>

        {/* Scent of the day */}
        <div className="mb-6">
          <Skeleton style={{ width: '100%', height: 80, borderRadius: 16 }} />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${ROSE_BORDER}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Skeleton style={{ width: 14, height: 14, borderRadius: 4 }} />
                <Skeleton style={{ width: 60, height: 11 }} />
              </div>
              <Skeleton style={{ width: 48, height: 22 }} />
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-6">
          {[80, 64, 90, 56, 80, 80, 86].map((w, i) => (
            <Skeleton key={i} style={{ width: w, height: 36, borderRadius: 12, flexShrink: 0 }} />
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2 flex-wrap">
            {[40, 56, 52, 52, 48, 52, 56, 52, 76].map((w, i) => (
              <Skeleton key={i} style={{ width: w, height: 30, borderRadius: 999 }} />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton style={{ width: 130, height: 34, borderRadius: 8 }} />
            <Skeleton style={{ width: 64, height: 34, borderRadius: 999 }} />
          </div>
        </div>

        {/* Wardrobe grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${ROSE_BORDER}` }}
            >
              <Skeleton style={{ width: '100%', aspectRatio: '1', borderRadius: 12, marginBottom: 12 }} />
              <Skeleton style={{ width: '70%', height: 16, marginBottom: 8 }} />
              <Skeleton style={{ width: '50%', height: 12, marginBottom: 8 }} />
              <div className="flex gap-1">
                {[0,1,2,3,4].map(s => (
                  <Skeleton key={s} style={{ width: 12, height: 12, borderRadius: 4 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
