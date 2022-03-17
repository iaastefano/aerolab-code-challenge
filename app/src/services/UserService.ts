import { ApiResourcesEnum } from '../config/api';
import { IUser } from '../no-state/users/models';
import FetchService from './FetchService';

class UserService {
  public static fetchUser(): Promise<IUser> {
    return FetchService.get<IUser>({
      url: ApiResourcesEnum.USER_ME,
    });
  }

  public static addPoints(points: number): Promise<any> {
    return FetchService.post<string>({
      url: ApiResourcesEnum.ADD_POINTS,
      body: {
        "amount": points
      }
    });
  }
}

export default UserService;
