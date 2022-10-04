import React from "react";
import axios from "axios";
import { ListItem } from "../Interfaces";

const List = (): JSX.Element => {
  const [list, setList] = React.useState<ListItem[]>([]);
  // console.log({list});

  const heading = ["Idempotency Key", "Amount", "Created At", "Greetings"];

  const getList = () => {
    axios
      .get("/api/get-list")
      .then((res) => setList(res.data))
      .catch((error) => console.log({ error }));
  };

  React.useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h1>List of Payments by Card</h1>

      <table style={{ width: 500 }}>
        <thead>
          <tr>
            {heading.map((head) => (
              <th key={heading.indexOf(head)}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.idempotencyKey}</td>
                <td>{item.amount}</td>
                <td>{item.createdAt as string}</td>
                <td>{item.greetings}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
