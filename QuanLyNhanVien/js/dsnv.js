function DSNV() {
  this.danhSachNV = [];
  // Thêm nhân viên
  this.themNV = function (nv) {
    this.danhSachNV.push(nv);
  };
  this.timViTriNV = function (taiKhoan) {
    let index = -1;
    for (let i = 0; i < this.danhSachNV.length; i++) {
      const nv = this.danhSachNV[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };

  // Xóa nhân viên
  this.xoaNV = function (taiKhoan) {
    const index = this.timViTriNV(taiKhoan);
    if (index !== -1) {
      this.danhSachNV.splice(index, 1);
    }
  };
  this.layThongTinNV = function (taiKhoan) {
    const index = this.timViTriNV(taiKhoan);
    if (index !== -1) {
      return this.danhSachNV[index];
    }
    return null;
  };

  // Cập nhật nhân viên
  this.capNhatNV = function (nv) {
    const index = this.timViTriNV(nv.taiKhoan);
    if (index !== -1) {
      this.danhSachNV[index] = nv;
    }
  };

  // Tìm kiếm nhân viên
  this.timNV = function (keyword) {
    let mangTimKiem = [];
    for (let i = 0; i < this.danhSachNV.length; i++) {
      const nv = this.danhSachNV[i];
      const keywordLowerCase = keyword.toLowerCase();
      const loaiNVLowerCase = nv.loaiNV.toLowerCase();
      if (loaiNVLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    }
    return mangTimKiem;
  };
}
