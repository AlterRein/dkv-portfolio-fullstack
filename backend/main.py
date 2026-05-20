from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import Any, Dict, List

app = FastAPI(title="DKV Portfolio API")

# Setup CORS untuk mengizinkan frontend Next.js mengakses backend ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "portfolio.db"

def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Fungsi untuk membuat tabel jika belum ada
def init_db() -> None:
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            judul_karya TEXT NOT NULL,
            kategori TEXT NOT NULL,
            deskripsi TEXT NOT NULL,
            link_gambar TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Inisialisasi database saat script dijalankan
init_db()

# Skema data (Pydantic Model) untuk input dari User
class ProjectCreate(BaseModel):
    judul_karya: str
    kategori: str
    deskripsi: str
    link_gambar: str

@app.get("/api/test")
def test_connection() -> Dict[str, str]:
    return {
        "status": "success", 
        "message": "Backend FastAPI berhasil terhubung dengan sukses!"
    }

# Endpoint 1: Mengambil semua daftar karya
@app.get("/api/projects")
def get_projects() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    projects = conn.execute("SELECT * FROM projects").fetchall()
    conn.close()
    return [dict(p) for p in projects]

# Endpoint 2: Menambahkan karya baru
@app.post("/api/projects", status_code=201)
def create_project(project: ProjectCreate) -> Dict[str, Any]:
    conn = get_db_connection()
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
