/*********************** Custom JS for Boost AI Search & Discovery  ************************/
const customize = {
   updateProductItemISW: (componentRegistry) => {
      componentRegistry.useComponentPlugin('SearchProductItem', {
         name: 'Customize product item ISW',
         enabled: true,
         apply: () => ({
            afterRender(element) {
               try {
                  // Start customization--------------------------------------------
                  let productData = element.getParams().props.product;
                  let productId = productData.id;
                  if (productData?.split_product) {
                     productId = productData.variant_id;
                  }
                  let productItem = document.querySelector('.boost-sd__suggestion-queries-item--product[data-id="' + productId + '"]');
                  if (productItem) {
                     console.log(productData)
                    if(productData.price_max > productData.price_min){
                      var from_text = "From ";
                      if(productItem.querySelector(".boost-sd__suggestion-queries-item-amount--regular")){
                        productItem.querySelector(".boost-sd__suggestion-queries-item-amount--regular").prepend(from_text);
                      }

                      if(productItem.querySelector(".boost-sd__format-currency--price-sale")){
                        productItem.querySelector(".boost-sd__format-currency--price-sale").prepend(from_text);
                      }
                    }

                    if(productData.compare_at_price_min > productData.price_min && productItem.querySelector(".boost-sd__suggestion-queries-item-amount--sale") != null){
                      let savingPrice = `<span class="boost-sd__save--price">Save $${Number(productData.compare_at_price_min - productData.price_min).toFixed(2)}</span>`;
                      productItem.querySelector(".boost-sd__suggestion-queries-item-price").insertAdjacentHTML("beforeend",savingPrice)
                    }
                    
                  }
                  // End-------------------------------------------------------------
               } catch (e) {
                  console.warn(e);
               }
            }
         }),
      });
   }
}

window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([customize.updateProductItemISW]);