import { useState, useEffect } from "react";
import { getResources, addLink, uploadFile, deleteResource } from "../api/resources";
import "./ResourcesCard.css";

function ResourcesCard() {
  const [resources, setResources] = useState([]);
  const [adding, setAdding] = useState(null); // null | "link" | "file"
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

  return (
    <div className="resources-inner">
      <div className="resources-header">
        <h2 className="card-title" style={{ margin: 0 }}>Project Resources</h2>
        {!adding && (
          <div className="resources-add-row">
            <button className="res-add-btn" onClick={() => setAdding("link")}>+ Link</button>
            <button className="res-add-btn" onClick={() => setAdding("file")}>+ File</button>
          </div>
        )}
      </div>

      {adding === "link" && (
        <form className="res-form" onSubmit={handleAddLink}>
          <input
            className="res-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          <input
            className="res-input"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
          />
          <div className="res-form-btns">
            <button className="res-submit-btn" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Link"}
            </button>
            <button className="res-cancel-btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      )}

      {adding === "file" && (
        <form className="res-form" onSubmit={handleUpload}>
          <input
            className="res-input"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="res-file-input"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <div className="res-form-btns">
            <button className="res-submit-btn" type="submit" disabled={!file || loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button className="res-cancel-btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      )}

      <div className="resources-list">
        {resources.length === 0 && !adding && (
          <p className="resources-empty">No resources yet — add a link or upload a file.</p>
        )}
        {resources.map((r) => (
          <div key={r.id} className="resource-item">
            <span className="resource-icon">{r.type === "file" ? "📄" : "🔗"}</span>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-title"
            >
              {r.title}
            </a>
            <button className="resource-delete-btn" onClick={() => handleDelete(r.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesCard;
