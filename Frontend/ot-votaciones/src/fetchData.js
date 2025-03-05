const getSuspender = (promise) => {
    let status = "pending";
    let response;
  
    const suspender = promise.then(
      (res) => {
        status = "success";
        response = res;
      },
      (err) => {
        status = "error";
        response = err;
      }
    );
  
    const read = () => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  
  export function fetchData(url, method = "GET", options = {}) {
    const { headers, body } = options;
    console.log(url)
    const promise = fetch(url, {
      method,
      headers: headers || { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
        }
        return response.json();
      });
  
    return getSuspender(promise);
  }
  