'use client';
import { useEffect, useState } from 'react';
import { Activity, Clock3, MapPin, TrendingUp } from 'lucide-react';
import api from '@/utils/api';
import PaginationControls from '@/components/PaginationControls';

export default function Progress() {
  const [views, setViews] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchViews = async () => {
      try {
        setError('');
        const response = await api.get('/publisher/analytics/views', { params: { page, limit } });
        setViews(response.data.data || []);
        setPagination(response.data.pagination || null);
      } catch (err) {
        console.error('Failed to fetch view analytics', err);
        setError(err.response?.data?.error || 'Failed to load recent view analytics.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = window.setTimeout(() => {
      void fetchViews();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [page, limit]);

  if (loading) {
    return <div>Loading recent view analytics...</div>;
  }

  const validViews = views.filter((view) => view.is_valid).length;
  const totalWatchTime = views.reduce((sum, view) => sum + Number(view.watch_time || 0), 0);
  const averageWatchTime = views.length ? totalWatchTime / views.length : 0;

  const locationCounts = views.reduce((result, view) => {
    const key = view.location || 'Unknown';
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});

  const topLocation =
    Object.entries(locationCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || 'Unknown';

  const stats = [
    { label: 'Recent Views', value: views.length, icon: Activity, color: '#00A0FE' },
    { label: 'Valid Views', value: validViews, icon: TrendingUp, color: '#00cc66' },
    { label: 'Average Watch Time', value: `${averageWatchTime.toFixed(1)}s`, icon: Clock3, color: '#ffcc00' },
    { label: 'Top Location', value: topLocation, icon: MapPin, color: '#ff4d4d' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">View Analytics</h1>

      {error && (
        <div className="card mb-6" style={{ borderColor: 'rgba(255, 77, 77, 0.3)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="mb-2 text-sm text-muted">{stat.label}</p>
                <h3 className="truncate text-2xl font-bold sm:text-3xl">{stat.value}</h3>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: `${stat.color}15` }}>
                <Icon size={22} color={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="mb-4 text-xl font-bold">Recent View Events</h3>
        <p className="mb-5 text-sm text-muted sm:text-base">
          Review your most recent view events with watch time, validity, location, and file
          details in one place.
        </p>

        <div className="space-y-4 md:hidden">
          {views.map((view) => (
            <div key={view.id} className="rounded-2xl border border-border bg-surface-strong p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-white">{view.files?.title || 'Untitled'}</div>
                  <div className="text-sm text-accent">{view.files?.short_id || 'N/A'}</div>
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: view.is_valid ? 'var(--success)' : 'var(--text-secondary)' }}
                >
                  {view.is_valid ? 'Counted' : 'Not counted'}
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <div>Watch Time: {Number(view.watch_time || 0).toFixed(1)}s</div>
                <div>Location: {view.location || 'Unknown'}</div>
                <div>IP Address: {view.ip_address || 'Unknown'}</div>
                <div>Created: {new Date(view.created_at).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {views.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface-strong p-4 text-center text-sm text-muted">
              No recent views yet.
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Short ID</th>
                  <th>Watch Time</th>
                  <th>Valid</th>
                  <th>Location</th>
                  <th>IP Address</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {views.map((view) => (
                  <tr key={view.id}>
                    <td>{view.files?.title || 'Untitled'}</td>
                    <td style={{ color: 'var(--accent-primary)' }}>{view.files?.short_id || 'N/A'}</td>
                    <td>{Number(view.watch_time || 0).toFixed(1)}s</td>
                    <td style={{ color: view.is_valid ? 'var(--success)' : 'var(--text-secondary)', fontWeight: 600 }}>
                      {view.is_valid ? 'Counted' : 'Not counted'}
                    </td>
                    <td>{view.location || 'Unknown'}</td>
                    <td>{view.ip_address || 'Unknown'}</td>
                    <td>{new Date(view.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {views.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>No recent views yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <PaginationControls
          pagination={pagination}
          onPageChange={setPage}
          onLimitChange={(nextLimit) => {
            setLimit(nextLimit);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
