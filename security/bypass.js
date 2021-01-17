const bypassed_urls=["/api/","/api/usuario/login","/api/usuario/register","/api/usuario/exist"]


module.exports=function(middleware) {
    return function(req, res, next) {
      const pathCheck = bypassed_urls.some(path => path === req.path);
      const apiCheck=req.path.split('/').includes('api')
      pathCheck || !apiCheck ? next() : middleware(req, res, next);
    };
  };