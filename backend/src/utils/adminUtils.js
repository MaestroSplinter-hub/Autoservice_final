export const volverADashboard = (res) => res.redirect('/admin/dashboard');

export const volverALogin = (res) => () => res.redirect('/login');

export const volverALoginErr = (res) => () => res.status(500).redirect('/login');