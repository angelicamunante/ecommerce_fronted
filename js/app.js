const node = document.getElementById('products-list');
const searchInput = document.getElementById('search');
const categoryIdInput = document.getElementById('category_id');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const categoryId = urlParams.get('category_id');
const search = urlParams.get('search');
const params = (categoryId, search) => {
  let params = {}
  
  if (categoryId) {
    const categoryParam = { "q[category_eq]": categoryId }
    params = {...params, ...categoryParam}
  }
  if (search) {
    const searchParam = { "q[name_or_product_category_name_cont]": search }
    params =  {...params, ...searchParam}
  }

  return new URLSearchParams(params)
}

window.addEventListener('load', () => {
  searchInput.value = search;
  categoryIdInput.value = categoryId;
  fetch(`https://backend-products.herokuapp.com/products?${params(categoryId, search)}`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(product => {
      const urlImage = product.url_image ? product.url_image : 'https://adlog.narmadeayurvedam.com/dtup/default-product.png'
      const newProduct = `
        <div class="col-xl-4 col-md-6 mt-5">
          <div class="card" style="width: 25rem" >
            <img src="${urlImage}" class="card-img-top img-responsive" style="width: 100% ;height:25vw">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Precio: ${product.price}</li>
              <li class="list-group-item">Descuento: ${product.discount}%</li>
            </ul>
          </div>
        </div>
      `
      node.insertAdjacentHTML('afterbegin', newProduct)
    });
  }).catch(function (err) {
    console.warn('Something went wrong.', err);
  });
});
