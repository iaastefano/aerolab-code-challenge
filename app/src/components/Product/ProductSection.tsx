import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { IProduct } from '../../no-state/products/models';
import { Button, Form } from 'react-bootstrap';
import ChevronDefaultSvg from '../../assets/icons/chevron-default-1.svg';
import ChevronActiveSvg from '../../assets/icons/chevron-active-1.svg';
import AeropayThreeSvg from '../../assets/icons/aeropay-3.svg';
import AeropayFourSvg from '../../assets/icons/aeropay-4.svg';
interface ProductSectionProps {
  points: number;
  fetchUser: () => void;
}

const CATEGORY_ALL_PRODUCTS = 'All Products';
const ITEMS_PER_PAGE = 16;

const ProductSection: React.FC<ProductSectionProps> = ({
  points, fetchUser
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([CATEGORY_ALL_PRODUCTS]);
  const [actualCategory, setActualCategory] = useState<number>(0);
  const [sortSelectorActive, setSortSelectorActive] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [redeemingProductId, setRedeemingProductId] = useState<string>('');

  const unique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await ProductService.fetch();

      setProducts(response);

      setFilteredProducts(response);

      if(response.length > 0)
      {
        setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE));
        setActualPage(1);
      }

      let uniqueCategories = response.map(product => product.category).filter(unique);

      setCategories(categories.concat(uniqueCategories));
    } catch (error) {
      // if (error.message) {
      //   // message.error(error.message);
      // }
    }
  };

  const sortSelectors  = ['Most Recent', 'Lowest Price', 'Highest Price'];

  const changeActualPage = async (quantity: number) => {
    let newActualPage = actualPage + quantity;
    if(newActualPage > 0 && newActualPage <= totalPages)
    {
      setActualPage(newActualPage);
    }
  };
  
  const changeActualCategory = async (e: any) => {
    let category = e.currentTarget.selectedIndex;
    if(category !== actualCategory) {
      setActualCategory(category);
      let newFilteredProducts = products;
      if(category !== 0) {
        newFilteredProducts = products.filter(product => product.category === categories[category]);
      }
      setFilteredProducts(newFilteredProducts);
      setActualPage(1);
      setTotalPages(Math.ceil(newFilteredProducts.length / ITEMS_PER_PAGE));
    }
  };

  const changeSortSelector = async (option: number) => {
    setSortSelectorActive(option);
    let newFilteredProducts = filteredProducts;
    switch (option) {
      case 1:
        newFilteredProducts = filteredProducts.sort((a, b) => a.cost - b.cost);
        break;
      case 2:
        newFilteredProducts = filteredProducts.sort((a, b) => b.cost - a.cost);
        break;
      default:
        break;
    }
    setFilteredProducts(newFilteredProducts);
  };

  const redeemProduct = async (id: string) => {
    setRedeemingProductId(id);
    await ProductService.redeem(id);
    await fetchUser();
    setRedeemingProductId('');
  };

  useEffect(
    () => {
      if(isLoading){
        fetchProducts();
        setIsLoading(false);
      }
    },
    [fetchProducts, isLoading]
  );

  return (
    <>
      <div className='product-section'>
        <div className='header-products-and-bottom-pager'>
          <div className='title-and-controls'>
            <div className='title'>
              <span className='title-tech'>
                {'TECH '}
              </span>
              <span className='title-products'>
                {'PRODUCTS'}
              </span>
            </div>
            <div className='filter-sort-and-pager'>
              <div className='filters'>
                <div className='filter-by'>
                  <div className='filter-text'>
                    Filter by
                  </div>
                  <div className='filter-container'>
                    <Form.Select className='filter-select' onChange={(e: any) => changeActualCategory(e)}>
                      {categories.map(category => (
                          <option className='filter-option'
                            value={category}
                          >
                            {category}
                          </option>
                        ))
                      }
                    </Form.Select>
                  </div>
                </div>
                <div className='filter-horizontal-divider'>
                </div>
                <div className='sort-by-container'>
                  <div className='sort-by-text'>
                    Sort by:
                  </div>
                  <div className='sort-row'>
                    <Button variant={sortSelectorActive !== 0 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => changeSortSelector(0)}>
                      <div className={sortSelectorActive !== 0 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                        {sortSelectors[0]}
                      </div>
                    </Button>
                    <Button variant={sortSelectorActive !== 1 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => changeSortSelector(1)}>
                      <div className={sortSelectorActive !== 1 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                        {sortSelectors[1]}
                      </div>
                    </Button>
                    <Button variant={sortSelectorActive !== 2 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => changeSortSelector(2)}>
                      <div className={sortSelectorActive !== 2 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                        {sortSelectors[2]}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className='pager'>
                <div>
                  <Button variant='pager-arrow-buttons' onClick={(e: any) => changeActualPage(-1) }>
                    <div className='icons' style={{'transform' : 'rotate(-180deg)'}}>
                      <img src={actualPage === 1 ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                    </div>
                  </Button>
                </div>
                <div className='pager-text'>
                {`Page ${actualPage} of ${totalPages}`}
                </div>
                <div>
                <Button variant='pager-arrow-buttons' onClick={(e: any) => changeActualPage(1)}>
                  <div className='icons'>
                    <img src={actualPage === totalPages ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                  </div>
                </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='products'>
            <div className="container">
              <table>
                <tbody>
                  {filteredProducts.length > 0 && [...Array(4)].map((value, row) => (
                    <tr>
                      {[...Array(4)].map((val, column) => {
                        let index = (row * 4 +  column) + (actualPage - 1) * 16;
                        if(index < filteredProducts.length) {
                          let product = filteredProducts[index];
                          let canRedeem = points >= product.cost;
                          let isRedeeming = product._id === redeemingProductId;
                          return (
                            <td>
                              <div className='item-container'>
                                <div className='product-card-container'>
                                  <div className='product-card'>
                                    <div className='image-container'>
                                      <div className='product-shots'>
                                        <img src={product.img.url} alt="" />
                                      </div>
                                    </div>
                                    <div className='product-detail'>
                                      <div className='product-name'>
                                        {product.name}
                                      </div>
                                      <div className='product-type'>
                                        {product.category}
                                      </div>
                                    </div>
                                  </div>
                                  {isRedeeming ? 
                                  (<Button variant={'cta'} disabled>
                                    <div className='redeem-for'>
                                      Processing...
                                    </div>
                                  </Button>) 
                                  : (canRedeem ? 
                                  (
                                    <Button variant={'cta'} onClick={(e: any) => redeemProduct(product._id)}>
                                      <div className='redeem-for'>
                                        Redeem for
                                      </div>
                                      <div className='cost-container'>
                                        <div className='cost-icon'>
                                          <img src={AeropayThreeSvg} alt="" />
                                        </div>
                                        <div className='redeem-for'>
                                          {product.cost}
                                        </div>
                                      </div>
                                    </Button>
                                  ) :
                                  (
                                    <Button variant={'cta-disabled'}>
                                      <div className='you-need'>
                                        You need
                                      </div>
                                      <div className='cost-container'>
                                        <div className='cost-icon'>
                                          <img src={AeropayFourSvg} alt="" />
                                        </div>
                                        <div className='you-need'>
                                          {product.cost}
                                        </div>
                                      </div>
                                    </Button>
                                  ))
                                  }
                                </div>
                              </div>
                            </td>
                          );
                        }
                        return <></>;
                      }
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='number-of-products-and-pager'>
            <div className='number-of-products'>
              {(filteredProducts.length > ITEMS_PER_PAGE ? ITEMS_PER_PAGE : filteredProducts.length) + ' of ' + filteredProducts.length + ' products'}
            </div>
            <div className='pager'>
              <div>
                <Button variant='pager-arrow-buttons' onClick={(e: any) => changeActualPage(-1) }>
                  <div className='icons' style={{'transform' : 'rotate(-180deg)'}}>
                    <img src={actualPage === 1 ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                  </div>
                </Button>
              </div>
              <div className='pager-text'>
              {`Page ${actualPage} of ${totalPages}`}
              </div>
              <div>
              <Button variant='pager-arrow-buttons' onClick={(e: any) => changeActualPage(1)}>
                <div className='icons'>
                  <img src={actualPage === totalPages ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                </div>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;

