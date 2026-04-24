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

  useEffect(() => {
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

  const topLocation = Object.entries(locationCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || 'Unknown';

  const stats = [
    { label: 'Recent Views', value: views.length, icon: Activity, color: '#00A0FE' },
    { label: 'Valid Views', value: validViews, icon: TrendingUp, color: '#00cc66' },
    { label: 'Average Watch Time', value: `${averageWatchTime.toFixed(1)}s`, icon: Clock3, color: '#ffcc00' },
    { label: 'Top Location', value: topLocation, icon: MapPin, color: '#ff4d4d' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>View Analytics</h1>

      {error && (
        <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'rgba(255, 77, 77, 0.3)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</h3>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: `${stat.color}15` }}>
                <Icon size={22} color={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent View Events</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          This table is backed by `GET /publisher/analytics/views`, which returns the most recent 100 view rows with watch time, validity, location, and file metadata.
        </p>

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
