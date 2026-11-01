const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(body.error || `HTTP ${res.status}`)
    err.fields = body.fields || {}
    throw err
  }
  return { body, total: Number(res.headers.get('X-Total-Count') || 0) }
}

export const listArticles = (status, limit, offset) =>
  req(`/article/${limit}/${offset}?status=${status}`).then(({ body, total }) => ({ items: body, total }))

export const getArticle = (id) => req(`/article/${id}`).then((r) => r.body)

export const createArticle = (data) => req('/article/', { method: 'POST', body: JSON.stringify(data) })

export const updateArticle = (id, data) => req(`/article/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteArticle = (id) => req(`/article/${id}`, { method: 'DELETE' })
