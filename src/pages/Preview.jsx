import { useEffect, useState } from 'react'
import { listArticles } from '../api.js'

const PAGE_SIZE = 5

export default function Preview() {
  const [page, setPage] = useState(0)
  const [data, setData] = useState({ items: [], total: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    listArticles('publish', PAGE_SIZE, page * PAGE_SIZE).then(setData).catch((e) => setError(e.message))
  }, [page])

  const pages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))

  return (
    <>
      <h2>Preview</h2>
      {error && <p className="err">{error}</p>}
      {data.items.length === 0 && !error && <p>No published articles.</p>}
      {data.items.map((a) => (
        <article key={a.id} className="post">
          <h3>{a.title}</h3>
          <div className="meta">{a.category} · {new Date(a.created_date).toLocaleDateString()}</div>
          <p>{a.content}</p>
        </article>
      ))}
      <div className="pager">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page + 1} / {pages}</span>
        <button disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  )
}
