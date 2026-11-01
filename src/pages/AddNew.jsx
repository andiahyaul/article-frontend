import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm.jsx'
import { createArticle } from '../api.js'

export default function AddNew() {
  const nav = useNavigate()
  return (
    <>
      <h2>Add New</h2>
      <ArticleForm
        onSubmit={async (data) => {
          await createArticle(data)
          nav('/posts', { state: { tab: data.status } })
        }}
      />
    </>
  )
}
