"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _fastify = _interopRequireDefault(require("fastify"));

var _fastifyStatic = _interopRequireDefault(require("fastify-static"));

var _fastifyErrorPage = _interopRequireDefault(require("fastify-error-page"));

var _pointOfView = _interopRequireDefault(require("point-of-view"));

var _fastifyFormbody = _interopRequireDefault(require("fastify-formbody"));

var _fastifySecureSession = _interopRequireDefault(require("fastify-secure-session"));

var _fastifyPassport = _interopRequireDefault(require("fastify-passport"));

var _fastifySensible = _interopRequireDefault(require("fastify-sensible"));

var _fastifyReverseRoutes = require("fastify-reverse-routes");

var _fastifyMethodOverride = _interopRequireDefault(require("fastify-method-override"));

var _fastifyObjectionjs = _interopRequireDefault(require("fastify-objectionjs"));

var _qs = _interopRequireDefault(require("qs"));

var _pug = _interopRequireDefault(require("pug"));

var _i18next = _interopRequireDefault(require("i18next"));

var _ru = _interopRequireDefault(require("./locales/ru.js"));

var _webpackConfigBabel = _interopRequireDefault(require("../webpack.config.babel.js"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _index2 = _interopRequireDefault(require("./helpers/index.js"));

var _knexfile = _interopRequireDefault(require("../knexfile.js"));

var _index3 = _interopRequireDefault(require("./models/index.js"));

var _FormStrategy = _interopRequireDefault(require("./lib/passportStrategies/FormStrategy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
// import fastifyFlash from 'fastify-flash';
// @ts-ignore
_dotenv.default.config();

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

const setUpViews = app => {
  const {
    devServer
  } = _webpackConfigBabel.default;
  const devHost = `http://${devServer.host}:${devServer.port}`;
  const domain = isDevelopment ? devHost : '';
  const helpers = (0, _index2.default)(app);
  app.register(_pointOfView.default, {
    engine: {
      pug: _pug.default
    },
    includeViewExtension: true,
    defaultContext: { ...helpers,
      assetPath: filename => `${domain}/assets/${filename}`
    },
    templates: _path.default.join(__dirname, '..', 'server', 'views')
  });
  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals,
      reply: this
    });
  });
};

const setUpStaticAssets = app => {
  const pathPublic = isProduction ? _path.default.join(__dirname, '..', 'public') : _path.default.join(__dirname, '..', 'dist', 'public');
  app.register(_fastifyStatic.default, {
    root: pathPublic,
    prefix: '/assets/'
  });
};

const setupLocalization = () => {
  _i18next.default.init({
    lng: 'ru',
    fallbackLng: 'en',
    debug: isDevelopment,
    resources: {
      ru: _ru.default
    }
  });
};

const addHooks = app => {
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated()
    };
  });
};

const registerPlugins = app => {
  app.register(_fastifySensible.default);
  app.register(_fastifyErrorPage.default);
  app.register(_fastifyReverseRoutes.plugin);
  app.register(_fastifyFormbody.default, {
    parser: _qs.default.parse
  });
  app.register(_fastifySecureSession.default, {
    secret: process.env.SESSION_KEY,
    cookie: {
      path: '/'
    }
  });

  _fastifyPassport.default.registerUserDeserializer(user => app.objection.models.user.query().findById(user.id));

  _fastifyPassport.default.registerUserSerializer(user => Promise.resolve(user));

  _fastifyPassport.default.use(new _FormStrategy.default('form', app));

  app.register(_fastifyPassport.default.initialize());
  app.register(_fastifyPassport.default.secureSession());
  app.decorate('fp', _fastifyPassport.default);
  app.decorate('authenticate', (...args) => _fastifyPassport.default.authenticate('form', {
    failureRedirect: app.reverse('root'),
    failureFlash: _i18next.default.t('flash.authError')
  } // @ts-ignore
  )(...args));
  app.register(_fastifyMethodOverride.default);
  app.register(_fastifyObjectionjs.default, {
    knexConfig: _knexfile.default[mode],
    models: _index3.default
  });
};

var _default = () => {
  const app = (0, _fastify.default)({
    logger: {
      prettyPrint: isDevelopment
    }
  });
  registerPlugins(app);
  setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  (0, _index.default)(app);
  addHooks(app);
  return app;
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJtb2RlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiaXNQcm9kdWN0aW9uIiwiaXNEZXZlbG9wbWVudCIsInNldFVwVmlld3MiLCJhcHAiLCJkZXZTZXJ2ZXIiLCJ3ZWJwYWNrQ29uZmlnIiwiZGV2SG9zdCIsImhvc3QiLCJwb3J0IiwiZG9tYWluIiwiaGVscGVycyIsInJlZ2lzdGVyIiwicG9pbnRPZlZpZXciLCJlbmdpbmUiLCJwdWciLCJQdWciLCJpbmNsdWRlVmlld0V4dGVuc2lvbiIsImRlZmF1bHRDb250ZXh0IiwiYXNzZXRQYXRoIiwiZmlsZW5hbWUiLCJ0ZW1wbGF0ZXMiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImRlY29yYXRlUmVwbHkiLCJyZW5kZXIiLCJ2aWV3UGF0aCIsImxvY2FscyIsInZpZXciLCJyZXBseSIsInNldFVwU3RhdGljQXNzZXRzIiwicGF0aFB1YmxpYyIsImZhc3RpZnlTdGF0aWMiLCJyb290IiwicHJlZml4Iiwic2V0dXBMb2NhbGl6YXRpb24iLCJpMThuZXh0IiwiaW5pdCIsImxuZyIsImZhbGxiYWNrTG5nIiwiZGVidWciLCJyZXNvdXJjZXMiLCJydSIsImFkZEhvb2tzIiwiYWRkSG9vayIsInJlcSIsImlzQXV0aGVudGljYXRlZCIsInJlZ2lzdGVyUGx1Z2lucyIsImZhc3RpZnlTZW5zaWJsZSIsImZhc3RpZnlFcnJvclBhZ2UiLCJmYXN0aWZ5UmV2ZXJzZVJvdXRlcyIsImZhc3RpZnlGb3JtYm9keSIsInBhcnNlciIsInFzIiwicGFyc2UiLCJmYXN0aWZ5U2VjdXJlU2Vzc2lvbiIsInNlY3JldCIsIlNFU1NJT05fS0VZIiwiY29va2llIiwiZmFzdGlmeVBhc3Nwb3J0IiwicmVnaXN0ZXJVc2VyRGVzZXJpYWxpemVyIiwidXNlciIsIm9iamVjdGlvbiIsIm1vZGVscyIsInF1ZXJ5IiwiZmluZEJ5SWQiLCJpZCIsInJlZ2lzdGVyVXNlclNlcmlhbGl6ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVzZSIsIkZvcm1TdHJhdGVneSIsImluaXRpYWxpemUiLCJzZWN1cmVTZXNzaW9uIiwiZGVjb3JhdGUiLCJhcmdzIiwiYXV0aGVudGljYXRlIiwiZmFpbHVyZVJlZGlyZWN0IiwicmV2ZXJzZSIsImZhaWx1cmVGbGFzaCIsInQiLCJmYXN0aWZ5TWV0aG9kT3ZlcnJpZGUiLCJmYXN0aWZ5T2JqZWN0aW9uanMiLCJrbmV4Q29uZmlnIiwibG9nZ2VyIiwicHJldHR5UHJpbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQTNCQTtBQVlBO0FBUUE7QUFTQUEsZ0JBQU9DLE1BQVA7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixJQUF3QixhQUFyQztBQUNBLE1BQU1DLFlBQVksR0FBR0osSUFBSSxLQUFLLFlBQTlCO0FBQ0EsTUFBTUssYUFBYSxHQUFHTCxJQUFJLEtBQUssYUFBL0I7O0FBRUEsTUFBTU0sVUFBVSxHQUFJQyxHQUFELElBQVM7QUFDMUIsUUFBTTtBQUFFQyxJQUFBQTtBQUFGLE1BQWdCQywyQkFBdEI7QUFDQSxRQUFNQyxPQUFPLEdBQUksVUFBU0YsU0FBUyxDQUFDRyxJQUFLLElBQUdILFNBQVMsQ0FBQ0ksSUFBSyxFQUEzRDtBQUNBLFFBQU1DLE1BQU0sR0FBR1IsYUFBYSxHQUFHSyxPQUFILEdBQWEsRUFBekM7QUFDQSxRQUFNSSxPQUFPLEdBQUcscUJBQVdQLEdBQVgsQ0FBaEI7QUFDQUEsRUFBQUEsR0FBRyxDQUFDUSxRQUFKLENBQWFDLG9CQUFiLEVBQTBCO0FBQ3hCQyxJQUFBQSxNQUFNLEVBQUU7QUFDTkMsTUFB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LGlCQUFpQixDQUFDM0IsR0FBRCxDQUFqQjtBQUNBLHNCQUFVQSxHQUFWO0FBQ0F3QyxFQUFBQSxRQUFRLENBQUN4QyxHQUFELENBQVI7QUFFQSxTQUFPQSxHQUFQO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmYXN0aWZ5IGZyb20gJ2Zhc3RpZnknO1xuaW1wb3J0IGZhc3RpZnlTdGF0aWMgZnJvbSAnZmFzdGlmeS1zdGF0aWMnO1xuaW1wb3J0IGZhc3RpZnlFcnJvclBhZ2UgZnJvbSAnZmFzdGlmeS1lcnJvci1wYWdlJztcbmltcG9ydCBwb2ludE9mVmlldyBmcm9tICdwb2ludC1vZi12aWV3JztcbmltcG9ydCBmYXN0aWZ5Rm9ybWJvZHkgZnJvbSAnZmFzdGlmeS1mb3JtYm9keSc7XG5pbXBvcnQgZmFzdGlmeVNlY3VyZVNlc3Npb24gZnJvbSAnZmFzdGlmeS1zZWN1cmUtc2Vzc2lvbic7XG5pbXBvcnQgZmFzdGlmeVBhc3Nwb3J0IGZyb20gJ2Zhc3RpZnktcGFzc3BvcnQnO1xuaW1wb3J0IGZhc3RpZnlTZW5zaWJsZSBmcm9tICdmYXN0aWZ5LXNlbnNpYmxlJztcbi8vIGltcG9ydCBmYXN0aWZ5Rmxhc2ggZnJvbSAnZmFzdGlmeS1mbGFzaCc7XG5pbXBvcnQgeyBwbHVnaW4gYXMgZmFzdGlmeVJldmVyc2VSb3V0ZXMgfSBmcm9tICdmYXN0aWZ5LXJldmVyc2Utcm91dGVzJztcbmltcG9ydCBmYXN0aWZ5TWV0aG9kT3ZlcnJpZGUgZnJvbSAnZmFzdGlmeS1tZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0IGZhc3RpZnlPYmplY3Rpb25qcyBmcm9tICdmYXN0aWZ5LW9iamVjdGlvbmpzJztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgUHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcbmltcG9ydCBydSBmcm9tICcuL2xvY2FsZXMvcnUuanMnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHdlYnBhY2tDb25maWcgZnJvbSAnLi4vd2VicGFjay5jb25maWcuYmFiZWwuanMnO1xuXG5pbXBvcnQgYWRkUm91dGVzIGZyb20gJy4vcm91dGVzL2luZGV4LmpzJztcbmltcG9ydCBnZXRIZWxwZXJzIGZyb20gJy4vaGVscGVycy9pbmRleC5qcyc7XG5pbXBvcnQga25leENvbmZpZyBmcm9tICcuLi9rbmV4ZmlsZS5qcyc7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vbW9kZWxzL2luZGV4LmpzJztcbmltcG9ydCBGb3JtU3RyYXRlZ3kgZnJvbSAnLi9saWIvcGFzc3BvcnRTdHJhdGVnaWVzL0Zvcm1TdHJhdGVneS5qcyc7XG5cbmRvdGVudi5jb25maWcoKTtcbmNvbnN0IG1vZGUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuY29uc3QgaXNQcm9kdWN0aW9uID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgaXNEZXZlbG9wbWVudCA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG5cbmNvbnN0IHNldFVwVmlld3MgPSAoYXBwKSA9PiB7XG4gIGNvbnN0IHsgZGV2U2VydmVyIH0gPSB3ZWJwYWNrQ29uZmlnO1xuICBjb25zdCBkZXZIb3N0ID0gYGh0dHA6Ly8ke2RldlNlcnZlci5ob3N0fToke2RldlNlcnZlci5wb3J0fWA7XG4gIGNvbnN0IGRvbWFpbiA9IGlzRGV2ZWxvcG1lbnQgPyBkZXZIb3N0IDogJyc7XG4gIGNvbnN0IGhlbHBlcnMgPSBnZXRIZWxwZXJzKGFwcCk7XG4gIGFwcC5yZWdpc3Rlcihwb2ludE9mVmlldywge1xuICAgIGVuZ2luZToge1xuICAgICAgcHVnOiBQdWcsXG4gICAgfSxcbiAgICBpbmNsdWRlVmlld0V4dGVuc2lvbjogdHJ1ZSxcbiAgICBkZWZhdWx0Q29udGV4dDoge1xuICAgICAgLi4uaGVscGVycyxcbiAgICAgIGFzc2V0UGF0aDogKGZpbGVuYW1lKSA9PiBgJHtkb21haW59L2Fzc2V0cy8ke2ZpbGVuYW1lfWAsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZXM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdzZXJ2ZXInLCAndmlld3MnKSxcbiAgfSk7XG5cbiAgYXBwLmRlY29yYXRlUmVwbHkoJ3JlbmRlcicsIGZ1bmN0aW9uIHJlbmRlcih2aWV3UGF0aCwgbG9jYWxzKSB7XG4gICAgdGhpcy52aWV3KHZpZXdQYXRoLCB7IC4uLmxvY2FscywgcmVwbHk6IHRoaXMgfSk7XG4gIH0pO1xufTtcblxuY29uc3Qgc2V0VXBTdGF0aWNBc3NldHMgPSAoYXBwKSA9PiB7XG4gIGNvbnN0IHBhdGhQdWJsaWMgPSBpc1Byb2R1Y3Rpb25cbiAgICA/IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwdWJsaWMnKVxuICAgIDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ2Rpc3QnLCAncHVibGljJyk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5U3RhdGljLCB7XG4gICAgcm9vdDogcGF0aFB1YmxpYyxcbiAgICBwcmVmaXg6ICcvYXNzZXRzLycsXG4gIH0pO1xufTtcblxuY29uc3Qgc2V0dXBMb2NhbGl6YXRpb24gPSAoKSA9PiB7XG4gIGkxOG5leHRcbiAgICAuaW5pdCh7XG4gICAgICBsbmc6ICdydScsXG4gICAgICBmYWxsYmFja0xuZzogJ2VuJyxcbiAgICAgIGRlYnVnOiBpc0RldmVsb3BtZW50LFxuICAgICAgcmVzb3VyY2VzOiB7XG4gICAgICAgIHJ1LFxuICAgICAgfSxcbiAgICB9KTtcbn07XG5cbmNvbnN0IGFkZEhvb2tzID0gKGFwcCkgPT4ge1xuICBhcHAuYWRkSG9vaygncHJlSGFuZGxlcicsIGFzeW5jIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgcmVwbHkubG9jYWxzID0ge1xuICAgICAgaXNBdXRoZW50aWNhdGVkOiAoKSA9PiByZXEuaXNBdXRoZW50aWNhdGVkKCksXG4gICAgfTtcbiAgfSk7XG59O1xuXG5jb25zdCByZWdpc3RlclBsdWdpbnMgPSAoYXBwKSA9PiB7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5U2Vuc2libGUpO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeUVycm9yUGFnZSk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5UmV2ZXJzZVJvdXRlcyk7XG4gIGFwcC5yZWdpc3RlcihmYXN0aWZ5Rm9ybWJvZHksIHsgcGFyc2VyOiBxcy5wYXJzZSB9KTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlTZWN1cmVTZXNzaW9uLCB7XG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRVNTSU9OX0tFWSxcbiAgICBjb29raWU6IHtcbiAgICAgIHBhdGg6ICcvJyxcbiAgICB9LFxuICB9KTtcblxuICBmYXN0aWZ5UGFzc3BvcnQucmVnaXN0ZXJVc2VyRGVzZXJpYWxpemVyKFxuICAgICh1c2VyKSA9PiBhcHAub2JqZWN0aW9uLm1vZGVscy51c2VyLnF1ZXJ5KCkuZmluZEJ5SWQodXNlci5pZCksXG4gICk7XG4gIGZhc3RpZnlQYXNzcG9ydC5yZWdpc3RlclVzZXJTZXJpYWxpemVyKCh1c2VyKSA9PiBQcm9taXNlLnJlc29sdmUodXNlcikpO1xuICBmYXN0aWZ5UGFzc3BvcnQudXNlKG5ldyBGb3JtU3RyYXRlZ3koJ2Zvcm0nLCBhcHApKTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlQYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuICBhcHAucmVnaXN0ZXIoZmFzdGlmeVBhc3Nwb3J0LnNlY3VyZVNlc3Npb24oKSk7XG4gIGFwcC5kZWNvcmF0ZSgnZnAnLCBmYXN0aWZ5UGFzc3BvcnQpO1xuICBhcHAuZGVjb3JhdGUoJ2F1dGhlbnRpY2F0ZScsICguLi5hcmdzKSA9PiBmYXN0aWZ5UGFzc3BvcnQuYXV0aGVudGljYXRlKFxuICAgICdmb3JtJyxcbiAgICB7XG4gICAgICBmYWlsdXJlUmVkaXJlY3Q6IGFwcC5yZXZlcnNlKCdyb290JyksXG4gICAgICBmYWlsdXJlRmxhc2g6IGkxOG5leHQudCgnZmxhc2guYXV0aEVycm9yJyksXG4gICAgfSxcbiAgLy8gQHRzLWlnbm9yZVxuICApKC4uLmFyZ3MpKTtcblxuICBhcHAucmVnaXN0ZXIoZmFzdGlmeU1ldGhvZE92ZXJyaWRlKTtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlPYmplY3Rpb25qcywge1xuICAgIGtuZXhDb25maWc6IGtuZXhDb25maWdbbW9kZV0sXG4gICAgbW9kZWxzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgYXBwID0gZmFzdGlmeSh7XG4gICAgbG9nZ2VyOiB7XG4gICAgICBwcmV0dHlQcmludDogaXNEZXZlbG9wbWVudCxcbiAgICB9LFxuICB9KTtcblxuICByZWdpc3RlclBsdWdpbnMoYXBwKTtcblxuICBzZXR1cExvY2FsaXphdGlvbigpO1xuICBzZXRVcFZpZXdzKGFwcCk7XG4gIHNldFVwU3RhdGljQXNzZXRzKGFwcCk7XG4gIGFkZFJvdXRlcyhhcHApO1xuICBhZGRIb29rcyhhcHApO1xuXG4gIHJldHVybiBhcHA7XG59O1xuIl19