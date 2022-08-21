export class NavItem {
  name: string;
  url: string;
}

export const navItems: Array<NavItem> = [
  {
    name: '投票',
    url: '/poll/1'
  },
  {
    name: '標籤',
    url: '/tag'
  }
];
