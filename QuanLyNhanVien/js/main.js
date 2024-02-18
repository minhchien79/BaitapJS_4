const dsnv = new DSNV();
const validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

// Lấy thông tin nhân viên
getEle("btnCapNhat").style.display = "none";
getEle("btnThemNV").style.display = "inline-block";
function layThongTinNhanVien() {
  const _taiKhoan = getEle("tknv").value;
  const _hoTen = getEle("name").value;
  const _email = getEle("email").value;
  const _matKhau = getEle("password").value;
  const _ngayLam = getEle("datepicker").value;
  const _luongCB = getEle("luongCB").value;
  const _chucVu = getEle("chucvu").value;
  const _gioLam = getEle("gioLam").value;

  let isValid = true;

  isValid &= validation.kiemTraRong(
    _taiKhoan,
    "tbTKNV",
    "(*)Tài khoản không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _hoTen,
    "tbTen",
    "(*)Tên không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _email,
    "tbEmail",
    "(*)Email không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _matKhau,
    "tbMatKhau",
    "(*)Mật khẩu không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _ngayLam,
    "tbNgay",
    "(*)Ngày làm không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _luongCB,
    "tbLuongCB",
    "(*)Lương không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _chucVu,
    "tbChucVu",
    "(*)Chức vụ không được để trống"
  );
  isValid &= validation.kiemTraRong(
    _gioLam,
    "tbGiolam",
    "(*)Giờ làm không được để trống"
  );
  if (!isValid) return null;
  // Tạo đối tượng nhân viên
  const nv = new Nhanvien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam
  );

  nv.tinhTongLuong();
  nv.xepLoaiNV();
  return nv;
}

function hienThiDanhSachNhanVien(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const nv = data[i];
    content += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.loaiNV}</td>
        <td>
            <button class="btn btn-info" data-toggle = "modal" data-target = "#myModal" onclick="SuaNV('${nv.taiKhoan}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>    
        </td>
        </tr>`;
  }
  getEle("tableDanhSach").innerHTML = content;
}

// Reset form
function resetForm(){
  getEle("tknv").value = "";
  getEle("tknv").disabled = false;
  getEle("name").value ="";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").value = "";
  getEle("gioLam").value ="";
}

// Edit nhân viên
function SuaNV(id) {
  const nv = dsnv.layThongTinNV(id);
  if (nv) {
  
    getEle("btnCapNhat").style.display = "inline-block";
    getEle("btnThemNV").style.display = "none";
   
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv._matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}

// Xóa nhân viên
function deleteNV(id) {
  dsnv.xoaNV(id);
  hienThiDanhSachNhanVien(dsnv.danhSachNV);
  setLocalStorage();
}

function setLocalStorage() {
  const arrString = JSON.stringify(dsnv.danhSachNV);
  localStorage.setItem("DSNV", arrString);
}

function getLocalStorage() {
  if (!localStorage.getItem("DSNV")) return;
  const arrString = localStorage.getItem("DSNV");
  const arrJSON = JSON.parse(arrString);
  dsnv.danhSachNV = arrJSON;
  hienThiDanhSachNhanVien(dsnv.danhSachNV);
}

// Thêm nhân viên
function themNV() {
  const nv = layThongTinNhanVien();
  if (!nv) return;
  dsnv.themNV(nv);
  hienThiDanhSachNhanVien(dsnv.danhSachNV);
  setLocalStorage();
}

// Cập nhật nhân viên
function updateNV() {
  const nv = layThongTinNhanVien();
  dsnv.capNhatNV(nv);
  hienThiDanhSachNhanVien(dsnv.danhSachNV);
  setLocalStorage();
}

// Tìm kiếm nhân viên
getEle("searchName").addEventListener("keyup", function () {
  const keyword = getEle("searchName").value;
  const mangTimKiem = dsnv.timNV(keyword);
  hienThiDanhSachNhanVien(mangTimKiem);
});
