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
      className="card p-4 sm:p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(11,11,11,0.98) 100%)',
        borderColor: 'rgba(255,255,255,0.09)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      }}
    >
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="mb-1 text-base font-bold sm:text-lg">{title}</h2>
          <p className="text-sm text-muted">{description}</p>
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
      className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
      style={{ minHeight: '88px' }}
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
      <div className="min-w-0">
        <div className="mb-1 text-xs text-muted">{label}</div>
        <div className="break-words text-base font-bold sm:text-lg">{value}</div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }) {
  return (
    <div
      className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/[0.06] p-4"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)',
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
      <div className="min-w-0">
        <div className="mb-1 text-xs text-muted sm:text-sm">{label}</div>
        <div className="break-words text-2xl font-extrabold leading-tight sm:text-3xl">{value}</div>
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
    <div className="animate-fade-in grid gap-5 ">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '999px',
              backgroundColor: 'var(--success)',
              boxShadow: '0 0 12px rgba(0, 204, 102, 0.8)',
            }}
          />
          <h1 className="text-3xl font-extrabold sm:text-4xl">Analytics</h1>
        </div>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
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
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {OVERVIEW_ITEMS.map((item) => (
            <StatBadge
              key={item.key}
              label={item.label}
              value={
                item.isCurrency === false
                  ? formatMetricValue(revenueOverview[item.key])
                  : formatMoney(revenueOverview[item.key])
              }
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
        <div className="mb-4 grid gap-3 md:hidden">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-muted">Valid View Rate</div>
            <div className="mt-2 text-lg font-bold">{formatMoney(earningsModel.amountPerValidView)}</div>
            <p className="mt-2 text-sm text-muted">
              Each approved view credit recorded through the tracking APIs.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-muted">Watch Threshold</div>
            <div className="mt-2 text-lg font-bold">{earningsModel.maxThresholdSeconds || 20}s cap</div>
            <p className="mt-2 text-sm text-muted">
              {earningsModel.thresholdRule ||
                'A view counts after the minimum tracked watch duration is met.'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-muted">Totals Shown</div>
            <div className="mt-2 text-lg font-bold">Wallet + Transactions</div>
            <p className="mt-2 text-sm text-muted">
              Revenue cards blend file earnings, withdrawal status, and current wallet balance.
            </p>
          </div>
        </div>

        <div className="table-container mb-4 hidden md:block">
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
                <td>
                  {earningsModel.thresholdRule ||
                    'A view counts after the minimum tracked watch duration is met.'}
                </td>
              </tr>
              <tr>
                <td>Totals Shown</td>
                <td>Wallet + Transactions</td>
                <td>Revenue cards blend file earnings, withdrawal status, and current wallet balance.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-sm leading-7 text-muted">
          Example: 125 valid views in a day at {formatMoney(earningsModel.amountPerValidView)} per
          counted view results in{' '}
          {formatMoney(Number(earningsModel.amountPerValidView || 0) * 125)} credited earnings.
        </div>
      </DashboardSection>

      <DashboardSection
        title="Daily Analytics"
        description="Your daily views, uploads, and earnings breakdown."
        action={
          <label className="flex w-full flex-col gap-2 text-sm text-muted sm:w-auto">
            <span>Select Date</span>
            <input
              type="date"
              className="input w-full sm:min-w-40"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>
        }
      >
        <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <span className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <span className="text-sm text-muted">Valid Views: </span>
            <strong className="text-foreground">
              {Number(dailyAnalytics.validViews || 0).toLocaleString()}
            </strong>
          </span>
          <span className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <span className="text-sm text-muted">Total Files: </span>
            <strong className="text-foreground">
              {Number(data.totalFiles || 0).toLocaleString()}
            </strong>
          </span>
          <span className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
            <span className="text-sm text-muted">Referred Users: </span>
            <strong className="text-foreground">
              {Number(data.totalReferredUsers || 0).toLocaleString()}
            </strong>
          </span>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Monthly Analytics"
        description="Your monthly views, uploads, and earnings overview."
        action={
          <label className="flex w-full flex-col gap-2 text-sm text-muted sm:w-auto">
            <span>Select Month</span>
            <input
              type="month"
              className="input w-full sm:min-w-36"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
            />
          </label>
        }
      >
        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          className="rounded-2xl border border-white/[0.07] p-3 sm:p-4"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
          }}
        >
          <div className="mb-4">
            <h3 className="mb-1 text-base font-bold">Monthly Activity Chart</h3>
            <p className="text-sm text-muted">
              Daily breakdown of views, files, and approved positive earnings for{' '}
              {monthlyAnalytics.month || selectedMonth}.
            </p>
          </div>
          <PublisherLineChart data={monthlyAnalytics.chart || []} />
        </div>
      </DashboardSection>
    </div>
  );
}
