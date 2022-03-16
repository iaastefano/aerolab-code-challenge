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
}

export default ProductService;
