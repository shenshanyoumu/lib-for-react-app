import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import errorMiddleware from './errorMiddleware';

// 注意中间件的执行顺序，在redux实现中applyMiddleware函数内部使用调用compose函数，而compose函数内部使用reduceRight
// 来铰链中间件，因此action最先被errorMiddleware拦截
const middlewares = [errorMiddleware, thunkMiddleware, promiseMiddleware];

/**
 * 向外提供的middlewar包括：
 * errorMiddleware，promiseMiddleware, thunkMiddleware
 */
export default {
  promiseMiddleware,
  thunkMiddleware,
  errorMiddleware,
  middlewares,
};
