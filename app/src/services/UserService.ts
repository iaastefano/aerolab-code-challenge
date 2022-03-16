import { ApiResourcesEnum } from '../config/api';
import { IUser } from '../no-state/users/models';
import FetchService from './FetchService';

class UserService {
  public static fetchUser(): Promise<IUser> {
    return FetchService.get<IUser>({
      url: ApiResourcesEnum.USER_ME,
    });
  }
}

export default UserService;
