import { useState } from 'react';
import { Mail, Loader2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: trimmed });

      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage("You're already on the list. Signal received.");
          setEmail('');
          return;
        }
        throw error;
      }
      setStatus('success');
      setMessage('Welcome to the orbit. Watch your inbox for transmissions.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again in a moment.');
    }
  };

  return (
    <section id="newsletter" className="section-pad relative">
      <div className="container-x">
        <div className="reveal glass-strong relative overflow-hidden rounded-3xl px-6 py-14 text-center md:px-16 md:py-20">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-violet/30 blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-nebula-cyan/20 blur-[90px]" />
          </div>

          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-nebula-cyan ring-1 ring-white/10">
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold text-white md:text-4xl">
            Join the transmission
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Get early access to new releases, behind-the-scenes field
            recordings, and occasional dispatches from deep orbit. No noise —
            just signal.
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              required
              className="w-full rounded-full border border-white/10 bg-void-900/60 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-nebula-violet/60 focus:ring-2 focus:ring-nebula-violet/30"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </form>

          {message && (
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
              {message}
            </p>
          )}

          <p className="mt-4 text-xs text-slate-500">
            No spam. Unsubscribe with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
