import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { AuthApi, UsersApi, PostsApi } from '../../api/services';

export interface PageFixtures {
    loginPage: LoginPage;
    homePage: HomePage;
}

export interface ApiFixtures {
    authApi: AuthApi;
    usersApi: UsersApi;
    postsApi: PostsApi;
}

export interface MixedFixtures extends PageFixtures, ApiFixtures {}
