import { useState, useEffect } from "react";
import { getResources, addLink, uploadFile, deleteResource } from "../api/resources";
import "./ResourcesCard.css";

function getDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return ""; }
}

function getFileType(url) {
  const ext = url?.split("?")[0].split(".").pop().toLowerCase();
  const map = {
    pdf:  { label: "PDF",  color: "#ef4444", bg: "#fef2f2" },
    doc:  { label: "DOC",  color: "#3b82f6", bg: "#eff6ff" },
    docx: { label: "DOC",  color: "#3b82f6", bg: "#eff6ff" },
    ppt:  { label: "PPT",  color: "#f59e0b", bg: "#fffbeb" },
    pptx: { label: "PPT",  color: "#f59e0b", bg: "#fffbeb" },
    xls:  { label: "XLS",  color: "#10b981", bg: "#f0fdf4" },
    xlsx: { label: "XLS",  color: "#10b981", bg: "#f0fdf4" },
  };
  return map[ext] || { label: (ext || "FILE").toUpperCase(), color: "#6b7280", bg: "#f3f4f6" };
}

function ResourcesCard() {
  const [resources, setResources] = useState([]);
  const [adding, setAdding] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getResources().then(setResources).catch(console.error);
  }, []);

  function reset() {
    setAdding(null);
    setTitle("");
    setUrl("");
    setFile(null);
  }

  async function handleAddLink(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resource = await addLink(title, url);
      setResources((r) => [resource, ...r]);
      reset();
    } catch {
      alert("Failed to add link.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const resource = await uploadFile(title, file);
      setResources((r) => [resource, ...r]);
      reset();
    } catch {
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await deleteResource(id);
    setResources((r) => r.filter((x) => x.id !== id));
  }

  const links = resources.filter((r) => r.type === "link");
  const files = resources.filter((r) => r.type === "file");

  return (
    <div className="resources-inner">
      <div className="resources-header">
        <h2 className="card-title" style={{ margin: 0 }}>Project Resources</h2>
        {!adding && (
          <div className="resources-add-row">
            <button className="res-add-btn res-add-link" onClick={() => setAdding("link")}>
              + Link
            </button>
            <button className="res-add-btn res-add-file" onClick={() => setAdding("file")}>
              + File
            </button>
          </div>
        )}
      </div>

      {adding === "link" && (
        <form className="res-form" onSubmit={handleAddLink}>
          <input className="res-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required autoFocus />
          <input className="res-input" placeholder="URL (https://...)" value={url} onChange={e => setUrl(e.target.value)} required type="url" />
          <div className="res-form-btns">
            <button className="res-submit-btn" type="submit" disabled={loading}>{loading ? "Adding..." : "Add Link"}</button>
            <button className="res-cancel-btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      )}

      {adding === "file" && (
        <form className="res-form" onSubmit={handleUpload}>
          <input className="res-input" placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="res-file-input" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={e => setFile(e.target.files[0])} required />
          <div className="res-form-btns">
            <button className="res-submit-btn" type="submit" disabled={!file || loading}>{loading ? "Uploading..." : "Upload"}</button>
            <button className="res-cancel-btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      )}

      <div className="resources-cols">
        {/* Links column */}
        <div className="resources-col">
          <div className="resources-col-header resources-col-header--links">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span className="col-header-label">Links</span>
            {links.length > 0 && <span className="col-header-count">{links.length}</span>}
          </div>
          <div className="resources-col-list">
            {links.length === 0
              ? <p className="resources-empty">No links yet</p>
              : links.map(r => (
                <div key={r.id} className="resource-item resource-item--link">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-item-body">
                    <span className="resource-item-title">{r.title}</span>
                    <span className="resource-item-sub">{getDomain(r.url)}</span>
                  </a>
                  <button className="resource-delete-btn" onClick={() => handleDelete(r.id)} title="Remove">✕</button>
                </div>
              ))
            }
          </div>
        </div>

        {/* Files column */}
        <div className="resources-col">
          <div className="resources-col-header resources-col-header--files">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span className="col-header-label">Files</span>
            {files.length > 0 && <span className="col-header-count">{files.length}</span>}
          </div>
          <div className="resources-col-list">
            {files.length === 0
              ? <p className="resources-empty">No files yet</p>
              : files.map(r => {
                  const ft = getFileType(r.url);
                  return (
                    <div key={r.id} className="resource-item resource-item--file">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-item-body">
                        <span className="res-file-badge" style={{ color: ft.color, background: ft.bg }}>
                          {ft.label}
                        </span>
                        <span className="resource-item-title">{r.title}</span>
                      </a>
                      <button className="resource-delete-btn" onClick={() => handleDelete(r.id)} title="Remove">✕</button>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesCard;
