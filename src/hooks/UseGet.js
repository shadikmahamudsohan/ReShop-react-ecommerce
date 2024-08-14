const UseGet = ({ setData, route, id, query }) => {
  const token = localStorage.getItem("token");
  let url = `${process.env.REACT_APP_serverApi}`;
  if (id) {
    url = `${process.env.REACT_APP_serverApi}${route}/${id}`;
  } else if (query) {
    url = `${process.env.REACT_APP_serverApi}${route}/${id}/${query}`;
  } else if (id && query) {
    url = `${process.env.REACT_APP_serverApi}${route}/${query}`;
  } else {
    url = `${process.env.REACT_APP_serverApi}${route}`;
  }

  if (token && url) {
    fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`, // notice the Bearer before your token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "Success") {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export default UseGet;
