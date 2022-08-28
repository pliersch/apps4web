export const constants = {
  appName: 'A4W',
  // todo: find way to use it inside routing modules
  routes: [
    {route: '/dashboard', name: 'Home'},
    {route: '/gallery/home', name: 'Galerie'},
    {route: '/chat', name: 'Chat'},
    {route: '/admin', name: 'Admin'},
    // {route: '/recipes', name: 'Rezepte'},
    {route: '/account', name: 'Account'},
    {route: '/account/login', name: 'Login'},
    {route: '/profile', name: 'Profil'},
    {route: '/samples/address', name: 'Adresse'},
    {route: '/samples/selection', name: 'Selection'},
    {route: '/doctor', name: 'Doc'},
  ]
} as const;
