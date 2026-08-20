# Persistent Priority Queue

A production-style implementation of a **Persistent Min-Max Priority Queue** using **Python, PostgreSQL, FastAPI, and React**.

This project was developed as the interview assignment for the **Software Development Engineer (SDE)** role at **Saralweb**.

---

## Live Demo

**Frontend:** https://saralweb-pq-web.vercel.app/

**Backend API:** https://saralweb-priority-queue.onrender.com

**Swagger Docs:** https://saralweb-priority-queue.onrender.com/docs

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI |
| Database | PostgreSQL |
| Data Structure | Min-Max Heap |
| Language | Python 3 |
| Deployment | Vercel + Render |

---

## Features

- Insert task with priority
- Extract minimum priority
- Extract maximum priority
- Peek minimum & maximum
- Update priority
- Delete task
- Check empty queue
- Persistent PostgreSQL storage
- Interactive React dashboard
- RESTful API with Swagger documentation

---

## Architecture

```
React UI
     │
     ▼
 FastAPI REST API
     │
     ▼
 PriorityQueue Module
     │
     ▼
  Min-Max Heap
     │
     ▼
 PostgreSQL Database
```

The **Min-Max Heap** provides efficient priority queue operations, while PostgreSQL guarantees persistence across application restarts.

---

## Project Structure

```
saralweb-priority-queue/
│
├── api.py
├── module.py
├── init_db.py
├── requirements.txt
├── README.md
│
├── database/
│   ├── db.py
│   ├── repository.py
│   └── schema.sql
│
├── heap/
│   ├── minmax_heap.py
│   ├── node.py
│   └── exceptions.py
│
└── tests/
    └── test_module.py
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Display queue |
| POST | `/insert` | Insert task |
| GET | `/peek` | View min & max |
| POST | `/extract-min` | Remove minimum |
| POST | `/extract-max` | Remove maximum |
| PUT | `/update/{id}` | Update priority |
| DELETE | `/delete/{id}` | Delete task |

Interactive documentation is available through **Swagger UI**.

---

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Insert | O(log n) |
| Extract Min | O(log n) |
| Extract Max | O(log n) |
| Peek | O(1) |
| Update | O(log n) |
| Delete | O(log n) |
| Is Empty | O(1) |

---

## Real-World Applications

Priority queues are widely used in:

- Operating system process scheduling
- Hospital emergency triage
- Task & job scheduling systems
- Network packet prioritization
- Event-driven simulation engines
- AI pathfinding algorithms (A*)

---

## Local Setup

### Backend

```bash
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python init_db.py

uvicorn api:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

### Frontend

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Author

**Faisal Naseer**

B.Tech CSE (AI & ML)

GitHub: https://github.com/xtfaisal07