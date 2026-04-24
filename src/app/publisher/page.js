'use client';

import { useEffect, useState } from 'react';
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Coins,
  DollarSign,
  Eye,
  FileUp,
  Wallet,
} from 'lucide-react';
import api from '@/utils/api';
import PublisherLineChart from '@/components/PublisherLineChart';

const OVERVIEW_ITEMS = [
  { key: 'totalRevenue', label: 'Total', icon: DollarSign, color: '#7c3aed' },
  { key: 'totalPaid', label: 'Paid', icon: CheckCircle2, color: '#22c55e' },
  { key: 'availableRevenue', label: 'Available', icon: Wallet, color: '#f97316' },
  { key: 'approvedWithdrawals', label: 'Approved', icon: CheckCircle2, color: '#06b6d4', isCurrency: false },
  { key: 'pendingWithdrawals', label: 'Pending', icon: CalendarDays, color: '#eab308', isCurrency: false },
  { key: 'canceledWithdrawals', label: 'Canceled', icon: Ban, color: '#9ca3af', isCurrency: false },
];

const DAILY_ITEMS = [
  { key: 'uploadedFiles', label: 'Uploaded Files', icon: FileUp, color: '#60a5fa' },
  { key: 'views', label: 'Views', icon: Eye, color: '#93c5fd' },
  { key: 'viewEarnings', label: 'View Earnings', icon: Coins, color: '#fbbf24', isCurrency: true, decimals: 5 },
  { key: 'totalEarnings', label: 'Total Earnings', icon: DollarSign, color: '#34d399', isCurrency: true, decimals: 5 },
];

const MONTHLY_ITEMS = DAILY_ITEMS;

const createTodayValue = () => new Date().toISOString().slice(0, 10);
const createMonthValue = () => new Date().toISOString().slice(0, 7);

const formatMoney = (value, digits = 2) => `$${Number(value || 0).toFixed(digits)}`;

const formatMetricValue = (value, options = {}) => {
  if (options.isCurrency) {
    return formatMoney(value, options.decimals ?? 2);
  }

  return Number(value || 0).toLocaleString();
};

function DashboardSection({ title, description, action, children }) {
  return (
    <section
      className="card"
      style={{
        background: 'linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(11,11,11,0.98) 100%)',
        borderColor: 'rgba(255,255,255,0.09)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatBadge({ label, value, icon: Icon, color }) {
  return (
    <div
      style={{
        minWidth: '120px',
        flex: '1 1 120px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.95rem 1rem',
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${color}12`,
          border: `1px solid ${color}55`,
          boxShadow: `inset 0 0 12px ${color}22`,
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={color} />
      </div>
      <div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '0.2rem' }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{value}</div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }) {
  return (
    <div
      style={{
        flex: '1 1 180px',
        minWidth: '180px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.1rem',
        borderRadius: '16px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${color}40, rgba(255,255,255,0.05))`,
          border: `1px solid ${color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={26} color={color} />
      </div>
      <div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}

export default function PublisherDashboard() {
  const [selectedDate, setSelectedDate] = useState(createTodayValue);
  const [selectedMonth, setSelectedMonth] = useState(createMonthValue);
  const [data, setData] = useState({
    totalViews: 0,
    totalFiles: 0,
    totalReferredUsers: 0,
    walletBalance: 0,
    revenueOverview: {},
    earningsModel: {},
    dailyAnalytics: {},
    monthlyAnalytics: { chart: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchDashboard = async () => {
      try {
        setError('');
        const response = await api.get('/publisher/analytics/dashboard', {
          params: {
            date: selectedDate,
            month: selectedMonth,
          },
        });

        if (!active) {
          return;
        }

        setData(response.data || {});
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        if (active) {
          setError(err.response?.data?.error || 'Failed to load publisher analytics.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      void fetchDashboard();
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [selectedDate, selectedMonth]);

  if (loading) {
    return <div>Loading analytics dashboard...</div>;
  }

  const revenueOverview = data.revenueOverview || {};
  const dailyAnalytics = data.dailyAnalytics || {};
  const monthlyAnalytics = data.monthlyAnalytics || {};
  const earningsModel = data.earningsModel || {};

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gap: '1.2rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.25rem' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '999px', backgroundColor: 'var(--success)', boxShadow: '0 0 12px rgba(0, 204, 102, 0.8)' }} />
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800 }}>Analytics</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track your revenue, views, uploads, and referral growth with the live publisher APIs.
        </p>
      </div>

      {error && (
        <div
          className="card"
          style={{
            borderColor: 'rgba(255, 77, 77, 0.3)',
            color: 'var(--danger)',
            backgroundColor: 'rgba(255, 77, 77, 0.04)',
          }}
        >
          {error}
        </div>
      )}

      <DashboardSection
        title="Revenue Overview"
        description="Your overall paid, pending, and available revenue breakdown."
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          {OVERVIEW_ITEMS.map((item) => (
            <StatBadge
              key={item.key}
              label={item.label}
              value={item.isCurrency === false ? formatMetricValue(revenueOverview[item.key]) : formatMoney(revenueOverview[item.key])}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection
        title="How View Earnings Work"
        description="This explanation is pulled from the backend earning rules, so it matches how valid views are counted today."
      >
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Current Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Valid View Rate</td>
                <td>{formatMoney(earningsModel.amountPerValidView)}</td>
                <td>Each approved view credit recorded through the tracking APIs.</td>
              </tr>
              <tr>
                <td>Watch Threshold</td>
                <td>{earningsModel.maxThresholdSeconds || 20}s cap</td>
                <td>{earningsModel.thresholdRule || 'A view counts after the minimum tracked watch duration is met.'}</td>
              </tr>
              <tr>
                <td>Totals Shown</td>
                <td>Wallet + Transactions</td>
                <td>Revenue cards blend file earnings, withdrawal status, and current wallet balance.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            padding: '1rem 1.1rem',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
          }}
        >
          Example: 125 valid views in a day at {formatMoney(earningsModel.amountPerValidView)} per counted view results in {formatMoney(Number(earningsModel.amountPerValidView || 0) * 125)} credited earnings.
        </div>
      </DashboardSection>

      <DashboardSection
        title="Daily Analytics"
        description="Your daily views, uploads, and earnings breakdown."
        action={(
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            Select Date
            <input
              type="date"
              className="input"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              style={{ width: 'auto', minWidth: '150px', padding: '0.6rem 0.75rem' }}
            />
          </label>
        )}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          {DAILY_ITEMS.map((item) => (
            <MetricCard
              key={item.key}
              label={item.label}
              value={formatMetricValue(dailyAnalytics[item.key], item)}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <span className="card" style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.015)' }}>
            Valid Views: <strong style={{ color: 'var(--text-primary)' }}>{Number(dailyAnalytics.validViews || 0).toLocaleString()}</strong>
          </span>
          <span className="card" style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.015)' }}>
            Total Files: <strong style={{ color: 'var(--text-primary)' }}>{Number(data.totalFiles || 0).toLocaleString()}</strong>
          </span>
          <span className="card" style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.015)' }}>
            Referred Users: <strong style={{ color: 'var(--text-primary)' }}>{Number(data.totalReferredUsers || 0).toLocaleString()}</strong>
          </span>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Monthly Analytics"
        description="Your monthly views, uploads, and earnings overview."
        action={(
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            Select Month
            <input
              type="month"
              className="input"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              style={{ width: 'auto', minWidth: '128px', padding: '0.6rem 0.75rem' }}
            />
          </label>
        )}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
          {MONTHLY_ITEMS.map((item) => (
            <MetricCard
              key={item.key}
              label={item.label}
              value={formatMetricValue(monthlyAnalytics[item.key], item)}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <div
          style={{
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
            padding: '1rem',
          }}
        >
          <div style={{ marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Monthly Activity Chart</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              Daily breakdown of views, files, and approved positive earnings for {monthlyAnalytics.month || selectedMonth}.
            </p>
          </div>
          <PublisherLineChart data={monthlyAnalytics.chart || []} />
        </div>
      </DashboardSection>
    </div>
  );
}
