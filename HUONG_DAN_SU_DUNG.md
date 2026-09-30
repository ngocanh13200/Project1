# Hướng dẫn sử dụng Website

Website gồm **3 ứng dụng con** nằm trong cùng một dự án, mỗi ứng dụng có giao diện và chức năng riêng:

| Ứng dụng | Trang | Mô tả |
|---|---|---|
| **SkyGate** | `index.html`, `login.html`, `dashboard.html`, `users.html` | Đăng ký, đăng nhập, dashboard và quản lý người dùng |
| **METEO·RADAR** | `weather.html`, `news.html` | Xem thời tiết và tin tức hôm nay |
| **Chợ Đêm** | `shop.html` | Mua sắm sản phẩm làng nghề Việt |

---

## 1. SkyGate — Tài khoản

### 1.1. Đăng ký (`index.html`)

1. Mở trang đăng ký.
2. Điền **Họ tên**, **Email**, **Mật khẩu** (tối thiểu 8 ký tự) và **Nhập lại mật khẩu**.
3. Tích vào ô **"Tôi đồng ý với Điều khoản dịch vụ"**.
4. Bấm **"Tạo tài khoản"**.

- Mỗi ô được kiểm tra ngay khi rời khỏi (blur); lỗi hiển thị dưới ô nhập.
- Email **không được trùng** với tài khoản đã đăng ký.
- Thành công → con dấu "ĐÃ DUYỆT" xuất hiện trên thẻ lên máy bay → tự chuyển sang trang đăng nhập.
- Thẻ lên máy bay bên phải **cập nhật trực tiếp** khi bạn gõ tên/email.

### 1.2. Đăng nhập (`login.html`)

1. Nhập **Email** và **Mật khẩu** đã đăng ký.
2. Bấm **"Đăng nhập"**.

- Có thể bấm **"Hiện/Ẩn"** để xem mật khẩu khi nhập.
- Tick **"Ghi nhớ đăng nhập"** nếu muốn giữ phiên.
- Lỗi thường gặp:
  - *"Email chưa được đăng ký"* → chưa có tài khoản, bấm **"Đăng ký ngay"**.
  - *"Mật khẩu không đúng"* → kiểm tra lại mật khẩu.
- Đăng nhập thành công → tự chuyển sang **Dashboard**.

### 1.3. Dashboard (`dashboard.html`)

- Hiển thị **thẻ lên máy bay** (tên, email, số ghế ngẫu nhiên) và thông tin chuyến bay.
- Thanh trên cùng: avatar, tên người dùng, nút **"Quản lý user"** và **"Đăng xuất"**.
- Bấm **"Đăng xuất"** → xóa phiên đăng nhập → quay về trang đăng nhập.
- Truy cập thẳng Dashboard khi chưa đăng nhập sẽ bị chuyển về trang đăng nhập.

### 1.4. Quản lý người dùng (`users.html`)

> Chỉ truy cập được khi **đã đăng nhập**.

- **Thống kê**: tổng người dùng, số đăng ký hôm nay, số phiên đang đăng nhập.
- **Tìm kiếm**: gõ tên hoặc email vào ô tìm kiếm.
- **Thêm user**: bấm **"+ Thêm user"** → điền Họ tên, Email, Mật khẩu → **Lưu**.
- **Sửa user**: bấm **"Sửa"** ở hàng tương ứng → chỉnh thông tin → **Cập nhật** (để trống mật khẩu nếu không đổi).
- **Xóa user**: bấm **"Xóa"** → xác nhận trong hộp thoại → **Xóa**.
- Email trùng sẽ bị chặn. Mật khẩu **không bao giờ hiển thị** trên danh sách.

---

## 2. METEO·RADAR — Thời tiết & Tin tức

### 2.1. Xem thời tiết (`weather.html`)

- Mặc định hiển thị thời tiết **Hà Nội**.
- **Tìm thành phố**: gõ tên thành phố vào ô tìm kiếm → chọn kết quả gợi ý.
- Thông tin hiển thị:
  - Nhiệt độ hiện tại, cảm giác như, cao/thấp nhất.
  - **Dự báo theo giờ** (24 giờ tới): biểu đồ cột nhiệt độ, icon, % mưa.
  - **7 ngày tới**: icon, % mưa, khoảng nhiệt min–max.
  - Chi tiết: độ ẩm, gió (tốc độ + hướng), áp suất, chỉ số UV, tầm nhìn, lượng mưa, bình minh/hoàng hôn.
- **Đổi đơn vị**: bấm **°C / °F** ở góc phải.
- Dữ liệu lấy từ **Open-Meteo** (miễn phí, không cần khóa API).

### 2.2. Tin tức hôm nay (`news.html`)

- **Ticker tin nóng** chạy ngang đầu trang.
- **Tiêu điểm hôm nay**: bài viết nổi bật kèm ảnh, bấm "Đọc tiếp" để mở bài gốc.
- **Tin tức trong ngày**: lưới thẻ tin, bấm tiêu đề để mở bài viết.
- **Hình ảnh trong ngày** kèm chú thích.
- Nguồn dữ liệu: **Wikipedia tiếng Việt** (sự kiện trong ngày).

### 2.3. Chỉnh ngày giờ hiển thị (cả 2 trang)

- Bấm vào **đồng hồ** ở thanh trên cùng (ví dụ: `T4, 30 tháng 9 2026 · 09:45:12`).
- Trong hộp thoại **"Chỉnh ngày giờ"**:
  - Chọn ngày/giờ tùy ý trong ô nhập.
  - Hoặc dùng nút nhanh: **Hiện tại / +1 giờ / +1 ngày / Ngày mai 09:00**.
  - Bấm **"Áp dụng"** để đặt giờ giả lập; bấm **"Giờ thật"** để quay lại giờ hệ thống.
- Khi đang giả lập: đồng hồ có **chấm vàng**, footer ghi chú *"giờ giả lập"*.
- Giờ giả lập được **lưu trong trình duyệt** và áp dụng cho cả trang thời tiết lẫn tin tức; đồng hồ vẫn chạy tiếp theo thời gian thật.

---

## 3. Chợ Đêm — Mua sắm (`shop.html`)

### 3.1. Duyệt sản phẩm

- **Lọc theo danh mục**: Tất cả / Đặc sản / Thủ công / Thời trang / Trang trí.
- **Tìm kiếm**: gõ tên sản phẩm hoặc vùng miền (ví dụ: "lụa", "Hà Nội").
- Mỗi thẻ sản phẩm hiển thị: ảnh minh họa, vùng xuất xứ, tên, đánh giá sao, số lượt đã bán, giá (và giá cũ nếu có khuyến mãi).

### 3.2. Giỏ hàng

1. Bấm **"Thêm vào giỏ"** trên sản phẩm → nút chuyển thành "Đã thêm ✓" và số trên biểu tượng giỏ tăng lên.
2. Bấm **biểu tượng giỏ hàng** (góc phải) để mở giỏ hàng.
3. Trong giỏ hàng:
   - Bấm **+ / −** để tăng/giảm số lượng (giảm về 0 sẽ xóa sản phẩm).
   - Bấm **"Xóa"** để bỏ sản phẩm.
   - **Tạm tính** cập nhật tự động.
4. Bấm **"Thanh toán"** để hoàn tất đơn hàng (bản demo) → giỏ hàng được làm trống.
5. Bấm **✕** hoặc vùng tối bên ngoài (hoặc phím **Esc**) để đóng giỏ hàng.

- Giỏ hàng được **lưu trong trình duyệt** — đóng trang, mở lại vẫn còn.

---

## 4. Lưu ý kỹ thuật

| Vấn đề | Giải thích |
|---|---|
| **Dữ liệu tài khoản / giỏ hàng / giờ giả lập** | Lưu trong `localStorage` của trình duyệt. Xóa dữ liệu duyệt web sẽ xóa luôn. |
| **Mở file trực tiếp (`file://`)** | Trình duyệt chặn gọi API → trang thời tiết/tin tức hiển thị **dữ liệu mẫu** kèm thông báo. Chạy qua **Preview** (HTTP) để lấy dữ liệu thật. |
| **Mật khẩu** | Chỉ phục vụ demo, lưu dạng văn bản trong `localStorage`. Không dùng cho môi trường thật. |
| **API bên thứ ba** | Open-Meteo (thời tiết) và Wikipedia (tin tức) — miễn phí, không cần khóa. Khi mất mạng sẽ tự dùng dữ liệu mẫu. |

---

*Tài liệu cập nhật theo phiên bản hiện tại của website.*