import { useState } from 'react'

const RULES = {
  title: (v) => (v.trim().length < 20 ? 'Title minimal 20 karakter' : ''),
  content: (v) => (v.trim().length < 200 ? 'Content minimal 200 karakter' : ''),
  category: (v) => (v.trim().length < 3 ? 'Category minimal 3 karakter' : ''),
}

export default function ArticleForm({ initial, onSubmit }) {
  const [form, setForm] = useState(initial || { title: '', content: '', category: '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(status) {
    const errs = {}
    for (const k of Object.keys(RULES)) {
      const m = RULES[k](form[k])
      if (m) errs[k] = m
    }
    setErrors(errs)
    setServerError('')
    if (Object.keys(errs).length) return
    setSaving(true)
    try {
      await onSubmit({ ...form, status })
    } catch (e) {
      setErrors(e.fields || {})
      setServerError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <label>
        Title
        <input value={form.title} onChange={set('title')} placeholder="Minimal 20 karakter" />
        {errors.title && <span className="err">{errors.title}</span>}
      </label>
      <label>
        Content
        <textarea rows={10} value={form.content} onChange={set('content')} placeholder="Minimal 200 karakter" />
        <small>{form.content.trim().length} / 200</small>
        {errors.content && <span className="err">{errors.content}</span>}
      </label>
      <label>
        Category
        <input value={form.category} onChange={set('category')} placeholder="Minimal 3 karakter" />
        {errors.category && <span className="err">{errors.category}</span>}
      </label>
      {serverError && <div className="err">{serverError}</div>}
      <div className="actions">
        <button className="primary" disabled={saving} onClick={() => submit('publish')}>Publish</button>
        <button disabled={saving} onClick={() => submit('draft')}>Draft</button>
      </div>
    </form>
  )
}
