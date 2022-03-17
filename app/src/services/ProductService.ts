import { ApiResourcesEnum } from '../config/api';
import FetchService from './FetchService';
import {
  IProduct,
} from '../no-state/products/models';

class ProductService {
  public static fetch(): Promise<IProduct[]> {
    return FetchService.get<IProduct[]>({
      url: ApiResourcesEnum.PRODUCTS,
    });
  }

  public static redeem(id: string): Promise<string> {
    return FetchService.post<string>({
      url: ApiResourcesEnum.REDEEM,
      body: {
        'productId': id
      }
    });
  }
}

export default ProductService;
