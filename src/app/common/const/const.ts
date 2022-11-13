export const constants = {
  appName: 'A4W',
  // todo: find way to use it inside routing modules
  routes: [
    {route: '/dashboard', name: 'Home'},
    {route: '/gallery/explorer', name: 'Galerie'},
    {route: '/chat', name: 'Chat'},
    {route: '/admin', name: 'Admin'},
    // {route: '/auth', name: 'Auth'},
    // {route: '/recipes', name: 'Rezepte'},
    // {route: '/account', name: 'Account'},
    // {route: '/account/login', name: 'Login'},
    {route: '/three', name: 'Three'},
    // {route: '/felix', name: 'Felix'},
    // {route: '/samples/address', name: 'Adresse'},
    // {route: '/samples/selection', name: 'Selection'},
    // {route: '/doctor', name: 'Doc'},
    {route: '/signin', name: 'SignIn'},
  ]
} as const;
