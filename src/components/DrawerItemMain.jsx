


export const drawerItemsMain = [
    {
      key: 'Funding',
      title: 'Funding',
      route: {nav: 'MainDrawer', routeName: 'Funding', title: 'Funding'},
    },
    {
        key: 'InvoiceManagement',
        title: 'Invoice',
        route: {nav: 'MainDrawer', routeName: 'InvoiceManagement', title: 'InvoiceManagement'},
      },
    {
      key: 'Help',
      title: 'Help',
      routes: [
        {nav: 'MainDrawer', routeName: 'Glossary', title: 'Glossary'},
        {nav: 'MainDrawer', routeName: 'Faq', title: 'Faq'},
      ],
    },
  ];