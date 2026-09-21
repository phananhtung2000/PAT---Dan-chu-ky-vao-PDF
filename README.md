# Hướng dẫn deploy "Chèn chữ ký vào PDF" lên GitHub Pages + cài đặt app

## 1. Đưa 6 file lên GitHub
1. Tạo repo mới trên GitHub (public).
2. Đẩy 6 file: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`,
   `icon-512-maskable.png` lên **thư mục gốc** của repo (không để trong thư mục con).
3. Vào Settings → Pages → Source: chọn branch `main`, thư mục `/ (root)` → Save.
4. Đợi vài phút, mở `https://<username>.github.io/<ten-repo>/`.

## 2. Cài trên Android (Chrome)
Mở link trên → menu 3 chấm (góc phải) → "Cài đặt ứng dụng" hoặc "Thêm vào Màn hình chính".

## 3. Cài trên Windows 11 (Edge/Chrome)
Mở link trên → bấm icon "Cài đặt" trên thanh địa chỉ, hoặc menu → Ứng dụng →
"Cài đặt trang này như một ứng dụng".

## 4. Kiểm tra chuẩn PWA
DevTools (F12) → tab Lighthouse → chọn "Progressive Web App" → Analyze.

## Lưu ý
- File vẫn mở được bình thường qua double-click (`file://`), chạy offline hoàn toàn.
- Dữ liệu nghiệp vụ (chữ ký, cấu hình) được lưu bằng IndexedDB (có dự phòng localStorage)
  ngay trong trình duyệt — không bị ảnh hưởng bởi service worker.
- Phần mềm này không dùng thư viện ngoài qua CDN nên không cần cấu hình cache thêm gì khác.
