"use strict";

// @ts-check
module.exports = {
  translation: {
    appName: 'Fastify Шаблон',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль'
        },
        delete: {
          success: 'Вы разлогинены'
        }
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован'
        }
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.'
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход'
      }
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти'
        }
      },
      users: {
        id: 'ID',
        email: 'Email',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация'
        }
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше'
        }
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9sb2NhbGVzL3J1LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0cmFuc2xhdGlvbiIsImFwcE5hbWUiLCJmbGFzaCIsInNlc3Npb24iLCJjcmVhdGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJkZWxldGUiLCJ1c2VycyIsImF1dGhFcnJvciIsImxheW91dHMiLCJhcHBsaWNhdGlvbiIsInNpZ25JbiIsInNpZ25VcCIsInNpZ25PdXQiLCJ2aWV3cyIsIm5ldyIsInN1Ym1pdCIsImlkIiwiZW1haWwiLCJjcmVhdGVkQXQiLCJ3ZWxjb21lIiwiaW5kZXgiLCJoZWxsbyIsImRlc2NyaXB0aW9uIiwibW9yZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsRUFBQUEsV0FBVyxFQUFFO0FBQ1hDLElBQUFBLE9BQU8sRUFBRSxnQkFERTtBQUVYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTEMsTUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFFBQUFBLE1BQU0sRUFBRTtBQUNOQyxVQUFBQSxPQUFPLEVBQUUsZUFESDtBQUVOQyxVQUFBQSxLQUFLLEVBQUU7QUFGRCxTQUREO0FBS1BDLFFBQUFBLE1BQU0sRUFBRTtBQUNORixVQUFBQSxPQUFPLEVBQUU7QUFESDtBQUxELE9BREo7QUFVTEcsTUFBQUEsS0FBSyxFQUFFO0FBQ0xKLFFBQUFBLE1BQU0sRUFBRTtBQUNORSxVQUFBQSxLQUFLLEVBQUUsNkJBREQ7QUFFTkQsVUFBQUEsT0FBTyxFQUFFO0FBRkg7QUFESCxPQVZGO0FBZ0JMSSxNQUFBQSxTQUFTLEVBQUU7QUFoQk4sS0FGSTtBQW9CWEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BDLE1BQUFBLFdBQVcsRUFBRTtBQUNYSCxRQUFBQSxLQUFLLEVBQUUsY0FESTtBQUVYSSxRQUFBQSxNQUFNLEVBQUUsTUFGRztBQUdYQyxRQUFBQSxNQUFNLEVBQUUsYUFIRztBQUlYQyxRQUFBQSxPQUFPLEVBQUU7QUFKRTtBQUROLEtBcEJFO0FBNEJYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTFosTUFBQUEsT0FBTyxFQUFFO0FBQ1BhLFFBQUFBLEdBQUcsRUFBRTtBQUNISixVQUFBQSxNQUFNLEVBQUUsTUFETDtBQUVISyxVQUFBQSxNQUFNLEVBQUU7QUFGTDtBQURFLE9BREo7QUFPTFQsTUFBQUEsS0FBSyxFQUFFO0FBQ0xVLFFBQUFBLEVBQUUsRUFBRSxJQURDO0FBRUxDLFFBQUFBLEtBQUssRUFBRSxPQUZGO0FBR0xDLFFBQUFBLFNBQVMsRUFBRSxlQUhOO0FBSUxKLFFBQUFBLEdBQUcsRUFBRTtBQUNIQyxVQUFBQSxNQUFNLEVBQUUsV0FETDtBQUVISixVQUFBQSxNQUFNLEVBQUU7QUFGTDtBQUpBLE9BUEY7QUFnQkxRLE1BQUFBLE9BQU8sRUFBRTtBQUNQQyxRQUFBQSxLQUFLLEVBQUU7QUFDTEMsVUFBQUEsS0FBSyxFQUFFLHFCQURGO0FBRUxDLFVBQUFBLFdBQVcsRUFBRSx3Q0FGUjtBQUdMQyxVQUFBQSxJQUFJLEVBQUU7QUFIRDtBQURBO0FBaEJKO0FBNUJJO0FBREUsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtY2hlY2tcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyYW5zbGF0aW9uOiB7XG4gICAgYXBwTmFtZTogJ0Zhc3RpZnkg0KjQsNCx0LvQvtC9JyxcbiAgICBmbGFzaDoge1xuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBzdWNjZXNzOiAn0JLRiyDQt9Cw0LvQvtCz0LjQvdC10L3RiycsXG4gICAgICAgICAgZXJyb3I6ICfQndC10L/RgNCw0LLQuNC70YzQvdGL0Lkg0LXQvNC10LnQuyDQuNC70Lgg0L/QsNGA0L7Qu9GMJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiB7XG4gICAgICAgICAgc3VjY2VzczogJ9CS0Ysg0YDQsNC30LvQvtCz0LjQvdC10L3RiycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdXNlcnM6IHtcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZXJyb3I6ICfQndC1INGD0LTQsNC70L7RgdGMINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGMJyxcbiAgICAgICAgICBzdWNjZXNzOiAn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGD0YHQv9C10YjQvdC+INC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXV0aEVycm9yOiAn0JTQvtGB0YLRg9C/INC30LDQv9GA0LXRidGR0L0hINCf0L7QttCw0LvRg9C50YHRgtCwLCDQsNCy0YLQvtGA0LjQt9C40YDRg9C50YLQtdGB0YwuJyxcbiAgICB9LFxuICAgIGxheW91dHM6IHtcbiAgICAgIGFwcGxpY2F0aW9uOiB7XG4gICAgICAgIHVzZXJzOiAn0J/QvtC70YzQt9C+0LLQsNGC0LXQu9C4JyxcbiAgICAgICAgc2lnbkluOiAn0JLRhdC+0LQnLFxuICAgICAgICBzaWduVXA6ICfQoNC10LPQuNGB0YLRgNCw0YbQuNGPJyxcbiAgICAgICAgc2lnbk91dDogJ9CS0YvRhdC+0LQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHZpZXdzOiB7XG4gICAgICBzZXNzaW9uOiB7XG4gICAgICAgIG5ldzoge1xuICAgICAgICAgIHNpZ25JbjogJ9CS0YXQvtC0JyxcbiAgICAgICAgICBzdWJtaXQ6ICfQktC+0LnRgtC4JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB1c2Vyczoge1xuICAgICAgICBpZDogJ0lEJyxcbiAgICAgICAgZW1haWw6ICdFbWFpbCcsXG4gICAgICAgIGNyZWF0ZWRBdDogJ9CU0LDRgtCwINGB0L7Qt9C00LDQvdC40Y8nLFxuICAgICAgICBuZXc6IHtcbiAgICAgICAgICBzdWJtaXQ6ICfQodC+0YXRgNCw0L3QuNGC0YwnLFxuICAgICAgICAgIHNpZ25VcDogJ9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdlbGNvbWU6IHtcbiAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICBoZWxsbzogJ9Cf0YDQuNCy0LXRgiDQvtGCINCl0LXQutGB0LvQtdGC0LAhJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ9Cf0YDQsNC60YLQuNGH0LXRgdC60LjQtSDQutGD0YDRgdGLINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC40YDQvtCy0LDQvdC40Y4nLFxuICAgICAgICAgIG1vcmU6ICfQo9C30L3QsNGC0Ywg0JHQvtC70YzRiNC1JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=