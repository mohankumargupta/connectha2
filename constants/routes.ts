export const route_options = {
    pending: 'pending',
    login: 'login',
    configure: 'configure',
    home: 'main',
    findha: 'ha/find',
    connect: 'ha/connect',
    entitiesList: 'editbutton/entities',
    iconsList: 'editbutton/icons',
    customizeButton: 'editbutton/edit'
  } as const;
  
 export  type RouteKeyDestination = keyof typeof route_options;
  //type boo = typeof route_options[RouteDestination]
 export  type RouteDestination = typeof route_options[RouteKeyDestination]