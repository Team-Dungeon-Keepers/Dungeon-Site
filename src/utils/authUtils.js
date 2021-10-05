
const loginAsManager = function() {
    let status = localStorage.getItem('userRole');
    
    return (status === "1");
}

export {
    loginAsManager
}
