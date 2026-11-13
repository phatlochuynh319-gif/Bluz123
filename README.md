# Bluz123 — Facebook Content Management

Hệ thống quản lý nội dung mạng xã hội, ưu tiên quy trình soạn bài, duyệt nội dung và lên lịch đăng Facebook cho hai thương hiệu Little People và EPath.

## Mục tiêu MVP
- Quản lý nội dung theo thương hiệu, fanpage, định dạng và trạng thái.
- Hỗ trợ soạn thảo, biên tập và lưu bản nháp.
- Tách giọng văn, thông tin và bộ nhận diện của Little People và EPath.
- Có quy trình duyệt trước khi xuất bản.
- Tích hợp Metricool để quản lý lịch đăng/xuất bản sau khi tài khoản và fanpage được kết nối.
- Bảo vệ API keys bằng biến môi trường; không lưu token trong mã nguồn.

## Công nghệ dự kiến
- Next.js + TypeScript
- Tailwind CSS
- Supabase (đăng nhập, database, media storage) — giai đoạn tiếp theo
- OpenAI API (trợ lý viết nội dung) — giai đoạn tiếp theo
- Metricool (lịch đăng và xuất bản) — cần kết nối social network trong Metricool

## Chạy local
```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở http://localhost:3000.

## Trạng thái
Đây là bộ khung khởi đầu. Giao diện ban đầu dùng dữ liệu mẫu ở phía client; chưa lưu database, chưa gọi AI và chưa đăng Facebook trực tiếp.

## Tài liệu
- [Kiến trúc và lộ trình](docs/architecture.md)
- [Cấu hình môi trường](.env.example)
