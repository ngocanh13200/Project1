# Tài liệu chức năng Đăng ký (SkyGate)

## 1. Giới thiệu

Chức năng **Đăng ký** cho phép người dùng tạo tài khoản mới trên trang web SkyGate. Sau khi đăng ký thành công, tài khoản được lưu vào trình duyệt và người dùng được chuyển sang trang **Đăng nhập**.

| Thông tin | Giá trị |
|---|---|
| Trang | `index.html` |
| Thư viện lưu trữ | `store.js` (`window.SkyGateStore`) |
| Nơi lưu dữ liệu | `localStorage` — key `skygate_users` |
| Trang kế tiếp | `login.html` (tự chuyển sau 1,5 giây) |

---

## 2. Hướng dẫn sử dụng

### 2.1. Các bước đăng ký

1. Mở trang đăng ký (`index.html`).
2. Nhập **Họ tên** — ví dụ: `Nguyễn Văn A`.
3. Nhập **Email** — ví dụ: `ban@vidu.com`.
4. Nhập **Mật khẩu** (tối thiểu 8 ký tự).
5. Nhập lại **Mật khẩu** (phải khớp với ô trên).
6. Tích chọn **"Tôi đồng ý với Điều khoản dịch vụ"**.
7. Bấm nút **"Tạo tài khoản"**.

### 2.2. Quy tắc nhập liệu

| Trường | Bắt buộc | Quy tắc hợp lệ |
|---|---|---|
| Họ tên | ✅ | Ít nhất 2 ký tự |
| Email | ✅ | Đúng định dạng `tên@miền.đuôi` (vd. `a@b.com`) |
| Mật khẩu | ✅ | Ít nhất 8 ký tự |
| Nhập lại mật khẩu | ✅ | Giống hệt ô Mật khẩu |
| Đồng ý điều khoản | ✅ | Phải được tích chọn |

### 2.3. Thông báo lỗi

| Tình huống | Thông báo |
|---|---|
| Họ tên trống/ngắn | `Vui lòng nhập họ và tên.` |
| Email sai định dạng | `Email không hợp lệ.` |
| Mật khẩu ngắn hơn 8 ký tự | `Mật khẩu phải có ít nhất 8 ký tự.` |
| Nhập lại mật khẩu không khớp | `Mật khẩu không khớp.` |
| Email đã tồn tại | `Email này đã được đăng ký.` |

- Lỗi hiển thị ngay dưới ô nhập, viền ô chuyển đỏ.
- Khi bấm "Tạo tài khoản" mà form chưa hợp lệ, con trỏ tự nhảy về ô lỗi đầu tiên.
- Khi gõ, **thẻ lên máy bay** bên phải cập nhật trực tiếp tên và email (email được che một phần, vd. `an•••@vidu.com`).

### 2.4. Khi đăng ký thành công

- Nút chuyển thành **"Đã tạo tài khoản ✓"** và bị khóa.
- Con dấu **"ĐÃ DUYỆT"** xuất hiện trên thẻ lên máy bay.
- Sau 1,5 giây tự chuyển sang trang **Đăng nhập** để đăng nhập bằng tài khoản vừa tạo.

---

## 3. Luồng hoạt động

```
Người dùng mở index.html
        │
        ▼
Nhập thông tin → Bấm "Tạo tài khoản"
        │
        ├── Kiểm tra định dạng (Họ tên, Email, Mật khẩu, Xác nhận, Điều khoản)
        │        └── Sai → hiển thị lỗi inline, focus ô lỗi đầu tiên
        │
        ├── Kiểm tra email trùng (SkyGateStore.findByEmail)
        │        └── Trùng → "Email này đã được đăng ký."
        │
        ▼
SkyGateStore.add({ name, email, password })  →  lưu vào localStorage
        │
        ▼
Hiển thị trạng thái thành công (stamp "ĐÃ DUYỆT")
        │
        ▼
Chuyển hướng đến login.html (sau 1,5 giây)
```

---

## 4. Chi tiết kỹ thuật

### 4.1. Cấu trúc dữ liệu người dùng

Mỗi tài khoản được lưu dưới dạng một đối tượng trong mảng `skygate_users`:

```json
{
  "id": "u1727700000123",
  "name": "Nguyễn Văn A",
  "email": "ban@vidu.com",
  "password": "matkhau123",
  "createdAt": "2026-09-30T03:00:00.000Z"
}
```

| Trường | Mô tả |
|---|---|
| `id` | Tự sinh: `u` + timestamp + số ngẫu nhiên |
| `name` | Họ tên người dùng |
| `email` | Email (dùng để đăng nhập, không trùng) |
| `password` | Mật khẩu (bản demo lưu dạng văn bản) |
| `createdAt` | Thời điểm tạo (ISO 8601) |

### 4.2. API của `SkyGateStore` (`store.js`)

| Hàm | Chức năng |
|---|---|
| `getAll()` | Lấy toàn bộ danh sách người dùng |
| `findByEmail(email)` | Tìm người dùng theo email (so sánh không phân biệt hoa thường) |
| `findById(id)` | Tìm người dùng theo id |
| `add(user)` | Thêm người dùng mới (tự sinh `id`, `createdAt`) |
| `update(id, patch)` | Cập nhật thông tin người dùng |
| `remove(id)` | Xóa người dùng |

### 4.3. Kiểm tra email hợp lệ

Biểu thức chính quy dùng để kiểm tra email:

```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
```

### 4.4. Các file liên quan

| File | Vai trò |
|---|---|
| `index.html` | Giao diện + logic đăng ký |
| `store.js` | Kho lưu trữ người dùng (dùng chung với Đăng nhập, Quản lý user) |
| `login.html` | Trang đăng nhập (đích sau khi đăng ký) |

---

## 5. Các ca kiểm thử (Test cases)

| # | Kịch bản | Kết quả mong đợi |
|---|---|---|
| TC-01 | Nhập đủ thông tin hợp lệ, bấm "Tạo tài khoản" | Tạo tài khoản thành công, chuyển sang trang đăng nhập |
| TC-02 | Để trống Họ tên | Lỗi "Vui lòng nhập họ và tên." |
| TC-03 | Email sai định dạng (`abc@`) | Lỗi "Email không hợp lệ." |
| TC-04 | Mật khẩu 5 ký tự | Lỗi "Mật khẩu phải có ít nhất 8 ký tự." |
| TC-05 | Nhập lại mật khẩu khác ô mật khẩu | Lỗi "Mật khẩu không khớp." |
| TC-06 | Không tích Điều khoản | Không đăng ký được, checkbox báo lỗi |
| TC-07 | Đăng ký email đã tồn tại | Lỗi "Email này đã được đăng ký." |
| TC-08 | Đăng ký thành công rồi đăng nhập bằng tài khoản đó | Đăng nhập thành công |
| TC-09 | Bấm "Hiện/Ẩn" khi nhập mật khẩu | Mật khẩu hiện/ẩn tương ứng |
| TC-10 | Gõ tên/email | Thẻ lên máy bay cập nhật theo thời gian thực |

---

## 6. Lưu ý bảo mật

> ⚠️ **Chỉ phục vụ mục đích demo.**

- Mật khẩu được lưu **dạng văn bản thuần** trong `localStorage` — không an toàn cho môi trường thật.
- Dữ liệu nằm trong trình duyệt của người dùng; xóa dữ liệu duyệt web sẽ mất tài khoản.
- Đối với ứng dụng thực tế, cần: lưu mật khẩu dạng băm (bcrypt/argon2), xác thực phía máy chủ, HTTPS, và kiểm tra email trùng ở phía server.