import { useState } from 'react';
import { Send, Loader2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setFeedback('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedback('');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
      setFeedback('Message received. I will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback('Something went wrong. Please try again in a moment.');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-void-900/60 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-nebula-violet/60 focus:ring-2 focus:ring-nebula-violet/30';

  return (
    <section id="contact" className="section-pad relative">
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-nebula-blue/10 blur-[120px]" />
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="text-xs uppercase tracking-widest text-nebula-cyan">
              Contact
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              Send a signal
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
              For bookings, collaborations, licensing, or just to say hello
              across the void — transmit your message below.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Booking
                </p>
                <p className="mt-1 text-slate-200">hasan.yildirim@outlook.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Press / Licensing
                </p>
                <p className="mt-1 text-slate-200">hasan.yildirim@outlook.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  General
                </p>
                <p className="mt-1 text-slate-200">hasan.yildirim@outlook.com</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="reveal glass rounded-3xl p-6 md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="c-name" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="c-message" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Your message..."
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Transmit
                </>
              )}
            </button>

            {feedback && (
              <p
                role="status"
                className={`mt-5 inline-flex items-center gap-2 text-sm ${
                  status === 'success' ? 'text-nebula-cyan' : 'text-rose-300'
                }`}
              >
                {status === 'success' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
