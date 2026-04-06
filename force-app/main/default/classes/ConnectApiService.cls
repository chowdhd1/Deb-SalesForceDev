/**
* @description       : Service class for accessing resources using Connect Api
* @author            : Rohit Ramchandruni
* @last modified on  : 29-01-2025
* @last modified by  : Rohit Ramchandruni
**/
public inherited sharing class ConnectApiService 
{
   /* 
   commenting out since it was deprecated from API version 62
   **
   public static List<ConnectApi.ProductOverview> fetchProductOverview(List<Id> productIdList, Id webstoreId, List<String> fields)
    {
        if(productIdList?.size() > 20)
        {
            throw new ConnectApiServiceException('Product Ids List cannot be more than 20');
        }
        else if(productIdList?.size() <= 0)
        {
            throw new ConnectApiServiceException('Product Ids List cannot be empty');
        }

        ConnectApi.ProductOverviewCollection result = ConnectApi.CommerceCatalog.getProducts(webstoreId, null, productIdList, null, fields, false);
        return result.products;
    }*/
    
    /**
    * @description       : Method to get the entitlement record
    * @author            : Nagendra DTDO-38
    **/
    public static List<ConnectApi.ProductOverview> fetchProductOverview(
        List<Id> productIdList,
        Id accountId,
        Id webstoreId,
        List<String> fields,
        Boolean noMultiMediaProduct,
        Boolean includeQuantityRule,
        Boolean includeProductSellingModels,
        Boolean includeAttributeSetInfo,
        Boolean includeGroupByAttributeVariationInfo,
        String noCache
    	) {

            try {
                ConnectApi.ProductOverviewCollection result = 
                    ConnectApi.CommerceCatalog.getProducts(
                        webstoreId, 
                        accountId, 
                        productIdList, 
                        null, 
                        fields != null ? fields : new List<String>{'Id', 'Name'}, 
                        noMultiMediaProduct != null ? noMultiMediaProduct : false,
                        includeQuantityRule,
                        includeProductSellingModels,
                        includeAttributeSetInfo,
                        includeGroupByAttributeVariationInfo,
                        noCache
                    );
                return result.products != null ? result.products : new List<ConnectApi.ProductOverview>();
            } catch (Exception e) {
                throw new ConnectApiServiceException('Failed to fetch products: ' + e.getMessage());
            }
        }//End
    

    public static ConnectApi.PricingResult fetchProductPricing(Id webstoreId, Id accountId, ConnectApi.PricingInput pricingInput)
    {
        return ConnectApi.CommerceStorePricing.getProductPrices(webstoreId, accountId, pricingInput);
    }

    public static ConnectApi.PricingInput makePricingInput(Set<Id> productIdSet)
    {
        if(productIdSet?.size() > 500)
        {
            throw new ConnectApiServiceException('Product Ids cannot be more than 500');
        }
        else if(productIdSet?.size() <= 0)
        {
            throw new ConnectApiServiceException('Product Ids cannot be empty');
        }

        ConnectApi.PricingInput pricingInput = new ConnectApi.PricingInput();
        List<ConnectApi.PricingLineItemInput> pliInputList = new List<ConnectApi.PricingLineItemInput>();

        for(Id productId :productIdSet)
        {
            ConnectApi.PricingLineItemInput pliInput = new ConnectApi.PricingLineItemInput();
            pliInput.productId = productId;
            pliInputList.add(pliInput);
        }

        pricingInput.pricingLineItems = pliInputList;

        return pricingInput;
    }

    //private static void fetchProductOverviewBySkus(){}

    public static Set<Id> fetchCategoryIdWithEntitledProducts(Id webStoreId, Id effectiveAccountId, Id rootCategoryId) {
        Set<Id> categoryIdWithEntitledProducts = new Set<Id>();
        
        // Create search input with the root category ID
        ConnectApi.ProductSearchInput searchInput = new ConnectApi.ProductSearchInput();
        searchInput.categoryId = rootCategoryId;
    
        // Perform product search
        ConnectApi.ProductSearchResults productSearchResults = ConnectApi.CommerceSearch.searchProducts(webStoreId, effectiveAccountId, searchInput);
   
        // Check if there are categories in the search results
        if (productSearchResults != null && productSearchResults.categories != null) {
            ConnectApi.SearchCategory categories = productSearchResults.categories;
    
            ConnectApi.ProductCategoryData categoryData = categories.category;
    
                // Check if the category has entitled products
                if (categories.productCount > 0) {
                    // Access children categories
                    List<ConnectApi.SearchCategory> children = categories.children;
    
                    // Iterate through children categories
                    for (ConnectApi.SearchCategory child : children) {
                        ConnectApi.ProductCategoryData childCategoryData = child.category;
    
                        // Add child category ID to the set
                        categoryIdWithEntitledProducts.add(childCategoryData.id);
                    }
                }
        }
    
        return categoryIdWithEntitledProducts;
    }

/**
* @description       : Method to fetch entitled Products
* @author            : Debojyoti Roy Chowdhury
**/
    
    public static list<ConnectApi.ProductSummary> fetchProducts(string webstoreId, string accountId, string rootCategoryId){
       list<ConnectApi.ProductSummary> retProducts= new list<ConnectApi.ProductSummary>();
       System.debug('rootCategoryId:::'+ rootCategoryId);
       System.debug('webstoreId:::'+ webstoreId);
       System.debug('accountId:::'+ accountId);
       if(!string.isBlank(rootCategoryId)){
            ConnectApi.ProductSearchInput searchInput = new ConnectApi.ProductSearchInput();
            searchInput.categoryId = rootCategoryId;
            searchInput.pageSize = 200; //DG-885
            searchInput.fields = new List<String>{'OrderType__c', 'Name', 'Description', 'StockKeepingUnit', 'ProductCode', 'Family'};
            ConnectApi.ProductSearchResults productObjectdata = ConnectApi.CommerceSearch.searchProducts(webstoreId, accountId, searchInput);
            System.debug('productObjectdata:::'+ productObjectdata);
            if(productObjectdata!= null && productObjectdata.productsPage!=null && productObjectdata.productsPage.products!=null){
                    retProducts=productObjectdata.productsPage.products;
           }
     }
        return retProducts;
    }
    
/**
* @description       : Method to fetch prices of entitled Products
* @author            : Debojyoti Roy Chowdhury
**/
public static ConnectApi.PricingResult fetchPrice(string webstoreId, string accountId, list<ConnectApi.ProductSummary> prodSum){
        List<ConnectApi.PricingLineItemInput> prodId= new List<ConnectApi.PricingLineItemInput>();
        ConnectApi.PricingInput priceInp= new ConnectApi.PricingInput();
        if(prodSum!=null){
            for(ConnectApi.ProductSummary su : prodSum){
                    ConnectApi.PricingLineItemInput itmPrice= new ConnectApi.PricingLineItemInput();
                     itmPrice.productId= su.id;
                prodId.add(itmPrice);
                }
            
                priceInp.pricingLineItems=prodId;
             
        }
        ConnectApi.PricingResult retPrice= fetchProductPricing(webstoreId, accountId, priceInp);
               return retPrice; 
    }
    
/**
* @description       : Method to Create a new Cart
* @author            : Debojyoti Roy Chowdhury
**/
    public static ConnectApi.CartSummary createCart(string effectiveAccount, string webStoreId, string name,List<SObject> webCartList){
        if(string.isBlank(effectiveAccount) || string.isBlank(webStoreId)){
             throw new ConnectApiServiceException('Effective Account Or WebStoreId can not be blank');
        }
        ConnectApi.CartInput cartInput = new ConnectApi.CartInput();
            cartInput.effectiveAccountId = effectiveAccount;
            cartInput.name = name;
            cartInput.type= ConnectApi.CartType.Cart;
            cartInput.customFields = webCartList;
        ConnectApi.CartSummary cartSummary = ConnectApi.CommerceCart.createCart(webStoreId, cartInput);
        return cartSummary;
    }
    
/**
* @description       : Method to add cart items
* @author            : Debojyoti Roy Chowdhury
**/
    public static ConnectApi.CartItem createCartItem(string cartId, string effectiveAccount, string webStoreId, string prodId, string quantity, string currencyCode){
        if(string.isBlank(effectiveAccount) || string.isBlank(webStoreId) || string.isBlank(cartId) || string.isBlank(prodId) || string.isBlank(quantity)){
             throw new ConnectApiServiceException('Required inputs can not be blank');
        }
        ConnectApi.CartItemInput cartItem = new ConnectApi.CartItemInput();
        cartItem.productId =  prodId;cartItem.quantity = quantity;cartItem.type = ConnectApi.CartItemType.Product;
        return ConnectApi.CommerceCart.addItemToCart(webStoreId,effectiveAccount,cartId,cartItem,currencyCode);
    }

/**
* @description       : Method to delete cart items
* @author            : Debojyoti Roy Chowdhury
**/
    public static void deleteItem(
        String effectiveAccountId,
        String activeCartOrId,
        String cartItemId,
        String webstoreId
    ) {
        if(string.isBlank(effectiveAccountId) || string.isBlank(webStoreId) || string.isBlank(activeCartOrId) || string.isBlank(cartItemId)){
             throw new ConnectApiServiceException('Required inputs can not be blank');
        }
                
        ConnectApi.CommerceCart.deleteCartItem(
            webstoreId,
            effectiveAccountId,
            activeCartOrId,
            cartItemId
        );
    }

/**
* @description       : Method to update cart items
* @author            : Debojyoti Roy Chowdhury
**/

public static ConnectApi.CartItem updateCartItem(
        String effectiveAccountId,
        String activeCartOrId,
        String cartItemId,
        String prodId,
        String quantity,
        string webstoreId
    ) {
         if(string.isBlank(effectiveAccountId) || string.isBlank(webStoreId) || string.isBlank(activeCartOrId) || string.isBlank(cartItemId)){
             throw new ConnectApiServiceException('Required inputs can not be blank');
        }
       
        ConnectApi.CartItemInput cartItem= new ConnectApi.CartItemInput();
        cartItem.productId=prodId;
        cartItem.quantity=quantity;

        return ConnectApi.CommerceCart.updateCartItem(
            webstoreId,
            effectiveAccountId,
            activeCartOrId,
            cartItemId,
            cartItem
        );
    }

    public class ProdWrap{
       @AuraEnabled
        public list<ConnectApi.ProductSummary> products{get;set;}
       @AuraEnabled
        public ConnectApi.PricingResult productPrice{get;set;}
    }
    
    class ConnectApiServiceException Extends Exception{}
}