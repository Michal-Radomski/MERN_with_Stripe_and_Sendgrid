import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import { ListItem } from "../Interfaces";

const List = (): JSX.Element => {
  const [list, setList] = React.useState<ListItem[]>([]);
  // console.log({list});

  const heading = ["#", "Idempotency Key", "Amount", "Created At", "Greetings"];

  const getList = () => {
    axios
      .get("/api/get-list")
      .then((res) => {
        setList(res.data);
        // console.log("res.data:", res.data);
      })
      .catch((error) => console.log({ error }));
  };

  React.useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h2 className="header">List of Greetings and Payments by Card</h2>
      <Table striped bordered hover responsive style={{ width: "98%", margin: "auto" }} variant="dark">
        <thead>
          <tr>
            {heading.map((head) => (
              <th key={heading.indexOf(head)}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={item._id}>
                <td style={{ width: "auto" }}>{index + 1}</td>
                <td style={{ width: "auto" }}>{item.idempotencyKey}</td>
                <td style={{ width: "auto" }}>{item.amount}</td>
                <td style={{ width: "auto" }}>{new Date(item.createdAt).toLocaleString()}</td>
                <td style={{ width: "auto" }}>{item.greetings}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default List;
