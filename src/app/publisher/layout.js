'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Folder, 
  ListVideo, 
  TrendingUp, 
  Users, 
  Palette, 
  CreditCard,
  LogOut,
  Menu
} from 'lucide-react';
import { useState } from 'react';
import api from '@/utils/api';
import PublisherAuthGuard from '@/components/PublisherAuthGuard';
import { clearPublisherSession, getStoredPublisherUser } from '@/utils/auth';

export default function PublisherLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publisherName] = useState(() => {
    const user = getStoredPublisherUser();
    return user?.name || 'Publisher';
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout request failed', error);
    } finally {
      clearPublisherSession();
      router.replace('/login');
      setIsLoggingOut(false);
    }
  };

  const publisherInitial = publisherName.charAt(0).toUpperCase();

  const menuSections = [
    {
      title: 'Content',
      items: [
        { name: 'Dashboard', path: '/publisher', icon: LayoutDashboard },
        { name: 'Upload Files', path: '/publisher/upload', icon: UploadCloud },
        { name: 'File Manager', path: '/publisher/files', icon: Folder },
        { name: 'View Analytics', path: '/publisher/progress', icon: TrendingUp },
        { name: 'Referrals', path: '/publisher/refer', icon: Users },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'Billing', path: '/publisher/billing', icon: CreditCard },
        { name: 'API Status', path: '/publisher/branding', icon: Palette },
        { name: 'Unsupported', path: '/publisher/playlists', icon: ListVideo },
      ]
    }
  ];

  return (
    <PublisherAuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '260px' : '0px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 40
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              Store<span style={{ color: 'var(--accent-primary)' }}>Gram</span>
            </Link>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
            {menuSections.map((section, idx) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                      <li key={item.path} style={{ marginBottom: '0.25rem' }}>
                        <Link href={item.path} style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          color: isActive ? '#fff' : 'var(--text-secondary)',
                          backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                          transition: 'all 0.2s',
                          fontWeight: isActive ? 600 : 400
                        }}>
                          <Icon size={18} style={{ marginRight: '0.75rem' }} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', color: 'var(--danger)', width: '100%', padding: '0.75rem 1rem', borderRadius: '8px' }}
            >
              <LogOut size={18} style={{ marginRight: '0.75rem' }} />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, marginLeft: sidebarOpen ? '260px' : '0px', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column' }}>
          <header className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <Menu size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Welcome, {publisherName}!</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {publisherInitial}
              </div>
            </div>
          </header>

          <main style={{ padding: '2rem', flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </PublisherAuthGuard>
  );
}
