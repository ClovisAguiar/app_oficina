# Oficina App

Aplicação de demonstração com React 19, Vite e Supabase.

## Requisitos

- Node.js 22.12+ (recomendado) ou 24+
- npm

## Executar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Banco de dados

Execute a migration `supabase/migrations/202611040001_create_nomes_teste.sql` no projeto Supabase. Ela cria `public.nomes_teste`, ativa RLS e permite somente inserções anônimas para o teste. Não use uma chave `service_role` ou secret no frontend.

## Deploy

Importe o repositório no Vercel e configure as duas variáveis de ambiente acima para Production, Preview e Development. O comando de build é `npm run build` e a pasta de saída é `dist`.
