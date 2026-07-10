'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type ContactRow = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  message: string
  status: string
}

type RFQRow = {
  id: string
  created_at: string
  company: string
  responsible: string
  country: string
  email: string
  phone: string
  product: string
  specification: string | null
  quantity: string
  destination_port: string | null
  incoterm: string
  payment_terms: string
  observations: string | null
  status: string
}

const fmt = (iso: string) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

const badge = (status: string) => {
  const colors: Record<string, string> = { new: '#C9A227', read: '#1B2B4B', done: '#2d7a4f' }
  return (
    <span style={{ background: colors[status] ?? '#888', color: '#fff', fontSize: '1.1rem', fontWeight: 600, padding: '0.2rem 0.8rem', borderRadius: '2rem' }}>
      {status}
    </span>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'contacts' | 'rfqs'>('contacts')
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [rfqs, setRFQs] = useState<RFQRow[]>([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Senha incorreta.')
    }
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    Promise.all([
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('rfq_submissions').select('*').order('created_at', { ascending: false }),
    ]).then(([c, r]) => {
      if (c.data) setContacts(c.data as ContactRow[])
      if (r.data) setRFQs(r.data as RFQRow[])
      setLoading(false)
    })
  }, [authed])

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', borderRadius: '1.2rem', padding: '4rem', boxShadow: '0 4px 32px rgba(27,43,75,0.12)', minWidth: '32rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#1B2B4B', letterSpacing: '-0.02em' }}>GOPAR</div>
            <div style={{ fontSize: '1.4rem', color: '#666', marginTop: '0.4rem' }}>Painel Administrativo</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1B2B4B' }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              style={{ padding: '1.2rem 1.6rem', fontSize: '1.5rem', border: '1.5px solid #ddd', borderRadius: '0.8rem', outline: 'none', transition: 'border 0.2s' }}
            />
          </div>
          {authError && <p style={{ color: '#c0392b', fontSize: '1.3rem', margin: 0 }}>{authError}</p>}
          <button type="submit" style={{ padding: '1.3rem', background: '#1B2B4B', color: '#fff', border: 'none', borderRadius: '0.8rem', fontSize: '1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    )
  }

  const rows = tab === 'contacts' ? contacts : rfqs

  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f7', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: '#1B2B4B', color: '#fff', padding: '1.6rem 3.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>GOPAR</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.8rem' }}>/</span>
          <span style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)' }}>Admin</span>
        </div>
        <button onClick={() => setAuthed(false)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.6rem 1.4rem', borderRadius: '0.6rem', cursor: 'pointer', fontSize: '1.3rem' }}>
          Sair
        </button>
      </div>

      <div style={{ maxWidth: '120rem', margin: '0 auto', padding: '3.2rem 2.4rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.6rem', marginBottom: '3.2rem' }}>
          {[
            { label: 'Contatos', count: contacts.length, key: 'contacts' as const, newCount: contacts.filter(c => c.status === 'new').length },
            { label: 'Cotações (RFQ)', count: rfqs.length, key: 'rfqs' as const, newCount: rfqs.filter(r => r.status === 'new').length },
          ].map(s => (
            <button key={s.key} onClick={() => setTab(s.key)} style={{ textAlign: 'left', background: tab === s.key ? '#1B2B4B' : '#fff', color: tab === s.key ? '#fff' : '#1B2B4B', border: `2px solid ${tab === s.key ? '#1B2B4B' : '#e4e6ea'}`, borderRadius: '1.2rem', padding: '2rem 2.4rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 600, opacity: 0.7, marginBottom: '0.4rem' }}>{s.label}</div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800 }}>{s.count}</div>
              {s.newCount > 0 && <div style={{ fontSize: '1.2rem', marginTop: '0.4rem', color: tab === s.key ? '#C9A227' : '#C9A227', fontWeight: 600 }}>{s.newCount} novo{s.newCount > 1 ? 's' : ''}</div>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(27,43,75,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '2rem 2.4rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#1B2B4B', margin: 0 }}>
              {tab === 'contacts' ? 'Mensagens de Contato' : 'Pedidos de Cotação'}
            </h2>
            {loading && <span style={{ fontSize: '1.3rem', color: '#999' }}>Carregando...</span>}
          </div>

          {rows.length === 0 && !loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#999', fontSize: '1.5rem' }}>Nenhum registro encontrado.</div>
          ) : (
            <div>
              {tab === 'contacts' ? (
                contacts.map(c => (
                  <div key={c.id} style={{ borderBottom: '1px solid #f4f5f7' }}>
                    <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '1.6rem 2.4rem', display: 'grid', gridTemplateColumns: '16rem 1fr 1fr auto auto', gap: '1.6rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.25rem', color: '#888' }}>{fmt(c.created_at)}</span>
                      <span style={{ fontWeight: 600, color: '#1B2B4B', fontSize: '1.4rem' }}>{c.name}</span>
                      <span style={{ color: '#555', fontSize: '1.35rem' }}>{c.email}</span>
                      <span style={{ color: '#777', fontSize: '1.3rem' }}>{c.phone ?? '—'}</span>
                      {badge(c.status)}
                    </button>
                    {expanded === c.id && (
                      <div style={{ padding: '0 2.4rem 2rem', background: '#fafbfc', borderTop: '1px solid #f0f0f0' }}>
                        <p style={{ fontSize: '1.4rem', color: '#333', lineHeight: 1.7, margin: '1.6rem 0 0', whiteSpace: 'pre-wrap' }}>{c.message}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                rfqs.map(r => (
                  <div key={r.id} style={{ borderBottom: '1px solid #f4f5f7' }}>
                    <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '1.6rem 2.4rem', display: 'grid', gridTemplateColumns: '16rem 1fr 1fr 1fr auto', gap: '1.6rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.25rem', color: '#888' }}>{fmt(r.created_at)}</span>
                      <span style={{ fontWeight: 600, color: '#1B2B4B', fontSize: '1.4rem' }}>{r.company}</span>
                      <span style={{ color: '#555', fontSize: '1.35rem' }}>{r.responsible}</span>
                      <span style={{ color: '#C9A227', fontWeight: 600, fontSize: '1.35rem' }}>{r.product}</span>
                      {badge(r.status)}
                    </button>
                    {expanded === r.id && (
                      <div style={{ padding: '0 2.4rem 2rem', background: '#fafbfc', borderTop: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gap: '1.2rem', marginTop: '1.6rem' }}>
                          {[
                            ['E-mail', r.email],
                            ['Telefone', r.phone],
                            ['País', r.country],
                            ['Quantidade', r.quantity],
                            ['Porto de Destino', r.destination_port ?? '—'],
                            ['Incoterm', r.incoterm],
                            ['Condição de Pagamento', r.payment_terms],
                            ['Especificação', r.specification ?? '—'],
                          ].map(([label, val]) => (
                            <div key={label} style={{ background: '#fff', borderRadius: '0.8rem', padding: '1.2rem 1.4rem', border: '1px solid #eee' }}>
                              <div style={{ fontSize: '1.1rem', color: '#999', fontWeight: 600, marginBottom: '0.3rem' }}>{label}</div>
                              <div style={{ fontSize: '1.35rem', color: '#333' }}>{val}</div>
                            </div>
                          ))}
                        </div>
                        {r.observations && (
                          <div style={{ marginTop: '1.2rem', background: '#fff', borderRadius: '0.8rem', padding: '1.2rem 1.4rem', border: '1px solid #eee' }}>
                            <div style={{ fontSize: '1.1rem', color: '#999', fontWeight: 600, marginBottom: '0.3rem' }}>Observações</div>
                            <p style={{ fontSize: '1.35rem', color: '#333', margin: 0, whiteSpace: 'pre-wrap' }}>{r.observations}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
