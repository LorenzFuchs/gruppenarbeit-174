function feedbackSnackbar() {       // w3 Snackbar / Toast - visual confirmation on action
    let toast = document.getElementById(`snackbar`);
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
}