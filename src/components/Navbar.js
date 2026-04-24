import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
      <div className="container flex items-center justify-between">
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Store<span style={{ color: 'var(--accent-primary)' }}>Gram</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" style={{ fontWeight: 500 }} className="hover-link">Home</Link>
          <Link href="/contact" style={{ fontWeight: 500 }} className="hover-link">Contact Us</Link>
          <Link href="/publisher" className="btn btn-primary">Publisher Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
