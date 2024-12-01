import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('lib/pages/home/index.tsx'),
  route('*', 'lib/pages/404/index.tsx'),
  route('/bomb', 'lib/pages/bomb/index.tsx'),
  route('/more-or-less', 'lib/pages/more-or-less/index.tsx'),
] satisfies RouteConfig;
