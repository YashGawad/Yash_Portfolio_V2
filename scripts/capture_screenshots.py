import subprocess
import os

viewports = [
    (1920, 1080, "desktop-1920"),
    (1440, 900, "desktop-1440"),
    (1366, 768, "laptop-1366"),
    (768, 1024, "tablet-768"),
    (390, 844, "mobile-390"),
    (360, 800, "mobile-360"),
]

shots_dir = os.path.abspath("screenshots")
os.makedirs(shots_dir, exist_ok=True)
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
url = "http://localhost:4173/Yash_Portfolio/#contact"

print("Starting screenshots with absolute paths...")
for w, h, name in viewports:
    out_file = os.path.join(shots_dir, f"{name}-contact.png")
    user_dir = f"d:\\Yash_Portfolio_V2\\tmp_edge_{w}"
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--user-data-dir={user_dir}",
        f"--window-size={w},{h}",
        f"--screenshot={out_file}",
        url
    ]
    try:
        res = subprocess.run(cmd, capture_output=True, timeout=10)
        exists = os.path.exists(out_file)
        size = os.path.getsize(out_file) if exists else 0
        print(f"{name}: exists={exists}, size={size} bytes")
    except Exception as e:
        print(f"Failed {name}: {e}")

print("Done.")
