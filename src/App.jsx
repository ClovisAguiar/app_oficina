import { useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const menuItems = [
  { id: 'inicio', label: 'Visão geral', icon: '▦' },
  { id: 'cadastro', label: 'Cadastro', icon: '＋' },
  { id: 'relatorios', label: 'Relatórios', icon: '▤' },
]

const footerItems = [
  { id: 'ajuda', label: 'Ajuda', icon: '?' },
  { id: 'configuracoes', label: 'Configurações', icon: '⚙' },
]

export default function App() {
  const [active, setActive] = useState('cadastro')
  const [nome, setNome] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanName = nome.trim()
    if (!cleanName) {
      setStatus({ type: 'error', message: 'Digite um nome antes de salvar.' })
      return
    }
    if (!isSupabaseConfigured) {
      setStatus({ type: 'error', message: 'Configure as variáveis do Supabase para habilitar o cadastro.' })
      return
    }

    setSaving(true)
    setStatus({ type: '', message: '' })
    const { error } = await supabase.from('nomes_teste').insert({ nome: cleanName })
    setSaving(false)

    if (error) {
      setStatus({ type: 'error', message: `Não foi possível salvar: ${error.message}` })
      return
    }
    setNome('')
    setStatus({ type: 'success', message: 'Nome salvo com sucesso no Supabase!' })
  }

  function navigate(id) {
    setActive(id)
    if (id !== 'cadastro') {
      setStatus({ type: 'info', message: 'Esta seção é apenas uma demonstração de navegação.' })
    } else {
      setStatus({ type: '', message: '' })
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); navigate('inicio') }}>
          <span className="brand-mark">O</span>
          <span>oficina<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="environment"><i /> Ambiente de teste</span>
          <button className="avatar" aria-label="Perfil do usuário">CA</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="side-caption">MENU PRINCIPAL</div>
          <nav aria-label="Menu principal">
            {menuItems.map((item) => (
              <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="side-caption">SUPORTE</div>
            {footerItems.map((item) => (
              <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </button>
            ))}
            <div className="sidebar-card">
              <span className="sidebar-card-icon">✦</span>
              <strong>Espaço de teste</strong>
              <span>Projeto conectado ao Supabase</span>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="breadcrumb"><span>Início</span><b>/</b><strong>{active === 'cadastro' ? 'Cadastro' : menuItems.concat(footerItems).find((item) => item.id === active)?.label || 'Visão geral'}</strong></div>
          <section className="page-heading">
            <div>
              <div className="eyebrow">ÁREA DE TESTES</div>
              <h1>Cadastro de nome</h1>
              <p>Um espaço simples para validar a conexão com o banco de dados.</p>
            </div>
            <span className="page-tag"><i /> Projeto ativo</span>
          </section>

          <section className="form-card">
            <div className="card-heading">
              <div className="card-icon">✎</div>
              <div><h2>Novo registro</h2><p>Preencha o campo abaixo para salvar um nome.</p></div>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" type="text" placeholder="Digite um nome..." value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
              <div className="form-actions">
                <span className="helper-text">Apenas um campo. Sem complicação.</span>
                <button className="submit-button" type="submit" disabled={saving || active !== 'cadastro'}>
                  {saving ? 'Salvando...' : 'Salvar nome'} <span>→</span>
                </button>
              </div>
              {status.message && <div className={`feedback ${status.type}`} role="status">{status.message}</div>}
            </form>
          </section>

          <div className="connection-note">
            <span className="connection-icon">⌁</span>
            <div><strong>Integração com Supabase</strong><p>{isSupabaseConfigured ? 'As credenciais foram configuradas. Pronto para gravar registros.' : 'Aguardando configuração das credenciais para conectar ao banco.'}</p></div>
            <span className={`connection-status ${isSupabaseConfigured ? 'online' : ''}`}>{isSupabaseConfigured ? 'Configurado' : 'Pendente'}</span>
          </div>
        </main>
      </div>

      <footer className="footer">
        <span>© 2026 Oficina App <b>·</b> Projeto de demonstração</span>
        <div><span className="footer-dot" /> Todos os sistemas operacionais</div>
      </footer>
    </div>
  )
}
