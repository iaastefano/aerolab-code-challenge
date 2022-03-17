import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { IProduct } from '../../no-state/products/models';
import { Button, Form } from 'react-bootstrap';
import ChevronDefaultSvg from '../../assets/icons/chevron-default-1.svg';
import ChevronActiveSvg from '../../assets/icons/chevron-active-1.svg';

interface ProductSectionProps {
}

const CATEGORY_ALL_PRODUCTS = 'All Products';
const ITEMS_PER_PAGE = 16;

const ProductSection: React.FC<ProductSectionProps> = ({
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([CATEGORY_ALL_PRODUCTS]);
  const [actualCategory, setActualCategory] = useState<number>(0);
  const [sortSelectorActive, setSortSelectorActive] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);


  const unique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await ProductService.fetch();

      setProducts(response);

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
    setActualCategory(e.currentTarget.selectedIndex);
  };

  useEffect(
    () => {
      if(isLoading){
        fetchProducts();
        setIsLoading(false);
      }
    },
    [isLoading, fetchProducts]
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
                    {/* TODO: IMPROVE STYLE */}
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
                    <Button variant={sortSelectorActive != 0 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => setSortSelectorActive(0)}>
                      <div className={sortSelectorActive != 0 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                        {sortSelectors[0]}
                      </div>
                    </Button>
                    <Button variant={sortSelectorActive != 1 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => setSortSelectorActive(1)}>
                      <div className={sortSelectorActive != 1 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                        {sortSelectors[1]}
                      </div>
                    </Button>
                    <Button variant={sortSelectorActive != 2 ? 'sort-selector' : 'sort-selector-active'} onClick={(e: any) => setSortSelectorActive(2)}>
                      <div className={sortSelectorActive != 2 ? 'sort-selector-text' : 'sort-selector-text-active'}>
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
                      <img src={actualPage == 1 ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                    </div>
                  </Button>
                </div>
                <div className='pager-text'>
                {`Page ${actualPage} of ${totalPages}`}
                </div>
                <div>
                <Button variant='pager-arrow-buttons' onClick={(e: any) => changeActualPage(1)}>
                  <div className='icons'>
                    <img src={actualPage == totalPages ? ChevronActiveSvg : ChevronDefaultSvg} alt="" />
                  </div>
                </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='products'>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;

