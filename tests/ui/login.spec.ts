import { test, expect } from '../fixtures';

test.describe('Login Tests',()=>{


    test.beforeEach(async({pages})=>{

        await pages.login.navigateToLogin();
        await pages.login.loginPageloaded();
    });

    test('TC001 - User should login successfully with valid credentials',async({ pages })=>{

        await pages.login.login(
            process.env.TEST_USER_EMAIL!,
            process.env.TEST_USER_PASSWORD!
        );

        await pages.home.verifyHomePageLoaded();
        await pages.home.verifyLoggedIn('Badam Saikumar')
    })

    test('TC002 - User should see error with invalid email',async({pages})=>{
        await pages.login.login('testtest@gmail.com', process.env.TEST_USER_PASSWORD!);
        await pages.login.verifyLoginError('Your email or password is incorrect!');
    })

      test('TC003 - User should see error with invalid password',
    async ({ pages }) => {
      await pages.login.login(
        process.env.TEST_USER_EMAIL!,
        'WrongPassword123'
      );
      await pages.login.verifyLoginError(
        'Your email or password is incorrect!'
      );
  });

   test('TC004 - User should logout successfully',
    async ({ pages }) => {
      await pages.login.login(
        process.env.TEST_USER_EMAIL!,
        process.env.TEST_USER_PASSWORD!
      );
      await pages.home.verifyLoggedIn('Badam Saikumar');
      await pages.home.logout();
      await pages.login.loginPageloaded();
  });

});