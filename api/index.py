from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
from typing import Any, Dict, List

app = FastAPI(title="DKV Portfolio API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vercel filesystem is read-only except for /tmp
if os.environ.get("VERCEL"):
    DB_FILE = "/tmp/portfolio.db"
else:
    DB_FILE = "portfolio.db"

# Skema data (Pydantic Model) untuk input dari User
class ProjectCreate(BaseModel):
    judul_karya: str
    kategori: str
    deskripsi: str
    link_gambar: str

def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    conn.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            judul_karya TEXT NOT NULL,
            kategori TEXT NOT NULL,
            deskripsi TEXT NOT NULL,
            link_gambar TEXT NOT NULL
        )
    ''')
    return conn

@app.get("/api/test")
def test_connection() -> Dict[str, str]:
    return {
        "status": "success",
        "message": "Backend FastAPI berhasil terhubung dengan sukses!"
    }

@app.get("/api/projects")
def get_projects() -> List[Dict[str, Any]]:
    conn = get_db()
    projects = conn.execute("SELECT * FROM projects").fetchall()
    conn.close()
    return [dict(p) for p in projects]

@app.post("/api/projects", status_code=201)
def create_project(project: ProjectCreate) -> Dict[str, Any]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO projects (judul_karya, kategori, deskripsi, link_gambar) VALUES (?, ?, ?, ?)",
        (project.judul_karya, project.kategori, project.deskripsi, project.link_gambar)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {
        "message": "Karya berhasil ditambahkan!",
        "data": {
            "id": new_id,
            **project.model_dump()
        }
    }
