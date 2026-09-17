document.write(`<header class="nxl-header">
    <div class="header-wrapper">
        <div class="header-left d-flex align-items-center gap-4">
            <a href="javascript:void(0);" class="nxl-head-mobile-toggler" id="mobile-collapse">
                <div class="hamburger hamburger--arrowturn">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
            </a>
            <div class="nxl-navigation-toggle">
                <a href="javascript:void(0);" id="menu-mini-button">
                    <i class="feather-align-left"></i>
                </a>
                <a href="javascript:void(0);" id="menu-expend-button" style="display: none">
                    <i class="feather-arrow-right"></i>
                </a>
            </div>
            
            <div class="d-none d-md-flex align-items-center" style="border-left: 2px solid #e3ebe6; padding-left: 20px; margin-left: 5px; height: 30px;">
                <h5 class="fw-bold mb-0 text-dark" id="dynamic-title" style="font-size: 16px; white-space: nowrap;"></h5>
            </div>

            <div class="nxl-drp-link nxl-lavel-mega-menu" style="width: auto;">
                <div class="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                    <a href="javascript:void(0)" id="nxl-lavel-mega-menu-hide">
                        <i class="feather-arrow-left me-2"></i>
                        <span>Back</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="header-right ms-auto">
            <div class="d-flex align-items-center">
                <div class="dropdown nxl-h-item">
                    <a href="javascript:void(0);" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                        <img src="/assets/images/avatar/1.png" alt="user-image" class="img-fluid user-avtar me-0" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                        <div class="dropdown-header">
                            <div class="d-flex align-items-center">
                                <img src="/assets/images/avatar/1.png" alt="user-image" class="img-fluid user-avtar" />
                                <div>
                                    <h6 class="text-dark mb-0">Administrator</h6>
                                    <span class="fs-12 fw-medium text-muted" id="nama"></span>
                                </div>
                            </div>
                        </div>
                        <a href="/cp" class="dropdown-item">
                            <i class="feather-user"></i>
                            <span>Ubah Kata Sandi</span>
                        </a>
                        <a href="#" onclick="logout()" class="dropdown-item">
                            <i class="feather-log-out"></i>
                            <span>Keluar</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
</header>
<style>
    .header-wrapper {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        height: 70px !important;
        padding: 0 25px !important;
    }
    #dynamic-title i {
        margin: 0 8px;
        font-size: 12px;
        color: #adb5bd;
    }
</style>`);

let cookies = {};
var a = document.cookie.split(";");
for (var i = 0; i < a.length; i++) {
    var b = a[i].split("=");
    if (b.length > 1) {
        cookies[b[0].trim()] = b[1];
    }
}

if (cookies['name'] == "" || cookies['name'] == undefined) {
    window.location.href = '/';
} else {
    const checkExist = setInterval(function () {
        if (document.getElementById("nama")) {
            document.getElementById("nama").innerText = cookies["name"];
            clearInterval(checkExist);
        }
    }, 100);
}

function logout() {
    swal({
        title: "Apakah Kamu Yakin ?",
        text: "Untuk Keluar Dari Aplikasi ??",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willOut) => {
        if (willOut) {
            window.location.href = '/logout';
        } else {
            console.log('NaN')
        }
    });
}