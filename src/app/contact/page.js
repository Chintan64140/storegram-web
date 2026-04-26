'use client';

export default function Contact() {
  return (
      <main style={{ flex: 1, padding: '4rem 0' }}>
        <div className="container animate-fade-in" style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
            Contact Us
          </h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>
            Have questions about monetization or enterprise plans? Get in touch with our team.
          </p>

          <div className="card">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="input" placeholder="John Doe" required />
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" className="input" placeholder="john@example.com" required />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="subject">Subject</label>
                <select id="subject" className="input" required>
                  <option value="">Select a subject...</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="message">Message</label>
                <textarea id="message" className="input" rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} onClick={() => alert('Message sent!')}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
  );
}
