import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getArticle, listArticles, updateArticle } from '../api.js'

const TABS = [
  { key: 'publish', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'thrash', label: 'Trashed' },
]
const PAGE_SIZE = 10

export default function AllPosts() {
  const location = useLocation()
  const [tab, setTab] = useState(location.state?.tab || 'publish')
  const [page, setPage] = useState(0)
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    listArticles(tab, PAGE_SIZE, page * PAGE_SIZE)
      .then((d) => {
        // last item on this page was removed
        if (d.items.length === 0 && page > 0) setPage(page - 1)
        else setData(d)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [tab, page])

  useEffect(load, [load])

  async function trash(id) {
    try {
      const a = await getArticle(id)
      await updateArticle(id, { title: a.title, content: a.content, category: a.category, status: 'thrash' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const pages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))

  return (
    <>
      <h2>All Posts</h2>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={t.key === tab ? 'tab active' : 'tab'} onClick={() => { setTab(t.key); setPage(0) }}>
            {t.label}
          </button>
        ))}
      </div>
      {error && <p className="err">{error}</p>}
      <table>
        <thead>
          <tr><th>Title</th><th>Category</th><th>Action</th></tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={3}>Loading…</td></tr>}
          {!loading && data.items.length === 0 && <tr><td colSpan={3}>No articles.</td></tr>}
          {!loading && data.items.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.category}</td>
              <td className="icons">
                <Link to={`/edit/${a.id}`} title="Edit" aria-label="Edit">✏️</Link>
                {tab !== 'thrash' && (
                  <button className="icon" title="Trash" aria-label="Trash" onClick={() => trash(a.id)}>🗑️</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pages > 1 && (
        <div className="pager">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
          <span>{page + 1} / {pages}</span>
          <button disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </>
  )
}
