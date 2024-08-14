const UseUpdate = ({ data, route, reload, setReload }) => {
  const token = localStorage.getItem("token");
  let url = `${process.env.REACT_APP_serverApi}${route}`;
  console.log(data);

  if (token && url) {
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "Success") {
          setReload(reload + 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export default UseUpdate;
