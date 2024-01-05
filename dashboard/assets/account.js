function getUrlParameter(k) {
    var p = {};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) { p[k] = v })
    return k ? p[k] : p;
}

function logoutUser() {
    localStorage.clear();
    window.location.href = "/account/login.html";
}