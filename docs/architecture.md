# Kiến trúc và lộ trình

## Nguyên tắc sản phẩm
1. Tách biệt dữ liệu, tone of voice và nội dung của Little People và EPath.
2. Không cho phép xuất bản trực tiếp khi bài chưa được duyệt.
3. Lưu token và API key ở server-side environment variables.
4. Ghi nhận trạng thái và lịch sử thay đổi bài viết.
5. Tách nội dung (caption) khỏi media và lịch xuất bản.

## Các phân hệ
- Dashboard: tổng quan số bài theo trạng thái.
- Content Studio: tiêu đề nội bộ, caption, ngôn ngữ, media, hashtag, CTA.
- Brand profiles: hướng dẫn thương hiệu, tone of voice, fanpage liên kết.
- Approval: Draft → Pending Review → Changes Requested → Approved.
- Calendar: lịch nội dung theo tuần/tháng.
- Publishing: gửi bài đã duyệt sang Metricool; lưu external post ID và kết quả.
- AI assistant: tạo mới, viết lại, dịch và kiểm tra nội dung.

## Dữ liệu đề xuất (Supabase)
- brands(id, name, slug, voice_guide, language_rules)
- social_accounts(id, brand_id, provider, external_account_id, display_name)
- posts(id, brand_id, title, caption_vi, caption_en, format, status, created_by, approved_by)
- post_media(id, post_id, storage_path, media_type, sort_order)
- publishing_jobs(id, post_id, social_account_id, scheduled_at, status, external_post_id, error_message)
- post_revisions(id, post_id, content_snapshot, changed_by, created_at)
- users(id, name, email, role)

## Lộ trình
### Phase 1 — Content workspace
- Hoàn thiện giao diện dashboard và trình soạn bài.
- Lưu bài vào database.
- Quản lý profile Little People và EPath.

### Phase 2 — AI và duyệt bài
- Tích hợp AI qua API route phía server.
- Thêm vai trò người soạn/người duyệt.
- Lưu lịch sử chỉnh sửa và trạng thái duyệt.

### Phase 3 — Lịch đăng và xuất bản
- Kết nối Metricool và chọn social accounts.
- Đồng bộ lịch đăng, lên lịch bài đã duyệt.
- Ghi nhận kết quả đăng và xử lý lỗi.

## Tình trạng kết nối Metricool
Metricool đã được kết nối ở cấp ứng dụng trong ChatGPT, nhưng brand đang chọn chưa có social network được liên kết. Cần người dùng kết nối ít nhất một Facebook Page trong Metricool trước khi triển khai chọn page và publishing. Không giả định API credential hay endpoint chưa được xác minh.
