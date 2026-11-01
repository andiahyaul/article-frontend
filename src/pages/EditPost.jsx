import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm.jsx'
import { getArticle, updateArticle } from '../api.js'

export default function EditPost() {
  const { id } = useParams()
  const nav = useNavigate()
  const [article, setArticle] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getArticle(id).then(setArticle).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="err">{error}</p>
  if (!article) return <p>Loading…</p>

  return (
    <>
      <h2>Edit Article</h2>
      <ArticleForm
        initial={{ title: article.title, content: article.content, category: article.category }}
        onSubmit={async (data) => {
          await updateArticle(id, data)
          nav('/posts', { state: { tab: data.status } })
        }}
      />
    </>
  )
}
