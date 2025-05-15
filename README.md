# Dilithium Visualization Project

This repository provides a visualization and demonstration platform for the Dilithium post-quantum signature scheme. Users can compare different Dilithium variants side by side and interactively explore the key generation, signing, and verification processes.

---

## Prerequisites

- **Python 3.8+**
- **Node.js 16+** and **npm**
- **Git**

---

## Cloning the Repository (with Submodules)

This project uses submodules (such as `dilithium_py`).  
To clone the repository with all submodules, run:

```sh
git clone --recurse-submodules https://github.com/Ishika-Joshi/dilithium-visualization.git
cd dilithium-visualization
```

If you have already cloned the repository without submodules, initialize them with:

```sh
git submodule update --init --recursive
```

---

## Backend Setup (Flask API)

1. **Navigate to the backend directory:**

    ```sh
    cd backend
    ```

2. **Install Python dependencies:**

    ```sh
    pip install -r requirements.txt
    ```


3. **Run the backend server:**

    ```sh
    python main_api.py
    ```

    The API will be available at `http://localhost:5000/`.

---

## Frontend Setup (React)

1. **Navigate to the frontend directory:**

    ```sh
    cd ../frontend
    ```

2. **Install Node.js dependencies:**

    ```sh
    npm install
    ```

3. **Run the React app:**

    ```sh
    npm start
    ```

    The app will open at `http://localhost:3000/`.

---

## Usage

- **Comparison Page:** Compare Dilithium variants side by side.
- **Process Page:** Step through key generation, signing, and verification for any Dilithium variant.

---

## Notes

- Make sure the backend server is running before using the frontend.
- If you update submodules, run `git submodule update --remote` to fetch the latest changes.

---

## Troubleshooting

- If you get CORS errors, ensure `flask-cors` is installed and `CORS(app)` is called in your Flask app.
- If you see "Not Found" in the browser, make sure you are accessing the correct endpoint (see API docs or code comments).

---

